import "../config";
import { api } from "@hboictcloud/api";
import { BaseQueries } from "./baseQa";

export class AnswerQuaries extends BaseQueries{

    public _answerid: number;
    public _questionid: number;
    public _contentAnswer: string;
    public _createdatAnswer: Date;
    public _username: string;

    public constructor(answerid: number,questionid: number,userid: number,contentAnswer: string,createdatAnswer: Date,username:string) {
        super(userid);
        this._answerid = answerid;
        this._questionid = questionid;
        this._contentAnswer = contentAnswer;
        this._createdatAnswer = createdatAnswer;
        this._username = username;
        
    }

    public static async postAnswer(questionid: number, userId: number, contentAnswer: string): Promise<number | undefined> {
        try {
            // Check if the user exists
            const userExists: any = await api.queryDatabase("SELECT COUNT(*) AS count FROM user WHERE userid = ?", (userId));
            
            if (userExists[0].count === 0) {
                throw new Error(`Cannot post answer because user with ID ${userId} does not exist.`);
            }
    
            // Check if the question exists
            const questionExists: any = await api.queryDatabase("SELECT COUNT(*) AS count FROM questions WHERE questionid = ?", (questionid));
            
            if (questionExists[0].count === 0) {
                throw new Error(`Cannot post answer because question with ID ${questionid} does not exist.`);
            }
    
            // If the user and question exist, insert the answer
            const queryAnswer: string = "INSERT INTO answers (questionid, userid, contentAnswer) VALUES (?, ?, ?)";
            const result: any = await api.queryDatabase(queryAnswer, questionid, userId, contentAnswer);
            return result.insertId;
        } catch (error) {
            console.error("Error posting answer:", error);
            throw error;
        }
    }
    
    

    public static async getAnswersByQuestionId(questionId: number): Promise<AnswerQuaries[]> {
        try {
            const queryGeta: string = `
                SELECT answers.*, user.username 
                FROM answers 
                JOIN user ON answers.userid = user.userid 
                WHERE answers.questionid = ?`;
            const answers: any = await api.queryDatabase(queryGeta, questionId);
            return answers.map((a: any) => {
                return new AnswerQuaries(
                    a.answerid,
                    a.questionid,
                    a.userid,
                    a.contentAnswer,
                    a.createdatAnswer,
                    a.username, // Make sure to pass the username here
                );
            });
        } catch (error) {
            console.error("Error getting answers by question ID:", error);
            throw error;
        }
    }
}

