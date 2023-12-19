import { UserController } from "../controller/userController";

const userController : UserController = new UserController();

// loads profile information 
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





document.getElementById("btnEdit")?.addEventListener("click", function(){
    console.log("het werkt");
    document.querySelector("#popup")?.classList.add("active");

    const editFirstname: HTMLInputElement = (document.getElementById("editFirstname") as HTMLInputElement);
    const editLastname: HTMLInputElement = (document.getElementById("editLastname") as HTMLInputElement);
    const editUsername: HTMLInputElement = (document.getElementById("editUsername") as HTMLInputElement);
    const editEmail: HTMLInputElement = (document.getElementById("editEmail") as HTMLInputElement);


    const firstname: string | null = sessionStorage.getItem("firstname");
    const lastname: string | null = sessionStorage.getItem("lastname");
    const username: any  = sessionStorage.getItem("username");
    const email: any = sessionStorage.getItem("email");


    if(firstname){
        editFirstname.value = firstname || " ";
    }
    if(lastname){
        editLastname.value = lastname || " ";
    }
    if(username){
        editUsername.value = username || " ";
    }
    if(email){
        editEmail.value = email || " ";
    }
    

});



// takes the new input values
// and updates the database with new values.
document.getElementById("btnUpdateProfile")?.addEventListener("click", async () => {
    const inputFirstname: string = (document.getElementById("editFirstname") as HTMLInputElement).value;
    const inputLastname: string = (document.getElementById("editLastname") as HTMLInputElement).value;
    const inputUsername: string = (document.getElementById("editUsername") as HTMLInputElement).value;
    const inputEmail: string = (document.getElementById("editEmail") as HTMLInputElement).value;

    try {
        await userController.updateProfile(inputFirstname, inputLastname, inputUsername, inputEmail);
        alert("Profile successfully updated.");
        window.location.reload();
    } catch (error) {
        console.error("Update Profile Error:", error);
        alert("An error occurred while updating the profile.");
    }
});

// function to delete profile
//user.cotroller deletes with cascade everything.
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

// function to logout
const btnLogout: HTMLElement = document.getElementById("logout")!;
if (btnLogout) {
    btnLogout.addEventListener("click", logout);
}
function logout(): void {
    sessionStorage.clear();
    window.location.href = "index.html";
}
