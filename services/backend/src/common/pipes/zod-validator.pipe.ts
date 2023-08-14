import { Schema } from "zod";

import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ZodValidatorPipe<T> implements PipeTransform {
	constructor(private readonly schema: Schema<T>) {}

	transform(value: unknown) {
		const result = this.schema.safeParse(value);
		if (!result.success) {
			throw new Error(result.error.message);
		}
		return result.data;
	}
}
