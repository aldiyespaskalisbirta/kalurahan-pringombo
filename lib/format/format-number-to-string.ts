export function formatNumberToString(inputNumber: number): string {
  const number = inputNumber - 1;
  const spellNumber = [
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
    "sepuluh",
    "sebelas",
    "dua belas",
    "tiga belas",
    "empat belas",
    "lima belas",
  ];

  const spell = spellNumber[number];

  return `${spell}`;
}
