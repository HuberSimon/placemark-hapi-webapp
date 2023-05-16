export function greeting () {
  const now = new Date();
  const hour = now.getHours();

  let greet;
  if (hour < 6) {
    greet = "Good night";
  } else if (hour < 12) {
    greet = "Good morning";
  } else if (hour < 18) {
    greet = "Good afternoon";
  } else {
    greet = "Good evening";
  }

  const message = `${greet}!`;

  return message;
};
