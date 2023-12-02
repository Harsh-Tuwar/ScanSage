enum FOOD_EXCLUSION_IDS {
	ID_NO_ONION = 1,
	ID_NO_GARLIC = 2,
	ID_NO_POTATOES = 3,
	ID_NO_MEAT = 4,
	ID_NO_FISH = 5,
	ID_NO_EGGS = 6
};

export enum PRODUCT_MATCH_STATE {
	GOOD_MATCH = 1,
	DOES_NOT_MATCH = 2,
	UNKNOWN_MATCH = 3,
};

export enum VEG_STATUS {
	VEG = 1,
	NON_VEG = 2,
	UNKNOWN = 3
};

export const sortHelpers = {
	last_scanned_sort: (a: any, b: any) => new Date(b.lastScanned).getTime() - new Date(a.lastScanned).getTime()
};

export const uppercaseFirstLetter = (str: string): string => {
	const ucFirstLetter = str.charAt(0).toUpperCase() + str.slice(1);

	return ucFirstLetter;
}

export const getHumanReadableProductMatchStr = (state: PRODUCT_MATCH_STATE): string => {
	switch (state) {
		case PRODUCT_MATCH_STATE.DOES_NOT_MATCH:
			return 'Does not match';
		
		case PRODUCT_MATCH_STATE.GOOD_MATCH:
			return 'Good match';
		
		case PRODUCT_MATCH_STATE.UNKNOWN_MATCH:
		default:
			return 'Unknown match';
	}
};

const hasPartialMatch = (ingredients: string[], prefStrings: string[]) => {
	for (const str1 of ingredients) {
		for (const str2 of prefStrings) {
			if (str2.includes(str1) || str1.includes(str2)) {
				return true; // Found a partial match
			}
		}
	}

	return false; // No partial match found
};

export const matchProductToPreferences = (ingredients: string[], vegStatus: VEG_STATUS, preferences: number[]): PRODUCT_MATCH_STATE => {
	const stringsToMatch: string[] = [];
	let onlyVeg = false;

	if (ingredients.length === 0) {
		return PRODUCT_MATCH_STATE.UNKNOWN_MATCH;
	}

	preferences.forEach((prefItem) => {
		if (prefItem === FOOD_EXCLUSION_IDS.ID_NO_ONION) {
			stringsToMatch.push('onion'); // done
		} else if (prefItem === FOOD_EXCLUSION_IDS.ID_NO_POTATOES) {
			stringsToMatch.push('potato'); // done
		} else if (prefItem === FOOD_EXCLUSION_IDS.ID_NO_GARLIC) {
			stringsToMatch.push('garlic'); // done
		} else if (prefItem === FOOD_EXCLUSION_IDS.ID_NO_FISH) {
			stringsToMatch.push('fish'); // done
		} else if (prefItem === FOOD_EXCLUSION_IDS.ID_NO_MEAT) {
			onlyVeg = true;
		} else if (prefItem === FOOD_EXCLUSION_IDS.ID_NO_EGGS) {
			stringsToMatch.push('egg'); // done
		}
	});

	const hasMatch = hasPartialMatch(ingredients, stringsToMatch);

	if (hasMatch) {
		return PRODUCT_MATCH_STATE.DOES_NOT_MATCH;
	} else {
		if (onlyVeg) {
			return vegStatus === VEG_STATUS.VEG ? PRODUCT_MATCH_STATE.GOOD_MATCH : PRODUCT_MATCH_STATE.DOES_NOT_MATCH; 
		} else {
			return PRODUCT_MATCH_STATE.GOOD_MATCH;
		}
	}
}

export const getStateColor = (state: PRODUCT_MATCH_STATE) => {
	switch (state) {
		case PRODUCT_MATCH_STATE.GOOD_MATCH:
			return 'lightgreen';
		
		case PRODUCT_MATCH_STATE.DOES_NOT_MATCH:
			return 'red';
		
		case PRODUCT_MATCH_STATE.UNKNOWN_MATCH:
		default:
			return 'grey';
	}
};
