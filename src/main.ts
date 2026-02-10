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

  toggleSelection(): void {
    this.selected = !this.selected;
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

const mainMenuElem = document.getElementById("mainMenu") as HTMLElement;
const instructions = document.getElementById("instructions") as HTMLElement;
const categorySelection = document.getElementById("categorySelection") as HTMLElement;
const gameElem = document.getElementById("game") as HTMLElement;

const revealCategoriesBtn = mainMenuElem.querySelector("#revealCategories") as HTMLButtonElement;
const revealInstructionsBtn = mainMenuElem.querySelector("#revealInstructions") as HTMLButtonElement;
const backToMenuFromCategoriesBtn = categorySelection.querySelector("#backToMenuFromCategories") as HTMLButtonElement;
const backToMenuFromInstructionsBtn = instructions.querySelector("#backToMenuFromInstructions") as HTMLButtonElement;
const openMenuOptionsBtn = gameElem.querySelector("#openMenuOptions") as HTMLButtonElement;
const selectCategoryElem = categorySelection.querySelector("#selectCategory") as HTMLElement;
const menuOptionsElem = gameElem.querySelector("#menuOptions") as HTMLElement;
const gameMenuOptions = menuOptionsElem.firstElementChild as HTMLElement;
const [, continueGameBtn, changeCategoryBtn, quitGameBtn] = gameMenuOptions.children as unknown as HTMLButtonElement[];
const guessingPortionElem = gameElem.querySelector("#guessingPortion") as HTMLElement;
const mysteryWordElem = guessingPortionElem.querySelector("#mysteryWord") as HTMLDivElement;

const moviesCategory = data.categories.Movies.map((e) => new Category(e));
const tvShowsCategory = data.categories["TV Shows"].map((e) => new Category(e));
const countriesCategory = data.categories.Countries.map((e) => new Category(e));
const capitalCitiesCategory = data.categories["Capital Cities"].map((e) => new Category(e));
const animalsCategory = data.categories.Animals.map((e) => new Category(e));
const sportsCategory = data.categories.Sports.map((e) => new Category(e));

revealCategoriesBtn.addEventListener("click", revealCategorySelections);
revealInstructionsBtn.addEventListener("click", revealInstructions);
backToMenuFromCategoriesBtn.addEventListener("click", backToMenuFromCategories);
backToMenuFromInstructionsBtn.addEventListener("click", backToMenuFromInstructions);
selectCategoryElem.addEventListener("click", startGame);
openMenuOptionsBtn.addEventListener("click", openGameMenuOptions);
continueGameBtn.addEventListener("click", closeGameMenuOptions);
changeCategoryBtn.addEventListener("click", backToCategoriesFromGame);
quitGameBtn.addEventListener("click", backToMenuFromGame);

async function startGame(e: PointerEvent) {
  if (!(e.target instanceof HTMLButtonElement)) return;
  mysteryWordElem.innerHTML = "";

  categorySelection.classList.remove("fade-in");
  if (e.target.id === "moviesCategory") renderGame(moviesCategory);
  else if (e.target.id === "tvShowsCategory") renderGame(tvShowsCategory);
  else if (e.target.id === "countriesCategory") renderGame(countriesCategory);
  else if (e.target.id === "capitalCitiesCategory") renderGame(capitalCitiesCategory);
  else if (e.target.id === "animalsCategory") renderGame(animalsCategory);
  else if (e.target.id === "sportsCategory") renderGame(sportsCategory);
  await sleep(775);
  categorySelection.setAttribute("hidden", "");
  gameElem.removeAttribute("hidden");
  await sleep(5);
  gameElem.classList.add("fade-in");
}

function renderGame(category: Category[]) {
  const randomCategoryItem = Math.floor(Math.random() * category.length);
  const {name, selected} = category[randomCategoryItem];
  console.log(name);

  const dividedName = name.split(" ");
  let counter = 0;
  while (counter < dividedName.length) {
    const word = dividedName[counter];
    const divElem = document.createElement("div");
    divElem.className = "flex gap-3 perspective-dramatic uppercase";

    for (let i = 0; i < word.length; ++i) {
      const char = word[i];
      const spanElem = document.createElement("span");
      spanElem.className = "bg-letter";
      spanElem.innerText = char;
      divElem.appendChild(spanElem);
    }

    mysteryWordElem.appendChild(divElem);
    ++counter;
  }
}
