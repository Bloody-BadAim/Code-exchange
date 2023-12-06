import { postQuestion, getAllQuestions, postAnswer, getQuestionById, getAnswersByQuestionId } from "./databaseQuery";

class QuestionHandler {
    private questionsDisplay: HTMLElement;
    private askQuestionModal: HTMLElement;
    private questionInput: HTMLTextAreaElement;

    public constructor() {
        this.questionsDisplay = document.getElementById("questionsDisplay")!;
        this.askQuestionModal = document.getElementById("askQuestionModal")!;
        this.questionInput = document.getElementById("questionInput") as HTMLTextAreaElement;

        this.setupQuestionModal();
    }

    public async loadQuestions(): Promise<void> {
        const questions: any[] = await getAllQuestions();
        this.questionsDisplay.innerHTML = "";
        questions.forEach(question => {
            const questionDiv: HTMLDivElement = document.createElement("div");
            questionDiv.innerHTML = `<p>${question.content}</p>`;
            questionDiv.addEventListener("click", () => this.displayQuestionDetail(question.id));
            this.questionsDisplay.appendChild(questionDiv);
        });
    }

    private setupQuestionModal(): void {
        const askQuestionButton: HTMLElement = document.getElementById("askQuestionButton")!;
        const closeAskModal: HTMLElement = this.askQuestionModal.querySelector(".close")!;

        askQuestionButton.addEventListener("click", () => {
            this.askQuestionModal.style.display = "block";
        });

        closeAskModal.addEventListener("click", () => {
            this.askQuestionModal.style.display = "none";
        });

        const submitQuestionButton: HTMLElement = document.getElementById("submitQuestion")!;
        submitQuestionButton.addEventListener("click", async () => {
            const userId: string = sessionStorage.getItem("userId")!;
            if (!userId) {
                console.error("User ID not found in session storage");
                return;
            }

            await postQuestion(parseInt(userId), this.questionInput.value);
            this.questionInput.value = "";
            this.askQuestionModal.style.display = "none";
            await this.loadQuestions();
        });
    }



    public async displayQuestionDetail(questionId: number): Promise<void> {
        const questionDetailView: HTMLElement = document.getElementById("questionDetailView")!;
        const questionContentDiv: HTMLElement = document.getElementById("questionContent")!;
        const answersListDiv: HTMLElement = document.getElementById("answersList")!;


        questionContentDiv.innerHTML = "";
        answersListDiv.innerHTML = "";


        const question: any = await getQuestionById(questionId);
        const answers: any = await getAnswersByQuestionId(questionId);

        const userId: string = sessionStorage.getItem("userid")!;
        if (!userId) {
            console.error("User ID not found in session storage");
            return;
        }

        if (question) {
            questionContentDiv.innerHTML = `<h3>${question.content}</h3>`;
        }

        if (answers && answers.length > 0) {
            answers.forEach((answer: { contentAnswer: string; }) => {
                const answerDiv: HTMLDivElement = document.createElement("div");
                answerDiv.innerHTML = `<p>${answer.contentAnswer}</p>`;
                answersListDiv.appendChild(answerDiv);
            });
        } else {
            answersListDiv.innerHTML = "<p>No answers yet.</p>";
        }

        const answerSection: HTMLDivElement = document.createElement("div");
        answerSection.innerHTML = `
        <textarea id="answerInput" placeholder="Your answer..."></textarea>
        <button id="submitAnswer">Submit Answer</button>
    `;
        questionDetailView.appendChild(answerSection);

        const submitAnswerButton: HTMLElement = document.getElementById("submitAnswer")!;
        submitAnswerButton.addEventListener("click", async () => {
            const answerInput: HTMLTextAreaElement = document.getElementById("answerInput") as HTMLTextAreaElement;

            await postAnswer(questionId, parseInt(userId), answerInput.value);
            answerInput.value = "";
            await this.displayQuestionDetail(questionId); // Refresh the answers displayed
        });

        async function setupModalCloseButton(modalElementId: string, closeButtonClass: string): Promise<void> {
            const modal: HTMLElement = document.getElementById(modalElementId)!;
            const closeButton: HTMLElement = modal.querySelector(closeButtonClass)!;
            closeButton.addEventListener("click", () => {
                modal.style.display = "none";
            });
        }
        setupModalCloseButton("askQuestionModal", ".close");
        setupModalCloseButton("questionDetailView", ".closeDetail");

        questionDetailView.style.display = "block";
        
    }
    
}
export default QuestionHandler;