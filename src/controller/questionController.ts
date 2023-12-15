import { QuestionQueries } from "../model/questionQuery";
import { AnswerQuaries } from "../model/answerQuery";

export class QuestionController {

    // Constructor doesn't need to take any parameters for this use case
    public constructor() {}

    // Method to post a new question
    public async postQuestion(userId: number, content: string): Promise<number | undefined> {
        return QuestionQueries.postQuestion(userId, content);
    }

    // Method to get a specific question by its ID
    public async getQuestionById(questionid: number): Promise<QuestionQueries | undefined> {
        return QuestionQueries.getQuestionById(questionid);
    }

    // Method to get all questions
    public async getAllQuestions(): Promise<QuestionQueries[]> {
        return QuestionQueries.getAllQuestions();
    }

    // Method to post a new answer to a question
    public async postAnswer(questionid: number, userId: number, contentAnswer: string): Promise<number | undefined> {
        return AnswerQuaries.postAnswer(questionid, userId, contentAnswer);
    }

    // Method to get all answers for a specific question
    public async getAnswersByQuestionId(questionid: number): Promise<AnswerQuaries[]> {
        return AnswerQuaries.getAnswersByQuestionId(questionid);
    }
}
