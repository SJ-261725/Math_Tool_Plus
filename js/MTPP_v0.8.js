// =======================================================================
// 初始化变量
const basic = getE("#basic").getContext("2d");
const paintField = getE("#paintField").getContext("2d");
const LENGTH = 760;
basic.canvas.width = LENGTH;
basic.canvas.height = LENGTH;
basic.canvas.style.border = "2px solid #000";
paintField.canvas.width = LENGTH;
paintField.canvas.height = LENGTH;
let cols = 20; // 行和列的数目(除去xOy)
let unitLength = LENGTH / cols;
let point = (cols / 2) * (unitLength); // 原点坐标
// =======================================================================

// =======================================================================
// 帮助函数
function getE(str) {
	return document.querySelector(str)
};

function testFixed(num) {
	if ((num + "").includes(".")) {
		num = (+num).toFixed(fixedNum);
	}
	return +num;
}
function testAllow(str){
	let reg = /^-?[0-9]*\.?[0-9]+$/
	return reg.test(str)
}
// =======================================================================

// =======================================================================
// 功能定义
basic.lineWidth = "2";
paintField.lineWidth = "2";
// 绘制坐标系
function xOy() {
	// 绘制坐标轴以外的线
	for (let i = 0; i < cols + 1; i++) {
		if (i == cols / 2) {
			continue;
		}
		basic.strokeStyle = "#999";
		basic.moveTo(0, i * unitLength);
		basic.lineTo(LENGTH, i * unitLength);
		basic.moveTo(i * unitLength, 0);
		basic.lineTo(i * unitLength, LENGTH);
	}
	basic.stroke();
	// 绘制坐标轴
	basic.beginPath();
	basic.strokeStyle = "#000";
	// 绘制原点
	basic.moveTo(point, point)
	basic.arc(point, point, 3, 0, 180 * Math.PI);
	basic.fill();
	// 绘制坐标轴的线条
	basic.moveTo(0, point);
	basic.lineTo(LENGTH, point);
	basic.moveTo(point, 0);
	basic.lineTo(point, LENGTH);
	// 绘制箭头
	// 向上箭头
	basic.moveTo(point, 0);
	basic.lineTo(point - 0.5 * unitLength, 0 + 0.5 * unitLength)
	basic.moveTo(point, 0);
	basic.lineTo(point + 0.5 * unitLength, 0 + 0.5 * unitLength)
	// 向右箭头
	basic.moveTo(LENGTH, point);
	basic.lineTo(LENGTH - 0.5 * unitLength, point - 0.5 * unitLength);
	basic.moveTo(LENGTH, point);
	basic.lineTo(LENGTH - 0.5 * unitLength, point + 0.5 * unitLength);
	basic.stroke();
	// x y的字体
	basic.font = "14px monocase";
	basic.fillText("x", LENGTH - 30, point + 30)
	basic.fillText("y", point - 30, 30);
}

function proportionalFunc(num) {
	paintField.clearRect(0,0,LENGTH,LENGTH);
	paintField.beginPath();
	paintField.moveTo(point, point);
	let x = cols / 2 * unitLength;
	paintField.lineTo(point + x, point - x * num);
	paintField.moveTo(point, point);
	paintField.lineTo(point - x, point + x * num);
	paintField.stroke();
}
// =======================================================================

xOy();
getE("#btn").addEventListener("click", () => {
	testAllow(getE("#proportional").value)?proportionalFunc(getE("#proportional").value):alert("输入值不合法");
})
