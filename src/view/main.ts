import { QuestionHandler } from "../models/questionHandler";

const questionHandler:any = new QuestionHandler();
const btnLogout: HTMLElement = document.getElementById("logout")!;
if (btnLogout) {
    btnLogout.addEventListener("click", logout);
}
function logout(): void {
    sessionStorage.clear();
    window.location.href = "index.html";
}
document.addEventListener("DOMContentLoaded", async () => {
    await questionHandler.loadQuestions();
});
