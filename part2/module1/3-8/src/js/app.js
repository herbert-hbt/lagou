const a = Symbol("ddd");
const b = () => {
  return {
    [a]: 999,
  };
};
console.log(b());
