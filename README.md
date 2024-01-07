## Description

This is a tool for collect killmails from Zkillboard.

## Getting started

### Install dependencies

```bash
$ npm install
```
### And build and start

```bash
$ npm run build
$ npm run exec
```

## How to use

When server will start you need send POST request

```javascript
// URL http://localhost:2001/kills/systems
// with body
{
  systemIds: number[]
}

// connections example
const AMARR = 30002187;
const J212812 = 31001180;
{
    systemIds: [AMARR, J212812]
}
```

## License

[MIT licensed](LICENSE).
