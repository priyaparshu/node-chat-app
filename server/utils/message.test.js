const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message')

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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'User';
    var latitude = 15;
    var longitude = 19;
    var url = 'https://www.google.com/maps?q=15,19';

    var resp = generateLocationMessage(from, latitude, longitude);

    expect(resp.createdAt).toBeA('number');
    expect(resp).toInclude({ from, url });

  })
})