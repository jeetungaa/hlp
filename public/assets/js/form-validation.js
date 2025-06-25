document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm_password");


    const email_inputBox = document.getElementById("email_inputBox");
    const password_inputBox = document.getElementById("password_inputBox");
    const confirm_password_inputBox = document.getElementById("confirm_password_inputBox");

    let pswd;

    emailInput.addEventListener("keyup", (e) => {
        validateEmail(e.target.value);
    });

    passwordInput.addEventListener("keyup", (e) => {
        validatePassword(e.target.value);
        pswd = e.target.value
    });

    confirmPasswordInput.addEventListener("keyup", (e) => {
        validateConfirmPassword(e.target.value);
    });

    const validateEmail = (value) => {
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/; 
        if(emailPattern.test(value)){
            console.log("passed");
            email_inputBox.style.border = "1px solid rgba(0,0,0,0.12)"
        }else{
            console.log("failed");
            email_inputBox.style.border = "2px solid red";
        }
    };

    const validatePassword = (value) => {
        const passwordPattern = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
        if(passwordPattern.test(value)){
            console.log("passed");
            password_inputBox.style.border = "1px solid rgba(0,0,0,0.12)"
        }else{
            console.log("failed");
            password_inputBox.style.border = "2px solid red";
        }
    };

    const validateConfirmPassword = (value) => {
        const passwordPattern = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
        if(passwordPattern.test(value) && value === pswd){
            console.log("passed");
            confirm_password_inputBox.style.border = "1px solid rgba(0,0,0,0.12)"
        }else{
            console.log("failed");
            confirm_password_inputBox.style.border = "2px solid red";
        }
    };
});