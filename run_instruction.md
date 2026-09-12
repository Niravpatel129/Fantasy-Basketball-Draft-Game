# Build and Run Instructions

## Prerequisites

- Node.js 10.15.3 or a compatible Node 10 environment (this is a legacy project)
- npm 6.5+ and Yarn Classic
- MongoDB and any application environment variables used by the server/client

## Install

```bash
git clone https://github.com/Niravpatel129/Fantasy-Basketball-Draft-Game.git
cd Fantasy-Basketball-Draft-Game
yarn install
cd client
yarn install
cd ..
```

Configure the required environment values before starting the application.

## Run in development

```bash
yarn dev
```

This starts the Node server and the client development server together.

You can also run them separately:

```bash
yarn server
yarn client
```

## Build the client

```bash
cd client
npm run build
```

The client `build` command runs the repository's production release pipeline.

## Run the server

From the repository root:

```bash
npm start
```

Because the dependency stack is from an older Node ecosystem, use the declared legacy runtime if native dependencies fail on modern Node versions.