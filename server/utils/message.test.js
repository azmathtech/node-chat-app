var expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'admin';
    var text = 'some message';
    var message = generateMessage(from, text);

    // expect(message.from).toBe(from);
    // expect(message.text).toBe(text);
    expect(message).toInclude({ from, text });
    expect(message.createdAt).toBeA('number');

    // expect(res => {
    //   expect(res.body.from).toBe(from);
    //   expect(res.body.text).toBe(text);
    //   expect(res.body.createdAt).toBeA('number');
    // });
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'admin';
    var latitude = 1;
    var longitude = 1;
    var url = 'https://www.google.com/maps?q=1,1';

    var message = generateLocationMessage(from, latitude, longitude);

    expect(message.url).toBe(url);
    expect(message.createdAt).toBeA('number');
  });
});
