const getSingleCharacter = text => {
  let letter = text?.charAt(0).toUpperCase();
  return letter;
};

function hasOneMonthPassed(createdDate) {
  // Convert the createdDate to a Date object
  const startDate = new Date(createdDate);

  // Get the current date
  const currentDate = new Date();

  // Set currentDate's time to midnight to accurately calculate the difference
  currentDate.setUTCHours(0, 0, 0, 0);

  // Set startDate's time to midnight to accurately calculate the difference
  startDate.setUTCHours(0, 0, 0, 0);

  // Calculate the difference in milliseconds between the current date and the created date
  const differenceInMilliseconds = currentDate - startDate;

  // Convert milliseconds to days
  const millisecondsInOneDay = 24 * 60 * 60 * 1000;

  // Assuming 30 days in a month for simplicity
  const millisecondsInOneMonth = 30 * millisecondsInOneDay;

  // Check if one month has passed
  return differenceInMilliseconds >= millisecondsInOneMonth;
}

export {getSingleCharacter, hasOneMonthPassed};
