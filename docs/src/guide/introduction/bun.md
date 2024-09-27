# Bun vs Node

We are using [Bun](https://bun.sh/) to develop, test, run, and bundle JavaScript & TypeScript projects. Bun is an all-in-one JavaScript runtime & toolkit designed for speed, complete with a bundler, test runner, and Node.js-compatible package manager.

## Install dependencies

The `--frozen-lock` flag ensures that Bun will not update the lockfile (bun.lockb). This is useful for maintaining consistency across different environments, especially in production, by ensuring that the exact versions of dependencies are used as specified in the lockfile.

```sh
bun install --frozen-lock
```

## Update dependencies

npm-check-updates upgrades your package.json dependencies to the latest versions.

```sh
bun x npm-check-updates -ui
```