import { UserController } from "../controller/userController";

const userController : UserController = new UserController();

function loadProfile(): void {
    const inputFirstname: HTMLInputElement = document.getElementById("inputFirstname") as HTMLInputElement;
    const inputLastname: HTMLInputElement = document.getElementById("inputLastname") as HTMLInputElement;
    const inputUsername: HTMLInputElement = document.getElementById("inputUsername") as HTMLInputElement;
    const inputEmail: HTMLInputElement = document.getElementById("inputEmail") as HTMLInputElement;

    // Retrieve user data from session storage
    inputFirstname.value = sessionStorage.getItem("firstname") || "";
    inputLastname.value = sessionStorage.getItem("lastname") || "";
    inputUsername.value = sessionStorage.getItem("username") || "";
    inputEmail.value = sessionStorage.getItem("email") || "";
}

loadProfile();




document.getElementById("btnUpdateProfile")?.addEventListener("click", async () => {
    const inputFirstname: string = (document.getElementById("inputFirstname") as HTMLInputElement).value;
    const inputLastname: string = (document.getElementById("inputLastname") as HTMLInputElement).value;
    const inputUsername: string = (document.getElementById("inputUsername") as HTMLInputElement).value;
    const inputEmail: string = (document.getElementById("inputEmail") as HTMLInputElement).value;

    try {
        await userController.updateProfile(inputFirstname, inputLastname, inputUsername, inputEmail);
        alert("Profile successfully updated.");
        window.location.reload();
    } catch (error) {
        console.error("Update Profile Error:", error);
        alert("An error occurred while updating the profile.");
    }
});

document.getElementById("deleteBtn")?.addEventListener("click", async () => {
    try {
        await userController.deleteProfile();
        alert("Your account is successfully deleted.");
        window.location.replace("./index.html");
    } catch (error) {
        console.error("Delete Profile Error:", error);
        alert("An error occurred while deleting the profile.");
    }
});