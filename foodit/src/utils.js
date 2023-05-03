/** 1에서부터 n사이의 랜덤한 정수를 리턴한다. */
export function getRandomNumber(n) {
  return Math.floor(Math.random() * n + 1);
}

export function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}
