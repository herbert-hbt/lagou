class Container {
  static of(value) {
    return new Container(value);
  }
  constructor(value) {
    this._value = value;
  }
  map(fn) {
    return Container.of(fn(this._value));
  }
}

const r = Container.of(5)
  .map((item) => item + 3)
  .map((item) => item * 6);
console.log(r);
