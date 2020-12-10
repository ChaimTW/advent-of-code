const fs = require('fs');
const lines = fs.readFileSync('day-eight-input.txt', {encoding: 'utf-8'}).split('\n');

//Working data
const data = [];

//Create array of objects
for (const line of lines) {
    const object = {};
    const [operation, argument] = line.replace('+', '').split(' ');
    object.operation = operation;
    object.argument = parseInt(argument);
    data.push(object);
}

//Check for duplicates in array
function hasDuplicates(array) {
    return [...new Set(array)].length !== array.length;
}

//Loop over array of objects until duplicate in array is found
function loop(arr){
    let acc = 0;
    let position = 0;
    let memory = [];
    while(!hasDuplicates(memory)){
        if(arr[position].operation === 'nop'){
            position += 1;
            memory.push(position);
        } else if(arr[position].operation === 'acc'){
            acc += arr[position].argument;
            position += 1;
            memory.push(position);
        } else if(arr[position].operation === 'jmp'){
            position += arr[position].argument;
            memory.push(position);
        }
    }
    return acc;
}

//Answer to question one
const answerOne = loop(data);

//Part 2

//Array of indices of jmp and nop operations
let indexes = [];

function findIndex(arr){
    for(let i = 0; i < arr.length; i++){
        if(arr[i].operation === 'jmp' || arr[i].operation === 'nop'){
            indexes.push(i);
        }
    }
}

findIndex(data);

//Loop over array, altering jmp/nop variables per iteration until fixed variable is changed
function fixCode(arr){
    for (const index of indexes) {

        let copyData = JSON.parse(JSON.stringify(data));

        if(copyData[index].operation === 'nop'){
            copyData[index].operation = 'jmp';
        } else if(copyData[index].operation === 'jmp'){
            copyData[index].operation = 'nop';
        }

        let acc = 0;
        let position = 0;
        let memory = [];

        while(!hasDuplicates(memory)){
            if(position === copyData.length){
                return acc;
            }
            if(copyData[position].operation === 'nop'){
                position += 1;
            } else if(copyData[position].operation === 'acc'){
                acc += copyData[position].argument;
                position += 1;
            } else if(copyData[position].operation === 'jmp'){
                position += copyData[position].argument;
            }
            memory.push(position);
        }
    }
}

//Answer two
const answerTwo = fixCode(data);

console.log(answerOne,answerTwo);