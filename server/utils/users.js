
//addUser (id,name,room)
//remove user by id
//getUser (id)
//getUserList (room)

class Users {
    constructor() {
        this.users = [];
    }
    getUserList(room) {
        //returns list of users
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);
        return namesArray;
    };

    addUser(id, name, room) {
        var user = { id, name, room };
        this.users.push(user);
        return user;
    };

    removeUser(id) {
        //return the id that was removed after remv it
        // var user = users.filter((user) => user.id === id)[0]
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id != id);
        }
        return user;
    }

    getUser(id) {
        var user = this.users.filter((user) => user.id === id);
        return user[0];

    }


}

module.exports = { Users }

// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//         console.log(name, age);
//     }
//     getDesc() {
//         return (`${this.name} is ${this.age} year(s) old`);
//     }
// }
// var me = new Person('priya', 24);
// console.log(me.name, me.age);
// var desc = me.getDesc();
// console.log(desc);

