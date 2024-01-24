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

    public async getAverageRating(answerid: number): Promise<number> {
        try {
            // Call VoteQueries to get the average rating for an answer
            const averageRating: number = await VoteQueries.getUserAverageRating(answerid);
            return averageRating;
        } catch (error) {
            console.error("Error getting average rating:", error);
            throw error;
        }
    }

    // Add any additional methods from VoteQueries that need to be exposed via the controller
}
