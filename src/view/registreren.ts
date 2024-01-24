import "../config";
import { UserController } from "../controller/userController";

/**
 * Class representing the registration view.
 */
class RegistrationView {
    private userController: UserController;

    public constructor() {
        this.userController = new UserController();
        this.initEventListeners();
    }

    /**
     * Initialize event listeners for the registration view.
     */
    private initEventListeners(): void {
        document.getElementById("btnRegister")?.addEventListener("click", () => this.registerUser());
        document.getElementById("myFormLogin")?.addEventListener("submit", (event) => this.loginUser(event));
        document.getElementById("logout")?.addEventListener("click", () => this.logoutUser());
    }

    /**
     * Handles user registration.
     */
    private async registerUser(): Promise<void> {
        const email: string = (document.getElementById("email") as HTMLInputElement).value;
        const username : string= (document.getElementById("username") as HTMLInputElement).value;
        const firstname: string = (document.getElementById("firstname") as HTMLInputElement).value;
        const lastname : string= (document.getElementById("lastname") as HTMLInputElement).value;
        const password : string= (document.getElementById("password") as HTMLInputElement).value;

        try {
            await this.userController.register(email, username, firstname, lastname, password);
        } catch (error) {
            console.error("Registration error:", error);
        }
    }

    /**
     * Handles user login.
     * @param {Event} event - The event object.
     */
    private async loginUser(event: Event): Promise<void> {
        event.preventDefault();
        const email : string= (document.getElementById("emailLogin") as HTMLInputElement).value;
        const password: string = (document.getElementById("passwordLogin") as HTMLInputElement).value;

        try {
            await this.userController.login(email, password);
        } catch (error) {
            console.error("Login error:", error);
        }
    }

    /**
     * Handles user logout.
     */
    private logoutUser(): void {
        this.userController.logout();
    }
}

// Create an instance of the registration view to set up the event listeners.
new RegistrationView();
