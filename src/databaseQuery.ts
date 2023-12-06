import "./config";
import { api } from "@hboictcloud/api";

interface Question {
    id: number;
    content: string;
    user_id: number;
}

interface Answer {
    id: number;
    content: string;
    question_id: number;
    user_id: number;
}

export async function checkEmailExists(email: string): Promise<boolean> {
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

export async function checkUsernameExists(username: string): Promise<boolean> {
    try{
        const result: { count: number}[] | any = await api.queryDatabase("SELECT COUNT(*) AS count FROM user WHERE username = ?", [username]);

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

export async function createAccount(email: string, username: string, firstname: string, lastname: string, password: string): Promise<number | undefined> {
    try {
        const createAccountString: string = "INSERT INTO user (email, username, firstname, lastname, password) VALUES ( ? , ? , ? , ? , ? )";
        const registerData: any = await api.queryDatabase(createAccountString, email, username, firstname, lastname, password);
        const userId: number = Number(registerData);

        return userId;
    } catch (error) {
        console.error("Error creating account:", error);
        throw error;
    }
}

export async function validateLogin(email: string, password: string): Promise<number | undefined> {
    try {
        const validateLoginString: string = "SELECT email, password, userid FROM user WHERE email = ?";
 
        const userData: any = await api.queryDatabase(validateLoginString, email);
 
        if (userData.length === 0) {
            console.log("no users found");
            alert("no users found");
            return undefined;
        }
 
        const user: {
            userid: number,
            email: string,
            password: string,
        } = userData[0];

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


export async function getInfoData (userid: number): Promise<any> {
    try{
        const getInfoDataString: string = "SELECT email, username, firstname, lastname, password FROM user WHERE userid = ?";
        const getData: any = await api.queryDatabase(getInfoDataString, userid);

        if(getData.length === 0) {
            console.log("couldnt get user info.");
        } else {
            const user:  {
                userid: number,
                email: string, 
                firstname: string,
                lastname: string,
                password: string,
            } = getData[0];

            sessionStorage.setItem("email", user.email),
            sessionStorage.setItem("firstname", user.firstname),
            sessionStorage.setItem("lastname", user.lastname),
            sessionStorage.setItem("password", user.password);
        }
    } catch (error) {
        console.log("error during getting user info:", error);
        throw error;
    }
}

export async function postQuestion(userId: number, content: string): Promise<number | undefined> {
    try {
        const queryQuestion: string = "INSERT INTO questions (userid, content) VALUES (?, ?)";
        const result: any = await api.queryDatabase(queryQuestion, userId, content);
        return result.insertId;
    } catch (error) {
        console.error("Error posting question:", error);
        throw error;
    }
}

export async function getAllQuestions(): Promise<Question[]> {
    try {
        const queryAllQuestions: string = "SELECT * FROM questions";
        const questions:any = await api.queryDatabase(queryAllQuestions);
        return questions;
    } catch (error) {
        console.error("Error getting questions:", error);
        throw error;
    }
}

export async function postAnswer(questionId: number, userId: number, content: string): Promise<number | undefined> {
    try {
        const queryAnswer: string = "INSERT INTO answers (questionid, userid, content) VALUES (?, ?, ?)";
        const result: any = await api.queryDatabase(queryAnswer, questionId, userId, content);
        return result.insertId;
    } catch (error) {
        console.error("Error posting answer:", error);
        throw error;
    }
}


export async function getQuestionById(questionId: number): Promise<Question | undefined> {
    try {
        const queryGetQ:string = "SELECT * FROM questions WHERE id = ?";
        const result: any = await api.queryDatabase(queryGetQ, questionId);
        return result.length > 0 ? result[0] : undefined;
    } catch (error) {
        console.error("Error getting question by ID:", error);
        throw error;
    }
}

export async function getAnswersByQuestionId(questionId: number): Promise<Answer[]> {
    try {
        const queryGeta:string = "SELECT * FROM answers WHERE questionid = ?";
        const answers: any = await api.queryDatabase(queryGeta, questionId);
        return answers;
    } catch (error) {
        console.error("Error getting answers by question ID:", error);
        throw error;
    }
}
