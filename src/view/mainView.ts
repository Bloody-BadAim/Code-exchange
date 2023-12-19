import { QuestionController } from "../controller/questionController";
import { QuestionQueries } from "../model/question";

/**
 * Class representing the main view of the application, displaying a list of questions.
 */
export class MainView {
    private questionsDisplay: HTMLElement;

    /**
     * Constructs a new instance of the MainView class.
     * @param {QuestionController} questionController - The controller handling question-related logic.
     */
    public constructor(private questionController: QuestionController) {
        this.questionsDisplay = document.getElementById("questionsDisplay") as HTMLElement;
        this.init();
    }

    /**
     * Initializes the view by loading all questions.
     */
    private async init(): Promise<void> {
        await this.loadQuestions();
    }

    /**
     * Loads questions from the controller and displays them in the view.
     */
    private async loadQuestions(): Promise<void> {
        const questions: QuestionQueries[] = await this.questionController.getAllQuestions();
        console.log(questions);
        
        questions.forEach((question) => {
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

// Initializes the MainView once the DOM content is fully loaded.
document.addEventListener("DOMContentLoaded", () => {
    const questionController: QuestionController = new QuestionController();
    new MainView(questionController);
});
