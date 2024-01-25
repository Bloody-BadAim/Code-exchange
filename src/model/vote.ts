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

    public static async getAllAnswers(userid: number): Promise<number[] | unknown> {
        try{
            const allAnswers: any = await api.queryDatabase("SELECT answerid FROM answers WHERE userid = ?", userid);
            return allAnswers;
        }catch(error){
            console.log("error getting users all answers", error);
            return error;
        }
    }

    public static async count(answerid: number): Promise<any>{
        try{
            const count: any = await api.queryDatabase("");
           
        }catch(error){
            console.log("error at counting", error);
            return error;
        }
    }

    // Get the average rating for an answer
    public static async getUserAverageRating(answerid: number): Promise<number | unknown> {
        try{
            const getAverage: any = await api.queryDatabase("SELECT sum(rating) FROM vote WHERE answerid = ?", answerid);
            return getAverage;

        }catch(error){
            console.log("error with getting average", error);
            return error;
        }
    }    
         
}