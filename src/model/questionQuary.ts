import "../config";
import { api } from "@hboictcloud/api";
import { BaseQueries } from "./baseqaQuery";
export class QuestionQueries extends BaseQueries{

    public _id: number;
    public _content: string;
    public _createdAt:Date;
    public _username: any;
   

    public constructor(id: number, content: string, userid: number,createdAt:Date,username:string) {
        super(userid);
        this._id = id;
        this._content = content;
        this._createdAt = createdAt;
        this._username = username;
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


    public static async getAllQuestions(): Promise<any[]> {
        try {
            const queryAllQuestions: string = `
                SELECT questions.*, user.username 
                FROM questions 
                JOIN user ON questions.userid = user.userid`;
            const questions: any = await api.queryDatabase(queryAllQuestions);
            return questions;
        } catch (error) {
            console.error("Error getting questions:", error);
            throw error;
        }
    }

    

}