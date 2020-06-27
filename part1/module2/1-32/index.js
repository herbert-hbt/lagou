class Left {
  static of(value) {
    return new Left(value);
  }
  constructor(value) {
    this._value = value;
  }
  map(fn) {
    return this;
  }
}
class Right {
  static of(value) {
    return new Right(value);
  }
  constructor(value) {
    this._value = value;
  }
  map(fn) {
    return Right.of(fn(this._value));
  }
}

const parseJson = (str) => {
  try {
    return Right.of(JSON.parse(str));
  } catch (e) {
    return Left.of({ error: e.message });
  }
};
let r = parseJson("{name:zs}")
  .map((item) => item.name.toUpperCase());
console.log(r);
let r1 = parseJson('{"name":"zs"}')
  .map((item) => item.name.toUpperCase());
console.log(r1);

let r12= parseJson('{"name":"zs"}')
  .map((item) => item.toUpperCase());
console.log(r2);
