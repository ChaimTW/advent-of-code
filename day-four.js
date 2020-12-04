//Import text file with raw data
const fs = require('fs');
const { parse } = require('path');

//Split data into arrays per empty line
const input = fs.readFileSync('day-four-input.txt', {encoding: 'utf-8'}).split('\n\n')

//Creates a clean array of arrays; each array contains the passport fields to check
function intoArrayOfArrays(arr){
    let newArr = [];
    for(let i = 0; i < arr.length; i++){
        let newLine = arr[i].split(/[: (\n)]/g);
        newArr.push(newLine);
    }
    return newArr;
}

//The array we will be working with
let arrayOfArrays = intoArrayOfArrays(input);

//Loop through each array within the master array and count which arrays contain the required fields
function findValidPassports(arr){
    let valid = 0
    for(let i = 0; i < arr.length; i++){
        if(arr[i].includes("iyr") && arr[i].includes("ecl") && arr[i].includes("pid") && arr[i].includes("hcl") && arr[i].includes("byr") && arr[i].includes("hgt") && arr[i].includes("eyr")){
            valid++;
        }
    }
    return valid;
}

//Answer to question one
const answerQuestionOne = findValidPassports(arrayOfArrays);

//Loop through each array within the master array and count which arrays contain the required fields
function findValidPassportsTwo(arr){
    let newArr = [];
    for(let i = 0; i < arr.length; i++){

        //Creates an array of objects with key value pairs
        if(arr[i].includes("iyr") && arr[i].includes("ecl") && arr[i].includes("pid") && arr[i].includes("hcl") && arr[i].includes("byr") && arr[i].includes("hgt") && arr[i].includes("eyr")){
            let obj = {};
            obj[arr[i][0]] = arr[i][1];
            obj[arr[i][2]] = arr[i][3];
            obj[arr[i][4]] = arr[i][5];
            obj[arr[i][6]] = arr[i][7];
            obj[arr[i][8]] = arr[i][9];
            obj[arr[i][10]] = arr[i][11];
            obj[arr[i][12]] = arr[i][13];
            if(arr[i].length === 16){
                obj[arr[i][14]] = arr[i][15];
            }
            newArr.push(obj);
        }
    }

    //Transforms strings into integers
    for(let i = 0; i < newArr.length; i++){
        newArr[i].byr = parseInt(newArr[i].byr);
        newArr[i].iyr = parseInt(newArr[i].iyr);
        newArr[i].eyr = parseInt(newArr[i].eyr);
    }

    //The valid passports count
    let valid = 0;

    //Checks which passports pass all the tests
    for(let i = 0; i < newArr.length; i++){
        if(newArr[i].byr >= 1920 && newArr[i].byr <= 2002){
            if(newArr[i].iyr >= 2010 && newArr[i].iyr <= 2020){
                if(newArr[i].eyr >= 2020 && newArr[i].eyr <= 2030){
                    if(newArr[i].pid.length === 9){
                        if(newArr[i].ecl === 'amb' || newArr[i].ecl === 'blu' || newArr[i].ecl === 'brn' || newArr[i].ecl === 'gry' || newArr[i].ecl === 'grn' || newArr[i].ecl === 'hzl' || newArr[i].ecl === 'oth'){
                            let regexp = new RegExp("^#([a-f0-9]){6}$", "i");
                            if(regexp.test(newArr[i].hcl) && newArr[i].hcl.length === 7){
                                if(/m$/.test(newArr[i].hgt)){
                                    let newStr = newArr[i].hgt.substring(0, newArr[i].hgt.length - 2);
                                    let height = parseInt(newStr);
                                    if(height >= 150 && height <= 193){
                                        valid++;
                                    }
                                } else if(/n$/.test(newArr[i].hgt)){
                                    let newStr = newArr[i].hgt.substring(0, newArr[i].hgt.length - 2);
                                    let height = parseInt(newStr);
                                    if(height >= 59 && height <= 76){
                                        valid++;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    console.log(valid);
}

findValidPassportsTwo(arrayOfArrays)