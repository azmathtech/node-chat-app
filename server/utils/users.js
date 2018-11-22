[
  {
    id: ';lkj;ljsdf;alkj',
    name: 'Micahel',
    room: 'The Office Fans'
  }
];

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    var user = { id, name, room };
    this.users.push(user);
    return user;
  }

  // removeUser(id) {
  //   // return user that was removed
  //   var user = this.users.filter(user => user.id === id);
  //   console.log(user);
  //   if (user === undefined || user.length === 0) {
  //     console.log('invalid user id');
  //   } else {
  //     var index = this.users
  //       .map(user => {
  //         return user.id;
  //       })
  //       .indexOf(id);
  //     console.log(index);
  //     this.users.splice(index, 1);
  //     return user;
  //   }
  // }

  removeUser(id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter(user => user.id !== id);
    }

    return user;
  }

  getUser(id) {
    var user = this.users.filter(user => {
      return user.id === id;
    });

    return user[0];
  }

  getUserList(room) {
    var users = this.users.filter(user => user.room === room);
    var namesArray = users.map(user => user.name);

    return namesArray;
  }

  // getUserList (room) {
  //   var users = this.users.filter((user) => {
  //     return user.room === room
  //   })
  // }
}

module.exports = { Users };

//---------------------------------------------------------------------------

// //ES6 javascript class object
// class Person {
//   constructor(name, age) {
//     //console.log(name, age);
//     //this is used for the instance of the class
//     this.name = name;
//     this.age = age;
//   }
//   //class method
//   getUserDescription() {
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }
//
// //create an instance of the object
// var me = new Person('Andrew', 25);
// var description = me.getUserDescription();
// console.log(description);
// console.log('this.name', me.name);
// console.log('this.age', me.age);
