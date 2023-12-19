import "../config";
import { api } from "@hboictcloud/api";
import { BaseQueries } from "./baseQa";

/**
 * Class representing the queries related to questions in a Q&A application.
 * Extends from BaseQueries.
 */
export class QuestionQueries extends BaseQueries {

    /**
     * Public member representing the question ID.
     */
    public _questionid: number;

    /**
     * Public member representing the content of the question.
     */
    public _content: string;

    /**
     * Public member representing the creation date of the question.
     */
    public _createdAt: Date;

    /**
     * Constructs a new instance of the QuestionQueries class.
     * @param {number} questionid - The unique identifier for a question.
     * @param {string} content - The content of the question.
     * @param {number} userid - User ID of the user who created the question.
     * @param {Date} createdAt - The date and time when the question was created.
     * @param {string} username - Username of the user who created the question.
     */
    public constructor(questionid: number, content: string, userid: number, createdAt: Date, username: string) {
        super(userid, username);
        this._questionid = questionid;
        this._content = content;
        this._createdAt = createdAt;
    }

    /**
     * Retrieves a specific question by its ID.
     * @param {number} questionId - The ID of the question to retrieve.
     * @returns {Promise<QuestionQueries | undefined>} An instance of QuestionQueries or undefined if the question is not found.
     */
    public static async getQuestionById(questionId: number): Promise<QuestionQueries | undefined> {
        try {
            const queryGetQ: string = `
                SELECT questions.*, user.username 
                FROM questions 
                JOIN user ON questions.userid = user.userid
                WHERE questions.questionid = ?`;
            const result: any = await api.queryDatabase(queryGetQ, questionId);
            if (result.length > 0) {
                const questionData: any = result[0];
                return new QuestionQueries(
                    questionData.questionid,
                    questionData.content,
                    questionData.userid,
                    questionData.createdAt,
                    questionData.username
                );
            }
            return undefined;
        } catch (error) {
            console.error("Error getting question by ID:", error);
            throw error;
        }
    }
    
    /**
     * Posts a new question to the database.
     * @param {number} userid - The ID of the user posting the question.
     * @param {string} content - The content of the question being posted.
     * @returns {Promise<number | undefined>} The ID of the newly inserted question or undefined in case of an error.
     */
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

    /**
     * Retrieves all questions from the database.
     * @returns {Promise<any[]>} An array of objects representing all questions.
     */
    public static async getAllQuestions(): Promise<any[]> {
        try {
            const queryAllQuestions: string = `
                SELECT questions.questionid, questions.content, questions.createdAt, user.username 
                FROM questions 
                JOIN user ON questions.userid = user.userid`;
            const questions: any = await api.queryDatabase(queryAllQuestions);
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
    
    /**
     * Retrieves all personal questions posted by a specific user.
     * @returns {Promise<QuestionQueries[]>} An array of QuestionQueries instances representing the personal questions of a user.
     */
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
