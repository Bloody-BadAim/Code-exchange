import { 
    checkEmailExists, 
    checkUsernameExists, 
    createAccount, 
    deleteProfile, 
    getInfoData, 
    updateProfileFunction, 
    validateLogin 
} from "../controller/databaseQuery";

export class UserProfileManager {

    
    public async register(email: string, username: string, firstname: string, lastname: string, password: string): Promise<void> {
        try {
            const emailExists: boolean = await checkEmailExists(email);
            if (emailExists) {
                throw new Error("Email already exists");
            }

            const usernameExists: boolean = await checkUsernameExists(username);
            if (usernameExists) {
                throw new Error("Username already exists");
            }

            const userId: number | undefined = await createAccount(email, username, firstname, lastname, password);
            if (userId === undefined) {
                throw new Error("Registration failed");
            }

           
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
            const userId: number | undefined = await validateLogin(email, password);
            if (!userId) {
                throw new Error("Invalid email or password");
            }

            const userInfo: any = await getInfoData(userId);
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

            const updateFirstname: boolean = await updateProfileFunction("firstname", firstname);
            const updateLastname: boolean = await updateProfileFunction("lastname", lastname);
            const updateUsername: boolean = await updateProfileFunction("username", username);
            const updateEmail: boolean = await updateProfileFunction("email", email);

            if (updateFirstname && updateLastname && updateUsername && updateEmail) {
              
                sessionStorage.setItem("firstname", firstname);
                sessionStorage.setItem("lastname", lastname);
                sessionStorage.setItem("username", username);
                sessionStorage.setItem("email", email);

                alert("Profile successfully updated");
            } else {
                throw new Error("Profile update failed");
            }
        } catch (error) {
            alert(`Update failed: ${error}`);
        }
    }

   
    public async deleteProfile(): Promise<void> {
        try {
            const userId: string = sessionStorage.getItem("userid")!;
            if (!userId) {
                throw new Error("User not logged in");
            }

            await deleteProfile(userId);
            this.logout(); 
            alert("Your account has been deleted.");
        } catch (error) {
            alert(`Deletion failed: ${error}`);
        }
    }
}
