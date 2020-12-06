const fs = require('fs');

const input = fs.readFileSync('day-six-input.txt', {encoding: 'utf-8'}).split("\n\n");

//Creates a clean array of arrays;
function intoArrayOfArrays(arr){
    let newArr = [];
    for(let i = 0; i < arr.length; i++){
        let newLine = arr[i].split(/[: (\n)]/g);
        newArr.push(newLine);
    }
    return newArr;
}
const arrayOfArrays = intoArrayOfArrays(input);

//Finds all unique values in the array of answers
function answerOne(arr){
    let total = 0;
    for(let i = 0; i < arr.length; i++){
       let groupTotal = arr[i].join('');
       let groupUnique = [];
       let x = 0;
       while(x < groupTotal.length){
           //Checks if the letter doesn't exist in the groupUnique array
           //If it doesn't, it pushes the value to the array
           if(!groupUnique.includes(groupTotal[x])){
                groupUnique.push(groupTotal[x]);
           }
           x++;
       }
       total += groupUnique.length;
    }
    return total;
}

//Answer to question one
const questionOne = answerOne(arrayOfArrays);

//Finds the amount of mutual answers within a group
function answerTwo(arr){
    let total = 0;
    for(let i = 0; i < arr.length; i++){
        let groupYesses = []
        let x = 0;
        while(x < arr[i].length){
            let y = 0;
            while(y < arr[i][x].length){
                //Checks if the letter exists in every array within the group
                //If it does, it pushes the value to the array
                if(arr[i].every(currentValue => currentValue.includes(arr[i][x][y]))){
                    groupYesses.push(arr[i][x][y]);
                }
                y++;
            }
            x++;
        }
        //Reduces the array to an array of unique values
        groupYesses = [...new Set(groupYesses)]
        total += groupYesses.length;
    }
    return total;
}

//Answer to question two
const questionTwo = answerTwo(arrayOfArrays);