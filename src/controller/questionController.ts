import { QuestionQueries } from "../model/question";
import { AnswerQuaries } from "../model/answer";

export class QuestionController {
    public constructor() { }

    public async postQuestion(userId: number, content: string): Promise<number | undefined> {
        try {
            return await QuestionQueries.postQuestion(userId, content);
        } catch (error) {
            console.error("Error in postQuestion:", error);
            return undefined; // Return undefined in case of error
        }
    }

    public async getQuestionById(questionId: number): Promise<QuestionQueries | undefined> {
        try {
            return await QuestionQueries.getQuestionById(questionId);
        } catch (error) {
            console.error("Error in getQuestionById:", error);
            return undefined; // Return undefined in case of error
        }
    }

    public async getAllQuestions(): Promise<QuestionQueries[]> {
        try {
            return await QuestionQueries.getAllQuestions();
        } catch (error) {
            console.error("Error in getAllQuestions:", error);
            return []; // Return an empty array in case of error
        }
    }

    public async postAnswer(questionId: number, userId: number, content: string): Promise<number | undefined> {
        try {
            return await AnswerQuaries.postAnswer(questionId, userId, content);
        } catch (error) {
            console.error("Error in postAnswer:", error);
            return undefined; // Return undefined in case of error
        }
    }

    public async getAnswersByQuestionId(questionId: number): Promise<AnswerQuaries[]> {
        try {
            return await AnswerQuaries.getAnswersByQuestionId(questionId);
        } catch (error) {
            console.error("Error in getAnswersByQuestionId:", error);
            return []; // Return an empty array in case of error
        }
    }
}
