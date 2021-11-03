export default function numberParser(text) {
  const matched = text?.match(/\d+/);
  const times = Number(matched?.[0]);

  return times;
}
