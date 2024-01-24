import { MyQuestionsController } from "../controller/myQuestionController";
import { QuestionController } from "../controller/questionController";
import { QuestionQueries } from "../model/question";

class MainView {
    private questionsDisplay: HTMLElement;
    private myQuestionsController: MyQuestionsController;
    private username: string | null;

    public constructor() {
        this.questionsDisplay = document.getElementById("questionsDisplay") as HTMLElement;
        this.myQuestionsController = new MyQuestionsController();
        this.username = sessionStorage.getItem("username");
        this.init();
        document.addEventListener("searchEvent", (event: Event) => this.handleSearch(event as CustomEvent));
    }
    private handleSearch(event: CustomEvent): void {
        const searchTerm: string = event.detail.toLowerCase();
        const rows: NodeListOf<HTMLTableRowElement> = this.questionsDisplay.querySelectorAll("tr");

        rows.forEach(row => {
            const isVisible: boolean = row.textContent?.toLowerCase().includes(searchTerm) ?? false;
            row.style.display = isVisible ? "" : "none";
        });
    }


    private async init(): Promise<void> {
        await this.loadPersonalQuestions();
    }

    private async loadPersonalQuestions(): Promise<void> {
        try {
            const questions: QuestionQueries[] = await this.myQuestionsController.getPersonalQuestions();
            questions.reverse().forEach((question: { _content: string; _createdAt: string | number | Date; _questionid: any; }) => {
                const row: HTMLTableRowElement = document.createElement("tr");
                row.innerHTML = `
                    <td>${this.username}</td>
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
     

        if (!questionContent.trim()) {
            alert("Please enter your question.");
            return;
        }

        const userId: number = parseInt(sessionStorage.getItem("userid")!);
       
        
        const codeSnippet: string = (document.getElementById("codeSnippet") as HTMLTextAreaElement).value;
        let fullQuestionContent: string = questionContent;
        
        if (codeSnippet.trim()) {
            fullQuestionContent += "\n\n```\n" + codeSnippet + "\n```";
        }
        try {
            const questionId: number | undefined = await this.questionController.postQuestion(userId, fullQuestionContent);
            if (questionId) {
                alert("Question posted successfully!");
                window.location.reload();
            } else {
                alert("Failed to post the question.");
            }
        } catch (error) {
            console.error("Error posting the question: ", error);
            alert("An error occurred while posting your question.");
        }
    }
}

// Initialization of the views
document.addEventListener("DOMContentLoaded", () => {
    new MainView();
    new MyQuestionsView();
});
