//객체의 요소중 createdAt의 UTC 시간을 한국시간으로 변환

function getCurrentDateObj(e) {
	e.createdAt = getCurrentDate(e.createdAt);
	return e;
}

export { getCurrentDateObj };
