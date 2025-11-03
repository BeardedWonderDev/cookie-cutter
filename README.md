# cookie-cutter

> This is a clone of the orginal cookie-cutter npm package, at some point substack deleeted their GitHub and I was worried about the package continuing to be available. All code was copied directly from the npm package and thus far the only modification has been adding TypeScript support.

> All credit for this package goes to it's orginal author James Halliday/Substack and any contributors who have contributed.

Set and get cookies in the browser or in node with `document`.

In your browser code with [browserify](http://github.com/substack/node-browserify):

```javascript
var cookie = require("@boiseitguru/cookie-cutter");
var times = parseInt(cookie.get("times"), 10) || 0;
cookie.set("times", times + 1);
```

and `times` will increment every time the page is reloaded.

## methods

```javascript
var cookie = require("@boiseitguru/cookie-cutter");
```

### cookie(document)

Return a new cookie object with `.get()` and `.set()` operating on `document`.

`document.cookie` should be a non-referentially transparent setter/getter combo
like the DOM's variant where assignment with optional path and expiry creates a
new cookie in the getter as a key=value pair.

### cookie.get(key)

Return the cookie value for `key`.

## cookie.set(key, value, opts={})

Set the cookie at `key` to `value` with optional parameters `expires` and `path`.

To unset a cookie, use a date in the past, ex: `{ expires: new Date(0) }`

## cookie.clear(key, opts={})

Clear the cookie at `key` by setting an expiry date in the past. Pass the same
`opts` you used to set the cookie (like `path` or `domain`) so the browser
targets the correct cookie.

```javascript
var cookie = require("@boiseitguru/cookie-cutter");
cookie.clear("times", { path: "/" });
```

## examples

### modern bundlers

```javascript
// vite / webpack / rollup
import cookie from "@boiseitguru/cookie-cutter";

const api = cookie();
api.set("theme", "dark", { SameSite: "Lax" });
```

### typescript

```typescript
import cookie = require("@boiseitguru/cookie-cutter");

const api = cookie(document);
api.set("token", "xyz", { HttpOnly: true, MaxAge: 60 });
api.clear("token", { path: "/" });
```

## install

With [npm](http://npmjs.org) do:

```sh
npm install @boiseitguru/cookie-cutter
```

## license

MIT/X11
