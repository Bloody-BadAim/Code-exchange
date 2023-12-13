import { QuestionQueries } from "../models/questionQuary";
import { AnswerQuaries } from "../models/answerQuary";

class QuestionDetailHandler {
    private questionTitle = document.getElementById("questionTitle") as HTMLElement;
    private answersList = document.getElementById("answersList") as HTMLElement;
    private newAnswer = document.getElementById("newAnswer") as HTMLTextAreaElement;

    public constructor() {
        this.initialize();
    }

    public async initialize(): Promise<void> {
        const questionId: number = Number(sessionStorage.getItem("selectedQuestionId"));
        const question: QuestionQueries | undefined = await QuestionQueries.getQuestionById(questionId);
        const answers: AnswerQuaries[] = await AnswerQuaries.getAnswersByQuestionId(questionId);

        if (question) {
            this.questionTitle.textContent = question._content;
        }

        answers.forEach(answer => {
            const answerElement: HTMLDivElement = document.createElement("div");
            answerElement.textContent = answer._contentAnswer; // Assuming _contentAnswer is the property
            this.answersList.appendChild(answerElement);
        });

        document.getElementById("submitAnswer")?.addEventListener("click", async () => {
            const userId: number = parseInt(sessionStorage.getItem("userid")!); // Get user ID from session storage
            await AnswerQuaries.postAnswer(questionId, userId, this.newAnswer.value);
            // Refresh answers or navigate as needed
        });
    }
}

new QuestionDetailHandler();
