class Cup {
    private _material: string;
    private _lit: string;
    private _content: number;

    public constructor(material: string, lit: string, content: number) {
        this._material = material;
        this._lit = lit;
        this._content = content;
    }

    public drink(): void {
        this._content -= 100;
        console.log("er is 100 gedronken, er is nog "+ this._content + "ml over");

    }
}

const cup: Cup = new Cup("aluminium", "rubber", 500); 
cup.drink();
const cup1: Cup = new Cup("steel", "plastic", 1000);
const cup2: Cup = new Cup("aluminium", "cork", 750);


console.log(cup);
console.log(cup1);
console.log(cup2);


