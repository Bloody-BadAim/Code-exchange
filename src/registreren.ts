import "./config";
import { session } from "@hboictcloud/api";
import { createAccount, validateLogin, getInfoData, checkEmailExists } from "./databaseQuery";




const btn: any = document.getElementById("btnRegister") as HTMLButtonElement;
if(btn) {
    btn.addEventListener("click", setup);
}

async function setup(): Promise<void> {

    const email: string = (<HTMLInputElement>document.getElementById("email")).value;
    const username: string = (<HTMLInputElement>document.getElementById("username")).value;
    const firstname: string = (<HTMLInputElement>document.getElementById("firstname")).value;
    const lastname: string = (<HTMLInputElement>document.getElementById("lastname")).value;
    const password: string = (<HTMLInputElement>document.getElementById("password")).value;

    const check: boolean | undefined = await checkEmailExists(email);
    console.log(check);
    if(check === false) {
        const done: number | undefined = await createAccount(email, username, firstname, lastname, password);
        if (done !== undefined) {
            alert("Succesfull, registration complete!");
            window.location.replace("./login.html");
        }else {
            console.log("Registration failed");
            alert("Registration failed");
        }
    }else {
        console.log("registration failed, email already exists");
        alert("registration failed, email already exists");
    } 
}

const btnLogin: any = document.getElementById("btnLogin") as HTMLButtonElement;
if(btnLogin) {
    btnLogin.addEventListener("click", login);
}

async function login(): Promise<any> {
    const email: string = (<HTMLInputElement>document.getElementById("emailLogin")).value;
    const password: string = (<HTMLInputElement>document.getElementById("passwordLogin")).value;

    const done: number | undefined = await validateLogin(email, password);

    if(done) {
        const doneNew: string = String(done);
        sessionStorage.setItem("userid", doneNew);
        const getInfo: number = await getInfoData(done);
        window.location.href = "main.html";

        if(getInfo) {
            window.location.reload();
            window.location.href = "main.html";
        }
    }
}


