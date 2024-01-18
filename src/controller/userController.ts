import { UserQueries } from "../model/user";

/**
 * Class representing the controller for user-related actions.
 */
export class UserController {

    /**
     * Registers a new user.
     * @param {string} email - User's email address.
     * @param {string} username - User's username.
     * @param {string} firstname - User's first name.
     * @param {string} lastname - User's last name.
     * @param {string} password - User's password.
     * @returns {Promise<void>} A promise that resolves when registration is complete.
     */
    public async register(email: string, username: string, firstname: string, lastname: string, password: string): Promise<void> {
        if (!email.trim() || !username.trim() || !firstname.trim() || !lastname.trim() || !password.trim()) {
            alert("All fields are required.");
            return; // Exit the function if any field is empty
        }
        try {
            // Check if email exists
            const emailExists: boolean = await UserQueries.checkEmailExists(email);
            if (emailExists) {
                throw new Error("Email already exists");
            }

            // Check if username exists
            const usernameExists: boolean = await UserQueries.checkUsernameExists(username);
            if (usernameExists) {
                throw new Error("Username already exists");
            }

            // Create account
            const userId: number | undefined = await UserQueries.createAccount(email, username, firstname, lastname, password);
            if (userId === undefined) {
                throw new Error("Registration failed");
            }

            // Set session storage and navigate to the main page
            sessionStorage.setItem("userid", String(userId));
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("firstname", firstname);
            sessionStorage.setItem("lastname", lastname);
            sessionStorage.setItem("username", username);

            alert("Registration successful!");
            window.location.href = "./main.html";
        } catch (error) {
            alert(`Login failed: ${error}`);
        }
    }

    /**
     * Logs in a user.
     * @param {string} email - User's email address.
     * @param {string} password - User's password.
     * @returns {Promise<void>} A promise that resolves when the login process is complete.
     */
    public async login(email: string, password: string): Promise<void> {
        try {
            // Validate login
            const userId: number | undefined = await UserQueries.validateLogin(email, password);
            if (!userId) {
                throw new Error("Invalid email or password");
            }

            // Retrieve user information and update session storage
            const userInfo: any = await UserQueries.getInfoData(userId);
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

    /**
     * Logs out the current user.
     */
    public logout(): void {
        // Confirmation dialog
        const isConfirmed: boolean = window.confirm("Are you sure you want to log out?");
    
        if (isConfirmed) {
            // Clear session storage and navigate to the login page
            sessionStorage.clear();
            alert("You have been logged out.");
            window.location.replace("/index.html");
        } else {
            // If the user clicks "Cancel", do nothing (stay on the current page)
            console.log("Logout cancelled.");
        }
    }

    /**
     * Updates the profile of the current user.
     * @param {string} firstname - User's first name.
     * @param {string} lastname - User's last name.
     * @param {string} username - User's username.
     * @param {string} email - User's email address.
     * @returns {Promise<void>} A promise that resolves when the profile update is complete.
     */
    public async updateProfile(firstname: string, lastname: string, username: string, email: string): Promise<void> {
        try {
            // Retrieve the user ID from session storage
            const userId: string = sessionStorage.getItem("userid")!;
            if (!userId) {
                throw new Error("User not logged in");
            }

            // Update profile information
            await Promise.all([
                firstname ? UserQueries.updateProfileFunction("firstname", firstname) : null,
                lastname ? UserQueries.updateProfileFunction("lastname", lastname) : null,
                username ? UserQueries.updateProfileFunction("username", username) : null,
                email ? UserQueries.updateProfileFunction("email", email) : null,
            ]);

            // Update session storage
            if (firstname) sessionStorage.setItem("firstname", firstname);
            if (lastname) sessionStorage.setItem("lastname", lastname);
            if (username) sessionStorage.setItem("username", username);
            if (email) sessionStorage.setItem("email", email);

            alert("Profile successfully updated");
        } catch (error) {
            alert(`Update failed: ${error}`);
        }
        // Post-update logic, such as refreshing the page or showing a message
    }

    /**
     * Deletes the profile of the current user.
     * @returns {Promise<void>} A promise that resolves when the profile deletion is complete.
     */
    public async deleteProfile(): Promise<boolean | undefined> {
        try {
            // Confirmation dialog
            const isConfirmed: boolean = window.confirm("Are you sure you want to delete your profile? This action cannot be undone.");
    
            if (!isConfirmed) {
                console.log("Profile deletion cancelled.");
                return false; // Return false when deletion is cancelled
            }
    
            const userId: string = sessionStorage.getItem("userid")!;
            if (!userId) {
                throw new Error("User not logged in");
            }
    
            await UserQueries.deleteProfile(userId);
            sessionStorage.clear();
            window.location.replace("/index.html");
            return true; // Return true when deletion is successful
    
        } catch (error) {
            alert(`Deletion failed: ${error}`);
            return undefined; // Return undefined in case of an error
        }
    }
    

}
