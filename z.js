function A() {
  const a = 1;
  return function B() {
    const b = 2;
    return function C() {
      console.log(a, b)
    }
  }
}

const c = A()();
c();
