export default class Cell 
{
    constructor(
        public x: number,
        public y: number
    ) {}

    public get neighbors () : number[][]
    {
        return [
            [this.x - 1, this.y - 1],
            [this.x - 1, this.y + 1],
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y + 1],
            [this.x - 1, this.y],
            [this.x, this.y - 1],
            [this.x + 1, this.y],
            [this.x, this.y + 1],
        ]
    }
}
