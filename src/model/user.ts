import "../config";
import { api } from "@hboictcloud/api";
import { BaseQueries } from "./baseQa";

/**
 * Class representing the queries related to users in a Q&A application.
 * Extends from BaseQueries.
 */
export class UserQueries extends BaseQueries {
    /**
     * Public member representing the user's email.
     */
    public _email: string;

    /**
     * Public member representing the user's first name.
     */
    public _firstname: string;

    /**
     * Public member representing the user's last name.
     */
    public _lastname: string;

    /**
     * Constructs a new instance of the UserQueries class.
     * @param {number} userid - The unique identifier for a user.
     * @param {string} username - The username of the user.
     * @param {string} email - The email address of the user.
     * @param {string} firstname - The first name of the user.
     * @param {string} lastname - The last name of the user.
     */
    public constructor(userid: number, username: string, email: string, firstname: string, lastname: string) {
        super(userid, username);
        this._email = email;
        this._firstname = firstname;
        this._lastname = lastname;
    }

    /**
     * Checks if an email already exists in the database.
     * @param {string} email - The email to check.
     * @returns {Promise<boolean>} True if the email exists, false otherwise.
     */
    public static async checkEmailExists(email: string): Promise<boolean> {
        try {
            const result: any = await api.queryDatabase("SELECT COUNT(*) AS count FROM user WHERE email = ?", [email]);
            return result[0].count > 0;
        } catch (error) {
            console.error("Error checking if email exists:", error);
            throw error;
        }
    }

    /**
     * Checks if a username already exists in the database.
     * @param {string} username - The username to check.
     * @returns {Promise<boolean>} True if the username exists, false otherwise.
     */
    public static async checkUsernameExists(username: string): Promise<boolean> {
        try {
            const result: any = await api.queryDatabase("SELECT COUNT(*) AS count FROM user WHERE username = ?", [username]);
            return result[0].count > 0;
        } catch (error) {
            console.error("Error checking if username exists", error);
            throw error;
        }
    }

    /**
     * Creates a new user account.
     * @param {string} email - The email address for the new account.
     * @param {string} username - The username for the new account.
     * @param {string} firstname - The first name of the new user.
     * @param {string} lastname - The last name of the new user.
     * @param {string} password - The password for the new account.
     * @returns {Promise<number | undefined>} The user ID of the newly created account or undefined in case of an error.
     */
    public static async createAccount(email: string, username: string, firstname: string, lastname: string, password: string): Promise<number | undefined> {
        try {
            const registerData: any = await api.queryDatabase("INSERT INTO user (email, username, firstname, lastname, password) VALUES (?, ?, ?, ?, ?)", email, username, firstname, lastname, password);
            return registerData.insertId;
        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    }

    /**
     * Validates a user login.
     * @param {string} email - The email address of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise<number | undefined>} The user ID if login is successful, undefined otherwise.
     */
    public static async validateLogin(email: string, password: string): Promise<number | undefined> {
        try {
            const userData: any = await api.queryDatabase("SELECT userid, password FROM user WHERE email = ?", email);
            if (userData.length === 0) {
                console.log("No user found with that email");
                return undefined;
            }
            return userData[0].password === password ? userData[0].userid : undefined;
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    }

    /**
     * Retrieves user information data.
     * @param {number} userid - The user ID for which to retrieve information.
     * @returns {Promise<{ email: string, firstname: string, lastname: string, username: string } | null>} User information data or null if not found.
     */
    public static async getInfoData(userid: number): Promise<{ email: string, firstname: string, lastname: string, username: string } | null> {
        try {
            const getData: any = await api.queryDatabase("SELECT email, username, firstname, lastname FROM user WHERE userid = ?", userid);
            if (getData.length === 0) {
                console.log("Could not get user info.");
                return null;
            }
            const user: any = getData[0];
            return { email: user.email, firstname: user.firstname, lastname: user.lastname, username: user.username };
        } catch (error) {
            console.log("Error during getting user info:", error);
            throw error;
        }
    }

    /**
     * Updates the profile of a user.
     * @param {string} key - The field key to update.
     * @param {string | number} input - The new value for the specified key.
     * @returns {Promise<boolean>} True if the update was successful, false otherwise.
     */
    public static async updateProfileFunction(key: string, input: string | number): Promise<boolean> {
        const userid: string | null = sessionStorage.getItem("userid");
        const newUserid: number = Number(userid);
        const updateReal: any = await api.queryDatabase(`UPDATE user SET ${key} = ? WHERE userid = ?`, input, newUserid);
        return updateReal;
    }

    /**
     * Deletes a user profile.
     * @param {string | null} userid - The user ID of the profile to delete.
     * @returns {Promise<boolean>} True if the deletion was successful, false otherwise.
     */
    public static async deleteProfile(userid: string | null): Promise<boolean> {
        const newUserid: number = Number(userid);
        const deleteStringFunction: any = await api.queryDatabase("DELETE FROM user WHERE userid = ?", newUserid);
        return deleteStringFunction;
    }
}
