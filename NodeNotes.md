# Node getting started

## require
Can't use dependencies without requiring them. It is an "import" function.

Whatever module with "require" is considered a `CommonJs` module. Different than `EchmaScript` modules where the "import" keyword is used. To make it an ES module we name the file as `.mjs`

## createServer
creates a server and we pass a request listener function that will tell the server what to do with each request.

```js
    http.createServer(
        (req,res)=>{
            //...
        }
    )
```

Where res is the request object and res the response object. The latter one we can use to communicate with the end user. 

createServer does not initiate the server, it simply creates it. To initate it we need a call to the `listen` method of the newly created server. It has many arguments.

```js
    server.listen(port,()=>{//do wen server starts running})
```

## setTimeout
Allows to delay the execution of a function. We pass a function reference and a time in milliseconds. We can also add extra arguments that will be passed as the function parameters ( then the function might or might not use them).

```js
    setTimeout(
        (something,anotherThing)=>{
            console.log(something,anotherThing)
        },
        2*1000,
        "hey",
        "you"
    )
    // hey you (after 2 secs)
```

Clear with `clearTimeout(timerId)`

Can be run with 0ms but it does not exactly mean that it will run immediately after 0ms (that is NOW), but instead it will run after you're done with everything else.
## setInterval
It does a timer in a loop

`clearInterval`

## setImmediate
Allows to immediately a call to a function. (setTimeout with 0ms  as delay)

## node commands
Search with `grep "<query>"`
## Environment variables in node
These can be seen at the end `node -v -h`
### NODE_DEBUG
Allow to set the env variable for a given module so that (if it has support for it) it will log any debugging information that it has whenever it runs.

eg: `NODE_DEBUG="http" node <path>`

If we want more modules to have this env variable available we can list them by comma separating them.

### Custom environment labels

Access them with `process.env`

To create them we use 
```js
    export VAL1=100
```

#### Alternative

`process.argv` allows to pass arguments as an array. But they are not named as env variables.

### stdout stdin stderr
These process methods are all streams, which is another topic.

- `stdout` can be used to write information: `process.stdout.write('hey')`
- stdin can be used to read information from users. We use event methods to use these streams

### process events
the `process` object allows to write events (such as on process termination) to tell it what to do in that case.

```js
process.on('exit', () => {
  console.log('Process will exit now. See you later!');
});
```