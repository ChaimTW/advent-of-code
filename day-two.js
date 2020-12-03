const fs = require('fs');

const lines = fs.readFileSync('day-two-input.txt', {encoding: 'utf-8'}).split("\n")

//Split each item based on certain character-set
function split(arr){
    let newArr = [];
    for(let i = 0; i < arr.length; i++){
        let newLine = arr[i].split(/[-]|: | /);
        newArr.push(newLine);
    }
    return newArr;
}

let arrayOfArrays = split(lines);

//Convert array of arrays into an array of objects wil key/value pairs
function arrayOfObjects(arr){
    let newArray = [];
    for(let i = 0; i < arr.length; i++){
        let object = {};
        object.min = arr[i][0];
        object.max = arr[i][1];
        object.letter = arr[i][2];
        object.password = arr[i][3];
        newArray.push(object);
    }
    return newArray;
}

let input = arrayOfObjects(arrayOfArrays);
input.pop(); //Remove last item from the array (undefined)

//Find the answer to question one
function questionOne(arr){
    let correct = 0;
    for(let i = 0; i < arr.length; i++){
        let letterToCheck = arr[i].letter;
        let regex = new RegExp(letterToCheck, "g") //Custom regular expression per array element
        let countInPass = arr[i].password.match(regex) || [];
        let count = countInPass.length;
        if(count >= arr[i].min && count <= arr[i].max){
            correct++;
        }
    }
    return correct;
}

//Find the answer to question two
function questionTwo(arr){
    let correct = 0;
    for(let i = 0; i < arr.length; i++){
        let letterToCheck = arr[i].letter;
        let passwordArray = arr[i].password.split("");
        if(passwordArray[arr[i].min-1] === letterToCheck && passwordArray[arr[i].max-1] !== letterToCheck){
            correct++;
        } else if(passwordArray[arr[i].min-1] !== letterToCheck && passwordArray[arr[i].max-1] === letterToCheck){
            correct++
        }
    }
    return correct;
}

const answerQuestionOne = console.log(questionOne(input));
const answerQuestionTwo = console.log(questionTwo(input));