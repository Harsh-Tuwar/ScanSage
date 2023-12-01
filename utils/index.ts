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
}

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

export const matchProductToPreferences = (ingredients: string[], preferences: number[]): PRODUCT_MATCH_STATE => {
	const stringsToMatch: string[] = [];

	if (ingredients.length === 0) {
		return PRODUCT_MATCH_STATE.UNKNOWN_MATCH;
	}

	preferences.forEach((prefItem) => {
		if (prefItem === FOOD_EXCLUSION_IDS.ID_NO_ONION) {
			stringsToMatch.push('onion');
		} else if (prefItem === FOOD_EXCLUSION_IDS.ID_NO_POTATOES) {
			stringsToMatch.push('potato');
		} else if (prefItem === FOOD_EXCLUSION_IDS.ID_NO_GARLIC) {
			stringsToMatch.push('garlic');
		} else if (prefItem === FOOD_EXCLUSION_IDS.ID_NO_FISH) {
			stringsToMatch.push('fish');
		} else if (prefItem === FOOD_EXCLUSION_IDS.ID_NO_MEAT) {
			stringsToMatch.push('meat');
		} else if (prefItem === FOOD_EXCLUSION_IDS.ID_NO_EGGS) {
			stringsToMatch.push('eggs');
		}
	});

	const hasMatch = hasPartialMatch(ingredients, stringsToMatch);

	if (hasMatch) {
		return PRODUCT_MATCH_STATE.DOES_NOT_MATCH;
	} else {
		return PRODUCT_MATCH_STATE.GOOD_MATCH;
	}
}

export const getStateColor = (state: PRODUCT_MATCH_STATE) => {
	switch (state) {
		case PRODUCT_MATCH_STATE.GOOD_MATCH:
			return 'green';
		
		case PRODUCT_MATCH_STATE.DOES_NOT_MATCH:
			return 'red';
		
		case PRODUCT_MATCH_STATE.UNKNOWN_MATCH:
		default:
			return 'grey';
	}
};
