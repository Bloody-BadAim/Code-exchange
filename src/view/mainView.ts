import { QuestionController } from "../controller/questionController";
import { QuestionQueries } from "../model/questionQuery";

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
        console.log(questions);
        
        questions.forEach((question: { _username: string; _content: string; _createdAt:Date; _questionid: { toString: () => string; }; }) => {
            const row: HTMLTableRowElement = document.createElement("tr");
            row.innerHTML = `
                <td>${question._username}</td>
                <td>${question._content}</td>
                <td>${new Date(question._createdAt).toLocaleDateString()}</td>
            `;
            row.addEventListener("click", () => {
                if (question._questionid !== undefined) {
                    sessionStorage.setItem("selectedQuestionId", question._questionid.toString());
                    window.location.href = "questionDetail.html";
                } else {
                    console.error("Question ID is undefined.");
                }
            });
            this.questionsDisplay.appendChild(row);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const questionController: QuestionController = new QuestionController();
    new MainView(questionController);
});
