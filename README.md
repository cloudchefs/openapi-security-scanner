<p align="center">
    <img alt="logo" src="https://raw.githubusercontent.com/cloudchefs/openapi-security-scanner/master/img/logo2.png" width="320">
</p>

<p align="center">
  Identify vulnerabilities in your API's using the OpenAPI Security Scanner
</p>

---

[![JavaScript Style Guide][standard-badge]][standard-url]
[![Build Status][travis-badge]][travis-url]

## Table of contents

- [Table of contents](#table-of-contents)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Modules](#modules)

## Getting Started

```
$ npm install -g @openapi-security-scanner/cli
$ npx @openapi-security-scanner/cli
```

## Usage

The scan command uses your OpenAPI definition, provided hostname and optional
headers to start fuzzing your API.

```
npx @openapi-security-scanner/cli scan \
    --api-definition api.yaml \
    --host api.example.com \
    --headers "Cookie: ..."
```

## Modules

| Package                                                                     | Description                                                                     |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [@openapi-security-scanner/cli](./packages/cli)                             | Scan your API's in your CI/CD pipeline or from your local machine using the CLI |
| [@openapi-security-scanner/fuzzers](./packages/fuzzers)                     | Collections of payloads that can be used for fuzzing                            |
| [@openapi-security-scanner/request-generator](./packages/request-generator) | Generate Postman collections and data sets for fuzzing your API                 |
| [@openapi-security-scanner/util](./packages/util)                           | Utility functions for deduplicating shared logic                                |

[standard-url]: http://standardjs.com/
[standard-badge]:
  https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[travis-url]: https://travis-ci.org/cloudchefs/openapi-security-scanner
[travis-badge]:
  https://travis-ci.org/cloudchefs/openapi-security-scanner.svg?branch=master
