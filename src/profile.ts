import "./config";
import { session } from "@hboictcloud/api";
import { updateProfileFunction } from "./databaseQuery";

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

    const firstname: string = sessionStorage.getItem("firstname")!;
    const lastname: string = sessionStorage.getItem("lastname")!;
    const username: string = sessionStorage.getItem("username")!;
    const email: string = sessionStorage.getItem("email")!;

    const inputFirstname: string = (<HTMLInputElement>document.getElementById("inputFirstname")).value;
    const inputLastname: string | null = (<HTMLInputElement>document.getElementById("inputLastname")).value;
    const inputUsername: string | null = (<HTMLInputElement>document.getElementById("inputUsername")).value ;
    const inputEmail: string | null = (<HTMLInputElement>document.getElementById("inputEmail")).value;

    if (inputFirstname !== firstname){
        const updateFirstname: boolean = await updateProfileFunction(firstname,inputFirstname);

    }else if (inputLastname !== lastname){
        const updateLastname: boolean = await updateProfileFunction(lastname,inputLastname);

    }else if (inputUsername !== username){
        const updateUsername: boolean = await updateProfileFunction(username,inputUsername);

    }else if (inputEmail !== email){
        const updateEmail: boolean = await updateProfileFunction(email,inputEmail);

    }else{
        console.log("error");
        alert("error. A mistake happend when updating");
    }
    

}

