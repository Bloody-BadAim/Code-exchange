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
        const createAccountString: string = "INSERT INTO user (email, username, firstname, lastname, password) VALUES (?, ?, ?, ?, ?)";
        const registerData: any = await api.queryDatabase(createAccountString, email, username, firstname, lastname, password);
        // Assuming 'insertId' is the property holding the newly created user ID
        const userId: number = registerData.insertId;
        return userId;
    } catch (error) {
        console.error("Error creating account:", error);
        throw error;
    }
}

export async function validateLogin(email: string, password: string): Promise<number | undefined> {
    try {
        const validateLoginString: string = "SELECT userid, password FROM user WHERE email = ?";
        const userData: any = await api.queryDatabase(validateLoginString, email);

        if (userData.length === 0) {
            console.log("No user found with that email");
            return undefined;
        }

        const user:any = userData[0];

        // Assuming you're storing plaintext passwords (not recommended)
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

export async function getInfoData(userid: number): Promise<{ email: string, firstname: string, lastname: string , username:string } | null> {
    try {
        const getInfoDataString: string = "SELECT email, username, firstname, lastname FROM user WHERE userid = ?";
        const getData: any = await api.queryDatabase(getInfoDataString, userid);

        if (getData.length === 0) {
            console.log("Could not get user info.");
            return null;
        } else {
            const user:any = getData[0];
            return { email: user.email, firstname: user.firstname, lastname: user.lastname,username: user.username };
        }
    } catch (error) {
        console.log("Error during getting user info:", error);
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

export async function postAnswer(questionId: number, userId: number, contentAnswer: string): Promise<number | undefined> {
    try {
        const queryAnswer: string = "INSERT INTO answers (questionid, userid, contentAnswer) VALUES (?, ?, ?)";
        const result: any = await api.queryDatabase(queryAnswer, questionId, userId, contentAnswer);
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

// export async function updateProfileFunction(key: string, input: string | number): Promise<boolean> {
    
// }