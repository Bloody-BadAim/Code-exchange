import { QuestionQueries } from "../model/question";
import { AnswerQuaries } from "../model/answer";

class QuestionDetailHandler {
    private questionTitle = document.getElementById("questionTitle") as HTMLElement;
    private answersList = document.getElementById("answersList") as HTMLElement;
    private newAnswer = document.getElementById("newAnswer") as HTMLTextAreaElement;

    public constructor() {
        this.initialize();
    }

    public async initialize(): Promise<void> {
        try {
            const questionId: number = this.getQuestionIdFromSession();
            await this.loadQuestionDetails(questionId);

            document.getElementById("submitAnswer")?.addEventListener("click", async () => {
                await this.handleAnswerSubmission(questionId);
            });
        } catch (error) {
            console.error("Initialization failed:", error);
            // Handle initialization error (e.g., show error message)
        }
    }

    private getQuestionIdFromSession(): number {
        const questionId: number = Number(sessionStorage.getItem("selectedQuestionId"));
        if (!questionId) throw new Error("Question ID not found in session storage");
        return questionId;
    }

    private async handleAnswerSubmission(questionId: number): Promise<void> {
        const userId: number = Number(sessionStorage.getItem("userid"));
        if (!userId) throw new Error("User not logged in");

        const response: any = await AnswerQuaries.postAnswer(questionId, userId, this.newAnswer.value);
        if (response) {
            this.newAnswer.value = "";
            await this.loadQuestionDetails(questionId);
        } else {
            // Handle failed submission (e.g., show error message)
        }
    }

    private async loadQuestionDetails(questionId: number): Promise<void> {
        const question: QuestionQueries | undefined = await QuestionQueries.getQuestionById(questionId);
        if (!question) throw new Error("Question not found");

        this.updateQuestionView(question);
        await this.loadAndDisplayAnswers(questionId);
    }

    private updateQuestionView(question: QuestionQueries): void {
        this.questionTitle.innerHTML = `
            <h2>${question._content}</h2>
            <p>Asked by ${question._username} on ${new Date(question._createdAt).toLocaleDateString()}</p>
        `;
        
    }

    

    private async loadAndDisplayAnswers(questionId: number): Promise<void> {
        const answers: any = await AnswerQuaries.getAnswersByQuestionId(questionId);
        this.answersList.innerHTML = "";

        answers.forEach((answer: any) => {
            const answerElement: HTMLElement = this.createAnswerElement(answer);
            this.answersList.appendChild(answerElement);
        });
    }

    private createAnswerElement(answer: AnswerQuaries): HTMLElement {
        const answerElement: HTMLDivElement = document.createElement("div");
        answerElement.classList.add("answer-item");
    
        // Convert the answer content, checking for code snippets
        const convertedContent: string = this.convertContent(answer._contentAnswer);
    
        answerElement.innerHTML = `
            <p class="answer-content">${convertedContent}</p>
            <p class="answer-details">Posted by ${answer._username} on ${new Date(answer._createdatAnswer).toLocaleDateString()}</p>
        `;
        return answerElement;
    }
    
    private convertContent(content: string): string {
        // Simple example to convert code snippets - you may need a more robust solution
        return content.replace(/```(\n[\s\S]*?\n)```/g, "<div class=\"code-snippet\">$1</div>");
    }
}

new QuestionDetailHandler();
