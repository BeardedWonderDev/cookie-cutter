# cookie-cutter

[![npm version](https://img.shields.io/npm/v/%40boiseitguru/cookie-cutter.svg)](https://www.npmjs.com/package/@boiseitguru/cookie-cutter)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@boiseitguru/cookie-cutter.svg)](https://bundlephobia.com/package/@boiseitguru/cookie-cutter)

Tiny, dependency-free helper for reading and writing cookies in browsers or any environment that exposes a `document`-style interface.

## Table of Contents
- [Features](#features)
- [Release Highlights (0.3.x)](#release-highlights-03x)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Cookie Options](#cookie-options)
- [Examples](#examples)
- [TypeScript](#typescript)
- [Testing](#testing)
- [Contributing](#contributing)
- [Project Origins & Credits](#project-origins--credits)
- [License](#license)

## Features
- Zero runtime dependencies and ES5-friendly source so it bundles cleanly with legacy toolchains.
- Works in browsers, Browserify-style bundles, and Node.js when you provide a document stub.
- Built-in TypeScript declarations with the same API shape as the JavaScript module.
- Partitioned CHIPS attribute support plus SameSite guardrails to keep you aligned with current browser requirements.

## Release Highlights (0.3.x)
- Adds the `partitioned` attribute so cookies can opt into CHIPS while matching Mozilla’s Set-Cookie guidance.
- Warns when `SameSite: "None"` is paired without `secure: true` and provides `cookie.configure({ suppressInsecureSameSiteNoneWarning: true })` to silence the warning in local HTTP setups.
- Introduces a top-level `cookie.clear` helper (including TypeScript declarations) and guarantees deletes force `Max-Age=0`.
- Extends serialization to cover `HttpOnly`, `Max-Age`, and `SameSite` attributes so emitted cookies reflect modern browser expectations.

## Installation

```sh
npm install @boiseitguru/cookie-cutter
```

## Quick Start

```javascript
// CommonJS
var cookie = require("@boiseitguru/cookie-cutter");

var visits = parseInt(cookie.get("visits"), 10) || 0;
cookie.set("visits", visits + 1, { path: "/" });
```

```javascript
// ES Modules (modern bundlers)
import cookie from "@boiseitguru/cookie-cutter";

const visits = Number(cookie.get("visits") || 0) + 1;
cookie.set("visits", String(visits), { path: "/" });
```

## API Reference

### `cookie(document?: Document | string)`
Creates a cookie controller bound to the supplied document or cookie string. If no argument is given, an empty cookie jar is created.
When you import/require the module in a browser, the default export is already
bound to the global `document`, so you can call `cookie.get`, `cookie.set`,
and `cookie.clear` directly as shown in the Quick Start.

### `cookie.get(key: string): string | undefined`
Returns the value stored for `key`, or `undefined` if the cookie is not set.

### `cookie.set(key: string, value: string, options?: CookieOptions): string`
Serializes `key=value` with any supplied cookie attributes, assigns it to `document.cookie`, and returns the serialized string. When `options.SameSite === "None"` and `options.secure` is not `true`, a warning is printed to `console.warn` to anticipate upcoming enforcement. Setting `options.partitioned === true` appends the `Partitioned` attribute.

### `cookie.clear(key: string, options?: CookieOptions): string`
Clears the cookie for `key` by delegating to `set` with an expiry in the past and `Max-Age = 0`. Pass the same options you used when setting the cookie (such as `path` or `domain`) so the browser targets the correct cookie.

### `cookie.configure(options: CookieConfig): void`
Adjusts global defaults for future cookie operations, such as silencing SameSite warnings during local development.

```typescript
type CookieConfig = {
  suppressInsecureSameSiteNoneWarning?: boolean;
};
```

- `suppressInsecureSameSiteNoneWarning`: When `true`, disables the warning emitted by `cookie.set` for `SameSite: "None"` cookies missing the `secure` flag. Useful for non-production development over HTTP.

## Cookie Options

| Option      | Type             | Description                                                                                          |
|-------------|------------------|------------------------------------------------------------------------------------------------------|
| `expires`   | `Date`           | Sets the cookie expiry date.                                                                         |
| `path`      | `string`         | Restricts the cookie to a particular path.                                                           |
| `domain`    | `string`         | Restricts the cookie to a particular domain.                                                         |
| `secure`    | `boolean`        | Marks the cookie as secure-only. Required by browsers when `SameSite` is `"None"`.                   |
| `HttpOnly`  | `boolean`        | Adds the `HttpOnly` attribute.                                                                       |
| `MaxAge`    | `number`         | Sets the cookie lifetime (in seconds) via `Max-Age`.                                                 |
| `SameSite`  | `"Strict" \| "Lax" \| "None"` | Controls cross-site cookie behavior.                                                     |
| `partitioned` | `boolean`     | Appends the `Partitioned` attribute for CHIPS storage (requires `secure: true` in supporting browsers). |

## Examples

### Partitioned SameSite=None Cookie

```javascript
var cookie = require("@boiseitguru/cookie-cutter");
var api = cookie(document);

api.set("session", "abc123", {
  secure: true,
  SameSite: "None",
  partitioned: true
});
```

This combination satisfies current Mozilla Set-Cookie expectations for partitioned cookies.

### Suppressing Warnings During Local Development

```javascript
var cookie = require("@boiseitguru/cookie-cutter");

cookie.configure({ suppressInsecureSameSiteNoneWarning: true });
var api = cookie({ cookie: "" });

api.set("token", "dev-only", { SameSite: "None" });
```

## TypeScript

Type definitions ship with the package. Import the module using either default or CommonJS syntax and enjoy auto-complete for cookie options, including `partitioned` and `SameSite`.

```typescript
import cookie = require("@boiseitguru/cookie-cutter");

const api = cookie();
api.set("theme", "dark", { SameSite: "Lax", MaxAge: 300 });
```

## Testing

Run the Tape test suite:

```sh
npm test
```

## Contributing
- Keep the ES5 coding style: two-space indentation, `var` declarations, double-quoted strings, and explicit semicolons.
- Update TypeScript declarations whenever the runtime API changes.
- Add focused tests alongside functional changes so behavior stays locked down.

## Project Origins & Credits

This repository preserves the original cookie-cutter module by James Halliday (substack) to ensure ongoing availability, with TypeScript support and modern cookie attribute updates maintained here.

## License

MIT. See the [LICENSE](./LICENSE) file for details.
