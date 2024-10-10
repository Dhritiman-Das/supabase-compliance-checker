export function convertToPlainObject(data: object) {
  return JSON.parse(JSON.stringify(data));
}

export function capitalizeFirstChar(text: unknown) {
  if (typeof text != "string") return;
  return text[0].toUpperCase() + text.slice(1);
}
