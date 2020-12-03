const fs = require('fs');

const lines = fs.readFileSync('day-one-input.txt', {encoding: 'utf-8'}).split('\n').map(Number);

//This is the function to find the answer to question one
function findAnswerOne(arr){
    let x = 0;
    while (x < arr.length) {
        for(let i = 0; i < arr.length; i++){
            if(arr[x] + arr[i] === 2020){ //Checks what two digits amount to a total sum of 2020
                return console.log(arr[x]*arr[i]); //This console.logs the answer to question one
            }
        }
        x++;
    }
}

//This is the function to find the answer to question two
function findAnswerTwo(arr){
    let x = 0;
    while(x < arr.length){
        let y = 0;
        while(y < arr.length){
            for(let i = 0; i < arr.length; i++){
                if(arr[i] + arr[x] + arr[y] === 2020){ //Checks what three digits amount to a total sum of 2020
                    return console.log(arr[i] * arr[x] * arr[y]); // This console.logs the answer to question two
                }
            }
            y++;
        }
        x++;
    }
}

const answerOne = findAnswerOne(lines);
const answerTwo = findAnswerTwo(lines);