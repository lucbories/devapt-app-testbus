# Devapt - Messages bus test application

Current version: 1.0.0

Please see the develop branch for current development.


## Overview

'testbus' is an application for distributed features testing of Devapt core libraries.

You can install this application and play with it to discover Devapt distributed features. 

Devapt is a set of libraries to help producing applications:
* [devapt-core-common](https://github.com/lucbories/devapt-core-common)
* [devapt-core-server](https://github.com/lucbories/devapt-core-server)
* [devapt-core-services](https://github.com/lucbories/devapt-core-services)
* [devapt-core-browser](https://github.com/lucbories/devapt-core-browser)

[GitHub project](https://github.com/lucbories/devapt-app-testbus)
[NPM package](https://www.npmjs.com/package/devapt-app-testbus)


## Getting Started

Install the application (you need internet access, nodejs, git and npm):
```
git clone https://github.com/lucbories/devapt-app-testbus.git

cd devapt-app-testbus

npm install

npm run nodeA
```
Firts, download the source tree from github.
Then install dependencies.
Finaly, start the application with NodeA.
And connect to it: [Node A url](http:localhost:8080/assets/html/index.html)

NodeA configuration is a master node.

You can also run others non master nodes:
```
...
npm run nodeA
npm run nodeB
npm run nodeC
```
You can now test to ping others nodes from one application.
And connect to A: [Node A url](http:localhost:8080/assets/html/index.html)
And connect to B: [Node B url](http:localhost:7080/assets/html/index.html)
And connect to C: [Node C url](http:localhost:6080/assets/html/index.html)


## Contribute

Copyright Luc BORIES 2015-2017

See [CONTRIBUTING](https://github.com/lucbories/devapt-core-doc/tree/master/CONTRIBUTING)


## Licence

See [LICENSE](https://github.com/lucbories/devapt-app-testbus/tree/master/LICENSE)


## Bugs / Questions

See [ISSUES](https://github.com/lucbories/devapt-app-testbus/issues)

See [QUESTIONS](https://github.com/lucbories/devapt-app-testbus/issues)

Before to submit an issue try these checklist:
* have you searched a past issue ?
* what behaviour do you expect ?
* what behaviour do you have ?
* how to reproduce your issue : version, sample of code, logs
