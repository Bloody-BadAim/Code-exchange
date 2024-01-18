import "../config";
// import { UserController } from "../controller/userController";



document.getElementById("upvotebtn")?.addEventListener("click", function() {
    // const userid: string | null = sessionStorage.getItem("userid");

    let inputUp: HTMLInputElement = document.getElementById("upvoteNum") as HTMLInputElement;

    // Parse the current value as a number
    let currentValue: number = parseInt(inputUp.value, 10);

    // Increment the value
    let updatedValue: number = currentValue + 1;

    // Update the value of the input element
    inputUp.value = updatedValue.toString();
    const color: HTMLButtonElement = document.getElementById("upvotebtn") as HTMLButtonElement;
    color.style.color = "#3dac78";
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