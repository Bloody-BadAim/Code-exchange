import "../config";
import { UserQueries } from "../models/userQuary";

export class UserProfileManager {


    public async register(email: string, username: string, firstname: string, lastname: string, password: string): Promise<void> {
        try {
            const emailExists: boolean = await UserQueries.checkEmailExists(email);
            if (emailExists) {
                throw new Error("Email already exists");
            }

            const usernameExists: boolean = await UserQueries.checkUsernameExists(username);
            if (usernameExists) {
                throw new Error("Username already exists");
            }

            const userId: number | undefined = await UserQueries.createAccount(email, username, firstname, lastname, password);
            if (userId === undefined) {
                throw new Error("Registration failed");
            }

            // Setting session storage
            sessionStorage.setItem("userid", String(userId));
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("firstname", firstname);
            sessionStorage.setItem("lastname", lastname);
            sessionStorage.setItem("username", username);

            alert("Registration successful!");
            window.location.href = "./main.html";
        } catch (error) {
            alert(`Registration failed: ${error}`);
        }
    }

    public async login(email: string, password: string): Promise<void> {
        try {
            const userId: number | undefined = await UserQueries.validateLogin(email, password);
            if (!userId) {
                throw new Error("Invalid email or password");
            }

            const userInfo:any = await UserQueries.getInfoData(userId);
            if (!userInfo) {
                throw new Error("Unable to retrieve user information");
            }

            sessionStorage.setItem("userid", String(userId));
            sessionStorage.setItem("email", userInfo.email);
            sessionStorage.setItem("firstname", userInfo.firstname);
            sessionStorage.setItem("lastname", userInfo.lastname);
            sessionStorage.setItem("username", userInfo.username);

            alert("Login successful!");
            window.location.href = "main.html";
        } catch (error) {
            alert(`Login failed: ${error}`);
        }
    }

    public logout(): void {
        sessionStorage.clear();
        alert("You have been logged out.");
        window.location.replace("/index.html");
    }

    public async updateProfile(firstname: string, lastname: string, username: string, email: string): Promise<void> {
        try {
            const userId: string = sessionStorage.getItem("userid")!;
            if (!userId) {
                throw new Error("User not logged in");
            }

            // Update each profile attribute if it's provided
            if (firstname) {
                await UserQueries.updateProfileFunction("firstname", firstname);
                sessionStorage.setItem("firstname", firstname);
            }
            if (lastname) {
                await UserQueries.updateProfileFunction("lastname", lastname);
                sessionStorage.setItem("lastname", lastname);
            }
            if (username) {
                await UserQueries.updateProfileFunction("username", username);
                sessionStorage.setItem("username", username);
            }
            if (email) {
                await UserQueries.updateProfileFunction("email", email);
                sessionStorage.setItem("email", email);
            }

            alert("Profile successfully updated");
        } catch (error) {
            alert(`Update failed: ${error}`);
        }
    }

    public async deleteProfile(): Promise<void> {
        try {
            const userId : string = sessionStorage.getItem("userid")!;
            if (!userId) {
                throw new Error("User not logged in");
            }

            await UserQueries.deleteProfile(userId);
            this.logout();
            alert("Your account has been deleted.");
        } catch (error) {
            alert(`Deletion failed: ${error}`);
        }
    }
}
