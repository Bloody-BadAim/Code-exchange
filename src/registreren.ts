import "./config";
import { api, session } from "@hboictcloud/api";
import { createAccount, validateLogin } from "./databaseQuery";




const btn: any = document.getElementById("btnRegister") as HTMLButtonElement;
btn.addEventListener("click", setup);

async function setup(): Promise<void> {

    const email: string = (<HTMLInputElement>document.getElementById("email")).value;
    const username: string = (<HTMLInputElement>document.getElementById("username")).value;
    const firstname: string = (<HTMLInputElement>document.getElementById("firstname")).value;
    const lastname: string = (<HTMLInputElement>document.getElementById("lastname")).value;
    const password: string = (<HTMLInputElement>document.getElementById("password")).value;

    const done: number | undefined = await createAccount(email, username, firstname, lastname, password);


    if (done !== undefined) {
        alert("Succesfull, registration complete!");
        window.location.replace("./login.html");
    }else {
        console.log("Registration failed");
        alert("Registration failed");
    }
    
}

const btnLogin: any = document.getElementById("btnLogin") as HTMLButtonElement;
btnLogin.addEventListener("click", login);

async function login(): Promise<void> {
    const email: string = (<HTMLInputElement>document.getElementById("emailLogin")).value;
    // const password: string = (<HTMLInputElement>document.getElementById("passwordLogin")).value;

    const done: number | undefined = await validateLogin(email);

}

const btnLogout: any = document.getElementById("logout") as HTMLButtonElement;
btnLogout.addEventListener("click", logout);

function logout(): void {
    const sessie: any = session.clear();
    if(sessie) {
        window.location.replace("/index.html");
    }
}



// session.set(email, "email");
// session.set(username, "username");
// session.set(firstname, "firstname");
// session.set(lastname, "lastname");
// session.set(password, "password");



// const btn: any = document.getElementById("btnRegister") as HTMLButtonElement;
// btn.addEventListener("click", register);