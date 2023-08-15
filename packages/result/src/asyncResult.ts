import { Err, Ok, Result } from "./result";

/**
 * A fancy wrapper around `Promise` enabling the use of `Result` methods on async operations.
 */
export interface AsyncResult<T, E> {
	/**
	 * Unwraps the result, yielding the content of an `Ok`, or a default value.
	 * @param defaultValue The default value to return if the result is an `Err`.
	 */
	unwrapOr<U>(defaultValue: U): Promise<T | U>;
	/**
	 * Unwraps the result, yielding the content of an `Ok`, or computes a default.
	 * @param fn A function that computes a default value. This function should not throw, otherwise
	 * you will escape the Result-handling monad.
	 */
	unwrapOrElse<U>(fn: (err: E) => U): Promise<T | U>;
	/**
	 * Maps a `Result<T, E>` to `Result<U, E>` by applying a function to a contained `Ok` value,
	 * leaving an `Err` value untouched.
	 * @param fn The function to apply to the contained `Ok` value. This function should not throw,
	 * otherwise you will escape the Result-handling monad.
	 */
	map<U>(fn: (value: T) => U): AsyncResult<U, E>;
	mapErr<U>(fn: (err: E) => U): AsyncResult<T, U>;
	and<U>(res: AsyncResult<U, E>): AsyncResult<U, E>;
	andThen<U>(fn: (value: T) => AsyncResult<U, E>): AsyncResult<U, E>;
	or<F>(res: AsyncResult<T, F>): AsyncResult<T, F>;
	orElse<F>(fn: (err: E) => AsyncResult<T, F>): AsyncResult<T, F>;

	promise(): Promise<Result<T, E>>;
}

class AsyncResultImpl<T, E> implements AsyncResult<T, E> {
	static fromRaw<T, E>(promise: Promise<T>): AsyncResult<T, E> {
		return new AsyncResultImpl<T, E>(
			promise.then(
				(v) => Result.ok(v),
				(e: E) => Result.err(e),
			),
		);
	}

	static fromInfallible<T, E>(result: Promise<Result<T, E>>) {
		return new AsyncResultImpl<T, E>(result);
	}

	private constructor(private readonly inner: Promise<Result<T, E>>) {}

	unwrapOr<U>(defaultValue: U): Promise<T | U> {
		return this.inner.then((result) => result.unwrapOr(defaultValue));
	}

	unwrapOrElse<U>(fn: (err: E) => U): Promise<T | U> {
		return this.inner.then((result) => result.unwrapOrElse(fn));
	}

	map<U>(fn: (value: T) => U): AsyncResultImpl<U, E> {
		console.log(this);
		return new AsyncResultImpl(this.inner.then((result) => result.map(fn)));
	}

	mapErr<U>(fn: (err: E) => U): AsyncResult<T, U> {
		return new AsyncResultImpl(this.inner.then((result) => result.mapErr(fn)));
	}

	and<U>(res: AsyncResult<U, E>): AsyncResult<U, E> {
		return new AsyncResultImpl(Promise.all([this.inner, res.promise()]).then(([a, b]) => a.and(b)));
	}

	andThen<U>(fn: (value: T) => AsyncResult<U, E>): AsyncResult<U, E> {
		return new AsyncResultImpl(
			this.inner.then(async (result) => {
				if (result.isOk()) {
					return fn(result.unwrap()).promise();
				}
				return Promise.resolve(result as Err<E>);
			}),
		);
	}

	or<F>(res: AsyncResult<T, F>): AsyncResult<T, F> {
		return new AsyncResultImpl(Promise.all([this.inner, res.promise()]).then(([a, b]) => a.or(b)));
	}

	orElse<F>(fn: (err: E) => AsyncResult<T, F>): AsyncResult<T, F> {
		return new AsyncResultImpl(
			this.inner.then((result) => {
				if (result.isErr()) {
					return fn(result.unwrapErr()).promise();
				}
				return Promise.resolve(result as Ok<T>);
			}),
		);
	}

	/**
	 * Unwraps the inner promise. This promise is guaranteed to never reject.
	 * @returns
	 */
	promise() {
		return this.inner;
	}
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AsyncResult = AsyncResultImpl as {
	/**
	 * Creates a new `AsyncResult` from a `Promise`. This method adds a layer of indirection preventing
	 * rejection of the promise from escaping the `AsyncResult` monad.
	 */
	fromRaw<T, E>(promise: Promise<T>): AsyncResult<T, E>;
	/**
	 * Creates a new `AsyncResult` from a `Promise<Result<T, E>>`. Unlike `fromRaw`, this method assumes
	 * that the promise will never be rejected.
	 * @param result
	 */
	fromInfallible<T, E>(result: Promise<Result<T, E>>): AsyncResult<T, E>;
};
