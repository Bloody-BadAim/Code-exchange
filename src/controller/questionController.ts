import { QuestionQueries } from "../models/questionQuary";
import { AnswerQuaries } from "../models/answerQuary";

export class QuestionController {
    
    public async postQuestion(userId: number, content: string): Promise<number | undefined> {
        return QuestionQueries.postQuestion(userId, content);
    }

    public async getQuestionById(questionId: number): Promise<QuestionQueries | undefined> {
        return QuestionQueries.getQuestionById(questionId);
    }

    public async getAllQuestions(): Promise<QuestionQueries[]> {
        return QuestionQueries.getAllQuestions();
    }

    public async postAnswer(questionId: number, userId: number, contentAnswer: string): Promise<number | undefined> {
        return AnswerQuaries.postAnswer(questionId, userId, contentAnswer);
    }

    public async getAnswersByQuestionId(questionId: number): Promise<AnswerQuaries[]> {
        return AnswerQuaries.getAnswersByQuestionId(questionId);
    }
}
