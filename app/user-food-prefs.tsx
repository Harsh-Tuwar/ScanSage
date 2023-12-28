import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { SCREEN_HEIGHT, helpers } from '../styles';
import { Button, useTheme, Text, Portal, Snackbar, Divider, Checkbox, List } from 'react-native-paper';
import PageTitle from '../components/PageTitle';
import { ScrollView } from 'react-native-gesture-handler';
import { router, useLocalSearchParams } from 'expo-router';
import { useUser } from '../context/UserContext';
import * as fbDb from '../firebase/db';

const exclusionList = [
	{ id: 1, title: 'Onion', icon: 'alpha-o-circle' },
	{ id: 2, title: 'Garlic', icon: 'alpha-g-circle' },
	{ id: 3, title: 'Potatoes', icon: 'alpha-p-circle' },
	{ id: 4, title: 'Meat', icon: 'food-drumstick-off' },
	{ id: 5, title: 'Fish', icon: 'fish-off' },
	{ id: 6, title: 'Eggs', icon: 'egg-off' },
]

const UserFoodPrefs = () => {
	const theme = useTheme();
	const { user, fbUser } = useUser();
	const [loadingAction, setLoadingAction] = useState(false);
	const [checkedList, setCheckedList] = useState<number[]>([]);
	const [snackObj, setSnackObj] = useState({ visible: false, msg: '' });
	const { newUser } = useLocalSearchParams<{ newUser?: string }>();

	useEffect(() => {
		if (!user) {
			router.replace('/');
		}
	}, [user]);

	useEffect(() => {
		if (fbUser && fbUser.foodPrefs) {
			setCheckedList(fbUser.foodPrefs);
		}
	}, [fbUser]);

	const resetPreferences = async () => {
		let message = 'We are having hard time resetting the preferences, please try again later!';

		if (user?.uid) {
			await fbDb.upsertFoodPreferences(user.uid, {});
			message = 'Preferences resetted!';
		}

		setSnackObj({ visible: true, msg: message });
	};

	const handleCheckboxSelect = (id: number) => {
		const alreadyHasIt = checkedList.findIndex((item) => item === id);
		const newList = [...checkedList];

		if (alreadyHasIt === -1) {
			newList.push(id);
		} else {
			newList.splice(alreadyHasIt, 1);
		}

		setCheckedList(newList);
	};

	const handleSave = async () => {
		setLoadingAction(true);

		if (user?.uid) {
			await fbDb.upsertFoodPreferences(user?.uid, checkedList)
				.then(() => {
					setSnackObj({
						visible: true,
						msg: 'Preferences Updated!'
					});
				}).catch((err) => {
					setSnackObj({
						visible: true,
						msg: err
					});
				})
		} else {
			setSnackObj({
				visible: true,
				msg: 'Error saving preferences, please try again later!'
			});
		}

		setLoadingAction(false);
	}

	return (
		<SafeAreaView style={{ ...helpers.p10, backgroundColor: theme.colors.background }}>
			<PageTitle>Food Prefs.</PageTitle>
			<ScrollView style={styles.container}>
				{!newUser && (
					<Button onPress={resetPreferences} mode='text' icon='restart' style={{
						...helpers.mx10,
						justifyContent: 'flex-start'
					}}>Reset Preferences</Button>
				)}
				<Text>
					Choose what information about food matters most to you, in order to rank food according to your
					preferences, see the information you care about first, and get a compatibility summary.
				</Text>
				<Divider style={helpers.mx20} />
				<Text variant='bodyLarge'>Select each ingredients you <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>DONT</Text> want to be a part of your diet.</Text>
				<View style={helpers.mx10}>
					<List.Section>
						<List.Subheader>Ingredients to avoid.</List.Subheader>
						{exclusionList.map(({ id, title, icon }) => {
							return (
								<List.Item
									title={title}
									key={id}
									left={props => <List.Icon {...props} icon={icon} />}
									right={() => <Checkbox.Item
										label={''}
										status={checkedList.includes(id) ? 'checked' : 'unchecked'}
									/>}
									onPress={() => handleCheckboxSelect(id)} />)
						})}
					</List.Section>
					<Text>* These selections acts as "OR" and not as "AND", meaning, if anyone of the selected item is present in the food ingredients list, the app would mark it as "Does not match" preferences.</Text>
				</View>
			</ScrollView>
			<Portal>
				<Snackbar
					theme={theme}
					visible={snackObj.visible}
					duration={1000}
					action={{
						label: 'OK',
						onPress: () => setSnackObj({ visible: false, msg: '' }),
					}}
					onDismiss={() => setSnackObj({ visible: false, msg: '' })}
				>
					{snackObj.msg}
				</Snackbar>
			</Portal>
			<View style={{ marginBottom: 10 }}>
				<View style={{ backgroundColor: theme.colors.background }}>
					{!newUser && (
						<View>
							<Button
								disabled={loadingAction}
								icon="check-circle"
								mode="contained"
								loading={loadingAction}
								onPress={handleSave}
								labelStyle={styles.bottomBarButtonLabel}
								style={{ marginVertical: 20 }}
							>
								Save
							</Button>
							<Button
								disabled={loadingAction}
								icon="chevron-left"
								mode="outlined"
								loading={loadingAction}
								onPress={() => router.back()}
								labelStyle={styles.bottomBarButtonLabel}
							>
								Back
							</Button>
						</View>
					)}
				</View>
				<View>
					{newUser && (
						<Button
							mode="contained"
							onPress={() => router.replace('/(app)/recent-scans')}
							labelStyle={{ ...styles.bottomBarButtonLabel, alignSelf: 'flex-end' }}
							icon="chevron-right"
							contentStyle={{ flexDirection: 'row-reverse' }}
						>
							Next
						</Button>
					)}
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 10,
		height: SCREEN_HEIGHT - 190
	},
	bottomBarButtonLabel: {
		fontSize: 16
	}
})

export default UserFoodPrefs;
