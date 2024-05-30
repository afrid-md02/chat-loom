export function calculateDate(dayId) {
  const dateString = dayId;
  const date = new Date(dateString);
  const options = { month: "long", day: "2-digit", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate;
}

export function calculateToday() {
  const date = new Date();
  const options = { month: "long", day: "2-digit", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate;
}

export function calculateYesterday() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const options = { month: "long", day: "2-digit", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    yesterday,
  );
  return formattedDate;
}

export function calculateTime(messageCreatedAt) {
  const dateString = messageCreatedAt;
  const date = new Date(dateString);
  const options = {
    timeZone: "Asia/Kolkata",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  };
  const time = date.toLocaleString("en-IN", options);
  return time;
}

export function calculateDateForId(date){
  const datePart = date.split("T")[0];
  return datePart;
}
