# Changelog

## [1.1.1] - 2025-03-09

### Fixed
- Updated dist files with latest TypeScript definitions

## [1.1.0] - 2025-03-09

### Added
- Support for boolean object modifiers (`bem('element', { mod1: true, mod2: false })`)
- Automatic client-side detection for memoization
- Custom separator configuration via `createBemHook`
- Exported `BemFunction` type for better TypeScript support

### Fixed
- Server-side rendering compatibility with Next.js by removing client-only hooks
- Improved TypeScript configuration with ES2017 support

## [1.0.0] - 2024-07-13

### Added
- Initial release
- Basic BEM class name generation
- Support for elements and modifiers
- TypeScript support 