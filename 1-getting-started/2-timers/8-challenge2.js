// Print "Hello World"
// Every second
// And stop after 5 times

const { count } = require("console");

// After 5 times. Print "Done" and let Node exit.

let counter = 1;
const helloWorlder = (countLimit, intervalId) => {
  console.log("Hello world");
  if (counter === countLimit) {
    clearInterval(intervalId);
    console.log("Done");
  }
  counter++;
};

const interval = setInterval(() => helloWorlder(5, interval), 5 * 1000);
