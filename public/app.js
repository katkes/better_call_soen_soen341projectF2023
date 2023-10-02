//document content loaded or not

// import { initializeApp } from 'firebase-admin/app';
document.addEventListener("DOMContentLoaded", event => {

    const app =firebase.app();
    console.log(app);

    const button = document.getElementById("tester");

    button.addEventListener("click", function () {
        alert("Hello World!");
    });


});



