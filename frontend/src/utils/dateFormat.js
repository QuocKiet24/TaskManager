import moment from "moment";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const formatTime = (createdAt) => {
  const now = moment();
  const created = moment(createdAt);

  // if the task was created today
  if (created.isSame(now, "day")) {
    return "Today";
  }

  // if the task was created yesterday
  if (created.isSame(now.subtract(1, "days"), "day")) {
    return "Yesterday";
  }

  // check if created with the last 7 days
  if (created.isAfter(moment().subtract(6, "days"))) {
    return created.fromNow();
  }

  // if item was created within the last 4 weeks (up to 1 month ago)
  if (created.isAfter(moment().subtract(3, "weeks"), "week")) {
    return created.fromNow();
  }

  return created.format("DD/MM/YYYY");
};
