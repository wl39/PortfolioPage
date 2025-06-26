export const dateOptions = {
  weekday: 'short', // 요일 (Wed)
  year: 'numeric', // 연도 (2025)
  month: 'short', // 월 (Jan)
  day: '2-digit', // 일 (22)
  hour: '2-digit', // 시간 (22)
  minute: '2-digit', // 분 (07)
  hour12: false, // 24시간 형식
};

export const toUSFormatDate = (date) => {
  return (
    date
      .toLocaleString('en-US', {
        month: 'long', // December
        day: 'numeric', // 23
        year: 'numeric', // 2024
        hour: 'numeric', // 10
        minute: '2-digit', // 45
        hour12: true, // PM
      })
      // .replace(',', '') // 'December 23 2024, 10:45 PM' → 'December 23 2024 10:45 PM'
      .replace(' ', ', ')
  ); // 'December 23, 2024 at 10:45 PM'
  // .replace(' ', ' at ')
};

export const formatToISO = (date) => {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(date).reduce((acc, part) => {
    if (part.type !== 'literal') acc[part.type] = part.value;
    return acc;
  }, {});

  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`;
};

export const monthDayYear = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const isSimpleValidDate = (dateString) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}$/.test(dateString);
};
