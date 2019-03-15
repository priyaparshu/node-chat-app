const expect = require('expect');
const { isRealString } = require('./validation');
describe('isRealString ', () => {
    it('should reject non string values', () => {

        var nonString = 123;
        var res = isRealString(nonString);
        expect(res).toBe(false);
    })
    it('should reject strings with only spaces', () => {
        var spaceString = ('    ');
        var res = isRealString(spaceString);
        expect(res).toBe(false);
    })

    it('should allow strings with non-space character', () => {
        var testString = '  andrew  ';
        var res = isRealString(testString);
        expect(res).toBe(true);
    })
})