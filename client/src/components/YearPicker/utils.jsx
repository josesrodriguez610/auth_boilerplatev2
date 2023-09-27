export const rangeYears = () => {
  const years = [];
  let startYear = 2022;
  const thisYear = new Date().getFullYear();

  while (startYear <= thisYear) {
    years.push(startYear++);
  }

  return years;
};

export const rangeMonths = () => {
  const months = [
    "All",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthsAndIndex = months.map((month, i) => ({
    name: month,
    id: i,
  }));

  return monthsAndIndex;
};
