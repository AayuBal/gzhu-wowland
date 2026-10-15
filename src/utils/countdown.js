/**
 * Calculate time remaining from now until target ISO date
 * @param {string|Date} targetDate
 * @returns {{ days: number, hours: number, minutes: number, seconds: number, isOver: boolean, totalMs: number }}
 */
export function calculateTimeRemaining(targetDate) {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = target - now;

  if (isNaN(diff) || diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isOver: true,
      totalMs: 0,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isOver: false,
    totalMs: diff,
  };
}

/**
 * Format numbers with leading zeros (e.g. 5 -> "05")
 * @param {number} num
 * @returns {string}
 */
export function padZero(num) {
  return num < 10 ? `0${num}` : `${num}`;
}
