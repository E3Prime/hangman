const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const revealCategorySelections = async () => {
  mainMenuElem.classList.add("slide-up");
  await sleep(775);
  mainMenuElem.setAttribute("hidden", "");
  categorySelection.removeAttribute("hidden");
  await sleep(775);
  categorySelection.classList.add("fade-in");
};

const backToMenuFromCategories = async () => {
  categorySelection.classList.remove("fade-in");
  await sleep(775);
  categorySelection.setAttribute("hidden", "");
  mainMenuElem.removeAttribute("hidden");
  await sleep(750);
  mainMenuElem.classList.remove("slide-up");
};

const revealInstructions = async () => {
  mainMenuElem.classList.add("slide-left");
  await sleep(775);
  mainMenuElem.setAttribute("hidden", "");
  instructions.removeAttribute("hidden");
  await sleep(775);
  instructions.classList.add("slide-left");
};

const backToMenuFromInstructions = async () => {
  instructions.classList.remove("slide-left");
  await sleep(775);
  instructions.setAttribute("hidden", "");
  mainMenuElem.removeAttribute("hidden");
  await sleep(775);
  mainMenuElem.classList.remove("slide-left");
};

const mainMenuElem = document.getElementById("mainMenu") as HTMLElement;
const instructions = document.getElementById("instructions") as HTMLElement;
const categorySelection = document.getElementById("categorySelection") as HTMLElement;

const revealCategoriesBtn = mainMenuElem.querySelector("#revealCategories") as HTMLButtonElement;
const revealInstructionsBtn = mainMenuElem.querySelector("#revealInstructions") as HTMLButtonElement;
const backToMenuFromCategoriesBtn = categorySelection.querySelector("#backToMenuFromCategories") as HTMLButtonElement;
const backToMenuFromInstructionsBtn = instructions.querySelector("#backToMenuFromInstructions") as HTMLButtonElement;
const selectCategoryElem = categorySelection.querySelector("#selectCategory") as HTMLElement;

revealCategoriesBtn.addEventListener("click", revealCategorySelections);
revealInstructionsBtn.addEventListener("click", revealInstructions);
backToMenuFromCategoriesBtn.addEventListener("click", backToMenuFromCategories);
backToMenuFromInstructionsBtn.addEventListener("click", backToMenuFromInstructions);
selectCategoryElem.addEventListener("click", startGame);

function startGame(e: PointerEvent) {
  if (!(e.target instanceof HTMLButtonElement)) return;
}
