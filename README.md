# latest-chrome-version

[![npm version](https://img.shields.io/npm/v/latest-chrome-version.svg?style=flat-square)](https://www.npmjs.com/package/latest-chrome-version)
[![install size](https://img.shields.io/badge/dynamic/json?label=install%20size&query=%24.installSize&url=https%3A%2F%2Fpackagephobia.com%2Fv2%2Fapi.json%3Fp%3Dlatest-chrome-version&style=flat-square)](https://packagephobia.com/result?p=latest-chrome-version)
[![npm downloads](https://img.shields.io/npm/dm/latest-chrome-version.svg?style=flat-square)](https://www.npmjs.com/package/latest-chrome-version)
[![license](https://img.shields.io/npm/l/latest-chrome-version.svg?style=flat-square)](https://github.com/0x0a0d/latest-chrome-version/blob/main/LICENSE)

A lightweight library to fetch the latest Google Chrome version from the official [Chrome for Testing API](https://googlechromelabs.github.io/chrome-for-testing/).

## Installation

```bash
npm install latest-chrome-version
# or
yarn add latest-chrome-version
# or
pnpm add latest-chrome-version
```

## Usage

```typescript
import { latestChromeVersion } from 'latest-chrome-version';

async function checkVersion() {
  try {
    const version = await latestChromeVersion();
    console.log(`Latest Stable Chrome version: ${version}`);
  } catch (err) {
    console.error('Error fetching Chrome version:', err);
  }
}

checkVersion();
```

## API

### `latestChromeVersion(): Promise<string>`

Returns a `Promise` that resolves to the latest Stable Google Chrome version string (e.g., `121.0.6167.85`).

Data is fetched directly from Google Chrome Labs' reliable source.

## License

This project is licensed under the [ISC License](LICENSE).

### Author
[0x0a0d](https://github.com/0x0a0d)
