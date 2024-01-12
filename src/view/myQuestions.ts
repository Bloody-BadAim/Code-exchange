import { MyQuestionsController } from "../controller/myQuestionController";
import { QuestionController } from "../controller/questionController";

export class MainView {
    private questionsDisplay: HTMLElement;
    private myQuestionsController: MyQuestionsController;
    private username: string | null;

    public constructor() {
        this.questionsDisplay = document.getElementById("questionsDisplay") as HTMLElement;
        this.myQuestionsController = new MyQuestionsController();
        this.username = sessionStorage.getItem("username"); // Get the username from the session storage
        this.init();
    }

    private async init(): Promise<void> {
        await this.loadPersonalQuestions();
    }

    private async loadPersonalQuestions(): Promise<void> {
        try {
            const questions: any = await this.myQuestionsController.getPersonalQuestions();
           
            questions.forEach((question: { _content: string; _createdAt: string | number | Date; _questionid: any; }) => {
                const row: HTMLTableRowElement = document.createElement("tr");
                row.innerHTML = `
                    <td>${this.username}</td> <!-- Use the username from session storage -->
                    <td>${question._content}</td>
                    <td>${new Date(question._createdAt).toLocaleDateString()}</td>
                `;
                row.addEventListener("click", () => {
                    sessionStorage.setItem("selectedQuestionId", question._questionid.toString());
                    window.location.href = "questionDetail.html";
                });
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

class MyQuestionsView {
    private questionController: QuestionController;

    public constructor() {
        this.questionController = new QuestionController();
        this.initializeEventListeners();
    }

    private initializeEventListeners(): void {
        document.getElementById("postQuestionButton")?.addEventListener("click", () => {
            this.postQuestion();
        });
    }

    private async postQuestion(): Promise<void> {
        const questionContent: string = (document.getElementById("questionContent") as HTMLTextAreaElement).value;
        const codeSnippet: string = (document.getElementById("codeSnippet") as HTMLTextAreaElement).value;

        if (!questionContent.trim()) {
            alert("Please enter your question.");
            return;
        }

        const userId: number = parseInt(sessionStorage.getItem("userid")!);
        let fullQuestionContent: string = questionContent;
        
        if (codeSnippet.trim()) {
            fullQuestionContent += "\n\n```" + codeSnippet + "```";
        }

        try {
            const questionId: number | undefined = await this.questionController.postQuestion(userId, fullQuestionContent);
            if (questionId) {
                alert("Question posted successfully!");
                window.location.reload(); // Or navigate to the question detail page
            } else {
                alert("Failed to post the question.");
            }
        } catch (error) {
            console.error("Error posting the question: ", error);
            alert("An error occurred while posting your question.");
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new MyQuestionsView();
});

