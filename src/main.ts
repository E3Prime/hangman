import data from "./assets/data.json";

interface CategoryItem {
  name: string;
  selected: boolean;
}

class Category {
  name: string;
  selected: boolean;

  constructor(data: CategoryItem) {
    this.name = data.name;
    this.selected = data.selected;
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const openGameMenuOptions = async () => {
  menuOptionsElem.removeAttribute("hidden");
  await sleep(5);
  menuOptionsElem.classList.add("fade-in");
  await sleep(775);
  gameMenuOptions.classList.remove("slide-up");
};

const closeGameMenuOptions = async () => {
  gameMenuOptions.classList.add("slide-up");
  await sleep(775);
  menuOptionsElem.classList.remove("fade-in");
  await sleep(775);
  menuOptionsElem.setAttribute("hidden", "");
};

const backToCategoriesFromGame = async () => {
  gameMenuOptions.classList.add("slide-up");
  gameElem.classList.remove("fade-in");
  menuOptionsElem.classList.remove("fade-in");
  await sleep(775);
  menuOptionsElem.setAttribute("hidden", "");
  gameElem.setAttribute("hidden", "");
  categorySelection.removeAttribute("hidden");
  await sleep(5);
  categorySelection.classList.add("fade-in");
};

const backToMenuFromGame = async () => {
  gameMenuOptions.classList.add("slide-up");
  gameElem.classList.remove("fade-in");
  menuOptionsElem.classList.remove("fade-in");
  await sleep(775);
  menuOptionsElem.setAttribute("hidden", "");
  gameElem.setAttribute("hidden", "");
  mainMenuElem.removeAttribute("hidden");
  await sleep(5);
  mainMenuElem.classList.remove("slide-up");
};

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

const replayGame = async () => {
  gameElem.classList.remove("fade-in");
  await sleep(775);
  if (activeCategory === "moviesCategory") renderGame(moviesCategory);
  else if (activeCategory === "tvShowsCategory") renderGame(tvShowsCategory);
  else if (activeCategory === "countriesCategory") renderGame(countriesCategory);
  else if (activeCategory === "capitalCitiesCategory") renderGame(capitalCitiesCategory);
  else if (activeCategory === "animalsCategory") renderGame(animalsCategory);
  else if (activeCategory === "sportsCategory") renderGame(sportsCategory);
  closeGameMenuOptions();
  await sleep(775);
  gameElem.classList.add("fade-in");
};

const mainMenuElem = document.getElementById("mainMenu") as HTMLElement;
const instructions = document.getElementById("instructions") as HTMLElement;
const categorySelection = document.getElementById("categorySelection") as HTMLElement;
const gameElem = document.getElementById("game") as HTMLElement;

const revealCategoriesBtn = mainMenuElem.querySelector("#revealCategories") as HTMLButtonElement;
const revealInstructionsBtn = mainMenuElem.querySelector("#revealInstructions") as HTMLButtonElement;
const backToMenuFromCategoriesBtn = categorySelection.querySelector("#backToMenuFromCategories") as HTMLButtonElement;
const backToMenuFromInstructionsBtn = instructions.querySelector("#backToMenuFromInstructions") as HTMLButtonElement;
const openMenuOptionsBtn = gameElem.querySelector("#openMenuOptions") as HTMLButtonElement;
const currentCategoryTitle = openMenuOptionsBtn.nextElementSibling as HTMLSpanElement;
const selectCategoryElem = categorySelection.querySelector("#selectCategory") as HTMLElement;
const menuOptionsElem = gameElem.querySelector("#menuOptions") as HTMLElement;
const gameMenuOptions = menuOptionsElem.firstElementChild as HTMLElement;
const gameMenuTitle = gameMenuOptions.firstElementChild as HTMLSpanElement;

const [, continueGameBtn, tryAgainGameBtn, changeCategoryBtn, quitGameBtn] = gameMenuOptions.children as unknown as HTMLButtonElement[];
const healthbar = gameElem.querySelector("#healthbar") as HTMLElement;
const guessingPortionElem = gameElem.querySelector("#guessingPortion") as HTMLElement;
const mysteryWordElem = guessingPortionElem.querySelector("#mysteryWord") as HTMLDivElement;

const moviesCategory = data.categories.Movies.map((e) => new Category(e));
const tvShowsCategory = data.categories["TV Shows"].map((e) => new Category(e));
const countriesCategory = data.categories.Countries.map((e) => new Category(e));
const capitalCitiesCategory = data.categories["Capital Cities"].map((e) => new Category(e));
const animalsCategory = data.categories.Animals.map((e) => new Category(e));
const sportsCategory = data.categories.Sports.map((e) => new Category(e));
let tries = 7;
let activeWord = "";
let activeCategory = "";
const letterBtns = [...guessingPortionElem.querySelectorAll("button")];

revealCategoriesBtn.addEventListener("click", revealCategorySelections);
revealInstructionsBtn.addEventListener("click", revealInstructions);
backToMenuFromCategoriesBtn.addEventListener("click", backToMenuFromCategories);
backToMenuFromInstructionsBtn.addEventListener("click", backToMenuFromInstructions);
selectCategoryElem.addEventListener("click", startGame);
openMenuOptionsBtn.addEventListener("click", openGameMenuOptions);
continueGameBtn.addEventListener("click", closeGameMenuOptions);
changeCategoryBtn.addEventListener("click", backToCategoriesFromGame);
quitGameBtn.addEventListener("click", backToMenuFromGame);
tryAgainGameBtn.addEventListener("click", replayGame);

async function performAction(e: PointerEvent) {
  if (!(e.target instanceof HTMLButtonElement)) return;
  const target = e.target;
  if (target.disabled) return;
  const guessedLetter = target.dataset.letter?.toUpperCase();
  if (!guessedLetter) return;
  target.disabled = true;
  target.classList.add("opacity-50", "cursor-not-allowed");

  if (activeWord.toUpperCase().includes(guessedLetter)) {
    const letterSpans = [...mysteryWordElem.querySelectorAll("span")];
    for (let i = 0; i < activeWord.length; ++i) {
      if (activeWord[i].toUpperCase() === guessedLetter) {
        letterSpans[i].textContent = activeWord[i];
        letterSpans[i].classList.add("correct-letter-rotate");
      }
    }

    if (letterSpans.every((letter) => letter.textContent !== "")) gameVerdict("win");
  } else {
    --tries;
    healthbar.style.width = ((tries / 7) * 100).toString() + "%";
    if (tries === 0) gameVerdict("lose");
  }
}

async function startGame(e: PointerEvent) {
  if (!(e.target instanceof HTMLButtonElement)) return;
  activeCategory = e.target.id;

  categorySelection.classList.remove("fade-in");
  if (e.target.id === "moviesCategory") {
    currentCategoryTitle.dataset.text = "Movies";
    currentCategoryTitle.textContent = "Movies";
    renderGame(moviesCategory);
  } else if (e.target.id === "tvShowsCategory") {
    currentCategoryTitle.dataset.text = "TV Shows";
    currentCategoryTitle.textContent = "TV Shows";
    renderGame(tvShowsCategory);
  } else if (e.target.id === "countriesCategory") {
    currentCategoryTitle.dataset.text = "Countries";
    currentCategoryTitle.textContent = "Countries";
    renderGame(countriesCategory);
  } else if (e.target.id === "capitalCitiesCategory") {
    currentCategoryTitle.dataset.text = "Capital Cities";
    currentCategoryTitle.textContent = "Capital Cities";
    renderGame(capitalCitiesCategory);
  } else if (e.target.id === "animalsCategory") {
    currentCategoryTitle.dataset.text = "Animals";
    currentCategoryTitle.textContent = "Animals";
    renderGame(animalsCategory);
  } else if (e.target.id === "sportsCategory") {
    currentCategoryTitle.dataset.text = "Sports";
    currentCategoryTitle.textContent = "Sports";
    renderGame(sportsCategory);
  }
  await sleep(775);
  categorySelection.setAttribute("hidden", "");
  gameElem.removeAttribute("hidden");
  await sleep(5);
  gameElem.classList.add("fade-in");
}

function renderGame(category: Category[]) {
  mysteryWordElem.innerHTML = "";
  gameMenuTitle.dataset.text = "Paused";
  gameMenuTitle.textContent = "Paused";
  activeWord = "";
  letterBtns.forEach((btn) => {
    btn.disabled = false;
    btn.classList.remove("opacity-50", "cursor-not-allowed");
  });
  tries = 7;
  healthbar.style.width = "100%";
  continueGameBtn.removeAttribute("hidden");
  tryAgainGameBtn.setAttribute("hidden", "");

  const randomCategoryItem = Math.floor(Math.random() * category.length);
  const {name} = category[randomCategoryItem];

  const dividedName = name.split(" ");
  let counter = 0;
  while (counter < dividedName.length) {
    const word = dividedName[counter];
    const divElem = document.createElement("div");
    divElem.className = "flex gap-3 perspective-dramatic uppercase";

    for (let i = 0; i < word.length; ++i) {
      const char = word[i];
      activeWord = activeWord.concat(char);
      const spanElem = document.createElement("span");
      spanElem.className = "bg-letter w-11 aspect-square border-b-2 border-indigo-500 flex items-center justify-center text-2xl font-bold";
      divElem.appendChild(spanElem);
    }

    mysteryWordElem.appendChild(divElem);
    ++counter;
  }

  guessingPortionElem.addEventListener("click", performAction);
}

async function gameVerdict(outcome: string) {
  guessingPortionElem.removeEventListener("click", performAction);
  outcome === "win" ? (gameMenuTitle.dataset.text = "You Win!") : (gameMenuTitle.dataset.text = "You Lose!");
  outcome === "win" ? (gameMenuTitle.textContent = "You Win!") : (gameMenuTitle.textContent = "You Lose!");
  continueGameBtn.setAttribute("hidden", "");
  tryAgainGameBtn.removeAttribute("hidden");
  await sleep(700);
  openGameMenuOptions();
}
