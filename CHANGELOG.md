# Changelog

All **notable changes** to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Each log entry can be in the following kind: **Added**[^1], **Changed**[^2], **Deprecated**[^3], **Removed**[^4], **Fixed**[^5] and **Security**[^6]

## [Unreleased]

### Added

- Gracefully stop database
- `/joke` command to tell a [dad joke](https://icanhazdadjoke.com/api)

## [0.2.0] - 2021-11-04

### Added

- reply with random laugh (same behavior as `/laugh` command) for @robosoltoriso mention

#### Commands

RisoSolto has some commands to send laughs, they can be images, text, emoji and so on. the following commands is provided:

- `/laugh` - random laugh of any of kind
- `/image` - random people smiling
- `/emoji` - emoji with optional numeric argument
- `/text` - text kind laugh with optional numeric argument
- `/start` - send a helper explaining its functionalities
- `/help` - alias for `/start`

### Removed

- automatic reply in private chat

## [0.1.0] - 2021-11-04

### Added

- Reply for mention @risosoltobot and in private chat

[unreleased]: https://github.com/pherval/riso-solto-bot/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/pherval/riso-solto-bot/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/pherval/riso-solto-bot/releases/tag/v0.1.0

[^1]: `Added` for new features.
[^2]: `Changed` for changes in existing functionality.
[^3]: `Deprecated` for soon-to-be removed features.
[^4]: `Removed` for now removed features.
[^5]: `Fixed` for any bug fixes.
[^6]: `Security` in case of vulnerabilities.
