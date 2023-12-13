import "../config";
import { UserController } from "../controller/userController";

const userController : UserController = new UserController();

document.getElementById("btnRegister")?.addEventListener("click", async () => {
    const email: string = (document.getElementById("email") as HTMLInputElement).value;
    const username: string = (document.getElementById("username") as HTMLInputElement).value;
    const firstname: string = (document.getElementById("firstname") as HTMLInputElement).value;
    const lastname: string = (document.getElementById("lastname") as HTMLInputElement).value;
    const password: string = (document.getElementById("password") as HTMLInputElement).value;
    try {
        await userController.register(email, username, firstname, lastname, password);
      
    } catch (error) {
        
    }
});
document.getElementById("myFormLogin")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email: string = (document.getElementById("emailLogin") as HTMLInputElement).value;
    const password: string = (document.getElementById("passwordLogin") as HTMLInputElement).value;

    try {
        await userController.login(email, password);
        
    } catch (error) {
        console.error("Login error:", error);
    
    }
});
document.getElementById("logout")?.addEventListener("click", () => {
    userController.logout();
});
