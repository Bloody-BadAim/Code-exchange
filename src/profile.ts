import "./config";
import { UserProfileManager } from "./models/register";

const userManager: UserProfileManager = new UserProfileManager(); // Create an instance of UserProfileManager

function loadProfile(): void {

    const firstname: string | null = sessionStorage.getItem("firstname");
    const lastname: string | null = sessionStorage.getItem("lastname");
    const username: string | null = sessionStorage.getItem("username");
    const email: string | null = sessionStorage.getItem("email");

    const inputFirstname: HTMLInputElement | null = document.getElementById("inputFirstname") as HTMLInputElement;
    const inputLastname: HTMLInputElement | null = document.getElementById("inputLastname") as HTMLInputElement;
    const inputUsername: HTMLInputElement | null = document.getElementById("inputUsername") as HTMLInputElement;
    const inputEmail: HTMLInputElement | null = document.getElementById("inputEmail") as HTMLInputElement;

    if (inputFirstname && firstname !== null) {
        inputFirstname.value = firstname;
    }
    if (inputLastname && lastname !== null) {
        inputLastname.value = lastname;
    }
    if (inputUsername && username !== null) {
        inputUsername.value = username;
    }
    if (inputEmail && email !== null) {
        inputEmail.value = email;
    }
}
loadProfile();

const btnUpdate: HTMLButtonElement | null = document.getElementById("btnUpdateProfile") as HTMLButtonElement;
btnUpdate.addEventListener("click", updateProfile);

async function updateProfile(): Promise<void> {
    const inputFirstname: string = (document.getElementById("inputFirstname") as HTMLInputElement).value;
    const inputLastname: string = (document.getElementById("inputLastname") as HTMLInputElement).value;
    const inputUsername: string = (document.getElementById("inputUsername") as HTMLInputElement).value;
    const inputEmail: string = (document.getElementById("inputEmail") as HTMLInputElement).value;

    try {
        await userManager.updateProfile(inputFirstname, inputLastname, inputUsername, inputEmail);
        window.location.reload();
    } catch (error) {
        console.error(error);
        alert("An error occurred while updating the profile.");
    }
}

// const image: any = document.getElementById("photo");
// const input: any = document.getElementById("file");

// input.addEventListener("change", () => {
//     const imagesrc:string = URL.createObjectURL(input.files[0]);
// });
// console.log(imagesrc);

// const imageElement: HTMLImageElement = document.getElementById("photo") as HTMLImageElement;
// const imagePath: string = imageElement.src;
// console.log("Image Path:", imagePath);
const deleteBtn: HTMLButtonElement = document.getElementById("deleteBtn") as HTMLButtonElement;
deleteBtn.addEventListener("click", deleteProfileFunction);

async function deleteProfileFunction(): Promise<void> {
    try {
        await userManager.deleteProfile();
        alert("Your account is successfully deleted.");
        window.location.replace("./index.html");
    } catch (error) {
        console.error(error);
        alert("An error occurred while deleting the profile.");
    }
}
