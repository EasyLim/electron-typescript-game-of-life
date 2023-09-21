import Cell from "./Cell"

export default class GameProcess
{
    public cells: Cell[]

    constructor (cells: number[][] | Cell[] = [])
    {
        if (cells[0] instanceof Cell) {
            this.cells = (cells as Cell[])
        } else {
            this.cells = []
            for (const cell of cells) {
                this.cells.push(new Cell(cell[0], cell[1]))
            }
        }
    }

    private findCell (x: number, y: number) : boolean
    {
        for (const cell of this.cells) {
            if (cell.x === x && cell.y === y) {
                return true
            }
        }
        return false
    }

    private countAliveNeighbors (cell: Cell)
    {
        let counter = 0

        for (let neighbor of cell.neighbors) {
            counter += this.findCell(neighbor[0], neighbor[1]) ? 1 : 0
        }

        return counter
    }

    private willSurvive (cell: Cell) : boolean
    {
        return [2, 3].includes(this.countAliveNeighbors(cell))
    }

    private willTurnAlive (cell: Cell) : boolean
    {
        return this.countAliveNeighbors(cell) === 3
    }

    private getDeadNeighbors ()
    {
        let neighbors: number[][] = []
        for (const cell of this.cells) {
            neighbors.push(...cell.neighbors)
        }
        
        let result: number[][] = []
        for (const neighbor of neighbors) {
            let isDuplicate = false
            for (const value of result) {
                if (neighbor[0] === value[0] && neighbor[1] === value[1]) {
                    isDuplicate = true
                    break
                }
            }
            if (!isDuplicate) {
                result.push(neighbor)
            }
        }
        return result
    }

    public step ()
    {
        const result: Cell[] = []
        console.log(this.cells)
        for (const cell of this.cells) {
            if (this.willSurvive(cell)) {
                result.push(cell)
            }
        }

        for (const [x, y] of this.getDeadNeighbors()) {
            const cell = new Cell(x, y)
            if (this.willTurnAlive(cell)) {
                result.push(cell)
            }
        }

        this.cells = [...result]
    }
}