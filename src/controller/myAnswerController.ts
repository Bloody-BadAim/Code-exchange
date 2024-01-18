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

    public async getMyAnswers(): Promise<AnswerQuaries[]> {
        try {
            return await AnswerQuaries.getAnswersByUserId(this.userId);
        } catch (error) {
            console.error("Error fetching answers:", error);
            throw error;
        }
    }
}
