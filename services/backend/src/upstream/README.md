# Upstream

The `upstream` module contains services that are used by the backend to communicate with other, external services that are not part of the backend itself.

## Services

The module currenty provides the following services:

- `SentryService`: A service that is used to communicate with the Sentry error tracking service.
- `StripeService`: A service that is used to communicate with the Stripe payment service.
- `TypesenseService`: A service that is used to communicate with the Typesense search engine.

## Interceptors

The module also provides the `SentryInterceptor` that is used to intercept errors and automatically send them to Sentry. This should be used on all controllers where possible.
