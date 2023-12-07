import "./config";
import { deleteProfile, getInfoData, updateProfileFunction } from "./controller/databaseQuery";


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

    const firstname1: string = sessionStorage.getItem("firstname")!;
    const lastname2: string = sessionStorage.getItem("lastname")!;
    const username3: string = sessionStorage.getItem("username")!;
    const email4: string = sessionStorage.getItem("email")!;
    const userid: string = sessionStorage.getItem("userid")!;


    const inputFirstname: string = (<HTMLInputElement>document.getElementById("inputFirstname")).value;
    const inputLastname: string | null = (<HTMLInputElement>document.getElementById("inputLastname")).value;
    const inputUsername: string | null = (<HTMLInputElement>document.getElementById("inputUsername")).value ;
    const inputEmail: string | null = (<HTMLInputElement>document.getElementById("inputEmail")).value;
    const newUserid: number = Number(userid);

    if (inputFirstname !== firstname1){
        const updateFirstname: boolean = await updateProfileFunction("firstname",inputFirstname);
        if(updateFirstname){
            const updateStorage: any = await getInfoData(newUserid);
            console.log(updateStorage);
            if (updateStorage) {
                sessionStorage.setItem("email", updateStorage.email);
                sessionStorage.setItem("firstname", updateStorage.firstname);
                sessionStorage.setItem("lastname", updateStorage.lastname);
                sessionStorage.setItem("username", updateStorage.username);
                window.location.reload;
                
            } else {
                console.log("error");
            }
        }

    }else if (inputLastname !== lastname2){
        const updateLastname: boolean = await updateProfileFunction("lastname",inputLastname);
        if(updateLastname){
            const updateStorage: any = await getInfoData(newUserid);
        }

    }else if (inputUsername !== username3){
        const updateUsername: boolean = await updateProfileFunction("username",inputUsername);
        if(updateUsername){
            const updateStorage: any = await getInfoData(newUserid);
        }

    }else if (inputEmail !== email4){
        const updateEmail: boolean = await updateProfileFunction("email",inputEmail);
        if(updateEmail){
            const updateStorage: any = await getInfoData(newUserid);
        }

    }else{
        console.log("error");
        alert("error. A mistake happend when updating");
    }
    
}


const image: any = document.getElementById("photo");
const input: any = document.getElementById("file");

input.addEventListener("change", () => {
    const imagesrc:string = URL.createObjectURL(input.files[0]);
});
// console.log(imagesrc);

// const imageElement: HTMLImageElement = document.getElementById("photo") as HTMLImageElement;
// const imagePath: string = imageElement.src;
// console.log("Image Path:", imagePath);




const deleteBtn: HTMLButtonElement = document.getElementById("deleteBtn") as HTMLButtonElement;
deleteBtn.addEventListener("click", deleteProfileFunction);


async function deleteProfileFunction(): Promise<undefined> {
    const userid: string | null = sessionStorage.getItem("userid");
    const deleted: boolean = await deleteProfile(userid);
    
    if(deleted){
        sessionStorage.clear();
        alert("You're account is succesfully deleted.");
        window.location.replace("./index.html");
    }
    

}