class Maybe {
  static of(value) {
    return new Maybe(value);
  }
  constructor(value) {
    this._value = value;
  }
  map(fn) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this._value));
  }
  isNothing() {
    return this._value === null || this._value === undefined;
  }
}

const r = Maybe.of(null)
  .map((item) => item.fixed())
  .map((item) => item * 6);
console.log(r);
