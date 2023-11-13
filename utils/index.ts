export const sortHelpers = {
	last_scanned_sort: (a: any, b: any) => new Date(b.lastScanned).getTime() - new Date(a.lastScanned).getTime()
};
  
export const uppercaseFirstLetter = (str: string): string => {
	const ucFirstLetter = str.charAt(0).toUpperCase() + str.slice(1);

	return ucFirstLetter;
}

export const timeAgoString = (lastScannedDt: Date): string => {
	const seconds: number = Math.floor((new Date().getTime() - lastScannedDt.getTime()) / 1000);

	let interval = Math.floor(seconds / 31536000);
	if (interval > 1) {
		return interval + ' years ago';
	}

	interval = Math.floor(seconds / 2592000);
	if (interval > 1) {
		return interval + ' months ago';
	}

	interval = Math.floor(seconds / 86400);
	if (interval > 1) {
		return interval + ' days ago';
	}

	interval = Math.floor(seconds / 3600);
	if (interval > 1) {
		return interval + ' hours ago';
	}

	interval = Math.floor(seconds / 60);
	if (interval > 1) {
		return interval + ' minutes ago';
	}

	if (seconds < 10) return 'just now';

	return Math.floor(seconds) + ' seconds ago';
};
