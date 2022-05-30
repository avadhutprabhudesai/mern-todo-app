export function isErrorInstance(val: unknown): val is Error {
  return val instanceof Error;
}

export function isString(val: unknown): val is string {
  return typeof val === 'string';
}
