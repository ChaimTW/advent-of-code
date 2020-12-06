const fs = require('fs');

const input = fs.readFileSync('day-five-input.txt', {encoding: 'utf-8'}).split("\n");

console.log(input);

//Function that returns an array of unsorted seat Ids
function questionOne(arr){
    let seatIdArray = [];

    //For loop that generates each individual seat Ids
    for(let i = 0; i < arr.length; i++){
        let rowUpper = 127; 
        let rowLower = 0;
        let columnUpper = 7;
        let columnLower = 0;
        let remainingRowLength = 64; 
        let remainingColumnLength = 4;
        let checker = 0;

        //Loops through the row-string and determines what to do
        while(checker < 7){
            if(arr[i][checker] === 'F'){
                rowUpper -= remainingRowLength;
                remainingRowLength /= 2;
            } else if(arr[i][checker] === 'B'){
                rowLower += remainingRowLength;
                remainingRowLength /= 2;
            }
            checker++;
        }

        //Loops through the column string and determines what to do
        while(checker >= 7 && checker < 10){
            if(arr[i][checker] === 'L'){
                columnUpper -= remainingColumnLength;
                remainingColumnLength /= 2;
            } else if(arr[i][checker] === 'R'){
                columnLower += remainingColumnLength;
                remainingColumnLength /= 2;
            }
            checker++;
        }

        //Calculate ID based on seat number
        let seatId = (rowUpper * 8) + columnUpper;
        seatIdArray.push(seatId);
    }
    return seatIdArray;
}

//Answer to question one
const answerOne = Math.max.apply(null, questionOne(input));

//Preparation for question two
//Sorts the array of IDs so we can check which ID is missing
const arrayDescending = questionOne(input)
arrayDescending.sort(function(a, b) {
  return b - a;
});

//Finds the answer to question two
function questionTwo(arr){
    let current = answerOne;
    for(let i = 0; i < arr.length; i++){
        if(arr[i] != current){
            return current;
        } else {
            current -= 1;
        }
    }
}

const answerTwo = questionTwo(arrayDescending);