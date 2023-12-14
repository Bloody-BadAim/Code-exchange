import { QuestionController } from "./controller/questionController";

const useridString: string | null = sessionStorage.getItem("userid");
const userid: number = Number(useridString);



const questionController :any = new QuestionController();
const btnLogout: HTMLElement = document.getElementById("logout")!;
if (btnLogout) {
    btnLogout.addEventListener("click", logout);
}
function logout(): void {
    sessionStorage.clear();
    window.location.href = "index.html";
}
document.addEventListener("DOMContentLoaded", async () => {
    await questionController.loadAllPersonalQuestions();
});
