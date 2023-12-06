import "./config";
import { createAccount, validateLogin, getInfoData, checkEmailExists, checkUsernameExists } from "./databaseQuery";

class UserRegistration {
    private email: string;
    private username: string;
    private firstname: string;
    private lastname: string;
    private password: string;

    public constructor(email: string, username: string, firstname: string, lastname: string, password: string) {
        this.email = email;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
    }

    public async register(): Promise<void> {
        const emailExists:boolean = await checkEmailExists(this.email);
        if (emailExists) {
            this.alertFailure("email already exists");
            return;
        }

        const usernameExists:boolean = await checkUsernameExists(this.username);
        if (usernameExists) {
            this.alertFailure("username already exists");
            return;
        }

        if (!this.validateInputs()) {
            this.alertFailure("All fields are required.");
            return;
        }

        const accountId:number | undefined = await createAccount(this.email, this.username, this.firstname, this.lastname, this.password);
        if (accountId !== undefined) {
            this.alertSuccess();
        } else {
            this.alertFailure("Registration failed");
        }
    }

    private alertSuccess(): void {
        alert("Successful, registration complete!");
        window.location.replace("./main.html");
    }
    private validateInputs(): boolean {
        return this.email.trim() !== "" && this.username.trim() !== "" && this.firstname.trim() !== "" && this.lastname.trim() !== "" && this.password.trim() !== "";
    }

    private alertFailure(message: string): void {
        console.log(message);
        alert(`Registration failed, ${message}`);
    }
}
class UserLogin {
    private email: string;
    private password: string;

    public constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    public async login(): Promise<void> {
        const userId: number | undefined = await validateLogin(this.email, this.password);
        if (userId) {
            sessionStorage.setItem("userid", String(userId));
            const userInfo:any = await getInfoData(userId);
            if (userInfo) {
                sessionStorage.setItem("email", userInfo.email);
                sessionStorage.setItem("firstname", userInfo.firstname);
                sessionStorage.setItem("lastname", userInfo.lastname);
                sessionStorage.setItem("username", userInfo.username);
                
                this.alertSuccess();
            } else {
                this.alertFailure("Unable to retrieve user information");
            }
        } else {
            this.alertFailure("Invalid email or password");
        }
    }

    private alertSuccess(): void {
        alert("Login successfull!");
        window.location.href = "main.html";
    }

    private alertFailure(message: string): void {
        console.log(message);
        alert(`Login failed, ${message}`);
    }
}

class UserLogout {
    public logout(): void {
        sessionStorage.clear();
        window.location.replace("/index.html");
    }
}


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
