import Cell from "./Cell";
import GameDisplay from "./GameDisplay";
import GameProcess from "./GameProcess";

export default class Game
{
    display: GameDisplay
    process: GameProcess
    loop: NodeJS.Timeout

    constructor () {
        this.display = new GameDisplay('#canvas')
        this.process = new GameProcess()

        this.process.cells = [
            new Cell(1,0),
            new Cell(2,1),
            new Cell(2,2),
            new Cell(1,2),
            new Cell(0,2)
        ]

        this.loop = setInterval(() => this.gameLoop(), 500)
    }

    private gameLoop ()
    {
        this.process.step()
        this.display.cells = this.process.cells
    }
}