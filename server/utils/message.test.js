const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'andrew@gmail.com';
        var text = 'how are you';
        var res = generateMessage(from, text);
        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({
            from,
            text
        });
    })
})