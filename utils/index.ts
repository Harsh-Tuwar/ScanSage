import { FoodFactsProduct } from '../api/api-types';

export const sortHelpers = {
	last_scanned_sort: (a: any, b: any) => new Date(b.lastScanned).getTime() - new Date(a.lastScanned).getTime()
};

export const uppercaseFirstLetter = (str: string): string => {
	const ucFirstLetter = str.charAt(0).toUpperCase() + str.slice(1);

	return ucFirstLetter;
}

const MONTH_NAMES: string[] = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];

function getFormattedDate(date: Date, prefomattedDate: string | false = false, hideYear: boolean = false): string {
	const day: number = date.getDate();
	const month: string = MONTH_NAMES[date.getMonth()];
	const year: number = date.getFullYear();
	const hours: number = date.getHours();
	let minutes: number | string = date.getMinutes();

	if (minutes < 10) {
		// Adding leading zero to minutes
		minutes = `0${minutes}`;
	}

	if (prefomattedDate) {
		// Today at 10:20
		// Yesterday at 10:20
		return `${prefomattedDate} at ${hours}:${minutes}`;
	}

	if (hideYear) {
		// 10. January at 10:20
		return `${day}. ${month} at ${hours}:${minutes}`;
	}

	// 10. January 2017. at 10:20
	return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
}

export function timeAgo(dateParam: Date | string): string | null {
	if (!dateParam) {
		return null;
	}

	const date: Date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
	const DAY_IN_MS: number = 86400000; // 24 * 60 * 60 * 1000
	const today: Date = new Date();
	const yesterday: Date = new Date(today.getTime() - DAY_IN_MS);
	const seconds: number = Math.round((today.getTime() - date.getTime()) / 1000);
	const minutes: number = Math.round(seconds / 60);
	const isToday: boolean = today.toDateString() === date.toDateString();
	const isYesterday: boolean = yesterday.toDateString() === date.toDateString();
	const isThisYear: boolean = today.getFullYear() === date.getFullYear();

	if (seconds < 5) {
		return 'just now';
	} else if (seconds < 60) {
		return `${seconds} seconds ago`;
	} else if (seconds < 90) {
		return 'about a minute ago';
	} else if (minutes < 60) {
		return `${minutes} minutes ago`;
	} else if (isToday) {
		return getFormattedDate(date, 'Today');
	} else if (isYesterday) {
		return getFormattedDate(date, 'Yesterday');
	} else if (isThisYear) {
		return getFormattedDate(date, false, true);
	}

	return getFormattedDate(date);
}


// match_product_to_preference checks if a product matches
// a given set of preferences and scores the product according to
// the preferences
//
// The product object must contain the attribute_groups field
//
// Output values are returned in the product object
//
// - match_score: number from 0 to 100
//		- the score is 0 if 
//		- otherwise the score is a weighted average of how well the product matches
//		each attribute selected by the user
//
// - match_status:
// 		- very_good_match	score >= 75
//		- good_match		score >= 50
//		- poor_match		score < 50
//		- unknown_match		at least one mandatory attribute is unknown, or unknown attributes weight more than 50% of the score
//		- may_not_match		at least one mandatory attribute score is <= 50 (e.g. may contain traces of an allergen)
//		- does_not_match	at least one mandatory attribute score is <= 10 (e.g. contains an allergen, is not vegan)
//
// - match_attributes: array of arrays of attributes corresponding to the product and 
// each set of preferences: mandatory, very_important, important

function match_product_to_preferences(product: any, product_preferences: any) {
	var score = 0;
	var debug = "";

	product.match_attributes = {
		"mandatory": [],
		"very_important": [],
		"important": []
	};

	// Note: it is important that mandatory attributes also contribute to the score
	// as some attributes like "low sugar" have scores from 0 to 100 that can still
	// be very useful to rank products by how much sugar they contain.
	// It is also needed in order not to have scores of 0 when only mandatory attributes
	// are selected.
	var preferences_factors = {
		"mandatory": 2,
		"very_important": 2,
		"important": 1,
		"not_important": 0
	};

	var sum_of_factors = 0;
	var sum_of_factors_for_unknown_attributes = 0;

	if (product.attribute_groups) {

		product.attributes_for_status = {};

		// Iterate over attribute groups
		$.each(product.attribute_groups, function (key, attribute_group) {

			// Iterate over attributes

			$.each(attribute_group.attributes, function (key, attribute) {

				var attribute_preference = product_preferences[attribute.id];
				var match_status_for_attribute = "match";

				if ((!attribute_preference) || (attribute_preference === "not_important")) {
					// Ignore attribute
					debug += attribute.id + " not_important" + "\n";
				}
				else {

					var attribute_factor = preferences_factors[attribute_preference];
					sum_of_factors += attribute_factor;

					if (attribute.status === "unknown") {

						sum_of_factors_for_unknown_attributes += attribute_factor;

						// If the attribute is mandatory and the attribute status is unknown
						// then mark the product status unknown

						if (attribute_preference === "mandatory") {
							match_status_for_attribute = "unknown_match";
						}
					}
					else {
						debug += attribute.id + " " + attribute_preference + " - match: " + attribute.match + "\n";
						score += attribute.match * attribute_factor;

						if (attribute_preference === "mandatory") {
							if (attribute.match <= 10) {
								// Mandatory attribute with a very bad score (e.g. contains an allergen) -> status: does not match
								match_status_for_attribute = "does_not_match";
							}
							// Mandatory attribute with a bad score (e.g. may contain traces of an allergen) -> status: may not match
							else if (attribute.match <= 50) {
								match_status_for_attribute = "may_not_match";
							}
						}
					}

					if (!(match_status_for_attribute in product.attributes_for_status)) {
						product.attributes_for_status[match_status_for_attribute] = [];
					}
					product.attributes_for_status[match_status_for_attribute].push(attribute);

					product.match_attributes[attribute_preference].push(attribute);
				}
			});
		});

		// Normalize the score from 0 to 100
		if (sum_of_factors === 0) {
			score = 0;
		} else {
			score /= sum_of_factors;
		}

		// If one of the attributes does not match, the product does not match
		if ("does_not_match" in product.attributes_for_status) {
			// Set score to 0 for products that do not match
			score = "0";
			product.match_status = "does_not_match";
		}
		else if ("may_not_match" in product.attributes_for_status) {
			product.match_status = "may_not_match";
		}
		// If one of the mandatory attribute is unknown, set an unknown match
		else if ("unknown_match" in product.attributes_for_status) {
			product.match_status = "unknown_match";
		}
		// If too many attributes are unknown, set an unknown match
		else if (sum_of_factors_for_unknown_attributes >= sum_of_factors / 2) {
			product.match_status = "unknown_match";
		}
		// If the product matches, check how well it matches user preferences
		else if (score >= 75) {
			product.match_status = "very_good_match";
		}
		else if (score >= 50) {
			product.match_status = "good_match";
		}
		else {
			product.match_status = "poor_match";
		}
	}
	else {
		// the product does not have the attribute_groups field
		product.match_status = "unknown_match";
		debug = "no attribute_groups";
	}

	product.match_score = score;
	product.match_debug = debug;
}