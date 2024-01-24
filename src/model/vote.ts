import "../config";
import { api } from "@hboictcloud/api";
import { BaseQueries } from "./baseQa";


/**
 * Class representing queries related to voting on answers.
 * Extends the BaseQueries class for common user information.
 */
export class VoteQueries extends BaseQueries {

    /**
     * The ID of the answer for which the vote is being recorded.
     */
    public _answerid: number;
    
    /**
     * Indicates whether the user is upvoting the answer.
     */
    public _upvote: boolean;

    /**
     * Indicates whether the user is downvoting the answer.
     */
    public _downvote: boolean;

    /**
     * Creates an instance of VoteQueries.
     * @param userid - The ID of the user performing the vote.
     * @param username - The username of the user performing the vote.
     * @param answerid - The ID of the answer for which the vote is being recorded.
     * @param upvote - Indicates whether the user is upvoting the answer.
     * @param downvote - Indicates whether the user is downvoting the answer.
     */
    public constructor(userid: number, username: string, answerid: number, upvote: boolean, downvote: boolean) {
        super(userid, username);
        this._answerid = answerid;
        this._upvote = upvote;
        this._downvote = downvote;
    }

    /**
     * Checks if the user has voted on a particular answer.
     * @param userid - The ID of the user.
     * @param answerid - The ID of the answer.
     * @returns A Promise resolving to a string or undefined based on the vote status.
     */
    public static async checkVote(userid: number, answerid: number): Promise<string | undefined> {
        const selectString: string = "SELECT upvote, downvote FROM vote WHERE userid = ? AND answerid = ?";
        const select: any = await api.queryDatabase(selectString, userid, answerid);
        return select;
    }

    /**
     * Inserts a new vote record into the database.
     * @param userid - The ID of the user performing the vote.
     * @param answerid - The ID of the answer for which the vote is being recorded.
     * @param upvote - Indicates whether the user is upvoting the answer.
     * @param downvote - Indicates whether the user is downvoting the answer.
     * @returns A Promise resolving to a boolean indicating the success of the insertion.
     */
    public static async insertVote(userid: number, answerid: number, upvote: boolean | null, downvote: boolean | null): Promise<boolean> {
        const insert: any = await api.queryDatabase("INSERT INTO vote (userid, answerid, upvote, downvote) VALUES (?, ?, ?, ?)", userid, answerid, upvote, downvote);
        console.log(insert);
        return insert;
    }

    /**
     * Deletes a vote record from the database.
     * @param userid - The ID of the user.
     * @param answerid - The ID of the answer.
     * @returns A Promise resolving to a boolean indicating the success of the deletion.
     */
    public static async deleteVote(userid: number, answerid: number): Promise<boolean> {
        const deletequery: any = await api.queryDatabase("DELETE FROM vote WHERE userid = ? AND answerid = ?", userid, answerid);
        return deletequery;
    }

    /**
     * Updates an existing vote record in the database.
     * @param userid - The ID of the user.
     * @param answerid - The ID of the answer.
     * @param upvote - Indicates whether the user is upvoting the answer.
     * @param downvote - Indicates whether the user is downvoting the answer.
     * @returns A Promise resolving to a boolean indicating the success of the update.
     */
    public static async updateVote(userid: number, answerid: number, upvote: boolean | null, downvote: boolean | null): Promise<boolean> {
        const update: any = await api.queryDatabase("UPDATE vote SET upvote = ?, downvote = ? WHERE userid = ? AND answerid = ?", upvote, downvote, userid, answerid);
        return update;
    }

    /**
     * Retrieves the vote information for a specific answer.
     * @param answerid - The ID of the answer.
     * @returns A Promise resolving to an object containing answer ID, total upvotes, and total downvotes.
     */
    public static async getVote(answerid: number): Promise<any> {
        const getAll: any = await api.queryDatabase("SELECT answerid, COALESCE(SUM(upvote), 0) AS total_upvotes, COALESCE(SUM(downvote), 0) AS total_downvotes FROM vote WHERE answerid = ? GROUP BY answerid", answerid);
        return getAll;
    }

    /**
     * Retrieves all answers voted on by a specific user.
     * @param userid - The ID of the user.
     * @returns A Promise resolving to an array of answer IDs.
     */
    public static async getAllVote(userid: number): Promise<any> {
        const getAll: any = await api.queryDatabase("SELECT answerid FROM answers WHERE userid = ?", userid);
        return getAll;
    }

    /**
     * Retrieves the user ID associated with a specific answer.
     * @param answerid - The ID of the answer.
     * @returns A Promise resolving to the user ID.
     */
    public static async useridFromAnswer(answerid: number): Promise<any> {
        const getuserid: any = await api.queryDatabase("SELECT userid FROM answers WHERE answerid = ?", answerid);
        return getuserid;
    }
}








































// export class VoteQueries extends BaseQueries {

//     public _answerid: number;
    
//     public _upvote: boolean;

//     public _downvote: boolean;

//     public constructor(userid: number, username: string, answerid: number, upvote: boolean, downvote: boolean){
//         super(userid, username);
//         this._answerid = answerid;
//         this._upvote = upvote;
//         this._downvote = downvote;
//     };




//     public static async checkVote(userid: number, answerid: number): Promise<string | undefined>{
//         const selectString: string = "SELECT upvote, downvote FROM vote WHERE userid = ? AND answerid = ?";
//         const select: any = await api.queryDatabase(selectString, userid, answerid);
//         return select;
//     }

//     public static async insertVote(userid: number, answerid: number, upvote: boolean | null, downvote: boolean | null ): Promise<boolean>{
//         const insert: any = await api.queryDatabase("INSERT INTO vote (userid, answerid, upvote, downvote) VALUES (?, ?, ?, ?)", userid, answerid, upvote, downvote);
//         console.log(insert);
//         return insert;
//     }

//     public static async deleteVote(userid: number, answerid: number): Promise<boolean> {
//         const deletequery: any = await api.queryDatabase("DELETE FROM vote WHERE userid = ? AND answerid = ?", userid, answerid);
//         return deletequery;
//     }

//     public static async updateVote(userid: number, answerid: number, upvote: boolean | null, downvote: boolean | null): Promise<boolean>{
//         const update: any = await api.queryDatabase("UPDATE vote SET upvote = ?, downvote = ? WHERE userid = ? AND answerid = ?", upvote, downvote, userid, answerid);
//         return update;
//     }

//     public static async getVote(answerid: number): Promise<any> {
//         const getAll: any = await api.queryDatabase("SELECT answerid, COALESCE(SUM(upvote), 0) AS total_upvotes, COALESCE(SUM(downvote), 0) AS total_downvotes FROM vote WHERE answerid = ? GROUP BY answerid", answerid);
//         return getAll;
//     }

//     public static async getAllVote(userid: number): Promise<any> {
//         const getAll: any = await api.queryDatabase("SELECT answerid FROM answers WHERE userid = ?", userid);
//         return getAll;
//     }

//     public static async useridFromAnswer(answerid: number): Promise<any>{
//         const getuserid: any = await api.queryDatabase("SELECT userid FROM answers WHERE answerid = ?", answerid);
//         return getuserid;
//     }
    

// }
