/* eslint-disable @typescript-eslint/no-shadow */

export interface BaseResult<T, E> {
	unwrapOr<U>(defaultValue: U): T | U;
	unwrapOrElse<U>(fn: (err: E) => U): T | U;
	map<U>(fn: (value: T) => U): Result<U, E>;
	mapErr<U>(fn: (err: E) => U): Result<T, U>;
	and<U>(res: Result<U, E>): Result<U, E>;
	andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E>;
	or<F>(res: Result<T, F>): Result<T, F>;
	orElse<F>(fn: (err: E) => Result<T, F>): Result<T, F>;
	isOk(): this is Ok<T>;
	isErr(): this is Err<E>;
	assertOk(): asserts this is Ok<T>;
	assertErr(): asserts this is Err<T>;
}

export interface Ok<T> extends BaseResult<T, never> {
	unwrap(): T;
}

export interface Err<E> extends BaseResult<never, E> {
	unwrapErr(): E;
}

export type Result<T, E> = Ok<T> | Err<E>;

class ResultImpl<T, E> implements BaseResult<T, E> {
	static ok<T>(value: T): Ok<T> {
		return new ResultImpl(true, value, undefined as never) as unknown as Ok<T>;
	}

	static err<E>(err: E): Err<E> {
		return new ResultImpl(false, undefined as never, err) as unknown as Err<E>;
	}

	constructor(
		// eslint-disable-next-line @typescript-eslint/no-shadow
		private readonly ok: boolean,
		private readonly value: T,
		// eslint-disable-next-line @typescript-eslint/no-shadow
		private readonly err: E,
	) {}

	assertOk(): asserts this is Ok<T> {
		if (!this.ok) {
			throw new Error("assertOk called on 'Err' variant");
		}
	}

	assertErr(): asserts this is Err<T> {
		if (this.ok) {
			throw new Error("assertErr called on 'Ok' variant");
		}
	}

	unwrap(): T {
		if (this.isOk()) {
			return this.value;
		}
		throw new Error("Called unwrap on an Err value");
	}

	unwrapErr(): E {
		if (this.isErr()) {
			return this.err;
		}
		throw new Error("Called unwrapErr on an Ok value");
	}

	unwrapOr<U>(defaultValue: U): T | U {
		if (this.isOk()) {
			return this.value;
		}
		return defaultValue;
	}

	unwrapOrElse<U>(fn: (err: E) => U): T | U {
		if (this.ok) {
			return this.value;
		}
		return fn(this.err);
	}

	map<U>(fn: (value: T) => U): Result<U, E> {
		if (this.isOk()) {
			return Result.ok(fn(this.value));
		}
		return this as unknown as Err<E>;
	}

	mapErr<U>(fn: (err: E) => U): Result<T, U> {
		if (this.isErr()) {
			return Result.err(fn(this.err));
		}
		return this as unknown as Ok<T>;
	}

	and<U>(res: Result<U, E>): Result<U, E> {
		if (this.ok) {
			return res;
		}
		return this as unknown as Err<E>;
	}

	andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
		if (this.isOk()) {
			return fn(this.value);
		}
		return this as unknown as Err<E>;
	}

	or<F>(res: Result<T, F>): Result<T, F> {
		if (this.isErr()) {
			return res;
		}
		return this as unknown as Ok<T>;
	}

	orElse<F>(fn: (err: E) => Result<T, F>): Result<T, F> {
		if (this.isErr()) {
			return fn(this.err);
		}
		return this as unknown as Ok<T>;
	}

	isOk(): this is Ok<T> {
		return this.ok;
	}

	isErr(): this is Err<E> {
		return !this.ok;
	}
}

/**
 * Creates a new `Ok` result.
 * @param value The value to wrap.
 */
export function ok<T>(value: T) {
	// enforce Ok<T> since unwrapOr has a different return type
	return ResultImpl.ok(value);
}

/**
 * Creates a new `Err` result.
 * @param err The error to wrap.
 */
export function err<E>(err: E): Err<E> {
	return ResultImpl.err(err);
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Result = ResultImpl as unknown as {
	/**
	 * Creates a new `Ok` result.
	 * @param value The value to wrap.
	 */
	ok<T>(value: T): Ok<T>;
	/**
	 * Creates a new `Err` result.
	 * @param err The error to wrap.
	 */
	err<E>(err: E): Err<E>;
};
