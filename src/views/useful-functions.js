// 문자열+숫자로 이루어진 랜덤 5글자 반환
export const randomId = () => {
	return Math.random().toString(36).substring(2, 7);
};

// 이메일 형식인지 확인 (true 혹은 false 반환)
export const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

// 숫자에 쉼표를 추가함. (10000 -> 10,000)
export const addCommas = (n) => {
	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 13,000원, 2개 등의 문자열에서 쉼표, 글자 등 제외 후 숫자만 뺴냄
// 예시: 13,000원 -> 13000, 20,000개 -> 20000
export const convertToNumber = (string) => {
	return parseInt(string.replace(/(,|개|원)/g, ""));
};

// ms만큼 기다리게 함.
export const wait = (ms) => {
	return new Promise((r) => setTimeout(r, ms));
};

//UTC 시간을 한국시간으로 변환, 포맷 : YYYY-MM-DD
export const getCurrentDate = (date) => {
	var currentDate = new Date(date);

	var year = currentDate.getFullYear();
	var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
	var day = ("0" + currentDate.getDate()).slice(-2);

	var dateString = year + "-" + month + "-" + day;
  
  console.log(date," / ",currentDate," / ",dateString)
  

	return dateString;
};
