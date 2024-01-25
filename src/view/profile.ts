import { UserController } from "../controller/userController";
import { VoteController } from "../controller/voteController";
import { VoteQueries } from "../model/vote";

// Creating an instance of the UserController
const voteController: VoteController = new VoteController();
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
});


function isValidEmail(email: string): boolean {
    const emailRegex: any = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Event listener to update user profile with new input values
document.getElementById("btnUpdateProfile")?.addEventListener("click", async () => {
    const inputFirstname: string = (document.getElementById("editFirstname") as HTMLInputElement).value;
    const inputLastname: string = (document.getElementById("editLastname") as HTMLInputElement).value;
    const inputUsername: string = (document.getElementById("editUsername") as HTMLInputElement).value;
    const inputEmail: string = (document.getElementById("editEmail") as HTMLInputElement).value;

    if (inputEmail) {
        if (isValidEmail(inputEmail)) {
            // Valid email address
            console.log("Valid email address");
            try {
                // Calling the updateProfile method from the UserController
                await userController.updateProfile(inputFirstname, inputLastname, inputUsername, inputEmail);
                alert("Profile successfully updated.");
                // Reloading the page after successful update
                window.location.reload();
            } catch (error) {
                console.error("Update Profile Error:", error);
                alert("An error occurred while updating the profile.");
            }
        } else {
            // Invalid email address
            console.log("Invalid email address");
            alert("wrong email");
        }
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
        const userid: number | null = Number(sessionStorage.getItem("userid"));
        if (userid === null) {
            console.error("User ID not found in session storage.");
            return;
        }

        const averageRating: number = await voteController.getAverageRating(userid);
        const vijf: any = document.getElementById("5");
        const vier: any = document.getElementById("4");
        const drie: any = document.getElementById("3");
        const twee: any = document.getElementById("2");
        const een: any = document.getElementById("1");

        if(averageRating >= 5){
            vijf.style.color = "gold";
            vier.style.color = "gold";
            drie.style.color = "gold";
            twee.style.color = "gold";
            een.style.color = "gold";

        }else if(averageRating >=4){
            vier.style.color = "gold";
            drie.style.color = "gold";
            twee.style.color = "gold";
            een.style.color = "gold";

        }else if(averageRating >=3){
            drie.style.color = "gold";
            twee.style.color = "gold";
            een.style.color = "gold";
            
        }else if(averageRating >=2){
            twee.style.color = "gold";
            een.style.color = "gold";
            
        }else if(averageRating >=1){
            een.style.color = "gold";
        }

    } catch (error) {
        console.error("Error displaying average rating:", error);
    }
}



const profilePic: HTMLImageElement | null = document.getElementById("photo") as HTMLImageElement | null;
const inputFile: HTMLInputElement | null = document.getElementById("file") as HTMLInputElement | null;

if (profilePic && inputFile) {
    inputFile.addEventListener("change", function () {
        if (inputFile.files && inputFile.files[0]) {
            profilePic.src = URL.createObjectURL(inputFile.files[0]);
            console.log(profilePic.src);
            sessionStorage.setItem("pfp", profilePic.src);
        }
    });
}    

async function loadPicture(): Promise<void>{
    const profilePic: HTMLImageElement | null = document.getElementById("photo") as HTMLImageElement | null;
    const inputFile: HTMLInputElement | null = document.getElementById("file") as HTMLInputElement | null;

    // const blob: any = await userController.getgetpfp();
    // const blob1: any = blob[0];
    // const blobReal: any = Object.values(blob1)[0];
    // console.log(blobReal);


    const getsrc: any = sessionStorage.getItem("pfp");
    console.log(getsrc);

    profilePic!.src = getsrc;

    const insert: any = userController.insertpfp(getsrc);
}

loadPicture();
loadProfile();
displayAverageRating();
