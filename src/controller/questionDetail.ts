import { QuestionQueries } from "../model/question";
import { AnswerQuaries } from "../model/answer";
import { VoteController } from "./voteController";

/**
 * Class responsible for handling question details and associated answers.
 */
class QuestionDetailHandler {
    private questionTitle = document.getElementById("questionTitle") as HTMLElement;
    private answersList = document.getElementById("answersList") as HTMLElement;
    private newAnswer = document.getElementById("newAnswer") as HTMLTextAreaElement;

    /**
     * Constructor for QuestionDetailHandler class.
     * Initializes the handler by loading the question details.
     */
    public constructor() {
        this.initialize();
    }

    /**
     * Initializes the handler by setting up the UI and event listeners.
     */
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

    /**
     * Loads and displays the details of a specific question and its answers.
     * @param {number} questionId - The ID of the question to load.
     */
    private async loadQuestionDetails(questionId: number): Promise<void> {
        // Load question details
        const question: QuestionQueries | undefined = await QuestionQueries.getQuestionById(questionId);
        if (question) {
            this.questionTitle.innerHTML = `
                <h2>${question._content}</h2>
                <p>Asked by ${question._username} on ${new Date(question._createdAt).toLocaleDateString()}</p>
            `;
        }




        // Retrieving answers for a specific question and rendering them in the UI
        const answers: AnswerQuaries[] = await AnswerQuaries.getAnswersByQuestionId(questionId);
        this.answersList.innerHTML = "";

        answers.forEach((answer) => {
            const answerElement: HTMLDivElement = document.createElement("div");
            answerElement.classList.add("answer-item");
            answerElement.innerHTML = `
                <button id="upvotebtn-${answer._answerid}" class="upvotebtn">
                    <i class='bx bxs-upvote'></i>
                </button>
                <button id="downvotebtn-${answer._answerid}" class="downvotebtn">
                    <i class='bx bxs-downvote'></i>
                </button>
                <p class="answer-content">${answer._contentAnswer}</p>
                <p class="answer-details">Posted by ${answer._username} on ${new Date(answer._createdatAnswer).toLocaleDateString()}</p>
            `;
            this.answersList.appendChild(answerElement);
        });

        // Creating an instance of VoteController to handle voting operations
        const voteController: VoteController = new VoteController();

        // Selecting all buttons and inputs in the document
        const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll("button");
        const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("input");

        console.log(buttons);
        console.log(inputs);

        // Adding event listeners to all buttons
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                console.log(`Button clicked! ID: ${button.id}`);

                // Retrieving user ID from sessionStorage
                const useridStorage: string | null= sessionStorage.getItem("userid");
                const userid: number = Number(useridStorage!);

                // Extracting answer ID from the button's ID
                const arraybtn: any = button.id.split("-");
                const answerid: number = arraybtn[1];

                // Calling the totalVotesRating method from VoteController
                const blabla: any = voteController.totalVotesRating(userid);

                if(arraybtn[0] === "upvotebtn"){
                    // Handling upvote button click
                    const code: any = voteController.Vote(userid, answerid, true, null);
                    const otherFakeBtn: any = "downvotebtn" + `-${answerid}`;
                    const otherBtn: HTMLElement | null = document.getElementById(otherFakeBtn);

                    const color: HTMLButtonElement = document.getElementById(`${button.id}`) as HTMLButtonElement;

                    if (color) {
                        // Checking the color of the button to determine the action
                        const computedStyles: CSSStyleDeclaration = getComputedStyle(color);
                        const buttonColor: string = computedStyles.color;

                        if (buttonColor === "rgb(61, 172, 120)" || buttonColor === "#3dac78") {
                            // If it's green, change it to black
                            color.style.color = "black";
                        } else {
                            // If it's black or any other color, change it to green and reset the color of the other button
                            otherBtn!.style.color = "black";
                            localStorage.setItem("color", "#3dac78");
                            color.style.color = "#3dac78";
                            const totalVotes: any = voteController.loadVote(answerid);
                            const totalvote: [] = totalVotes[0];
                            console.log(totalvote);
                        }
                    }
                    return code;

                } else if(arraybtn[0] === "downvotebtn"){
                    // Handling downvote button click
                    const code: any = voteController.Vote(userid, answerid, null, true);
                    const otherFakeBtn: any = "upvotebtn" + `-${answerid}`;
                    const otherBtn: HTMLElement | null = document.getElementById(otherFakeBtn);

                    const color: HTMLButtonElement = document.getElementById(`${button.id}`) as HTMLButtonElement;
                    
                    if (color) {
                        // Checking the color of the button to determine the action
                        const computedStyles: CSSStyleDeclaration = getComputedStyle(color);
                        const buttonColor: string = computedStyles.color;
                    
                        if (buttonColor === "rgb(255, 0, 0)" || buttonColor === "red") {
                            // If it's red, change it to black
                            color.style.color = "black";
                        } else {
                            // If it's black or any other color, change it to red and reset the color of the other button
                            otherBtn!.style.color = "black";
                            color.style.color = "red";
                        }
                    }      
                    return code;

                } else {
                    // Handling scenarios where both upvote and downvote are null
                    console.log("both null error");
                }
            });
        });
    }

}

new QuestionDetailHandler();

