import "./config";
// import { UserController } from "./controller/userController";
// import { api } from "@hboictcloud/api";



async function insertNavbarIntoHeader(): Promise<void> {
    try {
        const response: Response = await fetch("navbar.html");
        const navbarHtml: string = await response.text();
        const headerElement: HTMLElement | null = document.getElementById("header");
        if (headerElement) {
            headerElement.innerHTML = navbarHtml;
        } else {
            console.error("Element with ID header not found.");
        }
    } catch (error) {
        console.error("Error fetching navbar:", error);
    }
}
insertNavbarIntoHeader();


// const btnnn: any = document.getElementById("click")

const btnLogout: HTMLElement = document.getElementById("logout")!;
if (btnLogout) {
    btnLogout.addEventListener("click", logout);
}
function logout(): void {
    sessionStorage.clear();
    window.location.href = "index.html";
}


// const userController: UserController = new UserController();
// const btn: any = document.getElementById("logout");
// if(btn){
//     btn.addEventListener("click", function() {
//         console.log("je moeder");
//     });
// }


