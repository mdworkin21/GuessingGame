//Generates random number to be guessed 
function generateWinningNumber(){
	let num = Math.floor(Math.random() * (500 - 1 + 1))

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


//hmmmmm, haven't used this....
function newGame(){
	return new Game();
}


//Game Object Constructor
function Game(){
 	this.playersGuess = null
 	this.pastGuesses = []
 	this.winningNumber = generateWinningNumber()
 }


//Methods on Game Prototype
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

	if (this.playersGuess < 1 || this.playersGuess > 500 || typeof this.playersGuess !== 'number'){
		throw 'That is an invalid guess.'
	} else {
		return this.checkGuess(guess)
	}
}



//Not totally happy with this, it's functional, but refactor if possible 
Game.prototype.checkGuess = function() {

	if (this.pastGuesses.indexOf(this.playersGuess) !== -1) {
		return 'You already guessed that one dummy.'

	}

	this.pastGuesses.push(this.playersGuess)

	if (this.winningNumber === this.playersGuess) {
		$('#hint-btn').prop('disabled', true)
		return 'You Win! I guess luck really is better than skill....'
	} else if (this.pastGuesses.length === 5) {
		return 'You Lose.'
	} else if (this.difference() <= 10) {
		return 'You\'re burning up!'
	} else if (this.difference() < 25) {
		return 'You\'re lukewarm.'
	} else if (this.difference() < 50) {
		return 'You\'re a bit chilly.'
	} else if (this.difference() <100) {
		return 'You\'re ice cold!'
	} else if (this.difference() > 100) {
		return 'Not even close!'
	}

}

Game.prototype.provideHint = function(){
	let count = 0;
	let winner = this.winningNumber;

	return function(){
		if (count < 1){
			count++
			return shuffle([winner, winner + 3, generateWinningNumber(), winner + 8, generateWinningNumber()]) 
		} else {
			return 'No More Hints!'
		}
	}	
	
};


Game.prototype.guessInput = function (game){
	let playerInput = $('#player-input').val()
	$('h1').text(game.playersGuessSubmission(parseInt(playerInput)))
}

Game.prototype.displayPastGuess = function (){
	let playerInput = $('#player-input').val()
 	
 	 if (this.pastGuesses.length === 1){		
	   $(`#guess1`).text((parseInt(playerInput)))
	} else if (this.pastGuesses.length === 2){
		$('#guess2').text((parseInt(playerInput)))
	} else if (this.pastGuesses.length === 3){
		$('#guess3').text((parseInt(playerInput)))
	} else if (this.pastGuesses.length === 4){
		$('#guess4').text((parseInt(playerInput)))
	} else if (this.pastGuesses.length === 5){
		$('#guess5').text((parseInt(playerInput)))
	}

		$('#player-input').val('')	

}



//JQUERY Stuff
$(document).ready(function(){
	//Variables 
	let game = new Game();
	let countHint = game.provideHint();
	

	console.log(game.winningNumber)

	//Two events to trigger player submission
	//(i) Click event
	$('#submit-btn').on('click', function(){
		game.guessInput(game);
		game.displayPastGuess();
		
	});

	//(ii) Key Event 
	$('#player-input').on('keydown', function(e){
		if (e.which === 13){
			game.guessInput(game);
			game.displayPastGuess();


			
		}
	})

	//Event to trigger hint
	$('#hint-btn').on('click', function(){			
		$('h1').text(countHint());
	});

	//Event to trigger reset
	$('#reset-btn').on('click', function(){
		location.reload();

	});

});




