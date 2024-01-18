/**
 * Abstract base class for queries in a Q&A application.
 * This class serves as a foundation for more specific query classes.
 */
export abstract class BaseQueries {
    protected _userid: number;
    public _username: string;

    protected constructor(userid: number, username: string) {
        this._userid = userid;
        this._username = username;
    }

    // //abstract methods
    // public abstract checkExists(key: string, value: string): Promise<boolean>;
}