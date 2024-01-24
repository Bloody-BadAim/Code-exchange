import { QuestionQueries } from "../model/question";
import { AnswerQuaries } from "../model/answer";
import { VoteQueries } from "../model/vote"; // Assuming VoteQueries has methods for rating

class QuestionDetailHandler {
    private questionTitle = document.getElementById("questionTitle") as HTMLElement;
    private codeSnippetContainer = document.getElementById("codeSnippetContainer") as HTMLElement;
    private answersList = document.getElementById("answersList") as HTMLElement;
    private newAnswer = document.getElementById("newAnswer") as HTMLTextAreaElement;

    public constructor() {
        this.initialize();
        document.addEventListener("searchEvent", (event: Event) => this.handleSearch(event as CustomEvent));
    }


    private handleSearch(event: CustomEvent): void {
        const searchTerm: string = event.detail.toLowerCase();
        const answers: NodeListOf<HTMLDivElement> = this.answersList.querySelectorAll(".answer-item");

        answers.forEach(answer => {
            const isVisible: boolean = answer.textContent?.toLowerCase().includes(searchTerm) || false;
            answer.style.display = isVisible ? "" : "none";
        });
    }

    public async initialize(): Promise<void> {
        try {
            const questionId: number = this.getQuestionIdFromSession();
            if (questionId === -1) {
                return; // Exit if no valid question ID
            }

            await this.loadQuestionDetails(questionId);
            await this.loadAndDisplayAnswers(questionId);

            document.getElementById("submitAnswer")?.addEventListener("click", async () => {
                await this.handleAnswerSubmission(questionId);
                await this.loadAndDisplayAnswers(questionId);
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
        if (!userId) {
            console.error("User not logged in");
            throw new Error("User not logged in");
        }

        const answerContent: string = this.newAnswer.value;
        const codeSnippet: string = (document.getElementById("codeSnippetAnswer") as HTMLTextAreaElement).value;

        console.log("Answer Content:", answerContent);
        console.log("Code Snippet:", codeSnippet);

        if (!answerContent.trim() && !codeSnippet.trim()) {
            alert("Please enter an answer before submitting.");
            window.location.reload();


        }

        let fullAnswerContent: string = answerContent;
        if (codeSnippet.trim()) {
            fullAnswerContent += "\n\n```\n" + codeSnippet + "\n```";
        }

        try {
            const response: any = await AnswerQuaries.postAnswer(questionId, userId, fullAnswerContent);
            console.log("API Response:", response);

            if (response) {
                this.newAnswer.value = "";
                await this.loadQuestionDetails(questionId);
                window.location.reload();
            } else {
                console.error("Failed to post answer");
            }
        } catch (error) {
            console.error("Error posting answer:", error);
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


    private async loadAndDisplayAnswers(questionId: number): Promise<void> {
        const answers: any = await AnswerQuaries.getAnswersByQuestionId(questionId);
        this.answersList.innerHTML = "";

        answers.reverse().forEach((answer: any) => {
            const answerElement: HTMLElement = this.createAnswerElement(answer);
            this.answersList.appendChild(answerElement);
            this.attachRatingEventListeners();
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
        const ratingStarsHtml: string = this.createRatingStars(answer._answerid);
        answerElement.innerHTML += ratingStarsHtml;

        return answerElement;
    }

    private createRatingStars(answerId: number, userRating?: number): string {
        return `
        <div class="rating-stars" data-answer-id="${answerId}">
            ${[1, 2, 3, 4, 5].map(n => `
                <span class="star ${userRating && n <= userRating ? "rated" : ""}" data-rating="${n}">&#9733;</span>
            `).join("")}
        </div>
        `;
    }

    private attachRatingEventListeners(): void {
        const ratingStars: NodeListOf<Element> = this.answersList.querySelectorAll(".rating-stars .star");
        ratingStars.forEach(star => {
            star.addEventListener("click", (event: Event) => this.handleRatingClick(event));
        });
    }
    
    private async handleRatingClick(event: Event): Promise<void> {
        const target: HTMLElement = event.target as HTMLElement;
        const rating: number = Number(target.dataset.rating);
        const answerId: number = Number(target.closest(".rating-stars")?.getAttribute("data-answer-id"));
        
        if (!isNaN(rating) && !isNaN(answerId)) {
            // Check if the rating for this answer is already submitted
            if (!this.isRatingSubmitted(answerId)) {
                await this.handleRatingSubmission(answerId, rating);
                this.updateRatingDisplay(answerId, rating);
                this.setRatingSubmitted(answerId);
            } else {
                console.log("Rating already submitted for this answer.");
            }
        } else {
            console.error("Invalid rating or answer ID");
        }
    }
    
    private setRatingSubmitted(answerId: number): void {
        // Set a flag to indicate that the rating for this answer has been submitted
        sessionStorage.setItem(`ratingSubmittedForAnswer${answerId}`, "true");
    }
    
    private isRatingSubmitted(answerId: number): boolean {
        // Check if the rating for this answer has already been submitted
        return sessionStorage.getItem(`ratingSubmittedForAnswer${answerId}`) === "true";
    }
    
    private async handleRatingSubmission(answerId: number, rating: number): Promise<void> {
        const userId: number = Number(sessionStorage.getItem("userid"));
        if (!userId) {
            console.error("User not logged in");
            throw new Error("User not logged in");
        }
    
        try {
            const success: boolean = await VoteQueries.setRating(userId, answerId, rating);
            if (success) {
                console.log("Rating submitted successfully");
            } else {
                console.error("Failed to submit rating");
            }
        } catch (error) {
            console.error("Error submitting rating:", error);
        }
    }
    
    private updateRatingDisplay(answerId: number, ratingValue: number): void {
        const stars: NodeListOf<HTMLElement> = this.answersList.querySelectorAll(`.rating-stars[data-answer-id='${answerId}'] .star`);
        stars.forEach((star, index) => {
            star.classList.toggle("rated", index < ratingValue);
        });
    }

}

new QuestionDetailHandler();
