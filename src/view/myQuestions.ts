import { MyQuestionsController } from "../controller/myQuestionController";


export class MainView {
    private questionsDisplay: HTMLElement;
    private myQuestionsController: MyQuestionsController;

    public constructor() {
        this.questionsDisplay = document.getElementById("questionsDisplay") as HTMLElement;
        this.myQuestionsController = new MyQuestionsController();
        this.init();
    }

    private async init(): Promise<void> {
        const userId: number = Number(sessionStorage.getItem("userid"));
        if (!userId) {
            console.error("User ID not found in session storage.");
            return;
        }
        await this.loadPersonalQuestions(userId);
    }

    private async loadPersonalQuestions(_userId: number): Promise<void> {
        try {
            const questions: any = await this.myQuestionsController.getPersonalQuestions();
            this.questionsDisplay.innerHTML = ""; // Clear previous questions
            questions.forEach((question: { _username: string; _content: string; _createdAt: string | number | Date; }) => {
                const row: HTMLTableRowElement = document.createElement("tr");
                row.innerHTML = `
                    <td>${question._username}</td>
                    <td>${question._content}</td>
                    <td>${new Date(question._createdAt).toLocaleDateString()}</td>
                `;
                this.questionsDisplay.appendChild(row);
            });
        } catch (error) {
            console.error("Error loading personal questions: ", error);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new MainView();
});
