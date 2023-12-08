import "../config";
import { UserProfileManager } from "../models/register";


const userManager: UserProfileManager = new UserProfileManager();

document.getElementById("btnRegister")?.addEventListener("click", async () => {
    const email: string = (document.getElementById("email") as HTMLInputElement).value;
    const username: string = (document.getElementById("username") as HTMLInputElement).value;
    const firstname: string = (document.getElementById("firstname") as HTMLInputElement).value;
    const lastname: string = (document.getElementById("lastname") as HTMLInputElement).value;
    const password: string = (document.getElementById("password") as HTMLInputElement).value;

    try {
        await userManager.register(email, username, firstname, lastname, password);
        // Handle successful registration 
    } catch (error) {
        // Handle registration errors 
    }
});

document.getElementById("myFormLogin")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email: string = (document.getElementById("emailLogin") as HTMLInputElement).value;
    const password: string = (document.getElementById("passwordLogin") as HTMLInputElement).value;
   
    try {
        await userManager.login(email, password);
        
    } catch (error) {
        console.error("Login error:", error);
    
    }
});

document.getElementById("logout")?.addEventListener("click", () => {
    userManager.logout();
    // Handle post-logout 
});
