export default function removeQuotes(input: string): string {
  if (input.startsWith('"') || input.startsWith("'")) {
    input = input.substring(1);
  }

  if (input.endsWith('"') || input.endsWith("'")) {
    input = input.substring(0, input.length - 1);
  }

  return input;
}