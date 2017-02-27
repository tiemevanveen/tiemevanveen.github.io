---
template: inverse
#.red[Let & Const]
---
layout: false
```js
// ES5:

for (var i = 0; i < 10; i++) {
  // ...
}
console.log(i);  // ?


var a = 20;
if (b === c) {
  var a = 40;
  console.log(a); // 40
}
console.log(a);   // ??
```
???

Unpredictable / not intuitive 
---
```js
// ES5:

for (var i = 0; i < 10; i++) {
  // ...
}
console.log(i);  // 10


var a = 20;
if (b === c) {
  var a = 40;
  console.log(a); // 40
}
console.log(a);   // 40
```
---
```js
// ES2015:

for (let i = 0; i < 10; i++) {
  // ...
}
console.log(i);  // Undefined


let a = 20;
if (b === c) {
  let a = 40;
  console.log(a); // 40
}
console.log(a);   // 20
```
???

Scoped
---
```js
// ES5:

var pi = 3.1415;

... 

pi = 2.71828;
```
--
```js
// ES2015:

const pi = 3.1415;

...

pi = 2.71828; // TypeError: Assignment to constant variable.
```
--
![const](http://i.imgur.com/wzoSnqa.png)
---












template: inverse
#.red[Arrow Functions]
---
```js
// ES5:

var names = users.map(function (user) {
  return user.name;
});
```
--
```js
// ES2015

const names = users.map((user) => {
  return user.name;
});
```
--
```js
const names = users.map(user => user.name);
```

<br>

--

```js
input => output
```

---
```js
// ES5:
var View = {
  init: function () {
    var button = document.getElementById('button');
    button.addEventListener('click', function () {
      this.handleClick(); // TypeError: this.handleClick is not a func
    });
  },
  handleClick: function () {
    // login user
  }
};
```
--
```js
// hacky solution
var that = this;
button.addEventListener('click', function () {
  that.handleClick();
});
```
---
```js
// better solution
var View = {
  init: function () {
    var button = document.getElementById('button');
    button.addEventListener('click', function () {
      this.handleClick();
    }.bind(this));
  },
  handleClick: function () {
    // login user
  }
};
```
---
```js
// ES2015:
const View = {
  init: () => {
    const button = document.getElementById('button');
    button.addEventListener('click', () => {
      this.handleClick();
    });
  },
  handleClick: () => {
    // login user
  }
};
```
--
```js
const View = {
  init: () => {
    const button = document.getElementById('button');
    button.addEventListener('click', this.handleClick);
  },
  handleClick: () => {
    // login user
  }
};
```
---















template: inverse
#.red[Template Literals]
---
```js
// ES5:
function getURL(host, id, annotationId) {
    return host + '/api/presentation/' + id + '/annotation/' + annotationId;
}
```
--
```js
// ES2015:
function getURL(host, id, annotationId) {
    return `${host}/api/presentation/${id}/annotation/${annotationId}`;
}
```
--
```js
function getMessage(count) {
    return`${count} item${count === 1 ? '' : 's'} found`
}
```
--
```js
// Multiline strings
var templateString = `
  Hello
  World
`;
```

--

```js
const result = someFunction`Hello ${user}`;
```
---

















template: inverse
#.red[Default Parameters]
---
 ```js
 // ES5:
 
function getRect(x, y, w, h) {
  w = w || 10;
  h = h || 10;
  return x + y + w + h;
}
```
--
```js
// ES2015:

function getRect(x, y, w = 10, h = 10) {
  return x + y + w + h;
}
getRect(1, 2); // 23
```
---










template: inverse
#.red[Destructuring]
---
```js
const obj = { foo: 123, bar: 'abc', baz: { random: true } };
```
--
```js
// ES5
var foo = obj.foo;
console.log(foo);     // 123
```
--
```js
// ES2015
const { foo } = obj;
console.log(foo);     // 123
```
--
```js
// Retrieve as 'newName' instead of 'foo'

const obj = { foo: 123, bar: 'abc', baz: { random: true } };
const { foo: newName } = obj;
console.log(newName); // 123
```
--
```js
// Nested destructuring

const obj = { foo: 123, bar: 'abc', baz: { random: true } };
const { baz: { random } } = obj;
console.log(random); // true
```
---
```js
// ES5:
function getRect(options) {
  return options.x + options.y + options.w + options.h;
}
const options = { x: 10, y: 10, w: 1, h: 2 };
getRect(options); // 23
```
--
```js
// ES2015:
function getRect({ x, y, w, h }) {
  return x + y + w + h;
}
const options = { x: 10, y: 10, w: 1, h: 2 };
getRect(options); // 23
```
--
```js
// combined with default parameters

function getRect({ x = 10, y = 10, w, h }) {
  return x + y + w + h;
}
const options = { w: 1, h: 2 };
getRect(options); // 23
```
???

More self-descriptive 
Easier to omit arbitrary parameters.

---
```js
// Nested destructuring in functions

function getUserRect({user: { x, y }, w = 10, h = 10}) {
  return x + y + w + h;
}
const user = { id: 12, name: 'bob', x: 1, y: 2 };
getUserRect({user: user}); // 27
```
---
```js
// Loops 

const users = [
  {id: 4, name: 'bob'},
  {id: 8, name: 'alice'},
];
```

<br/>

--
```js
// ES5:

users.map(function(user){
  return 'hi ' + user.name;
}
```

<br/>

--
```js
// ES2015:

users.map(({name}) => `hi ${name}`);
```
---

```js
// Getting values from an array

const users = [
  {id: 4, name: 'bob'},
  {id: 8, name: 'alice'},
];
```
<br/>

--
```js
// ES5:  

var bob = users[0];
var alice = users[1];
```  
<br/>

--
```js
// ES2015: 

const [bob, alice] = users;
```
---
pollStatus.js
```js
module.exports = {
  startPolling: function() { ... },
  stopPolling: function() { ... },
};
```
Somewhere in your app
```js
// ES5
var pollStatus = require('./pollStatus');

pollStatus.startPolling();
pollStatus.stopPolling();
```
--
```js
// ES2015
const { startPolling, stopPolling } = require('./pollStatus');
...
startPolling();
```
<br>
---
apiConsts.js
```js
module.exports = {
  API: { 
    HOST: 'http://random.nu/', 
    PORT: '8080' 
  },
  ENDPOINTS: { 
    CONFIG: '/api/config', 
    USERS: '/api/users' 
  }
};
```
Somewhere in your app.js
```js
// ES2015:
const { API, ENDPOINTS } = require('./apiConsts');
console.log(API.HOST); // 'http://random.nu/'
```
---
Multiple returns
```js
// ES5:
var result = parseDate('2017-01-10');
var year = result.year;
var month = result.month;
var day = result.day;
```

<br/>

--
```js
// ES2015:
const { year, month, day } = parseDate('2017-01-10');
```
---
Regex
```js
const comment = 'Yesterday at was 2017-01-10 right?';
```

<br/>

--
```js
// ES5:

var result = comment.match(/(\d{4})-(\d{2})-(\d{2})/);
var year = result[1];
var month = result[2];
var day = result[3];
```

<br/>

--
```js
// ES2015:

const [all, year, month, day] = comment.match(/(\d{4})-(\d{2})-(\d{2})/);
```
--















---
template: inverse
#.red[New object expressions]
---
 ```js
// ES5: 

function createUser(id, firstName, lastName, age, role) {
  var user = {
    id: id,
    firstName: firstName,
    lastName: lastName,
    age: age
  };

  user[role] = getRoleData(role);
  return user;
}
```
---
```js
// ES2015:

function createUser(id, firstName, lastName, age, role) {
  return {
    id,
    firstName,
    lastName,
    age,
    
    
    [role]: getRoleData(role)
  };
}
```
--
Or 
```js
    [`user-${role}`]: getRoleData(role)
```
--
```js
    [someMethod()]: getRoleData(role)
  
```
---







template: inverse
#.red[Rest & Spread]
---
instead of `arguments`
```js
function getTotalPrice(symbol, ...args) {
  return symbol + args.reduce((res, price) => res + price);
}
getTotalPrice('$', 3, 4, 5, 5); // $17
```
--
to split array 
```js
let users = [1, 5, 7, 4];
const [firstUser, ...others] = users;
console.log(firstUser); // 1
console.log(others); // 5, 7, 4
```
--
to concat array
```js
let newUsers = [8, 6];
users = [...users, ...newUsers, 9];
// 1, 5, 7, 4, 8, 6, 9
```
---












template: inverse
#.red[New String Methods]
---
```js
// ES5
if (str.indexOf('x') === 0) {
  
}
```
--
```js
// ES2015
if (str.startsWith('x')) {
  
} 

if (str.endsWith('y')) {
  
}

if (str.includes('x')) {
  
}

str = "abc".repeat(3); // "abcabcabc"
```
---








template: inverse
#.red[New Array Methods]
---
```js
var arr = [6, -5, 4, 8];
```
<br>
```js
// ES5
arr.indexOf(7); // -1
```
--
```js
// ES2015
arr.includes(4); // true
```
--
<br>
```js
const a = arr.findIndex(4);          // 2
const b = arr.findIndex(x => x < 0); // 1
const c = arr.find(x => x < 0);      // -5
```
---









template: inverse
#.red[New Object Methods]
---
```js
const objA = { foo: "bar", baz: 42 };
```

```js
// ES5
const keys = Object.keys(objA);       // ['foo', 'baz']
```
--
```js
// ES2015
const entries = Object.entries(objA); // [ ['foo', 'bar'], ['baz', 42] ]
const values = Object.values(objA);   // ['bar', 42]
```
--
```js
// Clone
const b = Object.assign({}, objA);    // { foo: "bar", baz: 42 }
```
--
```js
// Merge
const c = Object.assign({random: 4}, {la: 'lala'}, objA); 
// { random: 4, la: "lala", foo: "bar", baz: 42 }
```
---






template: inverse
#.red[Map]
---
"Hashmap"
```js
// ES5:
var presentations = {
  'DM0DM00139381': {title: 'some', ...},
  'DM0DM00488673': {title: 'random', ...},
  'DM0DM00854376': {title: 'thing', ...},
}
```
--
```js
// ES2015:
let myMap = new Map();
map.set('DM0DM00139381', {title: 'some', ...});
map.get('DM0DM00139381'); 
map.has('DM0DM00139381');
map.delete('DM0DM00139381');
map.set('DM0DM00854376', presentationX);

for (let [key, value] of myMap) {
  console.log(key, value);
}
```
---
template: inverse
#.red[Set]

http://www.2ality.com/2015/01/es6-maps-sets.html#set

https://www.barbarianmeetscoding.com/blog/2016/05/12/a-look-at-es6-sets/

---







template: inverse
#.red[Classes]
---

```js
// ES5
function Person(name) {
  this.name = name;
}

Person.prototype.describe = function () {
  return 'Person called ' + this.name;
};
```
--
```js
function Employee(name, title) {
  Person.call(this, name); // super(name)
  this.title = title;
}
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;
Employee.prototype.describe = function () {
  return Person.prototype.describe.call(this) + ' (' + this.title + ')';
};
```
---
```js
// ES2015
class Person {
  constructor(name) {
    this.name = name;
  }

  describe() {
    return 'Person called ' + this.name;
  }
}
```
--
```js
class Employee extends Person {
  constructor(name, title) {
    super(name);
    this.title = title;
  }

  describe() {
    return super.describe() + ' (' + this.title + ')';
  }
}
```
---


template: inverse
#.red[Await Async]

https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8#.87qlruyvs
---

template: inverse
#.red[Generators]

https://medium.com/@dtothefp/why-can-t-anyone-write-a-simple-es6-generators-tutorial-ec2bbdf6ff45#.53dkkbt92
---



