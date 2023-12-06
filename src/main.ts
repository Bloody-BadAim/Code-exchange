import "./config";
import QuestionHandler from "./questionHandler"; // Make sure to export default the QuestionHandler class

// Instantiate the QuestionHandler class
const questionHandler: QuestionHandler = new QuestionHandler();

const btnLogout: HTMLElement | null = document.getElementById("logout");
if (btnLogout) {
    btnLogout.addEventListener("click", logout);
}

function logout(): void {
    sessionStorage.clear();
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", async () => {
    // Now use the questionHandler instance to call the loadQuestions method
    await questionHandler.loadQuestions();
});
