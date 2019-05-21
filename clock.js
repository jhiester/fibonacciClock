/*  Fibonacci Clock
    Justin Hiester
*/
const squares = [
    square1a = document.getElementById('square-1a'),
    square1b = document.getElementById('square-1b'),
    square2 = document.getElementById('square-2'),
    square3 = document.getElementById('square-3'),
    square5 = document.getElementById('square-5'),
]

const possVals = [1, 1, 2, 3, 5];

const sum = (a, b) => {
    return a + b;
}

const powerSet = (arr) => {

    // the final power set
    var powers = [];

    // the total number of sets that the power set will contain
    var total = Math.pow(2, arr.length);

    // loop through each value from 0 to 2^n
    for (var i = 0; i < total; i++) {

        // our set that we add to the power set
        var tempSet = [];

        // convert the integer to binary
        var num = i.toString(2);

        // pad the binary number so 1 becomes 001 for example
        while (num.length < arr.length) { num = '0' + num; }

        // build the set that matches the 1's in the binary number
        for (var b = 0; b < num.length; b++) {
            if (num[b] === '1') { tempSet.push(arr[b]); }
            else { tempSet.push(0); }

        }

        // add this set to the final power set
        powers.push(tempSet);

    }

    return powers;

}

const resetDisplay = (squares) => {
    for (let square of squares) {
        square.classList.remove('minute', 'hour', 'both')
        square.classList.add('neither');
    }
}


const addMinutes = (squares) => {
    for (let index = 0; index < squares.length; index++) {
        if (minutesDisplay[index] != 0) {
            squares[index].classList.remove('neither');
            squares[index].classList.add('minute');
        }
    }
}

const addHours = (squares) => {
    for (let index = 0; index < squares.length; index++) {
        if (hourDisplay[index] != 0) {
            squares[index].classList.remove('neither');
            if (squares[index].classList.contains('minute')) {
                squares[index].classList.remove('minute')
                squares[index].classList.add('both');
            }
            squares[index].classList.add('hour');
        }
    }
}

setInterval(() => {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    
    let possHourSubsets = [];
    let possMinSubsets = [];
    let hourSums = [];
    let minSums = [];
    
    for (let subset of powerSet(possVals)) {
        possHourSubsets.push(subset);
        hourSums.push(subset.reduce(sum));
    }
    
    for (let subset of powerSet(possVals)) {
        possMinSubsets.push(subset);
        minSums.push(subset.reduce(sum));
    }
    
    hourDisplay = possHourSubsets[hourSums.findIndex(sums => sums === hours % 12)];
    minutesDisplay = possMinSubsets[minSums.findIndex(sums => sums === Math.round((minutes / 5)) % 12)];
    
    console.log(`Hours: ${hourDisplay}`);
    console.log(`Minutes: ${minutesDisplay}`);
    
    console.log(hours, minutes);
    console.log(hours % 12);
    console.log(Math.round((minutes / 5)) % 12);
    
    resetDisplay(squares);
    addMinutes(squares);
    addHours(squares);    
}, 10000);
