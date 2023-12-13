import "../config";
import { api } from "@hboictcloud/api";

export class AnswerQuaries {

    public _answerid: number;
    public _questionid: number;
    public _userid: number;
    public _contentAnswer: string;
    public _createdatAnswer: Date;

    public constructor(answerid: number,questionid: number,userid: number,contentAnswer: string,createdatAnswer: Date) {
        this._answerid = answerid;
        this._questionid = questionid;
        this._userid = userid;
        this._contentAnswer = contentAnswer;
        this._createdatAnswer = createdatAnswer;
    }

    public static async  postAnswer(questionId: number, userId: number, contentAnswer: string): Promise<number | undefined> {
        try {
            const queryAnswer: string = "INSERT INTO answers (questionid, userid, contentAnswer) VALUES (?, ?, ?)";
            const result: any = await api.queryDatabase(queryAnswer, questionId, userId, contentAnswer);
            return result.insertId;
        } catch (error) {
            console.error("Error posting answer:", error);
            throw error;
        }
    }

    public static async  getAnswersByQuestionId(questionId: number): Promise<AnswerQuaries[]> {
        try {
            const queryGeta:string = "SELECT * FROM answers WHERE questionid = ?";
            const answers: any = await api.queryDatabase(queryGeta, questionId);
            return answers;
        } catch (error) {
            console.error("Error getting answers by question ID:", error);
            throw error;
        }
    }

}