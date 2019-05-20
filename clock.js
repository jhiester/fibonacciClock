const square1a = document.getElementById('square-1a');
const square1b = document.getElementById('square-1b');
const square2 = document.getElementById('square-2');
const square3 = document.getElementById('square-3');
const square5 = document.getElementById('square-5');


const time = new Date();
const hours = time.getHours();
const minutes = time.getMinutes();

const possVals = [1, 1, 2, 3, 5];

// nonrecursively generate all subsets of possVals because 
//     I don't want a FUCKING empty array in my reduce
// find the sums of all the individual subsets AND retain the indices
// filter for the elements that are === to the current hour % 12
// use the indices to extract those elements from possVals and use this
//     to determine which faces to color for hours

// use  a similar process for minutes
// for all of the faces that are common to both the hours and minutes,
// set their css class to both so it's colored purple.


// const getAllSubsets =
//     theArray => theArray.reduce(
//         (subsets, value) => subsets.concat(
//             subsets.map(set => [...set, value])
//         ),
//         [[0]]
//     );


const sum = (a, b) => {
    return a + b;
}


// allSubsets = getAllSubsets(possVals);


// console.log(allSubsets);
// for (const subset of allSubsets) {
//     console.log(subset.reduce(sum));
// }

// i really like using the generator, but i want to refactor it to be nonrecursive
// because i don't wan tot have that [0] in my arrays or an empty array at the end to
// mess up the reduce method

// i also want to make it so that if a in the possible values is not part of the combination,
// it is replaced with a 0 as a place holder.


function* subsets(array, offset = 0) {
    while (offset < array.length) {
        let first = array[offset++];
        for (let subset of subsets(array, offset)) {
            subset.push(first);
            yield subset;
        }
    }
    yield [0];
}



const possHourSubsets = [];
const possMinSubsets = [];
const hourSums = [];
const minSums = [];

//   Example:

for (let subset of subsets(possVals)) {
    possHourSubsets.push(subset);
    hourSums.push(subset.reduce(sum));
}

for (let subset of subsets(possVals)) {
    possMinSubsets.push(subset);
    minSums.push(subset.reduce(sum));
}

// CHECKS
// console.log(possHourSubsets);
// console.log(hourSums);
// console.log(hourSums.findIndex(sums => sums === hours % 12));

// console.log(possMinSubsets);
// console.log(minSums);
// console.log(minSums.findIndex(sums => sums === Math.round((minutes / 5)) % 12));



// console.log(possHourSubsets[hourSums.findIndex(sums => sums === hours % 12)]);
// console.log(possMinSubsets[minSums.findIndex(sums => sums === Math.round((minutes / 5)) % 12)]);
hourDisplay = possHourSubsets[hourSums.findIndex(sums => sums === hours % 12)];
minutesDisplay = possMinSubsets[minSums.findIndex(sums => sums === Math.round((minutes / 5)) % 12)];

console.log(`Hours: ${hourDisplay}`);
console.log(`Minutes: ${minutesDisplay}`);



// const intersection = hourDisplay.filter(x => minutesDisplay.includes(x));
// const hoursDifference = hourDisplay.filter(x => !minutesDisplay.includes(x)).concat(minutesDisplay.filter(x => !hourDisplay.includes(x)));
// const minutesDifference = minutesDisplay.filter(x => !hourDisplay.includes(x)).concat(hourDisplay.filter(x => !minutesDisplay.includes(x)));

// console.log(`Intersection: ${intersection}`);
// console.log(`Left difference: ${hoursDifference}`);
// console.log(`Right difference: ${minutesDifference}`);



// possible values are 1, 1, 2, 3, and 5
// minutes are measured to closest multiple of 5
// grey squares are ignored
// hours = purple + red
// minutes = (purple + green) * 5

console.log(hours, minutes);
console.log(hours % 12);
console.log(Math.round((minutes / 5)) % 12);

// figure out how to display th eminutes first, then the hours,
// and anything needed by both, gets the class both

// 18:53

// 18 % 12 = 6
// 53 % 5 = 3

// 5 in purple, 1 in red, 3 in green, 2 in green

