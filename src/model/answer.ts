import "../config";
import { api } from "@hboictcloud/api";
import { BaseQueries } from "./baseQa";


/**
 * Class representing the queries related to answers in a Q&A application.
 * Extends from BaseQueries.
 */
export class AnswerQuaries extends BaseQueries {

    /**
     * Creates an instance of AnswerQuaries.
     * @param {number} answerid - Unique identifier for an answer.
     * @param {number} questionid - ID of the question to which this answer belongs.
     * @param {number} userid - User ID of the user who created the answer.
     * @param {string} contentAnswer - The content of the answer.
     * @param {Date} createdatAnswer - The date and time when the answer was created.
     * @param {string} username - Username of the user who created the answer.
     */

    public _answerid: number;
    public _questionid: number;
    public _contentAnswer: string;
    public _createdatAnswer: Date;

    public constructor(answerid: number, questionid: number, userid: number, contentAnswer: string, createdatAnswer: Date, username: string) {
        super(userid, username);
        this._answerid = answerid;
        this._questionid = questionid;
        this._contentAnswer = contentAnswer;
        this._createdatAnswer = createdatAnswer;

    }
    /**
        * Posts a new answer to a specific question.
        * @param {number} questionid - The ID of the question to answer.
        * @param {number} userId - The ID of the user posting the answer.
        * @param {string} contentAnswer - The content of the answer being posted.
        * @returns {Promise<number | undefined>} The ID of the inserted answer or undefined in case of an error.
        */
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

    /**
     * Retrieves all answers associated with a specific question ID.
     * @param {number} questionId - The ID of the question for which answers are being retrieved.
     * @returns {Promise<AnswerQuaries[]>} An array of AnswerQuaries instances representing the answers for the specified question.
     */
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
                    a.username,
                );
            });
        } catch (error) {
            console.error("Error getting answers by question ID:", error);
            throw error;
        }
    }

    /**
    * Retrieves all answers posted by a specific user.
    * @param {number} userId - The ID of the user.
    * @returns {Promise<AnswerQuaries[]>} An array of AnswerQuaries instances representing the user's answers.
    */
    public static async getAnswersByUserId(userId: number): Promise<AnswerQuaries[]> {
        try {
            const query: string = `
            SELECT answers.*, user.username 
            FROM answers 
            JOIN user ON answers.userid = user.userid 
            WHERE answers.userid = ?`;
            const answers: any = await api.queryDatabase(query, userId);
            return answers.map((a: any) => {
                return new AnswerQuaries(
                    a.answerid,
                    a.questionid,
                    a.userid,
                    a.contentAnswer,
                    a.createdatAnswer,
                    a.username,
                );
            });
        } catch (error) {
            console.error("Error getting answers by user ID:", error);
            throw error;
        }
    }
    public static async updateAnswer(answerId: number, newContent: string, userId: number): Promise<boolean> {
        try {
            const currentDate: Date = new Date();
            const formattedDate: string = currentDate.toISOString().slice(0, 19).replace("T", " ");
            const queryUpdate: string = "UPDATE answers SET contentAnswer = ?, createdatAnswer = ? WHERE answerid = ? AND userid = ?";
            await api.queryDatabase(queryUpdate, newContent, formattedDate, answerId, userId);
            return true;
        } catch (error) {
            console.error("Error updating answer:", error);
            return false;
        }
    }

    public static async deleteAnswer(answerId: number, userId: number): Promise<boolean> {
        try {
            const queryDelete: string = "DELETE FROM answers WHERE answerid = ? AND userid = ?";
            await api.queryDatabase(queryDelete, answerId, userId);
            return true;
        } catch (error) {
            console.error("Error deleting answer:", error);
            return false;
        }
    }
    

}