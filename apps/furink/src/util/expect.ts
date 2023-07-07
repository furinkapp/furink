export const expect = <T>(val: T | null | undefined) => {
	if (val === undefined || val === null) {
		throw new Error("Unexpected null or undefined value");
	}
	return val;
};
