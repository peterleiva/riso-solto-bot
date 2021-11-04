/**
 * Take a string and recognize the first number appareance
 *
 * @param {string} text
 * @return {number}
 */
export function numberParser(text) {
  const matched = text?.match(/\d+/);
  const times = Number(matched?.[0]);

  return times;
}
