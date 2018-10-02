function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}


/* ==================================== Validate Form ================================== */

// export function validateSystolic(value) {
//  let systolicErr;
//  let condition = (value >= 40 && value <= 100);

//   if (value === "") {
//      systolicErr = "Enter a number";
//     return systolicErr;
//   }
//   if (isNaN(parseFloat(value))) {
//      systolicErr = "Enter a valid Number";
//      return systolicErr;
//   }
 
//   if (!condition) {
//      systolicErr = "Numbers should be between 40 and 100";
//      return systolicErr;
//   }
// }

export default {
  formatNumber,
  formatTime
}
