
export function getLocalTime(locales:string = 'en-US') {
	return new Date().toLocaleTimeString(locales, { hour12: false,
		hour: "numeric",
		minute: "numeric"});
}