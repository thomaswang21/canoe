# 7580-CanoeJourney 

## MVP Demo Documentation

## Description
The Canoe Rampage MVP demo is a simplified version of an extensible two-word canoe mobile game where the player navigates a canoe downstream, earning points by avoiding collisions with rocks. The primary goal is to create a basic and engaging experience that focuses on the core gameplay mechanics. Additional feature for end build would aims to enable players to control the game using voice commands through voice recognition technology.


## Purpose of the Game
To serve as an aid for teaching language, especially for reclamation of endangered languages.


## Deployment page


[Demo video][https://drive.google.com/file/d/1G2h98IIkJc0to4-NBYeV1ksEamAM6Q6i/view](https://drive.google.com/file/d/1_ZFmybncDRVhBIo6sfnnMgdhK85ycYGL/view?usp=sharing)





## Key Features

1. **Current Game UI:**
    - **River:** the game is set in a river environment with a canoe placed at the bottom-center of the screen.
    - **Obstacles:** scattered rocks.
    - **Motion:** vertical scrolling effect as rocks move towards the canoe and against the blue background simulating a downstream motion.
    - **Elapsed Time:** onscreen display of how long a player has been in the game.

2. **Current Player Controls:**
    - **A/D Keyboard Control:** Current base controls are the A/D keys on a keyboard which would move the canoe Left/Right
    - **End Game Button:** Ends the game.
    - **Restart Game Button:** Restarts the game.

3. **Current Notification:**
    - **On Collision:** game ends once a player collides with a rock.


## Design
- Blue circle at bottom represents canoe, control by A/D key to move left/right.
- Black rectangles represents rockes/obstacles which should be avoided. If player hits a rock, game ends.
- End game and restart option at top of screen.
- When game ends, display time elapsed.

## MVP Demo Flow

1. **Start Screen:**
    - The game launches straight with the player needing to navigate the canoe away from the rocks.

2. **Gameplay:**
    - The player starts with the canoe positioned at the bottom-centre of the screen.
    - Rocks begin to appear, and the player steers left or right using the A/D keys on the keyboard to avoid collisions.
    - Time elapsed during play is displayed at the top left-hand corner of the screen.
3. **VoiceControl:**
   -The player can control the boat by saying "left" or"right" by voice.    

3. **End Game:**
    - The game ends when the canoe collides with a rock.
    - The total time spent playing is displayed on screen.
    - A restart button for replaying the game can be activated.


## Future Iterations
- **Start:** add a start button on a splash/welcome screen to initiate the game.
- **Sound:** add sound effects for river flow, collisions, and successful navigation.
- **Scoring System:** add a scoring system to allot and cumulate points earned to player.
- **Leaderboard:** add a high-score leaderboard for competitive enhancement or prize giving.
- **Downriver Speed:** add feature to increase or decrease downriver speed.
- **Active Downriver Speed:** add feature to enable canoe actively move downriver.
- **Left/Right Controls for Mobile Devices:** add onscreen Left/Right button.
- **Voice Commands:** add voice recognition for canoe navigation.
- **Dual Control:** ensure manual and voice navigation are supported.
- **Demo Extensibility:** use different game objects to prove Game UI extensibility.
