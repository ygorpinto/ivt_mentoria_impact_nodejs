const sum = require('./sum');

test('quando eu somar uma string "1+1" retornar 2', () => {
  expect(sum("1+1")).toBe(2);
});