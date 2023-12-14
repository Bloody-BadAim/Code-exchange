import { UserController } from "../controller/userController";

const userController : UserController = new UserController();

function loadProfile(): void {
    const inputFirstname: HTMLElement = document.getElementById("inputFirstname") as HTMLElement;
    const inputLastname: HTMLElement = document.getElementById("inputLastname") as HTMLElement;
    const inputUsername: HTMLElement = document.getElementById("inputUsername") as HTMLElement;
    const inputEmail: HTMLElement = document.getElementById("inputEmail") as HTMLElement;

    // Retrieve user data from session storage
    const firstname: string | null = sessionStorage.getItem("firstname");
    const lastname: string | null = sessionStorage.getItem("lastname");
    const username: any  = sessionStorage.getItem("username");
    const email: any = sessionStorage.getItem("email");

    inputFirstname.textContent = `Firstname: ${firstname}`;
    inputLastname.textContent = `Lastname: ${lastname}`;
    inputUsername.textContent = `Username: ${username}`;
    inputEmail.textContent = `Email: ${email}`;
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

const btnLogout: HTMLElement = document.getElementById("logout")!;
if (btnLogout) {
    btnLogout.addEventListener("click", logout);
}
function logout(): void {
    sessionStorage.clear();
    window.location.href = "index.html";
}
