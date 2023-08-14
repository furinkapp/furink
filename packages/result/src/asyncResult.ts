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

export interface AsyncOk<T> extends AsyncResult<T, never> {
	unwrapOr<U>(defaultValue: U): Promise<T>;
	unwrapOrElse<U>(fn: (err: never) => U): Promise<T>;
	map<U>(fn: (value: T) => U): AsyncOk<U>;
	mapErr<U>(fn: (err: never) => U): AsyncOk<U>;
	and<U, E>(res: AsyncResult<U, E>): AsyncResult<U, E>;
	andThen<U, E>(fn: (value: T) => AsyncResult<U, E>): AsyncResult<U, E>;
	or<F>(res: AsyncResult<T, F>): AsyncOk<T>;
	orElse<F>(fn: (err: never) => AsyncResult<T, F>): AsyncOk<T>;
}

export interface AsyncErr<E> extends AsyncResult<never, E> {
	unwrapOr<U>(defaultValue: U): Promise<U>;
	unwrapOrElse<U>(fn: (err: E) => U): Promise<U>;
	map<U>(fn: (value: never) => U): AsyncErr<E>;
	mapErr<U>(fn: (err: E) => U): AsyncErr<U>;
	and<U>(res: AsyncResult<U, E>): AsyncErr<E>;
	andThen<U>(fn: (value: never) => AsyncResult<U, E>): AsyncResult<U, E>;
	or<T, F>(res: AsyncResult<T, F>): AsyncResult<T, F>;
	orElse<T, F>(fn: (err: E) => AsyncResult<T, F>): AsyncResult<T, F>;
}

class AsyncResultImpl<T, E> extends Promise<Result<T, E>> implements AsyncResult<T, E> {
	static from<T, E>(promise: Promise<T>) {
		return new AsyncResultImpl<T, E>(
			promise.then(
				(v) => Result.ok(v),
				(e: E) => Result.err(e),
			),
		);
	}

	static ok<T>(value: T): AsyncOk<T> {
		return new AsyncResultImpl<T, never>(Promise.resolve(Result.ok(value)));
	}

	static err<E>(err: E): AsyncErr<E> {
		return new AsyncResultImpl<never, E>(Promise.resolve(Result.err(err)));
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

	async map<U>(fn: (value: T) => U): AsyncResultImpl<U, E> {
		const result: Result<T, E> = await this;
		return result.map(fn);
	}

	async mapErr<U>(fn: (err: E) => U): AsyncResult<T, U> {
		throw new Error("Method not implemented.");
	}

	async and<U>(res: AsyncResult<U, E>): AsyncResult<U, E> {
		throw new Error("Method not implemented.");
	}

	andThen<U>(fn: (value: T) => AsyncResult<U, E>): AsyncResult<U, E> {
		throw new Error("Method not implemented.");
	}

	or<F>(res: AsyncResult<T, F>): AsyncResult<T, F> {
		throw new Error("Method not implemented.");
	}

	orElse<F>(fn: (err: E) => AsyncResult<T, F>): AsyncResult<T, F> {
		throw new Error("Method not implemented.");
	}
}

export function asyncOk<T>(value: T) {
	// enforce Ok<T> since unwrapOr has a different return type
	return AsyncResult.ok(value);
}
export function asyncErr<E>(err: E) {
	return AsyncResult.err(err);
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AsyncResult = AsyncResultImpl as unknown as {
	ok<T>(value: T): AsyncOk<T>;
	err<E>(err: E): AsyncErr<E>;
};
