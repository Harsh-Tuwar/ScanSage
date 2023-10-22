export const uppercaseFirstLetter = (str: string): string => {
	const ucFirstLetter = str.charAt(0).toUpperCase() + str.slice(1);

	return ucFirstLetter;
}