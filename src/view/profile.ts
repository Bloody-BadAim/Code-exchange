import { UserController } from "../controller/userController";
import { VoteController } from "../controller/voteController";
import { VoteQueries } from "../model/vote";


// Creating an instance of the UserController
const userController: UserController = new UserController();

// Function to load profile information into the UI
function loadProfile(): void {
    // Retrieving HTML elements for user details
    const inputFirstname: HTMLElement = document.getElementById("inputFirstname") as HTMLElement;
    const inputLastname: HTMLElement = document.getElementById("inputLastname") as HTMLElement;
    const inputUsername: HTMLElement = document.getElementById("inputUsername") as HTMLElement;
    const inputEmail: HTMLElement = document.getElementById("inputEmail") as HTMLElement;

    // Retrieving user data from session storage
    const firstname: string | null = sessionStorage.getItem("firstname");
    const lastname: string | null = sessionStorage.getItem("lastname");
    const username: any  = sessionStorage.getItem("username");
    const email: any = sessionStorage.getItem("email");

    // Displaying user details in the UI
    inputFirstname.innerHTML = `<strong>Firstname:</strong> <em>${firstname}</em>`;
    inputLastname.innerHTML = `<strong>Lastname:</strong> <em>${lastname}</em>`;
    inputUsername.innerHTML = `<strong>Username:</strong> <em>${username}</em>`;
    inputEmail.innerHTML = `<strong>Email:</strong> <em>${email}</em>`;
}
// Calling the loadProfile function to display user details
loadProfile();

// Event listener to close the profile edit popup
document.getElementById("closeBtn")?.addEventListener("click", function(){
    document.querySelector("#popup")?.classList.remove("active");
});

// Event listener to open the profile edit popup and pre-fill input fields
document.getElementById("btnEdit")?.addEventListener("click", function(){
    console.log("It works");
    document.querySelector("#popup")?.classList.add("active");

    // Retrieving input elements for editing
    const editFirstname: HTMLInputElement = document.getElementById("editFirstname") as HTMLInputElement;
    const editLastname: HTMLInputElement = document.getElementById("editLastname") as HTMLInputElement;
    const editUsername: HTMLInputElement = document.getElementById("editUsername") as HTMLInputElement;
    const editEmail: HTMLInputElement = document.getElementById("editEmail") as HTMLInputElement;

    // Retrieving user data from session storage and pre-filling input fields
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
    displayAverageRating();
});

// Event listener to update user profile with new input values
document.getElementById("btnUpdateProfile")?.addEventListener("click", async () => {
    const inputFirstname: string = (document.getElementById("editFirstname") as HTMLInputElement).value;
    const inputLastname: string = (document.getElementById("editLastname") as HTMLInputElement).value;
    const inputUsername: string = (document.getElementById("editUsername") as HTMLInputElement).value;
    const inputEmail: string = (document.getElementById("editEmail") as HTMLInputElement).value;

    try {
        // Calling the updateProfile method from the UserController
        await userController.updateProfile(inputFirstname, inputLastname, inputUsername, inputEmail);
        // Reloading the page after successful update
        window.location.reload();
    } catch (error) {
        console.error("Update Profile Error:", error);
        alert("An error occurred while updating the profile.");
    }
});

// Event listener to delete user profile
document.getElementById("deleteBtn")?.addEventListener("click", async () => {
    try {
        // Calling the deleteProfile method from the UserController
        const answer: any = await userController.deleteProfile();
        if(answer === true){
            alert("Your account has been successfully deleted.");
            // Redirecting to the index.html page after successful deletion
            window.location.replace("./index.html");
        } else {
            alert("Your deletion is cancelled.");
        }
    } catch (error) {
        console.error("Delete Profile Error:", error);
        alert("An error occurred while deleting the profile.");
    }
});

// Event listener to logout
const btnLogout: HTMLElement = document.getElementById("logout")!;
if (btnLogout) {
    btnLogout.addEventListener("click", logout);
}

// Function to clear session storage and redirect to the index.html page for logout
function logout(): void {
    sessionStorage.clear();
    window.location.href = "index.html";
}
async function displayAverageRating(): Promise<void> {
    try {
        const userId: number | null = Number(sessionStorage.getItem("userid"));
        if (userId === null) {
            console.error("User ID not found in session storage.");
            return;
        }

        const averageRating: number = await VoteQueries.getUserAverageRating(userId);
        const ratingsProfile: HTMLElement | null = document.getElementById("ratingsProfile");

        if (ratingsProfile) {
            // Update the ratingsProfile element with the average rating
            ratingsProfile.textContent = `Average Rating: ${averageRating.toFixed(1)} / 5`;
        }
    } catch (error) {
        console.error("Error displaying average rating:", error);
    }
}
loadProfile();
