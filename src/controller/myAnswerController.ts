import { AnswerQuaries } from "../model/answer";

export class MyAnswerController {
    private userId: number;

    public constructor() {
        const storedUserId: string = sessionStorage.getItem("userid")!;
        if (storedUserId) {
            this.userId = parseInt(storedUserId);
        } else {
            throw new Error("User is not logged in.");
        }
    }

    // Haalt de antwoorden van de ingelogde gebruiker op
    public async getMyAnswers(): Promise<AnswerQuaries[]> {
        try {
            return await AnswerQuaries.getAnswersByUserId(this.userId);
        } catch (error) {
            console.error("Error fetching answers:", error);
            throw error;
        }
    }

    // Werkt een specifiek antwoord van de gebruiker bij
    public async updateAnswer(answerId: number, newContent: string): Promise<boolean> {
        try {
            return await AnswerQuaries.updateAnswer(answerId, newContent, this.userId);
        } catch (error) {
            console.error("Error updating answer:", error);
            return false;
        }
    }


    public async deleteAnswer(answerId: number): Promise<boolean> {
        try {
            return await AnswerQuaries.deleteAnswer(answerId, this.userId);
        } catch (error) {
            console.error("Error in deleting answer:", error);
            return false;
        }
    }
    // Voeg hier eventuele andere methoden toe die je nodig hebt voor de controller
}
