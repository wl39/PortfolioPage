export const dateOptions = {
  weekday: "short", // 요일 (Wed)
  year: "numeric", // 연도 (2025)
  month: "short", // 월 (Jan)
  day: "2-digit", // 일 (22)
  hour: "2-digit", // 시간 (22)
  minute: "2-digit", // 분 (07)
  hour12: false, // 24시간 형식
};

export const formatToISO = (date) => {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date).reduce((acc, part) => {
    if (part.type !== "literal") acc[part.type] = part.value;
    return acc;
  }, {});

  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`;
};
