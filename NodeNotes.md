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

## Npm

### Package
Bits of reusable code folder.

### Installing packages
We can install packages directly from `npm` or we can also provide a github url  any url that could host a package or from even a file path, npm will manage to get it.
#### package.json
Is modified by the npm command but can also be modified mannually.

Documents the npm dependencies of the projects.

The dependencies part is where it lists the packages.

node modules is not shared. but just this package json file.

We can also set a package to be only a dev dependency. "devDependencies".

In `package.lock.json` we get all the dependencies and subdependencies of the packages that we have. Also if we have a version specified in the `package.lock.json` and we only the version of the same dependency in the `package.json`. The `npm i` command will install the version specified in the `.lock` file.
#### npm commands:

to install all dependencies use `npm i`

By default the install task installs packages locally (to the current folder the command line is sitting at). If we want to install it at a global scope we use the `-g` flag.

So when running `npm i --production` we can ignore all this dev dependencies.

To initialize a package.json in a folder we use `npm init`. use `--yes` flag to avoid having to answer questions.

`npm ls` lists all packages dependencies that we have in our project.
#### SemVer (Semantic versioning)
It is a contract between a package provider and its users.
(majorVersion)-(minorChanges)-(patchNumber)

- Major: breaking changes
- Minor: backward compatible
- Patch: bug fixes

##### Acceptable versions characters

- `~` greater or equal to the version given with restriction in the major and minor versions. Ig: ~1.2.3 would install any package of 1.2.x where x can be 3 or greater. (no minors/majors)
- `^` greater or equal to the version given with restrictions in major version only..
- `x` notation allows to specify more accurately the versions we accept. Ig: 1.2.x would take any value in x, 1.x would take any version with major version being 1.

#### Publishing packages of our own

Create a library with a package.json running `npm init` and setting up all of our package parameters.

The library must export a module. with `module.exports` fuctionality.

```js
    module.exports = ()=>{
        console.log("asd")
    }
```

Once the library is ready we can publish it by doing `npm publish`.

Update package to specific version:
```shell
    npm update <package>@<version>
```
```shell
    npm update <package>@4
```
```shell
    npm update <package>@4.1
```
```shell
    npm update <package>@latest
```

same applies for install. Also we can use condition strings for controlling which version we update to/install.

```shell
    npm i <package>@">=1.1.0 <1.4.0 || 1.5.0"
```
#### Update a package.
When installing a package from `npm i` we'll get the `^` prefix in our version so any minor update could be installed when doing an `npm update`.

We can check which packages are going to be updated by running the `npm outdated` command.
### NPX and NPM run scripts

We can define our own commands to run under certain keywords that we define in `package.json` file. These commands can use libraries that were installed locally in `node_modules`.

To run a library from simple command you should use `npx` prefix command. Which stands for "node package execute". This prefix makes node look for the current node modules folder and find the library you want to use ig: `npx jest` (would work if we have jest installed in node_modules)

Some scripts have special keywords and npm allow to execute them without using the `run` command. To find those special keywords we can check the list in `npm -h npm-scripts`. Any other keyword defined in the `package.json` that's not in that list it will require to be run with the `run` command.

## Modules and Concurrency in Node.

### Modules
It is a file or folder that contains code.

#### Node executions - Wrapper function

Node wraps every file in a function. So whatever a function has available in its scope, we will have it at the top level of our file. For example, the `arguments` keyword peculiar of functions.

This wrapper function takes multiple arguments that are very useful when building node modules.

- exports - define the api of the module. It's an alias for `module.exports`
- module - define the api of the module
- require - to require other modules inside this one
- __filename - path of the file
- __dirname - path of the folder

These are customized for each file. They are not globally available so they may actually change from one file to another.

So as stated before, any apparent global declaration that we do in our file, it is actually scoped to this wrapped function.

On the contrary, in the case of browsers, we can declare global scoped variables if we define them at the top level of a file.

This function, returns the `module.exports` of the `module` argument. Is the object that node uses to manage the dependencies in modules.

The require, when used, it will get the `module.exports` that the module we're pointing at exported in its file.

If we were to change the nature of the top lvl api ( that is, the `exports`). We do not have to do it with `exports` parameter but actually address directly `module.exports`. Since `exports` is simply holding the reference to `module.exports` if we modify it we'd lose that reference and `module.exports` would never notice. Remind that every node module return the `module.exports` and not `exports`.

We can have our top lvl api to be a function instead of an object as well.

The default export for modules is an empty object, and that reference is held in the `exports` parameter of the wrapper function. Whichever other type of value that we want to return from our module (function,array,date,etc) we **must** do it by changing the reference of `module.exports` and not `exports`.

### The event loop
It is what node uses to process async actions and interface them for you so that you don't have to deal with threads.

It monitors async actions.

### Error vs Exceptions

Errors are unexpected and exceptions are conditions.

Errors crash the application. Unexpected is called when the code does not address it.

Whenever we handle errors we should not swallow them or give misleading information. We have to be as specific as possible to know what actually went wrong. For that we can use `.code` error property to tell apart the different types of errors in the catch clause.

### Node clusters

Is ok for a node process to crash. The thing about this is that when running servers, there are actually more than one node process running, one for each core, these group of processes is called a cluster. There's a master process that manages the work of these nodes.

Even if the server has a single core (and thus can run a single node process) there should be a cluster running this process. Given that the master process should create a new process if the existing crashes.

## Async patterns

Many node functions were designed with a called callback pattern where functions got as a last argument a callback function that takes an error object and data as parameter. That was the start of the async functionalities of node.

```js
    const fs = require("fs")
    fs.readFile(fileName,funciton(err,value)=>{
        //do something
    })
```
Now, using the callback pattern promotes the building of callback hell / pyramid of doom. So node included a `promisify` library that allows to create a promise-based object out of these functions that followed the callback pattern. Thus, after calling the promisify function we could use that return object to await it and get the data in an async function.

### Event Emitters

The `events` module is a built-in one that's one of the most important modules in node since many of its modules require this one.

Streams are EventEmmiters.

When requiring this library we get the EventEmitter class which we can instanciate to create event emitters of our own.

`.emit` allow to create a new event with a name. and we subscribe to this event with the `.on` method:

```js
    const EventEmitter = require('events')

    const myEmmiter = new EventEmitter()

    myEmmiter.emit('TEST_EVENT')

    myEmmiter.on('TEST_EVENT',()=>{})
```

When emmitting the event we trigger it. If we don't emmit even if there are subscriptions they'll never run their callbacks.

## Web servers

For hosting web servers we use the `http` module which is also built in node.

We use the `createServer` method of this api to create an `EventEmitter` and we can pass along a listener for requests.

```js
    const http = require('http')

    const requestListener = (req,res)=>{
        //do stuff
    }

    const server = http.createServer(requestListener)

    server.listen(port,startCb)
```

This listener is nothing more than a function that takes two arguments `req` and `res` and will be subscribed to the event of `request`. We can do this in the `createServer` function or separately with the `on` function of the EventEmitter class.

```js
    const http = require('http')

    const server = http.createServer()

    server.on('request',requestListener)

    server.listen(port,startCb)
```

To start the server running we must use the `listen` method of the server object we created with the http library. This method takes the port number as the first argument and the callback to execute once the server started running. This operation is async so the server will run forever by listening for requests.

The request object `req` is of type `IncomingMessage` so we can go into node's http module documentation and check what can be done with this object once we receive it.

The response object `res` is of type `ServerResponse`.

Both the request and the response objects are `stream`s. So we can subscribe to them

### Node Frameworks

#### express
Express provides a wrapper around the http node built-in module that allows us to write events in an easier way than that if we were to use the raw http module.

```js
    const express = require('express')()
    
    express.get("/",(req,res)=>{
        //do something
    })
```

`req` and `res` here are streams as well but have different api than the ones used in the `http` module

## Working with the OS

### `os` module
Provides some utility methods to communicate with the operating system.
### `fs` module
Provides methods for operating with files.

Most likely the biggest api within the built-in modules.

When attempting to read and write files, the `createReadStream` and the `createWriteStream` are preffered over the `readFile` and `writeFile` methods.

Append files, copy, get file details, check permission, link files, create directories, delete, rename. 
### `child_process` module

Allow to execute any command from the os inside node. It creates a subprocess. Everything that can be done in the OS is possible to be done in node.

The main methods in this modules are 

1. `exec`
2. `execFile`
3. `fork`
4. `spawn`

The one most used is `spawn`.

## Debugging node

For debugging we can use the `--inspect-brk` flag on our node command and it will start a session at chrome://inspect where it will show us our file and allow us to debug it with the chrome dev tools.