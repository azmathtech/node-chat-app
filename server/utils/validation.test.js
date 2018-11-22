const expect = require('expect');

var { isRealString } = require('./validation');

describe('generateMessage', () => {
  it('should reject non-string values', () => {
    var nonString = 33;
    var result = isRealString(nonString);

    expect(result).toBe(false);
  });

  it('should reject string with only spaces', () => {
    var emptyString = '      ';
    var result = isRealString(emptyString);

    expect(result).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    var realString = '  Mike ';
    var result = isRealString(realString);

    expect(result).toBe(true);
  });
});
