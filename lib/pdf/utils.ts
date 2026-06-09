export function splitTextIntoLines(
  text: string,
  maxLength: number
) {
  const words = text.split(" ");

  const lines: string[] = [];

  let currentLine = "";

  words.forEach((word) => {
    const testLine = currentLine + " " + word;

    if (testLine.length > maxLength) {
      lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) {
    lines.push(currentLine.trim());
  }

  return lines;
}