const fs = require('fs');
const input = fs.readFileSync('day-nine-input.txt', {encoding: 'utf-8'}).split('\n');

//String numbers to integers in an array
for(let i = 0; i < input.length; i++){
    input[i] = parseInt(input[i]);
}

//Extracts an array with a length of 25 from a larger array
function extract(array, lower){
    let currentArray = [];
    let x = lower;
    let upper = x + 25
    while(x < upper){
        currentArray.push(array[x]);
        x++;
    }
    return currentArray;
}

//Checks if an array contains two numbers that sum to a check number
function containsSum(array, number){
    let x = 0;
    while(x < 25){
        for (let index = 0; index < array.length; index++) {
            if(index != x){
                if(array[x] + array[index] === number){
                    return true;
                }
            }
        }
        x++;
    }
}

//Combines both above functions and returns the answer to Q1
function loop(array){
    let lower = 0;
    while(lower < array.length-24){
        let current = extract(array, lower);
        let number = array[lower+25];
        if(!containsSum(current, number)){
            return number;
        }
        lower++;
    }
}

//Answer to Q1
const answerOne = loop(input);

//Part 2

//Returns the sum of an array
function sumOfArray(array){
    let answer = array.reduce(function(a, b){
        return a + b;
    }, 0);
    return answer;
}

//Loops over an array to find all possible combinations
//Returns when a contiguous set of numbers is found that sums up to the answer to Q1
function contiguousSum(array){
    let lower = 0;
    while(lower < array.length){
        let upper = 0;
        while(upper < array.length){
            let current = array.slice(lower, upper);
            if(sumOfArray(current) === answerOne && array[lower] != answerOne){
                console.log(Math.min(...current) + Math.max(...current));
            }
            upper++;
        }
        lower++;
    }
}

//Answer to Q2
const answerTwo = contiguousSum(input);