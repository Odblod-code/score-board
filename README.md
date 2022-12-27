## Introduction
This a library destinated for a Football wordcup board.
In this library you can find three utilities:

- FootballBoard
FooballBoard will create a table with a list of matches with time, teams, score and status.
In this case, the list is not dynamic, inside the code there is a functions that controls the results of the match depending the possition. Having this in mind, I recomend you to stick to the example parameter "footballBoard". 

First element in array will be the header, next elements will be the data inside the table.
```jsx
import React, { Component } from 'react'

import FootballBoard from 'score-board'

class Example extends Component {
  render() {
    return <FootballBoard footballBoard={[
    ["Time", "Home Team", "Away Team", "Score", "Status"],
    ["18:00", "Mexico", "Canada", '', status[0]],
    ["19:00", "Spain", "Brazil", '', status[0]],
    ["0'", "Germany", "France", '0-0', status[1]],
    ["17:00", "Uruguay", "Italy", '', status[0]],
    ["Halftime", "Argentina", "Australia", "2-0", status[2]]
  ]}/>
  }
}
```
- Board
Board will create a table with a list of elements by param boardData.

First element in array will be the header, next elements will be the data inside the table.
```jsx
import React, { Component } from 'react'

import Board from 'score-board'

class Example extends Component {
  render() {
    return <Board boardData={[
    ['Player', 'Nationalities', 'FIFA Golden Ball'],
    ['Messi', 'Argentina', '5'],
    ['Mbappe', 'France', '0']
  ]}/>
  }
}
```
- Status
Array with all the status for the match, this constant value will bring the following array:
  status = ['Not Started', '1st half', 'Halftime', '2nd half', 'Ended']
# score-board

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/score-board.svg)](https://www.npmjs.com/package/score-board) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install
This library is made in Javascript, if you're using Typescript wont work.
Also React version for this library is 18 or upper.

```bash
npm i https://github.com/Odblod-code/score-board 
```

## License

MIT © [Odblod-code](https://github.com/Odblod-code)
