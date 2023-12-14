import { QuestionController } from "../controller/questionController";
import { QuestionQueries } from "../model/questionQuary";


export class MainView {
    private questionsDisplay: HTMLElement;

    public constructor(private questionController: QuestionController) {
        this.questionsDisplay = document.getElementById("questionsDisplay") as HTMLElement;
        this.init();
    }

    private async init(): Promise<void> {
        await this.loadQuestions();
    }

    private async loadQuestions(): Promise<void> {
        const questions: QuestionQueries[] = await this.questionController.getAllQuestions();
        questions.forEach(question => {
            const row: HTMLTableRowElement = document.createElement("tr");
            row.innerHTML = `
                <td>${question._username}</td>
                <td>${question._content}</td>
                <td>${new Date(question._createdAt).toLocaleDateString()}</td>
            `;
            row.addEventListener("click", () => {
                sessionStorage.setItem("SelectedQuestionid", String(question._id));
                window.location.href = "questionDetail.html";
            });
            this.questionsDisplay.appendChild(row);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const questionController:any = new QuestionController();
    new MainView(questionController);
});
