const theOneFunc = (extraDelay) => {
  setTimeout(console.log("Hello"), extraDelay);
};

setTimeout(theOneFunc, 4 * 1000);

// Hello after 4 seconds

// Hello after 8 seconds
setTimeout(theOneFunc, 4 * 1000, 4 * 1000);
// You can define only ONE function

//lmfao I didnt get the assignment.
