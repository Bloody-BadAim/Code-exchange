import { QuestionQueries } from "../model/question";
import { AnswerQuaries } from "../model/answer";

class QuestionDetailHandler {
    private questionTitle = document.getElementById("questionTitle") as HTMLElement;
    private codeSnippetContainer = document.getElementById("codeSnippetContainer") as HTMLElement;
    private answersList = document.getElementById("answersList") as HTMLElement;
    private newAnswer = document.getElementById("newAnswer") as HTMLTextAreaElement;

    public constructor() {
        this.initialize();
    }

    public async initialize(): Promise<void> {
        try {
            const questionId: number = this.getQuestionIdFromSession();
            
            if (questionId === -1) {
                return; // Exit if no valid question ID
            }
    
            await this.loadQuestionDetails(questionId);

            document.getElementById("submitAnswer")?.addEventListener("click", async () => {
                await this.handleAnswerSubmission(questionId);
            });
        } catch (error) {
            console.error("Initialization failed:", error);
        }
    }

    private getQuestionIdFromSession(): number {
        const questionIdStr: string = sessionStorage.getItem("selectedQuestionId")!;
        
        if (!questionIdStr) {
            console.error("No question ID in session storage. Redirecting to main page.");
            window.location.href = "main.html"; // Redirect to main page or show error message
            return -1; // Return an invalid ID
        }
    
        return Number(questionIdStr);
    }
    
    private async handleAnswerSubmission(questionId: number): Promise<void> {
        const userId: number = Number(sessionStorage.getItem("userid"));
        if (!userId) throw new Error("User not logged in");
    
        const answerContent: string = this.newAnswer.value;
        const codeSnippet: string = (document.getElementById("codeSnippetAnswer") as HTMLTextAreaElement).value;

        if (!answerContent.trim() && !codeSnippet.trim()) {
            alert("Please enter an answer before submitting.");
            return;
        }
    
        let fullAnswerContent: string = answerContent;
    
        if (codeSnippet.trim()) {
            fullAnswerContent += "\n\n```\n" + codeSnippet + "\n```";
        }
    
        const response: any = await AnswerQuaries.postAnswer(questionId, userId, fullAnswerContent);
        if (response) {
            this.newAnswer.value = "";
            await this.loadQuestionDetails(questionId);
            window.location.reload();
        } else {
            // Handle failed submission
        }
    }

    private async loadQuestionDetails(questionId: number): Promise<void> {
        const question: QuestionQueries | undefined = await QuestionQueries.getQuestionById(questionId);
        if (!question) throw new Error("Question not found");

        this.updateQuestionView(question);
        await this.loadAndDisplayAnswers(questionId);
    }

    private updateQuestionView(question: QuestionQueries): void {
        const splitContent: string[] = question._content.split("```");
        this.questionTitle.innerHTML = `<h2>${splitContent[0]}</h2>`;

        // Check for the existence of a code snippet
        const codeSnippet: string = splitContent.length > 1 ? splitContent[1] : "";
        if (codeSnippet) {
            // Display the code snippet container and fill it with the code snippet
            this.codeSnippetContainer.style.display = "block";
            this.codeSnippetContainer.innerHTML = `<pre><code>${codeSnippet}</code></pre>`;
        } else {
            // Hide the code snippet container if there is no code snippet
            this.codeSnippetContainer.style.display = "none";
        }
    }

    
    // private updateAnswerView(answer: QuestionQueries): void {
    //     const splitContent: string[] = answer._content.split("```");
    //     this.questionTitle.innerHTML = `<h2>${splitContent[0]}</h2>`;

    //     // Check for the existence of a code snippet
    //     const codeSnippet: string = splitContent.length > 1 ? splitContent[1] : "";
    //     if (codeSnippet) {
    //         // Display the code snippet container and fill it with the code snippet
    //         this.codeSnippetAnswer.style.display = "block";
    //         this.codeSnippetAnswer.innerHTML = `<pre><code>${codeSnippet}</code></pre>`;
    //     } else {
    //         // Hide the code snippet container if there is no code snippet
    //         this.codeSnippetAnswer.style.display = "none";
    //     }
    // }

    private async loadAndDisplayAnswers(questionId: number): Promise<void> {
        const answers: any = await AnswerQuaries.getAnswersByQuestionId(questionId);
        this.answersList.innerHTML = "";

        answers.reverse().forEach((answer: any) => {
            const answerElement: HTMLElement = this.createAnswerElement(answer);
            this.answersList.appendChild(answerElement);
            // this.updateAnswerView(answer);
        });
    }

    private createAnswerElement(answer: AnswerQuaries): HTMLElement {
        const splitContent: string[] = answer._contentAnswer.split("```");
        const answerText: string = splitContent[0];
        const codeSnippet: string = splitContent.length > 1 ? splitContent[1] : "";
    
        const answerElement: HTMLDivElement = document.createElement("div");
        answerElement.classList.add("answer-item");
        answerElement.innerHTML = `
            <p class="answer-content">${answerText}</p>
            ${codeSnippet ? `<pre><code>${codeSnippet}</code></pre>` : ""}
            <p class="answer-details">Posted by ${answer._username} on ${new Date(answer._createdatAnswer).toLocaleDateString()}</p>
        `;
        return answerElement;
    }
}

new QuestionDetailHandler();
