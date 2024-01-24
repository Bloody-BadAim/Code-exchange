import { UserController } from "../controller/userController";
import { VoteController } from "../controller/voteController";


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
        alert("Profile successfully updated.");
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

// Creating an instance of the VoteController
const voteController: VoteController = new VoteController;

// Function to update the rating stars based on the user's total votes rating
async function rating(): Promise<void>{
    const user: string | null = sessionStorage.getItem("userid");
    const userid: number = Number(user);

    // Retrieving HTML elements for rating stars
    const five: HTMLElement | null = document.getElementById("5");
    const four: HTMLElement | null = document.getElementById("4");
    const three: HTMLElement | null = document.getElementById("3");
    const two: HTMLElement | null = document.getElementById("2");
    const one: HTMLElement | null = document.getElementById("1");

    // Retrieving the user's total votes rating
    const rating: any = await voteController.totalVotesRating(userid);
    
    // Updating the color of rating stars based on the rating value
    if(rating === 5){
        five!.style.color = "gold";
        four!.style.color = "gold";
        three!.style.color = "gold";
        two!.style.color = "gold";
        one!.style.color = "gold";
    } else if(rating === 4){
        four!.style.color = "gold";
        three!.style.color = "gold";
        two!.style.color = "gold";
        one!.style.color = "gold";
    } else if(rating === 3){
        three!.style.color = "gold";
        two!.style.color = "gold";
        one!.style.color = "gold";
    } else if(rating === 2){
        two!.style.color = "gold";
        one!.style.color = "gold";
    } else if(rating === 1){
        one!.style.color = "gold";
    }
}

// Calling the rating function to update the rating stars
rating();




/**
 * Uploads a file to the server.
 * @param fileName - The name of the file to be uploaded.
 * @param dataUrl - The data URL representing the file content.
 * @param overwrite - (Optional) If true, overwrites the file if it already exists.
 * @returns A Promise resolving to the URL of the uploaded file or an error reason.
 */
// async function uploadFile(fileName: string, dataUrl: string, overwrite?: true): Promise<string> {
//     try {
//         // Replace "your-selector" with the actual selector for your HTMLInputElement
//         const inputElement: HTMLInputElement | null = document.querySelector("#file");

//         if (inputElement) {
//             const data: any = await utils.getDataUrl(inputElement);

//             // Upload the file to the server
//             const uploadResponse: any = await api.uploadFile(fileName, data.url);

//             // Log the retrieved data and upload response for debugging
//             console.log(data, uploadResponse);

//             // Return the URL of the uploaded file
//             return uploadResponse.url;
//         } else {
//             // Handle the case where the input element is not found
//             throw new Error("Input element not found.");
//         }
//     } catch (reason) {
//         // Log and return the reason in case of an error
//         console.log(reason);
//         return reason;
//     }
// }








// const userController : UserController = new UserController();

// // loads profile information 
// function loadProfile(): void {
//     const inputFirstname: HTMLElement = document.getElementById("inputFirstname") as HTMLElement;
//     const inputLastname: HTMLElement = document.getElementById("inputLastname") as HTMLElement;
//     const inputUsername: HTMLElement = document.getElementById("inputUsername") as HTMLElement;
//     const inputEmail: HTMLElement = document.getElementById("inputEmail") as HTMLElement;

    
//     // Retrieve user data from session storage
//     const firstname: string | null = sessionStorage.getItem("firstname");
//     const lastname: string | null = sessionStorage.getItem("lastname");
//     const username: any  = sessionStorage.getItem("username");
//     const email: any = sessionStorage.getItem("email");

//     inputFirstname.innerHTML = `<strong>Firstname:</strong> <em>${firstname}</em>`;
//     inputLastname.innerHTML = `<strong>Lastname:</strong> <em>${lastname}</em>`;
//     inputUsername.innerHTML = `<strong>Username:</strong> <em>${username}</em>`;
//     inputEmail.innerHTML = `<strong>Email:</strong> <em>${email}</em>`;



    
// }
// loadProfile();


// document.getElementById("closeBtn")?.addEventListener("click", function(){
//     document.querySelector("#popup")?.classList.remove("active");
// });



// document.getElementById("btnEdit")?.addEventListener("click", function(){
//     console.log("het werkt");
//     document.querySelector("#popup")?.classList.add("active");

    
//     const editFirstname: HTMLInputElement = (document.getElementById("editFirstname") as HTMLInputElement);
//     const editLastname: HTMLInputElement = (document.getElementById("editLastname") as HTMLInputElement);
//     const editUsername: HTMLInputElement = (document.getElementById("editUsername") as HTMLInputElement);
//     const editEmail: HTMLInputElement = (document.getElementById("editEmail") as HTMLInputElement);


//     const firstname: string | null = sessionStorage.getItem("firstname");
//     const lastname: string | null = sessionStorage.getItem("lastname");
//     const username: any  = sessionStorage.getItem("username");
//     const email: any = sessionStorage.getItem("email");


//     if(firstname){
//         editFirstname.value = firstname || " ";
//     }
//     if(lastname){
//         editLastname.value = lastname || " ";
//     }
//     if(username){
//         editUsername.value = username || " ";
//     }
//     if(email){
//         editEmail.value = email || " ";
//     }
    

// });



// // takes the new input values
// // and updates the database with new values.
// document.getElementById("btnUpdateProfile")?.addEventListener("click", async () => {
//     const inputFirstname: string = (document.getElementById("editFirstname") as HTMLInputElement).value;
//     const inputLastname: string = (document.getElementById("editLastname") as HTMLInputElement).value;
//     const inputUsername: string = (document.getElementById("editUsername") as HTMLInputElement).value;
//     const inputEmail: string = (document.getElementById("editEmail") as HTMLInputElement).value;

//     try {
//         await userController.updateProfile(inputFirstname, inputLastname, inputUsername, inputEmail);
//         alert("Profile successfully updated.");
//         window.location.reload();
//     } catch (error) {
//         console.error("Update Profile Error:", error);
//         alert("An error occurred while updating the profile.");
//     }
// });

// // function to delete profile
// //user.cotroller deletes with cascade everything.
// document.getElementById("deleteBtn")?.addEventListener("click", async () => {
//     try {
//         const answer: any = await userController.deleteProfile();
//         if(answer === true){
//             alert("your account has been succesfully deleted");
//             window.location.replace("./index.html");
//         }else{
//             alert("your deletion is cancelled");
//         }
//     } catch (error) {
//         console.error("Delete Profile Error:", error);
//         alert("An error occurred while deleting the profile.");
//     }
// });

// // function to logout
// const btnLogout: HTMLElement = document.getElementById("logout")!;
// if (btnLogout) {
//     btnLogout.addEventListener("click", logout);
// }
// function logout(): void {
//     sessionStorage.clear();
//     window.location.href = "index.html";
// }



// const voteController: VoteController = new VoteController;


// async function rating(): Promise<void>{

//     const user: string | null = sessionStorage.getItem("userid");
//     const userid: number = Number(user);

//     const five: HTMLElement | null = document.getElementById("5");
//     const four: HTMLElement | null = document.getElementById("4");
//     const three: HTMLElement | null = document.getElementById("3");
//     const two: HTMLElement | null = document.getElementById("2");
//     const one: HTMLElement | null = document.getElementById("1");

//     const rating: any = await voteController.totalVotesRating(userid);
//     if(rating === 5){

//         five!.style.color = "gold";
//         four!.style.color = "gold";
//         three!.style.color = "gold";
//         two!.style.color = "gold";
//         one!.style.color = "gold";

//     }else if(rating === 4){

//         four!.style.color = "gold";
//         three!.style.color = "gold";
//         two!.style.color = "gold";
//         one!.style.color = "gold";

//     }else if(rating === 3){

//         three!.style.color = "gold";
//         two!.style.color = "gold";
//         one!.style.color = "gold";

//     }else if(rating === 2){

//         two!.style.color = "gold";
//         one!.style.color = "gold";

//     }else if(rating === 1){

//         one!.style.color = "gold";
//     }


// }

// rating();
