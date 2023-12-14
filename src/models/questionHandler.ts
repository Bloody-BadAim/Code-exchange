
// class ModalManager {
//     public constructor(private modalElement: HTMLElement, private closeButtonSelector: string) {
//         this.setupCloseButton();
//     }

   
//     private setupCloseButton(): void {
//         const closeButton: HTMLElement = this.modalElement.querySelector(this.closeButtonSelector) as HTMLElement;
//         closeButton.addEventListener("click", () => {
//             this.modalElement.style.display = "none";
//         });
//     }

   
//     public open(): void {
//         this.modalElement.style.display = "block";
//     }

    
//     public close(): void {
//         this.modalElement.style.display = "none";
//     }
// }


// export class QuestionHandler {
//     private questionsDisplay: HTMLElement = document.getElementById("questionsDisplay") as HTMLElement;
//     private askQuestionModal: ModalManager;
//     private questionInput: HTMLTextAreaElement = document.getElementById("questionInput") as HTMLTextAreaElement;

//     public constructor() {
//         this.askQuestionModal = new ModalManager(document.getElementById("askQuestionModal") as HTMLElement, ".close");
//         this.setupQuestionModal();
//         this.setupSubmitQuestionButton();
//     }


//     private setupQuestionModal(): void {
//         const askQuestionButton: HTMLElement = document.getElementById("askQuestionButton") as HTMLElement;
//         askQuestionButton.addEventListener("click", () => this.askQuestionModal.open());
//     }

    
//     private setupSubmitQuestionButton(): void {
//         const submitQuestionButton: HTMLElement = document.getElementById("submitQuestion") as HTMLElement;
//         submitQuestionButton.addEventListener("click", async () => {
//             const userId: string = sessionStorage.getItem("userid")!;
//             if (!userId) {
//                 console.error("User ID not found in session storage");
//                 return;
//             }

//             await postQuestion(parseInt(userId), this.questionInput.value);
//             this.questionInput.value = "";
//             this.askQuestionModal.close();
//             await this.loadQuestions();
//         });
//     }


//     public async loadQuestions(): Promise<void> {
//         const questions: Question[] = await getAllQuestions();
//         this.questionsDisplay.innerHTML = "";
//         questions.forEach(question => {
//             const questionDiv : HTMLDivElement= document.createElement("div");
//             questionDiv.innerHTML = `<p>${question.content}</p>`;
//             questionDiv.addEventListener("click", () => this.displayQuestionDetail(question.id));
//             this.questionsDisplay.appendChild(questionDiv);
//         });
//     }

//     public async displayQuestionDetail(questionId: number): Promise<void> {
//         const questionDetailView: HTMLElement = document.getElementById("questionDetailView") as HTMLElement;
//         const questionContentDiv : HTMLElement= document.getElementById("questionContent") as HTMLElement;
//         const answersListDiv: HTMLElement = document.getElementById("answersList") as HTMLElement;
//         questionContentDiv.innerHTML = "";
//         answersListDiv.innerHTML = "";
//         const question:Question | undefined  = await getQuestionById(questionId);
//         const answers: Answer[] = await getAnswersByQuestionId(questionId);
//         const userId: string = sessionStorage.getItem("userid")!;
//         if (!userId) {
//             console.error("User ID not found in session storage");
//             return;
//         }
//         if (question) {
//             questionContentDiv.innerHTML = `<h3>${question.content}</h3>`;
//         }
//         this.createAnswerSection(questionDetailView, questionId);

//         if (answers && answers.length > 0) {
//             answers.forEach(answer => {
//                 const answerDiv: HTMLDivElement = document.createElement("div");
//                 answerDiv.innerHTML = `<p>${answer.contentAnswer}</p>`;
//                 answersListDiv.appendChild(answerDiv);
//             });
//         } else {
//             answersListDiv.innerHTML = "<p>No answers yet.</p>";
//         }
//         this.setupModalCloseButton("askQuestionModal", ".close");
//         this.setupModalCloseButton("questionDetailView", ".closeDetail");
//         questionDetailView.style.display = "block";
//     }

//     private createAnswerSection(questionDetailView: HTMLElement, questionId: number): void {
//         const existingAnswerSection: HTMLElement  = document.getElementById("answerSection")!;
//         if (existingAnswerSection) {
//             existingAnswerSection.remove();
//         }
//         const answerSection: HTMLDivElement = document.createElement("div");
//         answerSection.id = "answerSection";
//         answerSection.innerHTML = `
//             <textarea id="answerInput" class="answer-input" placeholder="Your answer..."></textarea>
//             <pre id="codePreview" class="code-preview"></pre>
//             <button id="addCodeSnippet">Add Code Snippet</button>
//             <button id="submitAnswer">Submit Answer</button>
//         `;
//         questionDetailView.appendChild(answerSection);

//         this.initializeAnswerSectionEventListeners(questionId);
//     }

//     private initializeAnswerSectionEventListeners(questionId: number): void {
//         const answerInput: HTMLTextAreaElement = document.getElementById("answerInput") as HTMLTextAreaElement;
//         const addCodeSnippetButton: HTMLElement = document.getElementById("addCodeSnippet") as HTMLElement;
//         const submitAnswerButton : HTMLElement= document.getElementById("submitAnswer") as HTMLElement;

//         addCodeSnippetButton.addEventListener("click", () => {
//             const codeTemplate:string = "\n```\n// Your code here\n```\n";
//             answerInput.value += codeTemplate;
//             answerInput.classList.add("code-snippet");
//             this.updateCodePreview(answerInput.value);
//         });

//         submitAnswerButton.addEventListener("click", async () => {
//             const userId: string = sessionStorage.getItem("userid")!;
//             if (!userId) {
//                 console.error("User ID not found in session storage");
//                 return;
//             }

//             await postAnswer(questionId, parseInt(userId), answerInput.value);
//             answerInput.value = "";
//             this.updateCodePreview("");
//             await this.displayQuestionDetail(questionId);
//         });

//         answerInput.addEventListener("input", () => {
//             this.updateCodePreview(answerInput.value);
//         });
//     }


//     private updateCodePreview(code: string): void {
//         const codePreview: HTMLElement = document.getElementById("codePreview") as HTMLElement;
//         codePreview.textContent = code;
//         codePreview.style.display = code ? "block" : "none";
//     }

//     private async setupModalCloseButton(modalElementId: string, closeButtonClass: string): Promise<void> {
//         const modal: HTMLElement = document.getElementById(modalElementId) as HTMLElement;
//         const closeButton: HTMLElement = modal.querySelector(closeButtonClass) as HTMLElement;
//         closeButton.addEventListener("click", () => {
//             modal.style.display = "none";
//         });
//     }
// }

// const questionHandler: QuestionHandler = new QuestionHandler();
// export default questionHandler;