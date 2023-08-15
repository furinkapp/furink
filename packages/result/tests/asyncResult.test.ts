/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { describe, expect, it } from "vitest";

import { AsyncResult } from "../src/AsyncResult";

describe("AsyncResult", () => {
	describe("AsyncResult.fromRaw", () => {
		it("should process resolving promises", async () => {
			const myFunction = async () => 42;
			const result = await AsyncResult.fromRaw(myFunction())
				.map((v) => v + 27)
				.promise();
			expect(result.isOk()).toBe(true);
			// @ts-expect-error - we know it's ok
			expect(result.unwrap()).toBe(69);
		});
		it("should process rejecting promises", async () => {
			const myFunction = async () => {
				throw new Error("kaylen dog");
			};
			const result = await AsyncResult.fromRaw(myFunction()).promise();
			expect(result.isErr()).toBe(true);
			// @ts-expect-error - we know it's err
			expect(result.unwrapErr()).toStrictEqual(new Error("kaylen dog"));
		});
	});
});
