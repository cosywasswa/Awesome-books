import { DateTime } from './luxon/luxon.js';

export const showDateTime = () => {
  const Container = document.getElementById('datetime');
  const now = DateTime.now().toUTC();

  // Format the date and time as desired
  const format = now.toLocaleString(DateTime.DATETIME_FULL);

  // Display the formatted date and time in the container element
  Container.textContent = format;
};

export const updatingDateTime = () => {
  // Update the date and time every second
  setInterval(showDateTime, 1000);
};
