export function getLocationText(lat: number, lng: number): string {
  if (lat > 36.5 && lng < 127.5) return '서해 북쪽 물결 위'
  if (lat < 33.5) return '남쪽 먼 바다 위'
  if (lng > 129) return '동해의 느린 해류 근처'
  return '한반도 남쪽 해역 어딘가'
}
