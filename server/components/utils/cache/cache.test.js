const Cache = require('./cache');

afterEach(() => {
  // clean up fake timers
  jest.useRealTimers();
});

test('cache get and set simple', () => {
  const cache = new Cache();
  const key = 'key';
  const value = 'value';

  // check that key doesn't exist
  expect(cache.has(key)).toBeFalsy();
  expect(cache.get(key)).toBeNull();

  // add key and check to see if cache returns correct value
  cache.set(key, value);
  expect(cache.has(key)).toBeTruthy();
  expect(cache.get(key)).toBe(value);
});

test('cache remove', () => {
  const cache = new Cache();
  const key = 'key';
  const value = 'value';

  cache.set(key, value);
  expect(cache.has(key)).toBeTruthy();
  expect(cache.get(key)).toBe(value);

  cache.remove(key);
  expect(cache.has(key)).toBeFalsy();
  expect(cache.get(key)).toBeNull();
});

test('cache has ttl reset', () => {
  const cache = new Cache();
  const key = 'key';
  const value = 'value';

  jest.useFakeTimers();
  cache.set(key, value, 1000);

  jest.advanceTimersByTime(500);

  expect(cache.has(key)).toBeTruthy();
  expect(cache.get(key)).toBe(value);

  jest.advanceTimersByTime(501);

  expect(cache.has(key)).toBeFalsy();
  expect(cache.get(key)).toBeNull();
});

test('cache get ttl reset', () => {
  const cache = new Cache();
  const key = 'key';
  const value = 'value';

  jest.useFakeTimers();
  cache.set(key, value, 1000);

  jest.advanceTimersByTime(500);

  expect(cache.has(key)).toBeTruthy();
  expect(cache.get(key)).toBe(value);

  jest.advanceTimersByTime(501);

  expect(cache.get(key)).toBeNull();
  expect(cache.has(key)).toBeFalsy();
});

test('cache set same key twice', () => {
  const cache = new Cache();
  const key = 'key';
  const value1 = 'value1';
  const value2 = 'value2';

  cache.set(key, value1);
  expect(cache.has(key)).toBeTruthy();
  expect(cache.get(key)).toBe(value1);

  cache.set(key, value2);
  expect(cache.has(key)).toBeTruthy();
  expect(cache.get(key)).toBe(value2);
});
