export const convertMillisecondsToTimestamp = (duration: number): string => {
  let seconds = Math.floor(duration / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  let hours = Math.floor(minutes / 60);
  minutes = minutes % 60;

  // Formatting the time into 'mm:ss' or 'hh:mm:ss'
  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  } else {
    return `${pad(minutes)}:${pad(seconds)}`;
  }

  // Helper function to pad numbers with a leading zero if they are less than 10
  function pad(number: number) {
    return number < 10 ? '0' + number : number;
  }
};

export const convertTimestampToMilliseconds = (timestamp: string): number => {
  const parts = timestamp.split(':').map(part => parseInt(part, 10));
  let hours = 0,
    minutes = 0,
    seconds = 0;

  if (parts.length === 3) {
    // Timestamp is in 'hh:mm:ss' format
    [hours, minutes, seconds] = parts;
  } else if (parts.length === 2) {
    // Timestamp is in 'mm:ss' format
    [minutes, seconds] = parts;
  } else {
    throw new Error('Invalid timestamp format');
  }

  return (hours * 3600 + minutes * 60 + seconds) * 1000;
};

export function createTimestampsArray(duration: number) {
  const timestamps = [];
  for (let ms = 0; ms < duration; ms += 1000) {
    timestamps.push(convertMillisecondsToTimestamp(ms));
  }
  return timestamps;
}
