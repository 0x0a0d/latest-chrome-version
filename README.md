# latestChromeVersion

A function that retrieves the latest version of Google Chrome for a given platform and operating system version.

```typescript
import { latestChromeVersion } from 'chrome-version';

latestChromeVersion('mac', '10.15').then((version) => {
console.log(`Latest version of Chrome for macOS 10.15 is ${version}`);
}).catch((err) => {
console.error(`Error retrieving latest Chrome version: ${err}`);
});
```

## API

`latestChromeVersion(platform: 'mac' | 'win' = 'mac', os_version?: string): Promise<string>`

Returns a Promise that resolves to the latest version of Google Chrome for the specified platform and operating system version. The `platform` parameter is optional and defaults to `'mac'`. The `os_version` parameter is optional and should be specified as a string in the format `'major.minor.patch'`.

If the latest version of Chrome cannot be retrieved, the Promise will be rejected with an error message.

```typescript
import { latestChromeVersion } from 'chrome-version';

latestChromeVersion('win', '10.0.19042').then((version) => {
console.log(`Latest version of Chrome for Windows 10.0.19042 is ${version}`);
}).catch((err) => {
console.error(`Error retrieving latest Chrome version: ${err}`);
});
```

## License

This project is licensed under the MIT License

### Author
0x0a0d
