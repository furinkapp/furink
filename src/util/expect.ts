export const expect = <T>(val: T | undefined | null) => {
	if (val === undefined || val === null) {
		throw new Error("Unexpected null or undefined value");
	}
	return val;
};
