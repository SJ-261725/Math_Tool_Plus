// =======================================================================
// 初始化变量
const modes = document.querySelectorAll("li");
const area = getE("#cArea");
const setFixed = getE("#setFixed"); // 设置小数计算精度的位置
const typeMap = ["一元一次方程", "一元二次方程", "二元一次方程"];
const htmlMap = [
	[
		`<input type="text"> X = <input type="text">`,
		`<input type="text"> X + <input type="text"> = <input type="text">`,
		`<input type="text"> X + <input type="text"> = <input type="text"> X + <input type="text">`,
		`<div id="smaller"><input type="text">(<input type="text">X+<input type="text">)+<input type="text">X+<input type="text"> = 
	<br>
	<input type="text">(<input type="text">X+<input type="text">)+<input type="text">X+<input type="text"></div>`,
	],
	[
		`<input type="text"> X<sup>2</sup> + <input type="text"> X + <input type="text"> = 0`,
		``,
		``,
		``
	],
	[
		``,
		``,
		``,
		``
	]
];
let modeMap = [
	[],
	[],
	[],
	[]
];
// =======================================================================

// =======================================================================
// 功能定义
let currentType = 0;
currentMode = 2, // 当前模式
	lastS = modes[currentMode], // 上一个选中的
	fixedNum = 5, // 精度位
	hasPressed = false; // 禁止连按

// 设置当前类型标题输出
getE("#type").textContent = typeMap[currentType];
// 设置选中样式
modes[currentMode].classList.add("selected");
// 是否改动精度值
setFixed.addEventListener("input", function() {
	fixedNum = this.value >= 0 && this.value <= 15 ? +this.value : 5;
});
// 切换类型的事件
getE(".changeType").addEventListener("click", () => {
	currentType++;
	currentType %= 3;
	init();
	getE("#type").textContent = typeMap[currentType];
})
// 切换模式的事件
modes.forEach((mode) => {
	mode.addEventListener("click", function() {
		lastS.classList.remove("selected")
		this.classList.add("selected");
		lastS = this;
		currentMode = Array.prototype.indexOf.call(modes, this);
		init();
	})
});
// 初始化，清空区域
function init() {
	area.children[1].innerHTML = "";
	area.children[0].innerHTML = htmlMap[currentType][currentMode];
}
// 渲染美化格式并输出
function render(sentences) {
	sentences = sentences.map(e => `<div>${e}</div>`);
	area.children[1].innerHTML = sentences.reduce((a, c) => a + c);
}
// =======================================================================

// =======================================================================
// 解方程函数
modeMap[0][0] = function() {
	const inputs = area.querySelectorAll("input");
	let outputSentences = [];
	let temp = testFixed(inputs[1].value / inputs[0].value);
	outputSentences.push(`化系数为1 : X = ${temp}`);
	outputSentences.push(`解得 : X = ${temp}`);
	return outputSentences;
}

modeMap[0][1] = function() {
	const inputs = area.querySelectorAll("input");
	let outputSentences = [];
	let temp = testFixed(inputs[2].value - inputs[1].value);
	outputSentences.push(`移项 : ${inputs[0].value} X = ${temp}`);
	temp = testFixed(temp / inputs[0].value);
	outputSentences.push(`化系数为1 : X = ${temp}`);
	outputSentences.push(`解得 : X = ${temp}`);
	return outputSentences;
}
modeMap[0][2] = function() {
	const inputs = area.querySelectorAll("input");
	let outputSentences = [];
	let temp1 = testFixed(inputs[0].value - inputs[2].value);
	let temp2 = testFixed(inputs[3].value - inputs[1].value);
	outputSentences.push(`移项 : ${temp1} X = ${temp2}`);
	let temp = testFixed(temp2 / temp1);
	outputSentences.push(`化系数为1 : X = ${temp}`);
	outputSentences.push(`解得 : X = ${temp}`);
	return outputSentences;
}
modeMap[0][3] = function() {
	const inputs = area.querySelectorAll("input");
	let outputSentences = [];
	let temp1 = testFixed(inputs[0].value * inputs[1].value);
	let temp2 = testFixed(inputs[0].value * inputs[2].value);
	let temp3 = testFixed(inputs[5].value * inputs[6].value);
	let temp4 = testFixed(inputs[5].value * inputs[7].value);
	outputSentences.push(
		`去分母 : ${temp1} X + ${temp2} + ${inputs[3].value} X + ${inputs[4].value} = 
	${temp3} X + ${temp4} + ${inputs[8].value} X + ${inputs[9].value}`
	);
	temp1 += testFixed(inputs[3].value);
	temp2 += testFixed(inputs[4].value);
	temp3 += testFixed(inputs[8].value);
	temp4 += testFixed(inputs[9].value);
	outputSentences.push(`合并同类项 : ${temp1} X + ${temp2} = ${temp3} X + ${temp4}`);
	temp1 -= testFixed(temp3);
	temp2 -= testFixed(temp4);
	outputSentences.push(`移项 : ${temp1} X = ${temp2}`);
	let temp = testFixed(temp2 / temp1);
	outputSentences.push(`化系数为1 : X = ${temp}`);
	outputSentences.push(`解得 : X = ${temp}`);
	return outputSentences;
}
modeMap[1][0] = function() {
	const inputs = area.querySelectorAll("input");
	let outputSentences = [];
	let derta = testFixed(inputs[1].value ** 2 - 4 * inputs[0].value * inputs[2].value);
	outputSentences.push(`计算判别式 : Δ = ${derta}`);
	if (derta < 0) {
		outputSentences.push(`Δ < 0 : 方程无实数根`);
		return outputSentences;
	}
	let temp1 = testFixed((-inputs[1].value + derta ** 0.5) / 2 * inputs[0].value);
	let temp2 = testFixed((-inputs[1].value - derta ** 0.5) / 2 * inputs[0].value);
	outputSentences.push(`公式计算 : X<sub>1</sub> = ${temp1} , X<sub>2</sub> = ${temp2}`);
	return outputSentences;
}
// =======================================================================

// 初始化...
init();
// 按下回车开始解方程
document.addEventListener("keypress", (ev) => {
	switch (ev.keyCode) {
		case 13:
			calc(ev);
			ev.preventDefault();
			break;
		case 32:
			toAnother(ev.target);
			ev.preventDefault();
			break;
	}
});

function toAnother(target) {
	if (target.nodeName == "INPUT") {
		let next = target;
		if (next.nextElementSibling == null) {
			next = next.parentElement.firstElementChild;
		} else {
			next = target.nextElementSibling;
			if (next.nodeName != "INPUT") {
				next = next.nextElementSibling;
			}
		}
		next.focus();
	}
}

function calc() {
	if (hasPressed) {
		return;
	}
	hasPressed = true;
	// 拿到main元素
	let main = getE("main");
	// 动画设置
	main.style.transition = "transform .5s";
	main.style.transform = "translate(-50%, -50%) scale(1.05)";
	// 动画完毕会返回resolve，以进行异步操作
	function ifEnded() {
		return new Promise(resolve => {
			// main.addEventListener("transitionend",() => resolve()); // 部分浏览器不兼容，就很烦
			setTimeout(() => resolve(),500);
		});
	}
	// 异步函数
	async function cartoon() {
		let yes = true; // 默认通过
		await ifEnded();
		main.style.transform = "translate(-50%, -50%) scale(1.05) rotate(8deg)";
		// 如果有一个输入框为空则退出，并使用红色提醒
		if (Array.from(area.querySelectorAll("input")).some(input => !testAllow(input.value))) {
			document.body.style.backgroundColor = "darkred";
			yes = false;
		} else {
			document.body.style.backgroundColor = "darkgreen";
		}
		await ifEnded();
		main.style.transform = "translate(-50%, -50%) scale(1.05)";
		document.body.style.backgroundColor = "#483d8b";
		await ifEnded();
		main.style.transform = null; //动画结束
		// 如果并没有为空的则，进行解方程和渲染
		yes && render(modeMap[currentType][currentMode]());
		hasPressed = false;
	}
	cartoon()
}
