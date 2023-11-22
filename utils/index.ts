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