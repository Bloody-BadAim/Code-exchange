import { QuestionQueries } from "../model/questionQuery";
import { AnswerQuaries } from "../model/answerQuery";

class QuestionDetailHandler {
    private questionTitle = document.getElementById("questionTitle") as HTMLElement;
    private answersList = document.getElementById("answersList") as HTMLElement;
    private newAnswer = document.getElementById("newAnswer") as HTMLTextAreaElement;

    public constructor() {
        this.initialize();
    }

    public async initialize(): Promise<void> {
        const questionId: number = Number(sessionStorage.getItem("selectedQuestionId"));
        await this.loadQuestionDetails(questionId);

        document.getElementById("submitAnswer")?.addEventListener("click", async () => {
            const userId: number = parseInt(sessionStorage.getItem("userid")!); // Get user ID from session storage
            const response: number | undefined = await AnswerQuaries.postAnswer(questionId, userId, this.newAnswer.value);
            if (response) {
                this.newAnswer.value = ""; // Clear the textarea after posting
                await this.loadQuestionDetails(questionId); // Refresh the answers list
            }
            
        });
    }

    private async loadQuestionDetails(questionId: number): Promise<void> {
        // Load question details
        const question: QuestionQueries | undefined = await QuestionQueries.getQuestionById(questionId);
        if (question) {
            this.questionTitle.innerHTML = `
                <h2>${question._content}</h2>
                <p>Asked by ${question._username} on ${new Date(question._createdAt).toLocaleDateString()}</p>
            `;
        }

        const answers: AnswerQuaries[] = await AnswerQuaries.getAnswersByQuestionId(questionId);
        this.answersList.innerHTML = ""; // Clear the answers list before adding new ones
        answers.forEach(answer => {
            const answerElement: HTMLDivElement = document.createElement("div");
            answerElement.classList.add("answer-item");
            answerElement.innerHTML = `
                <p class="answer-content">${answer._contentAnswer}</p>
                <p class="answer-details">Posted by ${answer._username} on ${new Date(answer._createdatAnswer).toLocaleDateString()}</p>
            `;
            this.answersList.appendChild(answerElement);
        });
    }
}

new QuestionDetailHandler();
