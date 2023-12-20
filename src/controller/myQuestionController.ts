import { QuestionQueries } from "../model/question";

export class MyQuestionsController {
    public async getPersonalQuestions(): Promise<QuestionQueries[]> {
        try {
            const userIdStr: string = sessionStorage.getItem("userid")!;
            if (!userIdStr) {
                throw new Error("User not logged in");
            }
            const userId: number = parseInt(userIdStr);
            if (isNaN(userId)) {
                throw new Error("Invalid user ID");
            }
            return await QuestionQueries.getAllPersonalQuestions(userId);
        } catch (error) {
            console.error("Error in getPersonalQuestions:", error);
            throw error;
        }
    }
}
