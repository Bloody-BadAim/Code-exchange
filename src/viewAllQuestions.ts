import { QuestionHandler } from "./models/questionHandler";

const useridString: string | null = sessionStorage.getItem("userid");
const userid: number = Number(useridString);



const questionHandler1 :any = new QuestionHandler();
const btnLogout: HTMLElement = document.getElementById("logout")!;
if (btnLogout) {
    btnLogout.addEventListener("click", logout);
}
function logout(): void {
    sessionStorage.clear();
    window.location.href = "index.html";
}
document.addEventListener("DOMContentLoaded", async () => {
    await questionHandler1.loadAllPersonalQuestions();
});
