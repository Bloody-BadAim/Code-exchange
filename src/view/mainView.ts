import { QuestionController } from "../controller/questionController";
import { QuestionQueries } from "../model/question";

export class MainView {
    private questionsDisplay: HTMLElement;

    public constructor(private questionController: QuestionController) {
        this.questionsDisplay = document.getElementById("questionsDisplay") as HTMLElement;
        this.init();
        document.addEventListener("searchEvent", (event: Event) => this.handleSearch(event as CustomEvent));
    }

    private handleSearch(event: CustomEvent): void {
        const searchTerm:string = event.detail.toLowerCase();
        const rows: NodeListOf<HTMLTableRowElement> = this.questionsDisplay.querySelectorAll("tr");

        rows.forEach(row => {
            const isVisible: boolean | undefined = row.textContent?.toLowerCase().includes(searchTerm);
            row.style.display = isVisible ? "" : "none";
        });
    }

    private async init(): Promise<void> {
        await this.loadQuestions();
    }

    private async loadQuestions(): Promise<void> {
        const questions: QuestionQueries[] = await this.questionController.getAllQuestions();
        
        questions.reverse().forEach(question => {
            const row: HTMLTableRowElement = document.createElement("tr");
            row.innerHTML = `
                <td>${question._username}</td>
                <td>${question._content}</td>
                <td>${new Date(question._createdAt).toLocaleDateString()}</td>
            `;

            // Add click event listener to each row
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
