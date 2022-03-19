const gameService = require('./game.service.js');

test('valid allowed guesses', async () => {
  // test first word in list
  expect(await gameService.checkValidGuess('aahed')).toBeTruthy();

  // test random middle word
  expect(await gameService.checkValidGuess('mafic')).toBeTruthy();

  // test last word in list
  expect(await gameService.checkValidGuess('zymic')).toBeTruthy();
});

test('valid answers', async () => {
  // test first word in list
  expect(await gameService.checkValidGuess('aback')).toBeTruthy();

  // test random middle word
  expect(await gameService.checkValidGuess('minim')).toBeTruthy();

  // test last word in list
  expect(await gameService.checkValidGuess('zonal')).toBeTruthy();
});

test('invalid allowed guesses', async () => {
  expect(await gameService.checkValidGuess('aabcd')).toBeFalsy();
  expect(await gameService.checkValidGuess('nasus')).toBeFalsy();
  expect(await gameService.checkValidGuess('zymid')).toBeFalsy();
});

test('invalid answers', async () => {
  expect(await gameService.checkValidGuess('abacb')).toBeFalsy();
  expect(await gameService.checkValidGuess('noblf')).toBeFalsy();
  expect(await gameService.checkValidGuess('zonak')).toBeFalsy();
});
