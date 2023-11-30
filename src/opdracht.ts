class Phone {
    private _model: string;
    private _size: number;
    private _color: string;

    public constructor(model: string, size: number, color: string) {
        this._model = model;
        this._size = size;
        this._color = color;
    }
    public printSize(toAdd: number): void {
        this._size += toAdd;
        console.log("mijn telefoon is " + this._size + " cm lang");
    }
    public get color(): string {
        return this._color;
    }

    public set color(color: string) {
        this._color = color;
    }
}

const phone: Phone = new Phone("iphone", 20, "black");
console.log(phone);
phone.color = "blue";
console.log(phone);
phone.printSize(10);
const phone1: Phone = new Phone("samsung", 30, "white");
const phone2: Phone = new Phone("nokia", 10, "red");
console.log(phone);
console.log(phone1);
console.log(phone2);