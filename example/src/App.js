import React from 'react'

import { FootballBoard } from 'score-board'
import 'score-board/dist/index.css'

const App = () => {
  return <FootballBoard footballBoard={[
    ["Time", "Home Team", "Away Team", "Score", "Status"],
    ["18:00", "Mexico", "Canada", '', status[0]],
    ["19:00", "Spain", "Brazil", '', status[0]],
    ["0'", "Germany", "France", '0-0', status[1]],
    ["17:00", "Uruguay", "Italy", '', status[0]],
    ["Halftime", "Argentina", "Australia", "2-0", status[2]]
  ]} />
}

export default App
