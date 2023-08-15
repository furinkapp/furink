# @furinkapp/result

Fancy error handling for your functions, sync and async alike!

## Usage

```ts
import { Result, ok, err } from "@furinkapp/result";

function divide(a: number, b: number): Result<number, string> {
	if (b === 0) {
		return err("Cannot divide by zero");
	}

	return ok(a / b);
}

const result = divide(10, 2).map((n) => n * 2);
if (result.isOk()) {
	console.log(result.unwrap()); // 10
} else {
	console.error(result.unwrapErr()); // Cannot divide by zero
}
```

### Async

```ts
import { Result, ok, err } from "@furinkapp/result";

async function divide(a: number, b: number): Promise<Result<number, string>> {
	if (b === 0) {
		return err("Cannot divide by zero");
	}

	return ok(a / b);
}

const result = await AsyncResult.from(divide(10, 2)).map((n) => n * 2);

if (result.isOk()) {
	console.log(result.unwrap()); // 10
} else {
	console.error(result.unwrapErr()); // Cannot divide by zero
}
```
