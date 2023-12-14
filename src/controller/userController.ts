import { UserQueries } from "../model/userQuary";

export class UserController {

    public async register(email: string, username: string, firstname: string, lastname: string, password: string): Promise<void> {
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

    public async deleteProfile(): Promise<void> {
        try {
            // Confirmation dialog
            const isConfirmed: boolean = window.confirm("Are you sure you want to delete your profile? This action cannot be undone.");
    
            if (!isConfirmed) {
                console.log("Profile deletion cancelled.");
                return; // Exit the function if the user cancels
            }
    
            // Retrieve the user ID from session storage
            const userId: string = sessionStorage.getItem("userid")!;
            if (!userId) {
                throw new Error("User not logged in");
            }
    
            // Delete the profile
            await UserQueries.deleteProfile(userId);
            this.logout(); // This will navigate away from the current page
            alert("Your account has been deleted."); // This alert might not be shown due to page navigation
        } catch (error) {
            alert(`Deletion failed: ${error}`);
        }
    }


    public checkStorageForNavbar(): Promise<boolean | undefined> {
        try{
            const info: any = this.UserController.checkNavbar();
            return info;
        } catch (error){
            throw error;
        }
    }

}
