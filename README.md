# Crossy Road

A simple browser game inspired by Crossy Road where you dodge moving cars, reach the top to score points, and track your best runs on a local leaderboard.

## Features

- Smooth keyboard movement (`W`, `A`, `S`, `D`)
- Optional gamepad joystick support
- Randomized car speed, lane position, and color each round
- Score tracking with win sound feedback
- Game-over detection with **Play Again** reset
- Persistent **Top 10** leaderboard in `localStorage`
- Leaderboard bar chart powered by Chart.js

## How to Run

1. Clone this repository.
2. Open `index.html` in your browser.

No build step or package install is required.

## Controls

- **W**: Move up
- **S**: Move down
- **A**: Move left
- **D**: Move right
- **Gamepad left stick**: Move player
- **Gamepad A button**: Restart after game over

## Gameplay

1. Start at the bottom of the map.
2. Avoid colliding with moving cars.
3. Reach the top edge to earn a point.
4. After each point, the player resets and cars are re-randomized.
5. On collision, the run ends and your score is saved to the leaderboard.

## Project Structure

- `index.html` – game layout and script includes
- `style.css` – game and leaderboard styling
- `index.js` – gameplay, controls, collision logic, leaderboard logic
- `win-sound.mp3` – sound played when scoring

## Notes

- Leaderboard data is stored in the browser only (`localStorage`), so scores are device/browser specific.
- Chart rendering depends on the Chart.js CDN script loaded in `index.html`.
