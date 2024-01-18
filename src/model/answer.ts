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

    // In AnswerQuaries class
    public static async updateAnswer(answerId: number, userId: number, newContent: string): Promise<boolean> {
        try {
            // Check if the answer belongs to the user
            const answerData: any = await api.queryDatabase("SELECT * FROM answers WHERE answerid = ? AND userid = ?", answerId, userId);
            if (answerData.length === 0) {
                throw new Error("Answer not found or user not authorized to edit this answer.");
            }

            // Update the answer content
            const queryUpdate: string = "UPDATE answers SET contentAnswer = ? WHERE answerid = ?";
            await api.queryDatabase(queryUpdate, newContent, answerId);
            return true;
        } catch (error) {
            console.error("Error updating answer:", error);
            return false;
        }
    }

}