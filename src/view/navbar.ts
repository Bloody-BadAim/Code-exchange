import { UserController } from "../controller/userController";

/**
 * Asynchronously inserts the navigation bar into the header of the page.
 * It fetches 'navbar.html' and sets its content as the inner HTML of the header element.
 */
async function insertNavbarIntoHeader(): Promise<void> {
    try {
        // Fetch the navbar HTML from 'navbar.html'
        const response: Response = await fetch("navbar.html");
        const navbarHtml: string = await response.text();

        // Insert the fetched HTML into the header element of the page
        const headerElement: HTMLElement | null = document.getElementById("header");
        if (headerElement) {
            headerElement.innerHTML = navbarHtml;
        } else {
            // Log an error if the header element is not found
            console.error("Element with ID header not found.");
        }
    } catch (error) {
        // Log any errors that occur during the fetch operation
        console.error("Error fetching navbar:", error);
    }
}

// Call the function to insert the navbar into the header
insertNavbarIntoHeader();

// Get the logout button element
const btnLogout: HTMLElement = document.getElementById("logout")!;

// Add an event listener to the logout button for the logout operation
if (btnLogout) {
    btnLogout.addEventListener("click", logout);
}

/**
 * Handles the logout functionality.
 * Clears the session storage and redirects the user to the 'index.html' page.
 */
function logout(): void {
    sessionStorage.clear(); // Clear session storage
    window.location.href = "index.html"; // Redirect to the index page
}

// Create an instance of UserController
// const userManager: UserController = new UserController();

// // Add an event listener to the logout button to trigger the UserController's logout method
// document.getElementById("logout")?.addEventListener("click", () => {
//     userManager.logout(); // Call the logout method from UserController
// });
