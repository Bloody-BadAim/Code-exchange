/**
 * Base class for queries in a Q&A application.
 * This class serves as a foundation for more specific query classes.
 */
export class BaseQueries {
    /**
     * Protected member representing the user ID.
     */
    protected _userid: number;

    /**
     * Public member representing the username.
     */
    public _username: string;

    /**
     * Protected constructor for the BaseQueries class.
     * @param {number} userid - The unique identifier of the user.
     * @param {string} username - The username associated with the user.
     */
    protected constructor(userid: number, username: string) {
        this._userid = userid;
        this._username = username;
    }
}
