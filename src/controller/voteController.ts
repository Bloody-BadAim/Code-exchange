import { VoteQueries } from "../model/vote";




/**
 * Controller class for handling voting operations and retrieving voting-related information.
 */
export class VoteController {

    /**
     * Handles the voting process, including insertion, updating, and deletion of votes.
     * @param userid - The ID of the user performing the vote.
     * @param answerid - The ID of the answer for which the vote is being recorded.
     * @param upvote - Indicates whether the user is upvoting the answer.
     * @param downvote - Indicates whether the user is downvoting the answer.
     * @returns A Promise resolving to the result of the voting process.
     */
    public async Vote(userid: number, answerid: number, upvote: boolean|null, downvote: boolean|null): Promise<any>{
        try {
            const checkVote: any = await VoteQueries.checkVote(userid, answerid);

            if(checkVote.length === 0){
                // If the user has not voted on this answer before, insert a new vote record.
                const insertVote: boolean | undefined = await VoteQueries.insertVote(userid, answerid, upvote, downvote);
                if(insertVote){
                    return insertVote;
                } else {
                    console.log("Error inserting vote.");
                }
            
            } else if(checkVote[0].upvote === 1 && upvote === null){
                // If the user has upvoted and is now retracting the upvote, update the vote record.
                const updateVote: boolean = await VoteQueries.updateVote(userid, answerid, null, true);
                return updateVote;

            } else if(checkVote[0].downvote === 1 && downvote === null){ 
                // If the user has downvoted and is now retracting the downvote, update the vote record.
                const updateVote: boolean = await VoteQueries.updateVote(userid, answerid, true, null);
                return updateVote;

            } else if(checkVote[0].upvote === 1) {
                // If the user has upvoted and is now cancelling the upvote, delete the vote record.
                const deleteVote: boolean | undefined = await VoteQueries.deleteVote(userid, answerid);
                return deleteVote;

            } else if(checkVote[0].downvote === 1){
                // If the user has downvoted and is now cancelling the downvote, delete the vote record.
                const deleteVote: boolean | undefined = await VoteQueries.deleteVote(userid, answerid);
                return deleteVote;
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }   

    /**
     * Retrieves the vote information for a specific answer.
     * @param answerid - The ID of the answer.
     * @returns A Promise resolving to an object containing answer ID, total upvotes, and total downvotes.
     */
    public async loadVote(answerid: number): Promise<any>{
        try {
            const getVote: any = await VoteQueries.getVote(answerid);
            return getVote;
        } catch (error) {
            console.error("Error:", error);
        }
    }

    /**
     * Calculates and returns the total votes rating for a user based on their answered questions.
     * @param userid - The ID of the user.
     * @returns A Promise resolving to the total votes rating.
     */
    public async totalVotesRating(userid: number): Promise<any> {
        try {
            const getAnswers: any = await VoteQueries.getAllVote(userid);
            let totalUpvote: number = 0;
            let totalDownvote: number = 0;
    
            for (const answer of getAnswers) {
                const answerid: number = answer.answerid;
                const votes: any = await VoteQueries.getVote(answerid);
                
                if (votes.length > 0) {
                    let upvotes: number = votes[0].total_upvotes;
                    let downvotes: number = votes[0].total_downvotes;
                
                    totalUpvote += upvotes;
                    totalDownvote += downvotes;
            
                    console.log("Total Upvotes:", upvotes);
                    console.log("Total Downvotes:", downvotes);
                } else {
                    console.log(`No votes for answer ID ${answerid}`);
                }
            }

            let beginHighest: number = totalUpvote;
            let som: number = totalUpvote - totalDownvote;
            let percentage: number = Math.round((som / beginHighest) * 100);

            if(percentage === 100){
                return 5;
            } else if(percentage >= 80){
                return 4;
            } else if(percentage >= 60){
                return 3;
            } else if(percentage >= 40){
                return 2;
            } else if (percentage >= 20){
                return 1;
            } else{
                return 0;
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
}





// export class VoteController {

//     public async Vote(userid: number, answerid: number, upvote: boolean|null, downvote: boolean|null): Promise<any>{
//         const checkVote: any = await VoteQueries.checkVote(userid, answerid);

//         if(checkVote.length === 0){

//             const insertVote: boolean | undefined = await VoteQueries.insertVote(userid, answerid, upvote, downvote);
//             if(insertVote){
//                 return insertVote;
//             } else{
//                 console.log("error");
//             }
        
//         }else if(checkVote[0].upvote === 1 && upvote === null){
//             const updateVote: boolean = await VoteQueries.updateVote(userid, answerid, null, true);
//             return updateVote;

//         }else if(checkVote[0].downvote === 1 && downvote === null){ 
//             const updateVote: boolean = await VoteQueries.updateVote(userid, answerid, true, null);
//             return updateVote;

//         }else if(checkVote[0].upvote === 1) {
//             const deleteVote: boolean | undefined = await VoteQueries.deleteVote(userid, answerid);
//             return deleteVote;

//         } else if(checkVote[0].downvote === 1){
//             const deleteVote: boolean | undefined = await VoteQueries.deleteVote(userid, answerid);
//             return deleteVote;
//         }
//     }   

//     public async loadVote(answerid: number): Promise<any>{
//         const getVote: any = await VoteQueries.getVote(answerid);
//         return getVote;
//     }


//     public async totalVotesRating(userid: number): Promise<any> {
//         try {
//             const getAnswers: any = await VoteQueries.getAllVote(userid);
//             let totalUpvote: number = 0;
//             let totalDownvote: number = 0;
    
//             for (const answer of getAnswers) {
//                 const answerid: number = answer.answerid;
//                 const votes: any = await VoteQueries.getVote(answerid);
                
//                 if (votes.length > 0) {
//                     let upvotes: number = votes[0].total_upvotes;
//                     let downvotes: number = votes[0].total_downvotes;
                
//                     totalUpvote += upvotes;
//                     totalDownvote += downvotes;
            
//                     console.log("Total Upvotes:", upvotes);
//                     console.log("Total Downvotes:", downvotes);
//                 } else {
//                     console.log(`No votes for answer ID ${answerid}`);
//                 }
//             }

//             console.log(totalUpvote, totalDownvote);
//             let beginHighest: number = totalUpvote;
//             let som: number = totalUpvote - totalDownvote;
//             let percentage: number = Math.round((som / beginHighest) * 100);
//             console.log(percentage);

//             if(percentage === 100){
//                 return 5;
//             }else if(percentage >= 80){
//                 return 4;
//             }else if(percentage >=60){
//                 return 3;
//             }else if(percentage >= 40){
//                 return 2;
//             }else if (percentage >=20){
//                 return 1;
//             } else{
//                 return 0;
//             }

//         } catch (error) {
//             console.error("Error:", error);
//         }
//     }
// }    
       