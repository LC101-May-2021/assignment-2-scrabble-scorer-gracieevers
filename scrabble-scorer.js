// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";

	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let usersWord = "";

function initialPrompt() {
   console.log("Let's play some Scrabble!\n");
   usersWord = input.question("Enter a word to score: ");
//    let result = oldScrabbleScorer(usersWord);
//    console.log(result);
};

let simpleScore = 0;
function simpleScorer(usersWord){
    return usersWord.length;
}

let vowelBonusScore = 0;
function vowelBonusScorer(usersWord){
    let vowels = ["A", "E", "I", "O", "U"];
    
    for (let i = 0; i < usersWord.length; i++){
        if (vowels.includes(usersWord[i])){
            vowelBonusScore = vowelBonusScore + 3;
        }
        else{
            vowelBonusScore = vowelBonusScore + 1;
        }
    }
    return vowelBonusScore;
}

function transform(oldPointStructure) {
    // convert oldPointStructure to object w/ lowercase letters as keys with points as value
    // {1: ['a', 'b']}
    // {a: 1, b: 1}
    // let newObj = Object();
    // newObj['a'] = 1
    let newPointStructure = new Object();

    for (let i in oldPointStructure) {
      let val = oldPointStructure[i];
      for (let j=0; j < val.length; j++){
          let letter = val[j].toLowerCase();
          newPointStructure[letter.toLowerCase()] = Number(i);
    
      } 
        
    }
return newPointStructure;
};

let newPointStructure = transform(oldPointStructure);

function scrabbleScore(usersWord){
    let score = 0;

    for (let i = 0; i < usersWord.length; i++){
        let letter = usersWord[i].toLowerCase();
        score = score + newPointStructure[letter];
    }

    return score
}


const scoringAlgorithms = [
    {
        name: 'Simple Score',
        description: 'Each letter is worth 1 point.',
        scorerFunction: simpleScorer,
    },
    {
        name: 'Bonus Vowels',
        description: 'Vowels are 3 pts, consonants are 1 pt.',
        scorerFunction: vowelBonusScorer,
    },
    {
        name: 'Scrabble',
        description: 'The traditional scoring algorithm.',
        scoringFunction: scrabbleScore,
    },
];

function scorerPrompt() {
   console.log("Which scoring algorithm would you like to use?\n");
   console.log("\n0 - Simple: One point per character\n");
   console.log("1 - Vowel Bonus: Vowels are worth 3 points\n");
   console.log("2 - Scrabble: Uses scrabble point system\n");

   let algorithmChoice = input.question("Enter 0, 1, or 2: ");
   let chosenAlgorithmObject = scoringAlgorithms[algorithmChoice];
   
   return chosenAlgorithmObject;

}


function runProgram() {
    initialPrompt();
    let chosenAlgorithmObject = scorerPrompt();
    let usersScore  = chosenAlgorithmObject.scorerFunction(usersWord);
    console.log(`Score for ${usersWord}: ${usersScore}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

