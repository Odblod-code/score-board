import { act, render, screen, within } from "@testing-library/react";
import React from 'react';
import { status } from "../..";

import { FootballBoard } from "../FootballBoard";

const footballWordCupScoreBoard = [
  ["Time", "Home Team", "Away Team", "Score", "Status"],
  ["18:00", "Mexico", "Canada", '', status[0]],
  ["19:00", "Spain", "Brazil", '', status[0]],
  ["0'", "Germany", "France", '0-0', status[1]],
  ["17:00", "Uruguay", "Italy", '', status[0]],
  ["Halftime", "Argentina", "Australia", "2-0", status[2]]
];

describe("Board", () => {
  it('renders correctly', () => {
    render(<FootballBoard footballBoard={footballWordCupScoreBoard}/>);

    const header = screen.getByRole("row", {
      name: "Time Home Team Away Team Score Status"
    });
    expect(header).toBeInTheDocument();
    
    const match1 = screen.getByRole("row", {
      name: "18:00 Mexico Canada Not Started"
    });
    expect(match1).toBeInTheDocument();
    
    const match2 = screen.getByRole("row", {
      name: "19:00 Spain Brazil Not Started"
    });
    expect(match2).toBeInTheDocument();
    
    const match3 = screen.getByRole("row", {
      name: "0' Germany France 0-0 1st half"
    });
    expect(match3).toBeInTheDocument();
    
    const match4 = screen.getByRole("row", {
      name: "17:00 Uruguay Italy Not Started"
    });
    expect(match4).toBeInTheDocument();
    
    const match5 = screen.getByRole("row", {
      name: "Halftime Argentina Australia 2-0 Halftime"
    });
    expect(match5).toBeInTheDocument();
  });

  it('match logic works', async () => {
    jest.useFakeTimers();
    render(<FootballBoard footballBoard={footballWordCupScoreBoard}/>);
    
    act(() => {
      jest.advanceTimersByTime(30000);
    })
    const match1 = screen.getByText("3-1");
    expect(match1).toBeInTheDocument();
    const match2 = screen.getByText("2-2");
    expect(match2).toBeInTheDocument();
    const match3 = screen.getByText("6-6");
    expect(match3).toBeInTheDocument();
    const match4 = screen.getByText("0-5");
    expect(match4).toBeInTheDocument();
    const match5 = screen.getByText("10-2");
    expect(match5).toBeInTheDocument();
  })
});

describe("Exercise rules", () => {
  it(`Start a game.
    When a game starts, it should capture (being initial score 0 – 0)`, () => {
      jest.useFakeTimers();
      render(<FootballBoard footballBoard={footballWordCupScoreBoard}/>);
      
      let matchTable = screen.getByTestId("match");
      let matchRowList = within(matchTable).getAllByRole("row");
      expect(matchRowList[3]).toHaveTextContent("0'GermanyFrance0-01st half");
  })

  it(`Finish game. 
    It will remove a match from the scoreboard.`, () => {
      jest.useFakeTimers();
      render(<FootballBoard footballBoard={footballWordCupScoreBoard}/>);
      
      let matchTable = screen.getByTestId("match");
      let matchRowList = within(matchTable).getAllByRole("row");
      expect(matchRowList).toHaveLength(6);

      let summaryTable = screen.queryByTestId("summary");
      expect(summaryTable).not.toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(10000);
      })

      matchTable = screen.getByTestId("match");
      matchRowList = within(matchTable).getAllByRole("row");

      summaryTable = screen.queryByTestId("summary");
      let summaryRowList = within(summaryTable).getAllByRole("row");
      expect(summaryRowList).toHaveLength(2);
      expect(matchRowList).toHaveLength(5);
    
  })

  it(`Update score.
    Receiving the pair score; 
    home team score and away team score updates a game score.`, () => {
      jest.useFakeTimers();
      render(<FootballBoard footballBoard={footballWordCupScoreBoard}/>);
      
      let matchTable = screen.getByTestId("match");
      let matchRowList = within(matchTable).getAllByRole("row");
      expect(matchRowList).toHaveLength(6);

      expect(matchRowList[5]).toHaveTextContent("HalftimeArgentinaAustralia2-0Halftime");

      act(() => {
        jest.advanceTimersByTime(5000);
      })

      expect(matchRowList[5]).toHaveTextContent("50'ArgentinaAustralia3-02nd half");
    
  })

  it(`Get a summary of games by total score. 
    Those games with the same total score will be returned ordered by the most recently added to our system.`, () => {
    jest.useFakeTimers();
    render(<FootballBoard footballBoard={footballWordCupScoreBoard}/>);

    act(() => {
      jest.advanceTimersByTime(10000);
    })
    
    let summaryTable = screen.getByTestId("summary");
    let summaryRowList = within(summaryTable).getAllByRole("row");
    expect(summaryRowList).toHaveLength(2);

    act(() => {
      jest.advanceTimersByTime(5000);
    })
    
    summaryTable = screen.getByTestId("summary");
    summaryRowList = within(summaryTable).getAllByRole("row");
    expect(summaryRowList).toHaveLength(3);

    act(() => {
      jest.advanceTimersByTime(5000);
    })
    
    summaryTable = screen.getByTestId("summary");
    summaryRowList = within(summaryTable).getAllByRole("row");
    expect(summaryRowList).toHaveLength(4);

    act(() => {
      jest.advanceTimersByTime(5000);
    })
    
    summaryTable = screen.getByTestId("summary");
    summaryRowList = within(summaryTable).getAllByRole("row");
    expect(summaryRowList).toHaveLength(5);

    act(() => {
      jest.advanceTimersByTime(5000);
    })

    summaryTable = screen.getByTestId("summary");
    summaryRowList = within(summaryTable).getAllByRole("row");
    expect(summaryRowList).toHaveLength(6);
    
    expect(summaryRowList[1]).toHaveTextContent("17:00UruguayItaly6-6Ended");
    expect(summaryRowList[2]).toHaveTextContent("19:00SpainBrazil10-2Ended");
    expect(summaryRowList[3]).toHaveTextContent("18:00MexicoCanada0-5Ended");
    expect(summaryRowList[4]).toHaveTextContent("15:00ArgentinaAustralia3-1Ended");
    expect(summaryRowList[5]).toHaveTextContent("16:00GermanyFrance2-2Ended");
  })

})