import "../config";
import { UserLogin, UserLogout, UserRegistration } from "../models/register";


document.getElementById("btnRegister")?.addEventListener("click", async () => {
    const email:string = (document.getElementById("email") as HTMLInputElement).value;
    const username:string = (document.getElementById("username") as HTMLInputElement).value;
    const firstname:string = (document.getElementById("firstname") as HTMLInputElement).value;
    const lastname:string = (document.getElementById("lastname") as HTMLInputElement).value;
    const password:string = (document.getElementById("password") as HTMLInputElement).value;

    const userRegistration: UserRegistration = new UserRegistration(email, username, firstname, lastname, password);
    await userRegistration.register();
});

document.getElementById("myFormLogin")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email: string = (document.getElementById("emailLogin") as HTMLInputElement).value;
    const password: string = (document.getElementById("passwordLogin") as HTMLInputElement).value;

    const userLogin: UserLogin = new UserLogin(email, password);
    await userLogin.login();
});


document.getElementById("logout")?.addEventListener("click", () => {
    const userLogout: UserLogout = new UserLogout();
    userLogout.logout();
});
