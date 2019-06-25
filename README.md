<div align="center" markdown="1">

<img src="./src/img/lucena.png" alt="lucena position" width="200">
<img src="./src/img/carlsenWorldChampionship2016.png" alt="Carlsen 2016 Championship" width="200">
<img src="./src/img/sicilian.png" alt="sicilian defense" width="200">

**A chess Engine built on top of [chessboardjsx](https://github.com/willb335/chessboardjsx)**

</div>

# About Engine

This chess engine uses alpha-beta pruning algorithm to search for best moves

The evaluation engine calculates position based on a few Heuristics
    1. Total Piece Values
    2. Piece Positions (ie. pawns are more valuable futher down the board since they can promote)
        a. Early game positions
        b. Mid game positions
        c. Late game positions

## To Try out the chess engine

```
git clone git@github.com:saixiao/ChessEngine.git

npm install

npm start
```

## Contributors

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/10157307?v=4" width="100px;"/><br /><sub><b>Will</b></sub>](https://github.com/willb335)<br />[💻](https://github.com/willb335/chessboardjsx/commits?author=willb335 "Code") [📖](https://github.com/willb335/chessboardjsx/commits?author=willb335 "Documentation") [💡](#example-willb335 "Examples") [⚠️](https://github.com/willb335/chessboardjsx/commits?author=willb335 "Tests") | [<img src="https://avatars3.githubusercontent.com/u/146082?v=4" width="100px;"/><br /><sub><b>Andrew Bashelor</b></sub>](https://github.com/a-bash)<br />[📖](https://github.com/willb335/chessboardjsx/commits?author=a-bash "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/25490975?v=4" width="100px;"/><br /><sub><b>yougotgotyo</b></sub>](https://chadburg.com/)<br />[🤔](#ideas-yougotgotyo "Ideas, Planning, & Feedback") | [<img src="https://avatars0.githubusercontent.com/u/385366?v=4" width="100px;"/><br /><sub><b>Roger Knapp</b></sub>](http://csharptest.net)<br />[🤔](#ideas-csharptest "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/37779?v=4" width="100px;"/><br /><sub><b>Tiago Serafim</b></sub>](https://github.com/slig)<br />[💻](https://github.com/willb335/chessboardjsx/commits?author=slig "Code") [📖](https://github.com/willb335/chessboardjsx/commits?author=slig "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/536006?v=4" width="100px;"/><br /><sub><b>Kef Schecter</b></sub>](http://www.furrykef.com/)<br />[🐛](https://github.com/willb335/chessboardjsx/issues?q=author%3Afurrykef "Bug reports") | [<img src="https://avatars0.githubusercontent.com/u/42919?v=4" width="100px;"/><br /><sub><b>Nils-Helge Garli Hegvik</b></sub>](http://www.lånekalkulatoren.no)<br />[💻](https://github.com/willb335/chessboardjsx/commits?author=nilsga "Code") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars1.githubusercontent.com/u/10798199?v=4" width="100px;"/><br /><sub><b>Levi Durfee</b></sub>](https://levi.lol/)<br />[💻](https://github.com/willb335/chessboardjsx/commits?author=levidurfee "Code") [📖](https://github.com/willb335/chessboardjsx/commits?author=levidurfee "Documentation") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

## LICENSE

MIT

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/travis/willb335/chessboardjsx.svg?style=flat-square
[build]: https://travis-ci.org/willb335/chessboardjsx
[coverage-badge]: https://img.shields.io/codecov/c/github/willb335/chessboardjsx.svg?style=flat-square
[coverage]: https://codecov.io/github/willb335/chessboardjsx
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[version-badge]: https://img.shields.io/npm/v/chessboardjsx.svg?style=flat-square
[package]: https://www.npmjs.com/package/chessboardjsx
[license-badge]: https://img.shields.io/npm/l/chessboardjsx.svg?style=flat-square
[license]: https://github.com/willb335/chessboardjsx/blob/master/LICENSE
[commitzen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitzen]: http://commitizen.github.io/cz-cli/
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release]: https://github.com/semantic-release/semantic-release
