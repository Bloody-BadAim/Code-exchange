import "../config";
import { api } from "@hboictcloud/api";
import { BaseQueries } from "./baseQaQuery";

export class QuestionQueries extends BaseQueries{


    public _questionid: number;
    public _content: string;
    public _createdAt:Date;
    public _username: any;
   

    public constructor(questionid: number, content: string, userid: number,createdAt:Date,username:string) {
        super(userid);
        this._questionid = questionid;
        this._content = content;
        this._createdAt = createdAt;
        this._username = username;
    }

    public static async getQuestionById(questionid: number): Promise<QuestionQueries | undefined> {
        try {
            const queryGetQ: string = "SELECT * FROM questions WHERE questionid = ?";
            const result: any = await api.queryDatabase(queryGetQ, questionid);
            return result.length > 0 ? result[0] : undefined;
        } catch (error) {
            console.error("Error getting question by ID:", error);
            throw error;
        }
    }

    public static async postQuestion(userid: number, content: string): Promise<number | undefined> {
        try {
            const queryQuestion: string = "INSERT INTO questions (userid, content) VALUES (?, ?)";
            const result: any = await api.queryDatabase(queryQuestion, userid, content);
            return result.insertId;
        } catch (error) {
            console.error("Error posting question:", error);
            throw error;
        }
    }

    public static async getAllQuestions(): Promise<any[]> {
        try {
            const queryAllQuestions: string = `
                SELECT questions.questionid, questions.content, questions.createdAt, user.username 
                FROM questions 
                JOIN user ON questions.userid = user.userid`;
            const questions:any = await api.queryDatabase(queryAllQuestions);
            return questions.map((q: { questionid: number; content: string; createdAt: Date; username: string; }) => {
                return {
                    _questionid: q.questionid,
                    _content: q.content,
                    _createdAt: q.createdAt,
                    _username: q.username,
                };
            });
        } catch (error) {
            console.error("Error getting questions:", error);
            throw error;
        }
    }
    

    public static async getAllPersonalQuestions(): Promise<QuestionQueries[]> {
        try {
            const queryAllQuestions: string = "SELECT content, createdAt FROM questions WHERE userid = ?";
            const questions: any = await api.queryDatabase(queryAllQuestions);
            return questions;
        } catch (error) {
            console.error("Error getting questions:", error);
            throw error;
        }
    }

}