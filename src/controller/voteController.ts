import { VoteQueries } from "../model/vote";



export class VoteController {

    public async Vote(userid: number, answerid: number, upvote: boolean|null, downvote: boolean|null): Promise<any>{

        const checkVote: boolean |undefined = await VoteQueries.checkVote(userid, answerid);

        if(checkVote === true){
            return checkVote;
        }
        
        // const insertVote: boolean | undefined = await VoteQueries.insertVote(userid, answerid, upvote, downvote);
        // if(!insertVote){
        //     return false;
        // }
    }
}


