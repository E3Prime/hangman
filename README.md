# Hangman Game

![HTML5 Badge](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3 Badge](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS Badge](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite Badge](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Bun Badge](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)

A classic word-guessing game. Built with TypeScript and Tailwind CSS, it features a category selection system, smooth 3D card flips, and a health-bar-based life system.

## 🔗 Links

- **Live Demo Link:**

## 🕹️ Hangman Game Showcase

<img src="public/hangman.gif" width="400" alt="Hangman Gameplay Demo" />

## 🧐 About The Project

The application takes the traditional "Hangman" and concept and wraps in mimic SPA architecture allowing the user to seamlessly transition between the Main Menu, Instructions, Category Selection (Movies, TV Shows, Countries), and the Active Game loop without page reloads, also I implemented a **Health Bar mechanic**, which provides a clearer visual representation of the player's amount of tries they can have.

### Key Features

- **Category System:**
  - Players can choose their preferred domain of knowledge (e.g., Movies, Countries, TV Shows).
  - The game dynamically loads a random word from the selected dataset.
- **Modern "Health" Mechanic:**
  - Replaced the traditional drawing with a sleek progress bar.
  - Incorrect guesses deplete the bar, when it reaches 0%, the game is over.
- **Game Loop Management:**
  - **Post-Game Options:** A modal allows users to Play Again, Change Category, or Quit to the Main Menu.
