const letters: string = "hello";
console.log(letters);
const age: number = 21;
const isFriday: boolean = true;

const header: HTMLHeadElement | null = document.querySelector("h1");

console.log(header?.textContent);


class Phone {
    private _model: string;
    private _size: number;
    private _color: string;

    public constructor(model: string, size: number, color: string) {
        this._model = model;
        this._size = size;
        this._color = color;
    }
    public cut(): void {
        this._size+=100;
        console.log("Er is 200 cm gezaagd, er is nog "+ this._size + "cm over");
    }
}

const phone: Phone = new Phone("iphone", 20, "black");
phone.cut();
const phone1:Phone = new Phone ("samsung",30,"white");
const phone2:Phone = new Phone ("nokia",10,"red");
console.log(phone);
console.log(phone1);
console.log(phone2);