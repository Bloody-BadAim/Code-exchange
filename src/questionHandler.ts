import { postQuestion, getAllQuestions, postAnswer } from "./databaseQuery";
import { getQuestionById, getAnswersByQuestionId } from "./databaseQuery";

export async function loadQuestions(): Promise<void> {
    const questionsDisplay: HTMLElement = document.getElementById("questionsDisplay")!;
    const questions: any = await getAllQuestions();
    questionsDisplay.innerHTML = "";
    questions.forEach((question: { content: any; id: number; }) => {
        const questionDiv: HTMLDivElement = document.createElement("div");
        questionDiv.innerHTML = `<p>${question.content}</p>`;
        questionDiv.addEventListener("click", () => displayQuestionDetail(question.id));
        questionsDisplay.appendChild(questionDiv);
    });
}

export function setupQuestionModal(): void {
    const askQuestionButton: HTMLElement = document.getElementById("askQuestionButton")!;
    const askQuestionModal: HTMLElement = document.getElementById("askQuestionModal")!;
    const closeAskModal: HTMLElement = document.querySelector(".close")!;
    const submitQuestionButton: HTMLElement = document.getElementById("submitQuestion")!;
    const questionInput: HTMLTextAreaElement = document.getElementById("questionInput") as HTMLTextAreaElement;

    askQuestionButton.addEventListener("click", () => {
        askQuestionModal.style.display = "block";
    });

    closeAskModal.addEventListener("click", () => {
        askQuestionModal.style.display = "none";
    });

    submitQuestionButton.addEventListener("click", async () => {
        await postQuestion(1, questionInput.value);
        questionInput.value = "";
        askQuestionModal.style.display = "none";
        await loadQuestions();
    });
}

export async function displayQuestionDetail(questionId: number): Promise<void> {
    const questionDetailView: HTMLElement = document.getElementById("questionDetailView")!;
    const questionContentDiv: HTMLElement = document.getElementById("questionContent")!;
    const answersListDiv: HTMLElement = document.getElementById("answersList")!;


    questionContentDiv.innerHTML = "";
    answersListDiv.innerHTML = "";


    const question: any = await getQuestionById(questionId);
    const answers: any = await getAnswersByQuestionId(questionId);

    if (question) {
        questionContentDiv.innerHTML = `<h3>${question.content}</h3>`;
    }

    if (answers && answers.length > 0) {
        answers.forEach((answer: { content: any; }) => {
            const answerDiv: HTMLDivElement = document.createElement("div");
            answerDiv.innerHTML = `<p>${answer.content}</p>`;
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

    document.getElementById("submitAnswer")!.addEventListener("click", async () => {
        const answerInput: HTMLTextAreaElement = document.getElementById("answerInput") as HTMLTextAreaElement;
        await postAnswer(questionId, 1, answerInput.value);
        answerInput.value = "";
        await displayQuestionDetail(questionId);
    });

    //     function setupModalCloseButton(modalElementId, closeButtonClass) {
    //     const modal = document.getElementById(modalElementId);
    //     const closeButton = modal.querySelector(closeButtonClass);
    //     closeButton.addEventListener('click', () => {
    //         modal.style.display = 'none';
    //     });
    // }

    // // Call this function in setupQuestionModal and displayQuestionDetail
    // setupModalCloseButton('askQuestionModal', '.close');
    // setupModalCloseButton('questionDetailView', '.closeDetail');

    questionDetailView.style.display = "block";
}
