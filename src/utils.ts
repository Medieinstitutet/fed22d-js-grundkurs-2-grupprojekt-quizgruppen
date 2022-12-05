export function shuffle(array: any[]) {
  return array.sort(() => 0.5 - Math.random());
}
