import { describe, expect } from "vitest";

import { AsyncResult } from "../src";

describe("AsyncResult", () => {
	describe("AsyncResult.fromRaw", async () => {
		const myFunction = async () => 42;
		const result = await AsyncResult.fromRaw(myFunction()).map((value) => value * 2);
		expect(result.isOk());
		//@ts-expect-error
		expect(result.unwrap()).toBe(84);
	});
});
