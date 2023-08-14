import { Result } from "./result";

export interface AsyncResult<T, E> extends Promise<Result<T, E>> {
	unwrapOr<U>(defaultValue: U): Promise<T | U>;
	unwrapOrElse<U>(fn: (err: E) => U): Promise<T | U>;
	map<U>(fn: (value: T) => U): AsyncResult<U, E>;
	mapErr<U>(fn: (err: E) => U): AsyncResult<T, U>;
	and<U>(res: AsyncResult<U, E>): AsyncResult<U, E>;
	andThen<U>(fn: (value: T) => AsyncResult<U, E>): AsyncResult<U, E>;
	or<F>(res: AsyncResult<T, F>): AsyncResult<T, F>;
	orElse<F>(fn: (err: E) => AsyncResult<T, F>): AsyncResult<T, F>;
}

class AsyncResultImpl<T, E> extends Promise<Result<T, E>> implements AsyncResult<T, E> {
	static fromRaw<T, E>(promise: Promise<T>) {
		return new AsyncResultImpl<T, E>(
			promise.then(
				(v) => Result.ok(v),
				(e: E) => Result.err(e),
			),
		);
	}

	static from<T, E>(result: Promise<Result<T, E>>) {
		return new AsyncResultImpl<T, E>(result);
	}

	private constructor(promise: Promise<Result<T, E>>) {
		super((resolve) =>
			promise.then(resolve, () => {
				throw new Error("Unreachable - file a bug report if you see this!");
			}),
		);
	}

	async unwrapOr<U>(defaultValue: U): Promise<T | U> {
		const result: Result<T, E> = await this;
		return result.unwrapOr(defaultValue);
	}

	async unwrapOrElse<U>(fn: (err: E) => U): Promise<T | U> {
		const result: Result<T, E> = await this;
		return result.unwrapOrElse(fn);
	}

	map<U>(fn: (value: T) => U): AsyncResultImpl<U, E> {
		return new AsyncResultImpl<U, E>(this.then((result) => result.map(fn)));
	}

	mapErr<U>(fn: (err: E) => U): AsyncResult<T, U> {
		return new AsyncResultImpl<T, U>(this.then((result) => result.mapErr(fn)));
	}

	and<U>(res: AsyncResult<U, E>): AsyncResult<U, E> {
		return new AsyncResultImpl<U, E>(
			Promise.all([this, res])
				.then(([a, b]) => a.and(b))
				.catch((e) => Result.err(e)),
		);
	}

	andThen<U>(fn: (value: T) => AsyncResult<U, E>): AsyncResult<U, E> {
		return new AsyncResultImpl<U, E>(
			this.then((result) => result.andThen(fn)).catch((e) => Result.err(e)),
		);
	}

	or<F>(res: AsyncResult<T, F>): AsyncResult<T, F> {
		return new AsyncResultImpl<T, F>(
			Promise.all([this, res])
				.then(([a, b]) => a.or(b))
				.catch((e) => Result.err(e)),
		);
	}

	orElse<F>(fn: (err: E) => AsyncResult<T, F>): AsyncResult<T, F> {
		return new AsyncResultImpl<T, F>(
			this.then((result) => result.orElse(fn)).catch((e) => Result.err(e)),
		);
	}
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AsyncResult = AsyncResultImpl as {
	fromRaw<T, E>(promise: Promise<T>): AsyncResult<T, E>;
	from<T, E>(result: Promise<Result<T, E>>): AsyncResult<T, E>;
};
