import { Scene } from 'phaser'

export default class PlayScene extends Scene {
  
  // initialise all state within the scene
  gridSize = 8;
  tileSize = 64;
  roundsWonBySide = {
    white: 0,
    black: 0
  };
  
  constructor () {
    super({ key: 'PlayScene' })
  }


  preload() {
    // Load your assets here, such as images or sprites for the chess pieces
  }

  create() {
    // Draw the chessboard
    this.createBoard();
    // Begin the first round
    this.startRound();
  }

  createBoard() {

    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        // Alternate colors for the tiles
        let color = (row + col) % 2 === 0 ? 0xffffff : 0x000000;
        let tile = this.add.rectangle(
          col * this.tileSize,
          row * this.tileSize,
          this.tileSize,
          this.tileSize,
          color
        ).setOrigin(0, 0);
        
        // Add any additional tile setup here
      }
    }
  }

  initializePieces() {
    // Create an object to hold the available pieces
    this.availablePieces = {
      white: [],
      black: []
    };

    // Define the types of pieces available
    const pieceTypes = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];

    // Initialize the pieces for both white and black
    pieceTypes.forEach(piece => {
      // Create white piece
      let whitePiece = this.makePiece(piece, 'white');
      this.availablePieces.white.push(whitePiece);

      // Create black piece
      let blackPiece = this.makePiece(piece, 'black');
      this.availablePieces.black.push(blackPiece);
    });
  }

  makePiece(piece, color) {
    // Create a new sprite for the piece but don't add it to the scene yet
    let sprite = new Phaser.GameObjects.Sprite(this, 0, 0, `${piece}_${color}`);
    sprite.visible = false; // Hide the sprite as it's not on the board yet

    // Add any additional setup here, like assigning data to the sprite
    sprite.setData('type', piece);
    sprite.setData('color', color);

    return sprite;
  }

  startRound() {
    // Reset board and present the player with three chess pieces to choose from

    // Player selects a piece and places it on the board
    this.input.on('pointerdown', this.placePiece, this);
  }

  placePiece(pointer) {
    // Calculate grid position from pointer position
    let x = Math.floor(pointer.x / this.tileSize);
    let y = Math.floor(pointer.y / this.tileSize);

    // Place the chosen piece on the board at the clicked location
    // You need to implement logic to check if the placement is valid
  }

  endRound() {
    // Move and/or attack with pieces according to chess rules
    // You will have to implement this logic

    // Check if either side has won
    let winner = this.checkForWinner();
    if (winner) {
      this.roundsWonBySide[winner] += 1;

      // Check for game over condition
      if (this.roundsWonBySide[winner] >= 3) {
        this.gameOver(winner);
      } else {
        // Start a new round
        this.startRound();
      }
    }
  }

  checkForWinner() {
    // Implement the logic to check if a side has won the round
    // Return 'white' or 'black' if there is a winner, or null if the round continues
  }

  gameOver(winner) {
    // Display the winner and reset the game or offer to play again
    console.log(`Game Over. Winner: ${winner}`);
    // Reset rounds won or restart the game
  }

  update() {
    // Game loop logic, handle piece movement and interaction
  }
}
