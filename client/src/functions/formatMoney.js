import PropTypes from "prop-types";

// function formatMoney(number, decPlaces, decSep, thouSep) {
//   (decPlaces = isNaN((decPlaces = Math.abs(decPlaces))) ? 2 : decPlaces),
//     (decSep = typeof decSep === "undefined" ? "." : decSep);
//   thouSep = typeof thouSep === "undefined" ? "," : thouSep;
//   var sign = number < 0 ? "-" : "";
//   var i = String(
//     parseInt((number = Math.abs(Number(number) || 0).toFixed(decPlaces)))
//   );
//   var j = (j = i.length) > 3 ? j % 3 : 0;

//   return (
//     sign +
//     (j ? i.substr(0, j) + thouSep : "") +
//     i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
//     (decPlaces
//       ? decSep +
//         Math.abs(number - i)
//           .toFixed(decPlaces)
//           .slice(2)
//       : "")
//   );
// }

function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
}

formatMoney.propTypes = {
  number: PropTypes.any,
  decPlaces: PropTypes.any,
  decSep: PropTypes.any,
  thouSep: PropTypes.any,
};

export default formatMoney;
