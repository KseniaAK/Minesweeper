# Minesweeper
Minesweeper game built with React-Redux

![game in progress](/screenshots/gameInProgress.png "Game in progress")

### Current Status
Currently, you can play the game by uncovering the cells - a number would signify the number of mines touching the particular cell. You can flag squares with right click, and if you think you have placed your flags correctly, try double-clicking the number square - all squares adjacent to it will be revealed. Beware: if your flags were not placed over the mined squares, the board will blow up! :)

You can also change the color of the gameboard and the number of the mines you wish to play with.

Future features: 
• timer
• variable gameboard size
• saving user scores

To play, clone the repo, and after running the following commands, go to localhost port 8080:

npm install

npm run build

npm run dev-server
