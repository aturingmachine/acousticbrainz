# Acousticbrainz

Package for interacting with the [Acousticbrainz API](https://similarity.acousticbrainz.org/data).

## Installation

```sh
npm i acousticbrainz
```

## Usage

### Typescript
```typescript
import { AcousticBrainz } from 'acousticbrainz'

const ab = new AcousticBrainz()
```

### JavaScript
```javascript
const { AcousticBrainz } = require('acousticbrainz')

const ab = new AcousticBrainz()
```

## Config Options

The constructor takes an optional configuration object:

```javascript
{
  // Your AcousticBrainz API Key. Optional - May increase rate limits
  apiKey: '',
  // If true acousticbrainz will throw an error if it believes it has hit the rate limit
  errorOnRateLimit: false,
  // If true disable all rate limit checks
  disableRateLimitCheck: false,
}
```

## Rate Limiting

AcousticBrainz's API implements rate limiting which is communicated via headers on the API responses. This library attempts to mitigate rejected API calls caused by rate limiting by waiting until the rate limit has refreshed if it believes it has exceeded the rate limit. This is mostly untested and can be disabled via the `disableRateLimitCheck` configuration option.