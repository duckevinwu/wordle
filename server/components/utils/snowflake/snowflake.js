module.exports = class Snowflake {
  constructor(processId, threshold = 64) {
    this.processId = processId;
    this.threshold = threshold;
    this.sequence = 0;
    this.lastTime = 0;
  }

  // generate a unique id using snowflake method
  generateId() {
    const time = Date.now();

    if (this.lastTime === time) {
      this.sequence++;
      // if we pass threshold need to wait for next ms
      if (this.sequence > this.threshold) {
        this.sequence = 0;
        while (Date.now() <= time) {}
      }
    } else {
      this.sequence = 0;
    }

    this.lastTime = time;

    const binaryString = time.toString(2)
      + this.processId.toString(2)
      + this.sequence.toString(2);

    const base10Number = parseInt(binaryString, 2);

    return this._toBase62(base10Number);
  }

  // convert a base 10 number to base 62 string
  _toBase62(n) {
    if (n === 0) return '0';
    const digits = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    while (n > 0) {
      result = digits[n % digits.length] + result;
      n = parseInt(n / digits.length, 10);
    }
    return result;
  }
}
