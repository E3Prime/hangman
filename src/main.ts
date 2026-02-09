const reviewInstructions = () => {};
const backToMainMenu = () => {};

const mainMenuElem = document.getElementById("mainMenu") as HTMLElement;
const instructions = document.getElementById("instructionsScreen") as HTMLElement;
const instructionsBtn = mainMenuElem.querySelector("#instructions") as HTMLButtonElement;
const backToMenuBtn = instructions.querySelector("#backToMenu") as HTMLButtonElement;

instructionsBtn.addEventListener("click", reviewInstructions);
backToMenuBtn.addEventListener("click", backToMainMenu);
