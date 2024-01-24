import { MyAnswerController } from "../controller/myAnswerController";
import { AnswerQuaries } from "../model/answer";

class MyAnswerView {
    private answerController: MyAnswerController;
    private answersContainer: HTMLElement;

    public constructor() {
        this.answerController = new MyAnswerController();
        this.answersContainer = this.getHTMLElement("myAnswersContainer");
        this.displayMyAnswers();
    }

    private getHTMLElement(elementId: string): HTMLElement {
        const element: HTMLElement = document.getElementById(elementId)!;
        if (!element) throw new Error(`Element with ID ${elementId} not found`);
        return element;
    }

    private async displayMyAnswers(): Promise<void> {
        try {
            const myAnswers: AnswerQuaries[] = await this.answerController.getMyAnswers();
            this.answersContainer.innerHTML = "";

            myAnswers.reverse().forEach(answer => {
                const row: HTMLTableRowElement = document.createElement("tr");
                row.innerHTML = `
                    <td><span class="answer-text">${answer._contentAnswer}</span><textarea class="edit-textarea" style="display: none;">${answer._contentAnswer}</textarea></td>
                    <td>${new Date(answer._createdatAnswer).toLocaleDateString()}</td>
                    <td>
                        <button class="dark-btn edit-btn">Edit</button>
                        <button class="dark-btn save-btn" style="display: none;">Save</button>
                    </td>
                    <td>
                        <button class="dark-btn-cancel delete-btn">Delete</button>
                    </td>
                `;

                this.answersContainer.appendChild(row);


                const editBtn: HTMLButtonElement = row.querySelector(".edit-btn") as HTMLButtonElement;
                const saveBtn: HTMLButtonElement = row.querySelector(".save-btn") as HTMLButtonElement;
                const deleteBtn: HTMLButtonElement = row.querySelector(".delete-btn") as HTMLButtonElement; // Added delete button reference
                const answerText: HTMLElement = row.querySelector(".answer-text") as HTMLElement;
                const editTextArea: HTMLTextAreaElement = row.querySelector(".edit-textarea") as HTMLTextAreaElement;

                // Stop propagation for edit button click
                editBtn.addEventListener("click", (event) => {
                    event.stopPropagation();
                    answerText.style.display = "none";
                    editTextArea.style.display = "";
                    editBtn.style.display = "none";
                    saveBtn.style.display = "";
                });

                // Stop propagation for save button click and handle the update logic
                saveBtn.addEventListener("click", async (event) => {
                    event.stopPropagation();
                    const result: boolean = await this.saveEditedAnswer(answer._answerid, editTextArea.value);
                    if (result) {
                        answerText.textContent = editTextArea.value;
                        answerText.style.display = "";
                        editTextArea.style.display = "none";
                        editBtn.style.display = "";
                        saveBtn.style.display = "none";
                        if (answer._questionid !== undefined) {
                            sessionStorage.setItem("selectedQuestionId", answer._questionid.toString());
                            window.location.href = "questionDetail.html";
                        } else {
                            console.error("Question ID is undefined.");
                        }
                    }
                });
                deleteBtn.addEventListener("click", async (e) => {
                    e.stopPropagation();  // Prevent the row click event
                    const confirmed: boolean = confirm("Are you sure you want to delete this answer?");
                    if (confirmed) {
                        const success : boolean= await this.answerController.deleteAnswer(answer._answerid);
                        if (success) {
                            alert("Answer deleted successfully");
                            row.remove();
                        } else {
                            alert("Failed to delete the answer");
                        }
                    }
                });
            });
        } catch (error) {
            console.error("Error displaying answers:", error);
            this.answersContainer.innerHTML = "<tr><td colspan=\"4\">Error loading answers.</td></tr>";
        }
    }

    private async saveEditedAnswer(answerId: number, newContent: string): Promise<boolean> {
        try {
            const result: boolean = await this.answerController.updateAnswer(answerId, newContent);
            if (result) {
                console.log("Answer updated successfully");
                return true;
            } else {
                console.error("Failed to update answer");
                return false;
            }
        } catch (error) {
            console.error("Error updating answer:", error);
            return false;
        }
    }
}

new MyAnswerView();
