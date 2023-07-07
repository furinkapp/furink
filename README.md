# furink

An artist commissioning and payment platform.

## Features

TODO

## Overview

This repository contains all of fur.ink's frontend applications, including the web app and mobile app. The web app is built with [Next](https://nextjs.org) and the mobile app is built with [Tauri](https://tauri.studio).

The backend code is currently not open source, but access to the API will be provided once it is ready.

## Contributing

Contributions are welcome! For the contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

### Prerequisites

For all projects, you will need the following:

- [Docker](https://docs.docker.com/get-docker/)
- [Node](https://nodejs.org/en/download/)
- [PNPM](https://pnpm.io/installation)
- [Rust](https://www.rust-lang.org/tools/install)
- [Turbo](https://turbo.build)

For developing the mobile app, you'll also need all of [Tauri v2's prerequisites](https://next--tauri.netlify.app/next/guides/getting-started/prerequisites). There is specific setup for both Android and iOS, but due to Apple's restrictions, you'll need a Mac to build the iOS app.

### Setup

1. Clone the repository.
2. Run `pnpm install` to install the dependencies.

### Development

#### Web

To start the web app in development mode, run `pnpm dev` in its directory. This will start a development server on port 3000.

#### Mobile

To start the mobile app in development mode, run `pnpm dev` in its directory. This will start a development server on port 3000.

For previewing the app on an Android device, run `pnpm tauri android dev` in the mobile app's directory. This will start the development server and open the app in an Android emulator or on a connected device.

For previewing the app on an iOS device, run `pnpm tauri ios dev` in the mobile app's directory. This will start the development server and open the app in an iOS simulator or on a connected device.

## License

This project is licensed under a dual license of the MIT License and the Apache License 2.0. You may choose either of these licenses at your discretion. See [LICENSE-MIT](LICENSE-MIT) and [LICENSE-APACHE-2.0](LICENSE-APACHE-2.0) for details.
