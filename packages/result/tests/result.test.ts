import { describe, expect, it } from "vitest";

import { Result } from "../src/result";

describe("Result", () => {
	describe("Result.ok", () => {
		it("should return an 'Ok' result variant", () => {
			const result = Result.ok(1);
			expect(result.isOk());
		});
	});
	describe("Result.err", () => {
		it("should return an 'Err' result variant", () => {
			const result = Result.err(1);
			expect(result.isErr());
		});
	});
	describe("Result.map", () => {
		it("should produce the mapped value when invoked on an 'Ok' variant", () => {
			const result = Result.ok(1);
			const mapped = result.map((value) => value + 1);
			expect(mapped.isOk());
			expect(mapped.unwrap()).toBe(2);
		});
		it("should produce the original value when invoked on an 'Err' variant", () => {
			const result = Result.err(1);
			const mapped = result.map((value: number) => value + 1);
			expect(mapped.isErr());
			expect(mapped.unwrapErr()).toBe(1);
		});
	});
	describe("Result.mapErr", () => {
		it("should produce the mapped value when invoked on an 'Err' variant", () => {
			const result = Result.err(1);
			const mapped = result.mapErr((value) => value + 1);
			mapped.assertErr();
			expect(mapped.unwrapErr()).toBe(2);
		});
		it("should produce the original value when invoked on an 'Ok' variant", () => {
			const result = Result.ok(1);
			const mapped = result.mapErr((value: number) => value + 1);

			mapped.assertOk();
			expect(mapped.unwrap()).toBe(1);
		});
	});
	describe("Result.and", () => {
		it("should return an 'Ok' the mapped value when invoked on an 'Ok' variant", () => {
			const result = Result.ok(1);
			const mapped = result.and(Result.ok(2));
			expect(mapped.isOk());
			// @ts-expect-error Test does not check for 'Err' variant
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			expect(mapped.unwrap()).toBe(2);
		});
		it("should produce the original value when invoked on an 'Err' variant", () => {
			const result = Result.err(1);
			const mapped = result.and(Result.ok(2));
			expect(mapped.isErr());
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			expect(mapped.unwrapErr()).toBe(1);
		});
		it("should produce the original value when invoked on an 'Ok' variant", () => {
			const result = Result.ok(1);
			const mapped = result.and(Result.err(2));
			expect(mapped.isErr()).toBe(true);
		});
	});
	describe("Result.andThen", () => {
		it("should produce the mapped value when invoked on an 'Ok' variant", () => {
			const result = Result.ok(1);
			let wasInvoked = false;
			const mapped = result.andThen((value) => {
				wasInvoked = true;
				return Result.ok(value + 1);
			});
			expect(mapped.isOk());
			expect(wasInvoked).toBe(true);
			// @ts-expect-error Test does not check for 'Err' variant
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			expect(mapped.unwrap()).toBe(2);
		});
		it("should produce the original value when invoked on an 'Err' variant", () => {
			const result = Result.err(1);
			let wasInvoked = false;
			const mapped = result.andThen((value: number) => {
				wasInvoked = true;
				return Result.ok(value + 1);
			});
			expect(mapped.isErr());
			expect(wasInvoked).toBe(false);
			mapped.assertErr();
			expect(mapped.unwrapErr()).toBe(1);
		});
	});
});
