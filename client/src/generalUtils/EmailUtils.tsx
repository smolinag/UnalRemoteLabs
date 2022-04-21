export const isEmail = (email: string): boolean => {
	return /[\w\d.-]+@[\w\d.-]+\.[\w\d.-]+/.test(email);
};
