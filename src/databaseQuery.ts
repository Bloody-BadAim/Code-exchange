import "./config";
import { api, session } from "@hboictcloud/api";

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

export async function validateLogin(email: string ): Promise<undefined> {
    try {
        const validateLoginString: string = "SELECT email, password, userid FROM user WHERE email = ?";
 
        const userData: any = await api.queryDatabase(validateLoginString, email);
 
        if (!userData[0]) {
            alert("This user doesn't exist");
            return;
        }else {
            session.set("email", userData[0].email);
            session.set("password", userData[0].password);
            session.set("userid", userData[0].userid);
            window.location.replace("./index.html");
            return;
        }
 
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}