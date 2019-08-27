const slowFunc = () => {
  const limit = 45000;
  let total = 0;
  for (var i = 0; i < limit; i++) {
    var subTotal = 0;
    for (var j = 0; j <= i; j++) {
      subTotal += j;
    }
    total += subTotal;
  }
  return total;
};

module.exports = slowFunc;
