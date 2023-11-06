import React, { PropsWithChildren } from 'react';
import { Portal } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { helpers } from '../styles';

interface ScannedItemInfoSheetProps extends PropsWithChildren {
	barcode: string;
}

const ScannedItemInfoSheet = ({
	barcode
}: ScannedItemInfoSheetProps) => {
	// ref
	const bottomSheetRef = React.useRef<BottomSheet>(null);
	// variables
	const snapPoints = React.useMemo(() => ['30%', '95%'], []);

	return (
		<Portal>
			<View style={styles.container}>
				<BottomSheet
					enablePanDownToClose
					ref={bottomSheetRef}
					style={helpers.p10}
					index={-1}
					snapPoints={snapPoints}
				>

				</BottomSheet>
			</View>
		</Portal>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
	}
});

export default ScannedItemInfoSheet