const arr = [21, 1, 2, 3, 4, 5, 6, 7, 1, 2];

console.log(
  arr.reduce((acc, ell) => {
    if (ell % 2 === 0) {
      return acc + ell;
    }
    return acc;
  }, 0)
);
