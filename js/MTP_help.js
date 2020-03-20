// =======================================================================
// 帮助函数
function getE(str) {
	return document.querySelector(str)
};

function getAE(str) {
	return document.querySelectorAll(str);
}

function testFixed(num) {
	if ((num + "").includes(".")) {
		num = (+num).toFixed(fixedNum);
	}
	return +num;
}

function testAllow(str) {
	let reg = /^-?[0-9]*\.?[0-9]+$/;
	return reg.test(str);
}
