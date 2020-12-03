const fs = require('fs');
const input = fs.readFileSync('day-three-input.txt', {encoding: 'utf-8'}).split('\n')

//Split each array on every element
function split(arr){
    let newArr = [];
    for(let i = 0; i < arr.length; i++){
        let newLine = arr[i].split("");
        newArr.push(newLine);
    }
    return newArr;
}

//Generate the array that we will be working with 
const workingArray = split(input);

//Count the trees that you encounter based on the chosen x/y slope
function countTrees(arr, x, y){
    let treeCount = 0;
    let xPosition = 0; //Starting x position
    let yPosition = 0; //Starting y position
    while(yPosition < arr.length){
        xPosition += x;
        yPosition += y;
        if(yPosition >= arr.length){
            return treeCount; //Ensures that the answer is returned before we cross over the bottom line
        }
        if(xPosition >= arr[yPosition].length){
            xPosition -= arr[yPosition].length; //Repositions the 'player to the left of the board once it reaches the right-edge
        }
        if(arr[yPosition][xPosition] === "#"){
            treeCount++; //Increased the tree count by one when it is encountered
        }
    }
    return treeCount;
}

const answerQuestionOne = console.log(countTrees(workingArray, 3, 1)); //Logs the answer to question one

let slopeOne = countTrees(workingArray, 1, 1)
let slopeTwo = countTrees(workingArray, 3, 1)
let slopeThree = countTrees(workingArray, 5, 1)
let slopeFour = countTrees(workingArray, 7, 1)
let slopeFive = countTrees(workingArray, 1, 2)

let answerQuestionTwo = slopeOne * slopeTwo * slopeThree * slopeFour * slopeFive; //Logs the answer to question two

console.log(answerQuestionTwo)