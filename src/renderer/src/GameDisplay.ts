import Cell from './Cell'

export default class GameDisplay
{
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D
    private loop: NodeJS.Timeout

    public cells: Cell[]
    public zoom: number
    public offset: {x: number, y: number}

    constructor (querySelector: string)
    {
        const canvas = document.querySelector<HTMLCanvasElement>(querySelector)
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
            throw new Error(`There is no canvas element to which "${querySelector}" refers`)
        }
        this.canvas = canvas

        const context = this.canvas.getContext('2d')
        if (!context || !(context instanceof CanvasRenderingContext2D)) {
            throw new Error(`Can not get canvas rendering context`)
        }
        this.context = context

        this.cells = []
        this.zoom = 1
        this.offset = { x: 0, y: 0 }

        this.resize()
        window.addEventListener('resize', this.resize)

        this.loop = setInterval(() => this.tick(), 20)
    }

    private resize ()
    {
        this.canvas.width = document.body.offsetWidth
        this.canvas.height = document.body.offsetHeight
    }

    private drawCells ()
    {
        for (const cell of this.cells) {
            this.context.beginPath()
            this.context.fillRect(
                cell.x * 50 + this.offset.x,
                cell.y * 50 + this.offset.y,
                50 * this.zoom,
                50 * this.zoom
            )
            this.context.closePath()
        }
    }

    private clear ()
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    private tick ()
    {
        this.clear()
        this.drawCells()
    }

    public resume () 
    {
        this.loop = setInterval(this.tick, 20)
    }

    public pause ()
    {
        clearInterval(this.loop)
    }
}
