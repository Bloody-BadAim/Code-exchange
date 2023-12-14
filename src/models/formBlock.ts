export class FormBlock {
    protected _userid: number;

    public constructor(userid: number) {
        this._userid = userid;
    }

    public set userid(id:number) {
        this._userid = id;
    }


}
