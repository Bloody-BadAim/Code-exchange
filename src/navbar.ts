import "./config";
// import { api } from "@hboictcloud/api";
import { UserProfileManager } from "./models/register";

async function insertNavbarIntoHeader(): Promise<void> {
    try {
     
        const response: Response = await fetch("navbar.html");
        const navbarHtml: string = await response.text();

       
        const headerElement: HTMLElement | null = document.getElementById("header");
        if (headerElement) {
            headerElement.innerHTML = navbarHtml;
        } else {
            console.error("Element with ID header not found.");
        }
    } catch (error) {
        console.error("Error fetching navbar:", error);
    }
}
insertNavbarIntoHeader();


const userManager: UserProfileManager = new UserProfileManager();
document.getElementById("logout")?.addEventListener("click", () => {
    userManager.logout();
    // Handle post-logout 
});