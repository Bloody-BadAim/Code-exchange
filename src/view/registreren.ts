import "../config";
import { UserController } from "../controller/userController";

// Create an instance of UserController
const userController: UserController = new UserController();

/**
 * Event listener for the registration button.
 * Collects user input and calls the register function from UserController.
 */
document.getElementById("btnRegister")?.addEventListener("click", async () => {
    // Retrieve user input from registration form fields
    const email: string = (document.getElementById("email") as HTMLInputElement).value;
    const username: string = (document.getElementById("username") as HTMLInputElement).value;
    const firstname: string = (document.getElementById("firstname") as HTMLInputElement).value;
    const lastname: string = (document.getElementById("lastname") as HTMLInputElement).value;
    const password: string = (document.getElementById("password") as HTMLInputElement).value;
    
    try {
        // Register the user using the UserController
        await userController.register(email, username, firstname, lastname, password);
    } catch (error) {
        // Handle any errors that occur during registration
    }
});

/**
 * Event listener for the login form submission.
 * Prevents default form submission behavior and calls the login function.
 */
document.getElementById("myFormLogin")?.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve user input from login form fields
    const email: string = (document.getElementById("emailLogin") as HTMLInputElement).value;
    const password: string = (document.getElementById("passwordLogin") as HTMLInputElement).value;

    try {
        // Log in the user using the UserController
        await userController.login(email, password);
    } catch (error) {
        // Handle any errors that occur during login
        console.error("Login error:", error);
    }
});

/**
 * Event listener for the logout button.
 * Calls the logout function from UserController when clicked.
 */
document.getElementById("logout")?.addEventListener("click", () => {
    // Log out the user using the UserController
    userController.logout();
});
