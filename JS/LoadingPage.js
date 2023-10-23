document.addEventListener("DOMContentLoaded", function () {
    simulateLoading();
});

function simulateLoading() {
    const progressBar = document.querySelector(".progress");
    let progress = 0;

    const loadingInterval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(loadingInterval);
            openMainPage();
        } else {
            progress++;
            progressBar.style.width = progress + "%";
        }
    }, 50);
}

function openMainPage() {
    window.location.href = "../HtML/MainPage.html";
}
