import { UserQueries } from "../model/user";

export class UserController {
    /**
     * Registers a new user using the information provided.
     * @param email User's email address.
     * @param username User's username.
     * @param firstname User's first name.
     * @param lastname User's last name.
     * @param password User's password.
     * @returns A Promise resolving to the user ID on success.
     */
    public async register(email: string, username: string, firstname: string, lastname: string, password: string): Promise<number> {
        // Validate input
        if (!email || !username || !firstname || !lastname || !password) {
            throw new Error("All fields are required.");
        }

        // Check if email or username already exists
        if (await UserQueries.checkEmailExists(email)) {
            throw new Error("Email already exists.");
        }

        if (await UserQueries.checkUsernameExists(username)) {
            throw new Error("Username already exists.");
        }

        // Create a new user account
        const userId: number | undefined = await UserQueries.createAccount(email, username, firstname, lastname, password);
        if (!userId) {
            throw new Error("Registration failed.");
        }

        // Set user information in session storage
        this.setUserSession(userId, firstname, lastname, username, email);

        return userId;
    }

    /**
     * Attempts to log in a user with the provided email and password.
     * @param email User's email address.
     * @param password User's password.
     * @returns A Promise resolving to the user ID on successful login.
     */
    public async login(email: string, password: string): Promise<number> {
        const userId: number | undefined = await UserQueries.validateLogin(email, password);
        if (!userId) {
            throw new Error("Invalid email or password.");
        }

        const userInfo:any = await UserQueries.getInfoData(userId);
        if (!userInfo) {
            throw new Error("Unable to retrieve user information.");
        }

        // Set user information in session storage
        this.setUserSession(userId, userInfo.firstname, userInfo.lastname, userInfo.username, userInfo.email);

        return userId;
    }

    /**
     * Logs out the current user by clearing the session storage.
     */
    public logout(): void {
        sessionStorage.clear();
    }

    /**
     * Updates the current user's profile with the provided information.
     * @param firstname User's new first name.
     * @param lastname User's new last name.
     * @param username User's new username.
     * @param email User's new email address.
     * @returns A Promise resolving to true if the update was successful.
     */
    public async updateProfile(firstname: string, lastname: string, username: string, email: string): Promise<boolean> {
        const userId: number  = this.getCurrentUserId()!;
        if (!userId) {
            throw new Error("User not logged in.");
        }

        const updates: any[] = [];
        if (firstname) updates.push(UserQueries.updateProfileFunction("firstname", firstname));
        if (lastname) updates.push(UserQueries.updateProfileFunction("lastname", lastname));
        if (username) updates.push(UserQueries.updateProfileFunction("username", username));
        if (email) updates.push(UserQueries.updateProfileFunction("email", email));

        await Promise.all(updates);

        // Update session storage
        if (firstname) sessionStorage.setItem("firstname", firstname);
        if (lastname) sessionStorage.setItem("lastname", lastname);
        if (username) sessionStorage.setItem("username", username);
        if (email) sessionStorage.setItem("email", email);

        return true;
    }

    /**
     * Deletes the profile of the current logged-in user.
     * @returns A Promise resolving to true if the profile was successfully deleted.
     */
    public async deleteProfile(): Promise<boolean> {
        const userId: number = this.getCurrentUserId()!;
        if (!userId) {
            throw new Error("User not logged in.");
        }
    
        // Convert userId to string before passing to deleteProfile
        await UserQueries.deleteProfile(userId.toString());
        sessionStorage.clear();
    
        return true;
    }
    private getCurrentUserId(): number | null {
        const userId: string = sessionStorage.getItem("userid")!;
        return userId ? parseInt(userId) : null;
    }

    private setUserSession(userId: number, firstname: string, lastname: string, username: string, email: string): void {
        sessionStorage.setItem("userid", userId.toString());
        sessionStorage.setItem("firstname", firstname);
        sessionStorage.setItem("lastname", lastname);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("email", email);
    }

}
