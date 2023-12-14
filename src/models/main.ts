import { QuestionQueries } from "../models/questionQuary";

class MainHandler {
    private questionsDisplay = document.getElementById("questionsDisplay") as HTMLElement;

    public constructor() {
        this.loadQuestions();
    }

    public async loadQuestions(): Promise<void> {
        const questions: QuestionQueries[] = await QuestionQueries.getAllQuestions();
        questions.forEach(question => {
            const questionElement: HTMLDivElement = document.createElement("div");
            questionElement.className = "question-item";
            questionElement.textContent = question._content;
            questionElement.addEventListener("click", () => {
                sessionStorage.setItem("selectedQuestionId", question._id.toString());
                window.location.href = "questionDetail.html";
            });
            this.questionsDisplay.appendChild(questionElement);
        });
    }
}

new MainHandler();
