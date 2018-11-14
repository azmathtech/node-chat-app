var expect = require('expect');

var { generateMessage } = require('./message');

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
