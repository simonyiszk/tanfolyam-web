# Simonyi tanfolyamhirdető weboldal

[![Netlify Status](https://api.netlify.com/api/v1/badges/f0dd63bd-e94a-4c9c-bd0b-6663a04a2b97/deploy-status)](https://tanfolyam.netlify.com/)
[![Build status](https://img.shields.io/travis/simonyiszk/tanfolyam-web/master.svg)](https://travis-ci.org/simonyiszk/tanfolyam-web)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A Simonyi Károly Szakkollégium tanfolyamhirdető weboldala.

## Build

A weboldal statikusan kiszolgálható változatának elkészítéséhez az alábbi fejlesztői eszközök szükségesek:

- [Node.js][]
- [Yarn][]

A projekt főkönyvtárában a függőségek telepítését (`yarn`) követően a `yarn build` parancs kiadására létrejön egy `public` mappa, melynek tartalma egy statikus fájlszerveren keresztül osztható meg a weboldal látogatóival.

[node.js]: https://nodejs.org
[yarn]: https://yarnpkg.com
