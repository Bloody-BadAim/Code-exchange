import "../config";
import { api } from "@hboictcloud/api";

export class UserQueries {
    
    public _id: number;
    public _username: string;
    public _email: string;
    public _firstname: string;
    public _lastname: string;

    public constructor(id: number, username: string, email: string, firstname: string, lastname: string) {
        this._id = id;
        this._username = username;
        this._email = email;
        this._firstname = firstname;
        this._lastname = lastname;
    }

    public static async checkEmailExists(email: string): Promise<boolean> {
        try {

            const result: { count: number }[] | any = await api.queryDatabase("SELECT COUNT(*) AS count FROM user WHERE email = ?", [email]);

            if (typeof result === "string") {
                throw new Error(`Database error: ${result}`);
            }

            const count: number = result[0].count;
            return count > 0;
        } catch (error) {

            console.error("Error checking if email exists:", error);
            throw error;
        }
    }

    public static async checkUsernameExists(username: string): Promise<boolean> {
        try {
            const result: { count: number }[] | any = await api.queryDatabase("SELECT COUNT(*) AS count FROM user WHERE username = ?", [username]);

            if (typeof result === "string") {
                throw new Error(`Database error: ${result}`);
            }
            const count: number = result[0].count;
            return count > 0;
        } catch (error) {
            console.error("Error checking if username exists", error);
            throw error;
        }
    }

    public static async createAccount(email: string, username: string, firstname: string, lastname: string, password: string): Promise<number | undefined> {
        try {
            const createAccountString: string = "INSERT INTO user (email, username, firstname, lastname, password) VALUES (?, ?, ?, ?, ?)";
            const registerData: any = await api.queryDatabase(createAccountString, email, username, firstname, lastname, password);
            const userId: number = registerData.insertId;
            return userId;
        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    }

    public static async validateLogin(email: string, password: string): Promise<number | undefined> {
        try {
            const validateLoginString: string = "SELECT userid, password FROM user WHERE email = ?";
            const userData: any = await api.queryDatabase(validateLoginString, email);

            if (userData.length === 0) {
                console.log("No user found with that email");
                return undefined;
            }

            const user: any = userData[0];

            if (user.password === password) {
                return user.userid;
            } else {
                return undefined;
            }
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    }

    public static async getInfoData(userid: number): Promise<{ email: string, firstname: string, lastname: string, username: string } | null> {
        try {
            const getInfoDataString: string = "SELECT email, username, firstname, lastname FROM user WHERE userid = ?";
            const getData: any = await api.queryDatabase(getInfoDataString, userid);

            if (getData.length === 0) {
                console.log("Could not get user info.");
                return null;
            } else {
                const user: any = getData[0];
                return { email: user.email, firstname: user.firstname, lastname: user.lastname, username: user.username };
            }
        } catch (error) {
            console.log("Error during getting user info:", error);
            throw error;
        }
    }
    public static async updateProfileFunction(key: string, input: string | number): Promise<boolean> {
        const userid: string | null = sessionStorage.getItem("userid");
        const newUserid: number = Number(userid);
        const updateProfile: any = `UPDATE user SET ${key} = ? WHERE userid = ?`;
        const updateReal: any = await api.queryDatabase(updateProfile, input, newUserid);
        return updateReal;
    }

    public static async deleteProfile(userid: string | null): Promise<boolean> {
        const newUserid: number = Number(userid);
        const deleteString: string = "DELETE FROM user WHERE userid = ?";
        const deleteStringFunction: any = await api.queryDatabase(deleteString, newUserid);
        return deleteStringFunction;

    }
}