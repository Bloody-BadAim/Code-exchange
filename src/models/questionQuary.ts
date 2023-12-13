import "../config";
import { api } from "@hboictcloud/api";
export class QuestionQueries {

    public _id: number;
    public _content: string;
    public _userid: number;
    public _createdAt:Date;


    public constructor(id: number, content: string, userid: number,createdAt:Date) {
        this._id = id;
        this._content = content;
        this._userid = userid;
        this._createdAt = createdAt;
    }

    public static async getQuestionById(questionId: number): Promise<QuestionQueries | undefined> {
        try {
            const queryGetQ: string = "SELECT * FROM questions WHERE id = ?";
            const result: any = await api.queryDatabase(queryGetQ, questionId);
            return result.length > 0 ? result[0] : undefined;
        } catch (error) {
            console.error("Error getting question by ID:", error);
            throw error;
        }
    }

    public static async postQuestion(userId: number, content: string): Promise<number | undefined> {
        try {
            const queryQuestion: string = "INSERT INTO questions (userid, content) VALUES (?, ?)";
            const result: any = await api.queryDatabase(queryQuestion, userId, content);
            return result.insertId;
        } catch (error) {
            console.error("Error posting question:", error);
            throw error;
        }
    }


    public static async getAllQuestions(): Promise<QuestionQueries[]> {
        try {
            const queryAllQuestions: string = "SELECT * FROM questions";
            const questions: any = await api.queryDatabase(queryAllQuestions);
            return questions;
        } catch (error) {
            console.error("Error getting questions:", error);
            throw error;
        }
    }

}