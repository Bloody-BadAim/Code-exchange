import { AnswerQuaries } from "../model/answer";
import { VoteQueries } from "../model/vote";

export class VoteController {

    public async setRating(userid: number, answerid: number, rating: number): Promise<boolean> {
        try {
            // Call VoteQueries to set the rating, which will handle both insert and update internally
            const result: boolean = await VoteQueries.setRating(userid, answerid, rating);
            return result;
        } catch (error) {
            console.error("Error setting rating:", error);
            throw error;
        }
    }

    public async getAverageRating(userid: number): Promise<number> {
        try {
            let totaal: number = 0;
            let aantal: number = 0;

            const allAnswers: any = await VoteQueries.getAllAnswers(userid);
            
            for (const item of allAnswers) {

                const answerid : number= item.answerid;
                const getRating: any = await VoteQueries.getUserAverageRating(answerid);
                const sumRating: any= getRating[0];
                const value: any = (Object.values(sumRating)[0]);
                if(value > 0 ){
                    aantal = aantal + 1;
                }
                if(getRating.length > 0){
                    totaal += value;
                }
            }

            const realAverage: number = Math.round((totaal / aantal)/5);

            
            // let averageRating: number = Math.round((rating / 5));
            // console.log(averageRating);
            return realAverage;
        } catch (error) {
            console.error("Error getting average rating:", error);
            throw error;
        }
    }

    // Add any additional methods from VoteQueries that need to be exposed via the controller
}
