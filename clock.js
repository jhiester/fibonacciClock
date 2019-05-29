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


/* in this instance we'll have at most 32 items in the powerset. we don't need anything fancy. */
const powerSet = (arr) => {

    const powers = [];

    const total = Math.pow(2, arr.length);

    for (let i = 0; i < total; i++) {
        let tempSet = [];

        let num = i.toString(2);

        while (num.length < arr.length)
            num = '0' + num;

        for (let j = 0; j < num.length; j++) {
            if (num[j] === '1')
                 tempSet.push(arr[j]);
            else
                tempSet.push(0);
        }

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


const setTime = () => {
    const time = new Date();
    let hours = time.getHours();
    const minutes = time.getMinutes();

    // check to see if time is HOUR:58 and add one to hour so clock doesn't
    // "go back" in time when minutes are 00 
    if (minutes >= 58)
        hours++;

    let possHourSubsets = [];
    let possMinSubsets = [];
    let hourSums = [];
    let minSums = [];

    for (const subset of powerSet(possVals)) {
        possHourSubsets.push(subset);
        hourSums.push(subset.reduce(sum));
    }

    for (const subset of powerSet(possVals)) {
        possMinSubsets.push(subset);
        minSums.push(subset.reduce(sum));
    }

    if (hours % 12 === 0)
        hourDisplay = possHourSubsets[hourSums.findIndex(sums => sums === 12)];
    else
        hourDisplay = possHourSubsets[hourSums.findIndex(sums => sums === hours % 12)];

    minutesDisplay = possMinSubsets[minSums.findIndex(sums => sums === Math.round((minutes / 5)) % 12)];

    /* DEBUG INFO */
    // console.log(`Hours: ${hourDisplay}`);
    // console.log(`Minutes: ${minutesDisplay}`);

    // console.log(hours, minutes);
    // console.log(hours % 12);
    // console.log(Math.round((minutes / 5)) % 12);

    resetDisplay(squares);
    addMinutes(squares);
    addHours(squares);
}


setTime();


setInterval(() => {
    setTime();
}, 10000);
