import { describe, expect, it } from "vitest";

import { asyncOk } from "../src";

describe("AsyncResult", () => {
	it("should work", async () => {
		const result = await asyncOk(3)
			.and(asyncOk(4))
			.map((v) => v + 3);

		expect(result).toBe(6);
	});
});
