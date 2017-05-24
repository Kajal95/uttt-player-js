const UTTT = require('ultimate-ttt').default;

/**
 * Starting point for a player
 * This implementation chooses a valid move at random
 * You should improve the decision making so that it has a certain
 * level of intelligence.
 *
 * The code has been commented to help understand what each part does,
 * and the relevant parts that contain what you should do are marked as TODO
 */

class GameLogic {
  constructor(player, size = 3){
    if(!player || !Number.isInteger(player) || player < 1 || player > 2){
      throw new Error('Invalid player');
    }

    this.size = size;
    this.player = player;
    this.opponent = 3 - player;

    this.init();
  }

  /* ---- Game Logic: This is what you need to edit ----- */

  /**
   * Choose a valid board to play in
   * @returns {[number,number]} Board identifier [row, col]
   */
  getNextBoard(){
    // In general, the next board is determined by the last player's move
    let board = this.game.nextBoard || [0, 0];

    // Unless that board is already finished, in which case you can choose
    // any board that you want
    if(!this.game.board[board[0]][board[1]].isFinished()){
      return board;
    }

    // If we get here, it means that you've been sent to a board that was already
    // finished, so you can choose any board now
    // TODO The next bit of code should select the ideal board to play on
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        if(!this.game.board[x][y].isFinished()){
          return [x, y];
        }
      }
    }

    // Getting here means that no board has been selected, so make sure you
    // have written your code properly and return a valid board to play in.
    // if this is reached it means that the game state has been
    // altered incorrectly
    throw new Error('Error: Unable to find available board');
  }

  /**
   * Select the next move, this method should look at the whole game board
   * and choose the best possible move.
   * @param board Board object (instance of TicTacToe)
   * @returns {[number,number]} Position coordinates [row, col]
   */
  getNextMove(board){
    let valid = false;
    // TODO Change this so it's choosing an optimal move (or as close as you can get ;) )
    while(!valid){
      let move = [
        this.getRandomCoordinate(),
        this.getRandomCoordinate(),
      ];
      if(board.isValidMove(move) && board.board[move[0]][move[1]] === 0){
        valid = move;
      }
    }
    return valid;
  }

  /**
   * Get a random valid coordinate
   * @returns {number} Coordinate in the range [0, this.size - 1]
   */
  getRandomCoordinate(){
    return Math.round(Math.random() * (this.size - 1));
  }

  /* ----- Required methods - Don't change this ----- */

  init(){
    this.game = new UTTT(this.size);
  }

  addOpponentMove(board, move){
    this.game.move(board, this.opponent, move);
  }

  addMove(board, move){
    this.game.move(board, this.player, move);
  }

  getMove(){
    const boardCoords = this.getNextBoard();
    const board = this.game.board[boardCoords[0]][boardCoords[1]];
    const move = this.getNextMove(board);

    return {
      board: boardCoords,
      move: move
    };
  }
}

module.exports = GameLogic;