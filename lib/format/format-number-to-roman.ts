export function numberToRoman(num: number): string {
  if (num <= 0 || num > 3999) {
    throw new Error("Number out of range (1-3999)");
  }

  const romanNumerals: Record<number, string> = {
    1: "I",
    4: "IV",
    5: "V",
    9: "IX",
    10: "X",
    40: "XL",
    50: "L",
    90: "XC",
    100: "C",
    400: "CD",
    500: "D",
    900: "CM",
    1000: "M",
  };

  let result = "";

  Object.keys(romanNumerals)
    .sort((a, b) => parseInt(b) - parseInt(a))
    .forEach((key) => {
      const arabic = parseInt(key);

      while (num >= arabic) {
        result += romanNumerals[arabic];
        num -= arabic;
      }
    });

  return result;
}
