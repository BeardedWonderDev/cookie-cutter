# Repository Guidelines

This guide summarizes how to contribute safely to `@boiseitguru/cookie-cutter`, a minimal cookie helper kept ES5-friendly for legacy browser bundles.

## Project Structure & Module Organization
- `index.js` is the single runtime entry point; keep it dependency-free and compatible with both Browserify and Node shims.
- `@types/cookie-cutter.d.ts` exports the public API for TypeScript consumers. Update option flags here whenever `index.js` changes.
- `example/getset` is a scratchpad for manual experiments—feel free to drop short scripts there, but leave it out of the published package.

## Build, Test, and Development Commands
- `npm install` installs local dev tools (none by default, but required for optional type checks or test runners you add).
- `node -e "const cookie=require('./index');console.log(cookie.set('demo','1'))"` is the quickest sanity check without a browser.
- `npm pack --dry-run` validates that only the intended files (`index.js`, `@types/`, `LICENSE`, `README.md`) ship with the tarball.

## Coding Style & Naming Conventions
- Follow the existing ES5 style: two-space indentation, `var` declarations, double-quoted strings, and explicit semicolons to preserve compatibility.
- Keep function signatures stable (`cookie(document?)`, `.get(key)`, `.set(key,value,opts)`), and document new `opts` keys in both JS and the `.d.ts`.
- Prefer descriptive names for new helpers (e.g., `serializeOptions`) and avoid introducing abstractions that leak DOM-specific objects.

## Testing Guidelines
- There is no built-in test suite; add targeted checks alongside your change (Tape, Ava, or Jest all bundle cleanly).
- When reproducing cookie behavior, run a quick stub document in place:\
  `node - <<'EOF'\nconst cookie=require('./index')( { cookie:'' } );\nconsole.log(cookie.set('user','abc',{ path:'/' }));\nconsole.log(cookie.get('user'));\nEOF`
- For TypeScript validation, install `typescript` locally and run `npx tsc --noEmit --skipLibCheck --allowJs index.js` to ensure declarations remain in sync.

## Commit & Pull Request Guidelines
- Follow the conventional form seen in the log (`feat(Set-Cookie):`, `fix:`), optionally retaining emoji markers if they add clarity.
- Each PR should describe behavior changes, list manual verification steps, and mention any documentation or type definition updates.
- Link related issues, request at least one reviewer, and attach screenshots or console transcripts when demonstrating cookie mutations in the browser.

## Release & Compatibility Tips
- Verify new options against modern browsers plus IE11-compatible shims before publishing.
- Bump the version with `npm version <patch|minor>` only after README and type definitions reflect the change, then run `npm publish --dry-run` for a final check.
