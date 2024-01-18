// myAnswerView.ts
import { MyAnswerController } from "../controller/myAnswerController";
import { AnswerQuaries } from "../model/answer";

class MyAnswerView {
    private answerController: MyAnswerController;
    private answersContainer: HTMLElement;

    public constructor() {
        this.answerController = new MyAnswerController();
        this.answersContainer = document.getElementById("myAnswersContainer") as HTMLElement;
        this.displayMyAnswers();
    }

    private async displayMyAnswers(): Promise<void> {
        try {
            const myAnswers: AnswerQuaries[] = await this.answerController.getMyAnswers();
            this.answersContainer.innerHTML = "";

            myAnswers.forEach(answer => {
                const row: HTMLTableRowElement = document.createElement("tr");
                row.innerHTML = `
                    <td>${answer._contentAnswer}</td>
                    <td>${new Date(answer._createdatAnswer).toLocaleDateString()}</td>
                    <td><button class="dark-btn edit-btn">Edit</button></td>
                    <td><button class="dark-btn-cancel delete-btn">Delete</button></td>
                `;
                this.answersContainer.appendChild(row);

                // Event listener for navigating to the question detail
                row.addEventListener("click", (e) => {
                    if ((e.target as HTMLElement).tagName !== "BUTTON") {
                        sessionStorage.setItem("selectedQuestionId", answer._questionid.toString());
                        window.location.href = "questionDetail.html"; // Redirect to the question detail page
                    }
                });

                // Edit button event listener
                const editBtn: HTMLButtonElement = row.querySelector(".edit-btn") as HTMLButtonElement;
                editBtn.addEventListener("click", (e) => {
                    e.stopPropagation(); // Prevent triggering the row's click event
                    sessionStorage.setItem("selectedAnswerId", answer._answerid.toString());
                    window.location.href = "editAnswer.html"; // Redirect to the answer edit page
                });
            });
        } catch (error) {
            console.error("Error displaying answers:", error);
            this.answersContainer.innerHTML = "<tr><td colspan=\"4\">Error loading answers.</td></tr>";
        }
    }
}

new MyAnswerView();
