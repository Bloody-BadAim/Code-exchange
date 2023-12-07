import { QuestionHandler } from "../models/questionHandler";


// Initialize the question handler
const questionHandler:any = new QuestionHandler();

// Setup the logout button
const btnLogout: HTMLElement = document.getElementById("logout")!;
if (btnLogout) {
    btnLogout.addEventListener("click", logout);
}

// Define the logout function
function logout(): void {
    sessionStorage.clear();
    window.location.href = "index.html";
}

// Ensure the DOM is fully loaded before initializing functionality
document.addEventListener("DOMContentLoaded", async () => {
    await questionHandler.loadQuestions();
});
