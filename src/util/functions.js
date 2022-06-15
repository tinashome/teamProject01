export const makeCurrentYYMMDD = () => {
	const date = new Date();
	const sYear = date.getFullYear();
	let sMonth = date.getMonth() + 1;
	let sDate = date.getDate();

	sMonth = sMonth > 9 ? sMonth : "0" + sMonth;
	sDate = sDate > 9 ? sDate : "0" + sDate;

	const YYMMDD = String(sYear).slice(2) + sMonth + sDate;
	return YYMMDD;
};