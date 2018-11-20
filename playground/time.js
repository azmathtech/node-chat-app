// Jan 1st 1970 00:00:00 am
//timestamp values are in milliseconds

var moment = require('moment');
//new Date().getTime();

// var date = new Date();
// var months = ['Jan', 'Feb'];
// console.log(date.getMonth());

var date = moment();
//console.log(date.format());
//date.add(100, 'year').subtract(9, 'months');
console.log(date.format('MMM Do, YYYY'));

console.log(date.format('h:mm a'));

var createdAt = 1234;
var date2 = moment(createdAt);
console.log(date2.format('h:mm a'));

var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);
