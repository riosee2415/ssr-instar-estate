export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const areaCalculation = (x, no) => {
  const data = (parseInt(x) * 3.3058).toFixed(no >= 0 ? no : 2);

  return data && data != "NaN" ? data : 0;
};

export const areaCalculation2 = (x) => {
  const data = Math.round(x * 0.3025);

  return data && data != "NaN" ? data : 0;
};
