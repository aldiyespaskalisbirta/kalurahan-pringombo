export function countAge(birthDay: string): number {
  const birthdayObj = new Date(birthDay);
  const dateNow = new Date();

  const year = birthdayObj.getFullYear();
  const month = birthdayObj.getMonth();
  const birthdayNumber = birthdayObj.getDate();

  const tahunSekarang = dateNow.getFullYear();
  const bulanSekarang = dateNow.getMonth();
  const dateNowNumber = dateNow.getDate();

  let age = tahunSekarang - year;

  if (
    bulanSekarang < month ||
    (bulanSekarang === month && dateNowNumber < birthdayNumber)
  ) {
    age--;
  }

  return age;
}
