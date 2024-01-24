import "../config";
import { api } from "@hboictcloud/api";
import { BaseQueries } from "./baseQa";

export class VoteQueries extends BaseQueries {

    public _answerid: number;
    
    public _upvote: boolean;

    public _downvote: boolean;

    public constructor(userid: number, username: string, answerid: number, upvote: boolean, downvote: boolean){
        super(userid, username);
        this._answerid = answerid;
        this._upvote = upvote;
        this._downvote = downvote;
    };


    public static async insertVote(userid: number, answerid: number, upvote: boolean | null, downvote: boolean | null ): Promise<boolean>{
        const insertString: string = "INSERT INTO vote WHERE userid, answerid, upvote, downvote";
        const insert: any = await api.queryDatabase(insertString, userid, answerid, upvote, downvote);
        return insert;


    }

    public static async checkVote(userid: number, answerid: number): Promise<boolean>{
        const selectString: string = "SELECT COUNT(*) as COUNT FROM vote WHERE userid, answerid";
        const select: any = await api.queryDatabase(selectString, userid, answerid);
        return select[0].count > 0;
    }

}