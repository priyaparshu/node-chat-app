const expect = require('expect');
const { Users } = require('./users')
describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{

            id: '1',
            name: 'Andrew',
            room: 'The Office fans'
        }, {
            id: '2',
            name: 'Kyle',
            room: 'React Course'
        }, {
            id: '3',
            name: 'John',
            room: 'The Office fans'
        }]
    })
    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '134',
            name: 'Andrew',
            room: 'The studio fans'
        };
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);

    });

    it('Should return names for The Office Fans', () => {
        var userlist = users.getUserList('The Office fans');
        expect(userlist).toEqual(['Andrew', 'John']);
        //expect(userlist).toEqual(['Kyle']);
    })
    it('Should return names for The react course', () => {
        var userlist = users.getUserList('React Course');

        expect(userlist).toEqual(['Kyle']);
    })

    it('should remove a user', () => {
        var id = '1';
        var res = users.removeUser(id);
        expect(res.id).toBe(id)
        expect(users.users.length).toBe(2)
    })
    it('should not remove a user', () => {
        var id = '5';
        var res = users.removeUser(id);
        expect(res).toNotExist(id);
        expect(users.users.length).toBe(3);
    })

    it('should find user', () => {
        var id = '1';
        var res = users.getUser(id);
        expect(res.id).toBe(id)
    })
    // it('should not find a user', () => {
    //     var id = '5';
    //     var res = users.getUser(id);
    //     //expect(res).toEqual(null);
    //     expect(res).toNotExist();
    // })
})