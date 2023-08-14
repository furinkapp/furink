/* eslint-disable @typescript-eslint/no-shadow */

export interface Result<T, E> {
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
}

export interface Ok<T> extends Result<T, never> {
	unwrap(): T;
	unwrapErr(): never;

	// overrides
	unwrapOr(defaultValue: unknown): T;
	unwrapOrElse(fn: (err: never) => unknown): T;
	map<U>(fn: (value: T) => U): Ok<U>;
	mapErr<U>(fn: (err: never) => U): this;
	and<U, E>(res: Result<U, E>): Result<U, E>;
	andThen<U, E>(fn: (value: T) => Result<U, E>): Result<U, E>;
	or<F>(res: Result<T, F>): this;
	orElse<F>(fn: (err: never) => Result<T, F>): this;
}

export interface Err<E> extends Result<never, E> {
	unwrap(): never;
	unwrapErr(): E;

	// overrides
	unwrapOr<U>(defaultValue: U): U;
	unwrapOrElse<U>(fn: (err: E) => U): U;
	map<U>(fn: (value: never) => U): this;
	mapErr<U>(fn: (err: E) => U): Err<U>;
	and<U>(res: Result<U, E>): this;
	andThen<U>(fn: (value: never) => Result<U, E>): this;
	or<T, F>(res: Result<T, F>): Result<T, F>;
	orElse<T, F>(fn: (err: E) => Result<T, F>): Result<T, F>;
}

class ResultImpl<T, E> implements Result<T, E> {
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

export function ok<T>(value: T) {
	// enforce Ok<T> since unwrapOr has a different return type
	return ResultImpl.ok(value);
}
export function err<E>(err: E): Err<E> {
	return ResultImpl.err(err);
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Result = ResultImpl as unknown as {
	ok<T>(value: T): Ok<T>;
	err<E>(err: E): Err<E>;
};
