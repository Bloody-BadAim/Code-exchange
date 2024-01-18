import { UserController } from "../controller/userController";

class NavbarHandler {
    private userController: UserController;

    public constructor() {
        this.userController = new UserController();
        this.initializeNavbar();
    }

    private async initializeNavbar(): Promise<void> {
        try {
            const response: Response = await fetch("navbar.html");
            const navbarHtml: string = await response.text();

            const headerElement: HTMLElement = document.getElementById("header")!;
            if (headerElement) {
                headerElement.innerHTML = navbarHtml;
                this.setupLogoutButton();
            }
        } catch (error) {
            console.error("Error fetching navbar:", error);
        }
    }

    private setupLogoutButton(): void {
        const logoutButton: HTMLElement = document.getElementById("logout")!;
        if (logoutButton) {
            logoutButton.addEventListener("click", () => {
                this.userController.logout();
            });
        } else {
            console.error("Logout button not found in the navbar.");
        }
    }
}

// Initialize the NavbarHandler when the document is loaded
document.addEventListener("DOMContentLoaded", () => {
    new NavbarHandler();
});
