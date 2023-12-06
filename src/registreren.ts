import "./config";
import { session } from "@hboictcloud/api";
import { createAccount, validateLogin, getInfoData, checkEmailExists, checkUsernameExists } from "./databaseQuery";




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
        const checkUsername: boolean | undefined = await checkUsernameExists(username);
        
        if(checkUsername === false) {
            
            const done: number | undefined = await createAccount(email, username, firstname, lastname, password);
            
            if (done !== undefined) {
                alert("Succesfull, registration complete!");
                window.location.replace("./login.html");
            
            }else {
                console.log("Registration failed");
                alert("Registration failed");
                location.reload();

            }
        
        }else {
            console.log("username already exists.");
            alert("registration failed, username already exists.");
            location.reload();
        } 

    }else {
        console.log("registration failed, email already exists");
        alert("registration failed, email already exists");
        location.reload();
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


const btnLogout: any = document.getElementById("logout") as HTMLButtonElement;
if(btnLogout) {
    btnLogout.addEventListener("click", logout);

}
function logout(): void {
    const sessie: any = sessionStorage.clear();
    if(sessie) {
        window.location.replace("/index.html");
    }
}

