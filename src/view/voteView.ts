import "../config";
import { VoteController } from "../controller/voteController";


const voteController: VoteController = new VoteController();




function testvote(): Promise<boolean | number> {
    const useridStorage: string | null= sessionStorage.getItem("userid");
    const userid: number = parseInt(useridStorage!);
    const answerid: number = 86;
    const testtest: any = voteController.Vote(userid, answerid, null, null);
    console.log(testtest);
    return testtest;
}



document.getElementById("upvotebtn")?.addEventListener("click", function() {
    // const userid: string | null = sessionStorage.getItem("userid");

    testvote();
    if(true){
        let inputUp: HTMLInputElement = document.getElementById("upvoteNum") as HTMLInputElement;

        // Parse the current value as a number
        let currentValue: number = parseInt(inputUp.value, 10);

        // Increment the value
        let updatedValue: number = currentValue + 1;

        // Update the value of the input element
        inputUp.value = updatedValue.toString();
        const color: HTMLButtonElement = document.getElementById("upvotebtn") as HTMLButtonElement;
        color.style.color = "#3dac78";
    }

    
});






document.getElementById("downvotebtn")?.addEventListener("click", function() {


    // Get the current upvote count from the input element
    let inputDown: HTMLInputElement = document.getElementById("downvoteNum") as HTMLInputElement;

    // Parse the current value as a number
    let currentValue: number = parseInt(inputDown.value, 10);

    // Increment the value
    let updatedValue: number = currentValue + 1;

    // Update the value of the input element
    inputDown.value = updatedValue.toString();
    const color: HTMLButtonElement = document.getElementById("downvotebtn") as HTMLButtonElement;
    color.style.color = "red";
});

// const inputDown: HTMLInputElement = document.getElementById("downvoteNum");

//https://stackoverflow.com/questions/67421922/how-to-permanently-change-color-on-button-click