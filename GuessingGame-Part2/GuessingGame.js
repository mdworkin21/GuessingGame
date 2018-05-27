//Generates random number to be guessed 
function generateWinningNumber(){
	let num = Math.floor(Math.random() * (100 - 1 + 1))

	if (num === 0 ){
		return 1
	} else {
		return num + 1
	}
}

//Implementation of Fisher-Yates Shuffle
function shuffle(array){
	let lastItem = array.length
	let swappedItem;
	let randomSelection;

	while(lastItem){

	randomSelection = Math.floor(Math.random() * lastItem--)

	swappedItem = array[lastItem]
	array[lastItem] = array[randomSelection]
	array[randomSelection] = swappedItem

	}

	return array
}


 function Game(){
 	this.playersGuess = null
 	this.pastGuesses = []
 	this.winningNumber = generateWinningNumber()
 }


Game.prototype.difference = function() {
	let difference = this.playersGuess > this.winningNumber ?
		this.playersGuess - this.winningNumber :
		this.winningNumber - this.playersGuess

	return difference
}


Game.prototype.isLower = function(){
	return this.playersGuess < this.winningNumber
}

Game.prototype.playersGuessSubmission = function(guess){
	this.playersGuess = guess 

	if (this.playersGuess < 1 || this.playersGuess > 100 || typeof this.playersGuess !== 'number'){
		throw 'That is an invalid guess.'
	} else {
		return this.checkGuess(guess)
	}
}



//Not totally happy with this, it's functional, but refactor if possible 
Game.prototype.checkGuess = function(){

 //  if (this.pastGuesses.indexOf(this.playersGuess) !== -1) {
	// return 'You have already guessed that number.'
 //  }

  this.pastGuesses.push(this.playersGuess)

  if (this.winningNumber === this.playersGuess) {
  	return 'You Win!'
  } else if (this.pastGuesses.length === 5) {
  	return 'You Lose.'
  } else if (this.difference() <= 10) {
  	return 'You\'re burning up!'
  } else if (this.difference() < 25) {
  	return 'You\'re lukewarm.'
  } else if (this.difference() < 50) {
  	return 'You\'re a bit chilly.'
  } else if (this.difference() < 100) {
  	return 'You\'re ice cold!'
  }

}



function newGame(){
	return new Game()
}

Game.prototype.provideHint = function(){	
	return shuffle([this.winningNumber, generateWinningNumber(), generateWinningNumber()]) 
}



$(document).ready(function(){
	let game = new Game()

	console.log(game.winningNumber)

	let playerInput = $('#player-input')
	// let playerGuess = parseInt(playerInput.val())


	$('#submit-btn').on('click', function(){
		$('h1').text(game.playersGuessSubmission(parseInt(playerInput.val())))
		 playerInput.val('')
		 // $('.guessDiv').text(playerInput.val())
		 console.log(game.pastGuesses)
	 })

	$('#hint-btn').on('click', function(){			
		$('h1').text(game.provideHint())
		console.log(count)

	})

		


})




