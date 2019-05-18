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

const getAllSubsets =
    theArray => theArray.reduce(
        (subsets, value) => subsets.concat(
            subsets.map(set => [...set, value])
        ),
        [[0]]
    );

const sum = (a, b) => {
    return a + b;
}

allSubsets = getAllSubsets(possVals);

console.log(allSubsets);
for (const subset of allSubsets) {
    console.log(subset.reduce(sum));
}

// function* subsets(array, offset = 0) {
//     while (offset < array.length) {
//         let first = array[offset++];
//         for (let subset of subsets(array, offset)) {
//             subset.push(first);
//             yield subset;
//         }
//     }
//     yield [0];
// }



// const possHourSubsets = [];
// const possMinSubsets = [];
// const hourSums = [];
// const minSums = [];

// //   Example:
// possHourSubsets = 
// for (let subset of subsets(possVals)) {
//     possHourSubsets.push(subset);
//     hourSums.push(subset.reduce(sum));
// }

// console.log(possSubsets);
// console.log(possHourSubsets[hourSums.findIndex(sums => sums === hours % 12)]);





// possible values are 1, 1, 2, 3, and 5
// minutes are measured to closest multiple of 5
// grey squares are ignored
// hours = purple + red
// minutes = (purple + green) * 5

console.log(hours, minutes);
// console.log((18 % 12));
// console.log(Math.round((53 / 5) % 12));
console.log(hours % 12);
console.log(Math.round((minutes / 5)) % 12);

// figure out how to display th eminutes first, then the hours,
// and anything needed by both, gets the class both

// 18:53

// 18%12 = 6
// 53%5 = 3

// 5 in purple, 1 in red, 3 in green, 2 in green

