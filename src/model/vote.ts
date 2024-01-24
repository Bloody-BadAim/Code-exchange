import "../config";
import { api } from "@hboictcloud/api";
import { BaseQueries } from "./baseQa";

export class VoteQueries extends BaseQueries {
    public _answerid: number;
    public _rating: number;

    public constructor(userid: number, username: string, answerid: number, rating: number) {
        super(userid, username);
        this._answerid = answerid;
        this._rating = rating;
    }

    // Check if the user has already rated an answer
    public static async checkRating(userid: number, answerid: number): Promise<any> {
        try {
            const selectString: string = "SELECT rating FROM vote WHERE userid = ? AND answerid = ?";
            const result: any = await api.queryDatabase(selectString, userid, answerid);
            return result.length ? result[0].rating : null;
        } catch (error) {
            console.error("Error checking rating:", error);
            throw error;
        }
    }

    // Insert or update a rating for an answer
    public static async setRating(userid: number, answerid: number, rating: number): Promise<boolean> {
        try {
            const currentRating: any = await this.checkRating(userid, answerid);
            if (currentRating !== null) {
                const updateString: string = "UPDATE vote SET rating = ? WHERE userid = ? AND answerid = ?";
                await api.queryDatabase(updateString, rating, userid, answerid);
            } else {
                const insertString: string = "INSERT INTO vote (userid, answerid, rating) VALUES (?, ?, ?)";
                await api.queryDatabase(insertString, userid, answerid, rating);
            }
            return true;
        } catch (error) {
            console.error("Error setting rating:", error);
            throw error;
        }
    }

    // Get the average rating for an answer
    public static async getUserAverageRating(userid: number): Promise<number> {
        try {
            const queryString: string = `
                SELECT AVG(v.rating) as averageUserRating
                FROM vote v
                JOIN answers a ON v.answerid = a.answerid
                WHERE a.userid = ?
            `;
            const result: any = await api.queryDatabase(queryString, userid);
            return result.length ? result[0].averageUserRating || 0 : 0;
        } catch (error) {
            console.error("Error getting user's average rating:", error);
            throw error;
        }
    }
}