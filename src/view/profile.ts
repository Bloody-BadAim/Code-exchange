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

    inputFirstname.innerHTML = `<strong>Firstname:</strong> <em>${firstname}</em>`;
    inputLastname.innerHTML = `<strong>Lastname:</strong> <em>${lastname}</em>`;
    inputUsername.innerHTML = `<strong>Username:</strong> <em>${username}</em>`;
    inputEmail.innerHTML = `<strong>Email:</strong> <em>${email}</em>`;



    
}
loadProfile();


document.getElementById("closeBtn")?.addEventListener("click", function(){
    document.querySelector("#popup")?.classList.remove("active");
});



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
        const answer: any = await userController.deleteProfile();
        if(answer === true){
            alert("your account has been succesfully deleted");
            window.location.replace("./index.html");
        }else{
            alert("your deletion is cancelled");
        }
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




// import { UserController } from "../controller/userController";

// /**
//  * Class representing the profile view.
//  */
// class ProfileView {
//     private userController: UserController;
//     private inputFirstname: HTMLElement;
//     private inputLastname: HTMLElement;
//     private inputUsername: HTMLElement;
//     private inputEmail: HTMLElement;

//     public constructor() {
//         this.userController = new UserController();
//         this.inputFirstname = document.getElementById("inputFirstname") as HTMLElement;
//         this.inputLastname = document.getElementById("inputLastname") as HTMLElement;
//         this.inputUsername = document.getElementById("inputUsername") as HTMLElement;
//         this.inputEmail = document.getElementById("inputEmail") as HTMLElement;

//         this.attachEventListeners();
//         this.loadProfile();
//     }

//     private attachEventListeners(): void {
//         document.getElementById("closeBtn")?.addEventListener("click", this.closePopup);
//         document.getElementById("btnEdit")?.addEventListener("click", this.openPopup);
//         document.getElementById("btnUpdateProfile")?.addEventListener("click", this.updateProfile);
//         document.getElementById("deleteBtn")?.addEventListener("click", this.deleteProfile);

//         const btnLogout: HTMLElement = document.getElementById("logout")!;
//         btnLogout.addEventListener("click", this.logout);
//     }

//     private loadProfile(): void {
//         // Retrieve user data from session storage
//         const firstname: string | null = sessionStorage.getItem("firstname");
//         const lastname: string | null = sessionStorage.getItem("lastname");
//         const username: string | null = sessionStorage.getItem("username");
//         const email: string | null = sessionStorage.getItem("email");

//         this.inputFirstname.innerHTML = `<strong>Firstname:</strong> <em>${firstname}</em>`;
//         this.inputLastname.innerHTML = `<strong>Lastname:</strong> <em>${lastname}</em>`;
//         this.inputUsername.innerHTML = `<strong>Username:</strong> <em>${username}</em>`;
//         this.inputEmail.innerHTML = `<strong>Email:</strong> <em>${email}</em>`;
//     }

//     private closePopup = (): void => {
//         document.querySelector("#popup")?.classList.remove("active");
//     };

//     private openPopup = (): void => {
//         document.querySelector("#popup")?.classList.add("active");
//         // ... rest of the code for opening popup
//     };

//     private updateProfile = async (): Promise<void> => {
//         // ... rest of the code for updating profile
//     };

//     private deleteProfile = async (): Promise<void> => {
//         // ... rest of the code for deleting profile
//     };

//     private logout = (): void => {
//         sessionStorage.clear();
//         window.location.href = "index.html";
//     }
// }

// // Initialize the profile view when the DOM is fully loaded
// document.addEventListener("DOMContentLoaded", () => {
//     new ProfileView();
// });