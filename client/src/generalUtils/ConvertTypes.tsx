export const TimeConvert = (date: string) => {
	const addZero = (value: number) => {
		if (value.toString().length === 1) {
			return `0${value}`;
		} else {
			return value;
		}
	};

	return `${new Date(date).toLocaleDateString()} - ${addZero(new Date(date).getHours())} : ${addZero(
		new Date(date).getMinutes()
	)} : ${addZero(new Date(date).getSeconds())}`;
};
