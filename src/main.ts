import "./config";
import { loadQuestions, setupQuestionModal ,displayQuestionDetail} from "./questionHandler";

const btnLogout: any = document.getElementById("logout") as HTMLButtonElement;
if(btnLogout) {
    btnLogout.addEventListener("click", logout);

}
function logout(): void {
    sessionStorage.clear();
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadQuestions();
    setupQuestionModal();
});