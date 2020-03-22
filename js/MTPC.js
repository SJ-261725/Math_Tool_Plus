// =======================================================================
// 初始化变量
const outputField = getE("#outputField"); // 数字输出区域，即你的键入区域
const history = getE("#history"); // 保留区域
const showMap = ["^", "÷", "×", "-", "+"]; // 运算符输出的映射表 把非正常的运算符（乘除号不一样）映射成正确运算符
const map = ["**", "/", "*", "-", "+"]; // 运算符映射表 把非正常的运算符（乘除号不一样）映射成正确运算符
const setFixed = getE("#setFixed"); // 设置小数计算精度的位置
const nums = Array.from(document.querySelectorAll(".num")); // 数字按钮
const operators = document.querySelectorAll(".operator"); // 运算符按钮
const calculateBtn = getE("#calculateBtn"); // 等于号
// =======================================================================

// =======================================================================
// 功能定义
let currentOperator, newOne, fixedNum = 5;
// 是否改动精度值
setFixed.addEventListener("input", function() {
	if (!testAllow(this.value)) this.value = '';
	fixedNum = this.value >= 0 && this.value <= 15 ? +this.value : 5;
});
// 绑定回退单击事件
getE("#del").addEventListener("click", () => {
	outputField.value = outputField.value.slice(0, -1); // 将字符串最后一位截取掉
});
// 清空全部
getE("#c").addEventListener("click", () => {
	history.textContent = "";
	outputField.value = "";
});
// 清空输入区
getE("#ce").addEventListener("click", () => outputField.value = "");
// 检查并加上小数点
function checkDot() {
	if (!outputField.value.includes(".")) {
		outputField.value += ".";
	}
}
// 取相反数
getE("#re").addEventListener("click", () => {
	if (outputField.value) {
		outputField.value = -outputField.value;
		newOne = true;
	} else if (history.textContent && !history.textContent.includes(" ")) {
		history.textContent = -history.textContent;
	}
});
// 求倒数
getE("#reciprocal").addEventListener("click", () => {
	if (outputField.value) {
		let temp = testFixed(1 / outputField.value);
		outputField.value = temp;
		newOne = true;
	} else if (history.textContent && !history.textContent.includes(" ")) {
		let temp = testFixed(1 / history.textContent);
		history.textContent = temp;
	}
})
// sin
getE("#sin").addEventListener("click", () => {
	if (outputField.value) {
		let temp = testFixed(Math.sin(outputField.value));
		outputField.value = temp;
		newOne = true;
	} else if (history.textContent && !history.textContent.includes(" ")) {
		let temp = testFixed(Math.sin(history.textContent));
		history.textContent = temp;
	}
})
// cos
getE("#cos").addEventListener("click", () => {
	if (outputField.value) {
		let temp = testFixed(Math.cos(outputField.value));
		outputField.value = temp;
		newOne = true;
	} else if (history.textContent && !history.textContent.includes(" ")) {
		let temp = testFixed(Math.cos(history.textContent));
		history.textContent = temp;
	}
})
// tan
getE("#tan").addEventListener("click", () => {
	if (outputField.value) {
		let temp = testFixed(Math.tan(outputField.value));
		outputField.value = temp;
		newOne = true;
	} else if (history.textContent && !history.textContent.includes(" ")) {
		let temp = testFixed(Math.tan(history.textContent));
		history.textContent = temp;
	}
})
// 阶乘
getE("#factorial").addEventListener("click", () => {
	if (outputField.value) {
		let temp = factorial(+outputField.value);
		outputField.value = temp;
		newOne = true;
	} else if (history.textContent && !history.textContent.includes(" ")) {
		let temp = factorial(+history.textContent);
		history.textContent = temp;
	}
});
// PI
getE("#PI").addEventListener("click", () => {
	if (outputField.value || (!history.textContent.includes(" ") && history.textContent.length > 0)) {
		return;
	}
	outputField.value = testFixed(Math.PI);
});
// 计算一个数的几次幂
function powXY(index) {
	if (outputField.value) {
		let temp = testFixed(outputField.value ** index);
		outputField.value = temp;
		newOne = true;
	} else if (history.textContent && !history.textContent.includes(" ")) {
		let temp = testFixed(history.textContent ** index);
		history.textContent = temp;
	}
}
// 阶乘函数
function factorial(num) {
	num = +num.toFixed(0);
	if (num < 0) return 0;
	if (num > 170) return Infinity;
	let result = 1;
	while (num > 0) {
		result *= num--;
	}
	return result;
}
// 输入数字的函数
function inputNum(str) {
	if (newOne) {
		history.textContent = '';
		outputField.value = '';
		newOne = false;
	}
	outputField.value += str;
}

function operate(i) {
	if (outputField.value && !history.textContent) {
		// 当没有处于计算中时，即当前数就是第一个运算数时
		// 将数移上保留区域 并拼接运算符
		history.textContent = outputField.value + " " + showMap[i];
		newOne = false;
	} else if (!outputField.value && history.textContent) {
		// 当键入区域为空，保留区域有数字和运算符就将运算符更改，只有数字（上次计算的结果输出）就在最后加上运算符
		if (newOne) {
			history.textContent += " " + showMap[i];
			newOne = false;
		} else {
			history.textContent = history.textContent.slice(0, -1) + showMap[i];
		}
	} else if (outputField.value && history.textContent) {
		// 上下都有数字，先判断是否是保留区域有数字和运算符（只有这种情况），是则进行一次运算
		if (history.textContent[history.textContent.length - 2] == " ") {
			calculate();
			history.textContent += " " + showMap[i];
			newOne = false;
		}
	} else {
		// 上下都没有，认定为输入0
		history.textContent = "0 " + showMap[i];
	}
	outputField.value = ""; // 输入区域清空
	currentOperator = i; // 记录当前运算符
}
// 计算的函数
function calculate() {
	// 如果没输入运算符则跳出
	if (currentOperator === undefined) {
		return;
	}
	// 使用temp记录输入区域的数并转为数字，没有则为0
	let temp = outputField.value || 0;
	// 清空输入区域
	outputField.value = '';
	// 使用eval将两个运算数和运算符拼接的结果执行并赋给temp
	temp = eval(+history.textContent.slice(0, -2) + map[currentOperator] + temp) + "";
	// 如果结果中有小数点，执行精确操作
	if (temp.includes(".")) {
		temp = testFixed(temp);
	}
	history.textContent = temp;
	// 将运算符改为undefined
	currentOperator = undefined;
	// 计算结束改为true
	newOne = true;
}

// =======================================================================

// 绑定数字单击事件
nums.forEach((element) => {
	element.addEventListener("click", () => {
		inputNum(element.textContent);
	});
});
// 绑定运算符的单击事件
for (let i = 0; i < operators.length; i++) {
	operators[i].addEventListener("click", function() {
		operate(i);
	});
}
// 计算当前数的平方
getE("#square").addEventListener("click", powXY.bind(this, 2));
// 计算当前数的平方根
getE("#root").addEventListener("click", powXY.bind(this, 0.5));
// 加上小数点
getE("#dot").addEventListener("click", checkDot)
// 计算事件
calculateBtn.addEventListener("click", calculate);
document.addEventListener("keypress", (ev) => {
	if (ev.target.nodeName == "INPUT") return;
	ev.preventDefault();
	let kCode = ev.keyCode;
	if (kCode > 47 && kCode < 58) {
		inputNum(ev.key)
	} else if (kCode > 41 && kCode < 48) {
		if (kCode == 44) return;
		if (kCode == 46) {
			checkDot();
			return;
		}
		operate(map.indexOf(ev.key));
	} else if (kCode == 94) operate(0);
	else if (kCode == 61 || kCode == 13) calculate();
})
document.addEventListener("keydown", (ev) => {
	if (ev.keyCode == 8) {
		ev.preventDefault();
		outputField.value = outputField.value.slice(0, -1); // 将字符串最后一位截取掉}
	}
})
