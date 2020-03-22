const change = getE("#changeWay");
change.style.float = "left";
const tools = getAE("iframe");
const btns = getAE(".btn");
const close = getE(".close");
const toolName = ['MTPC_v3.0', 'MTPE_v3.0', 'MTPP_v2.0'];
let currentIframeIdx, aLoad;
if (localStorage.getItem("wayChanged")) changeWay();
for (let i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", function () {
		const src = "./module/" + toolName[i] + ".html";
		if (aLoad) {
			let click = document.createEvent("MouseEvent");
			click.initEvent("click", true, true);
			getE("a").href = src;
			getE("a").dispatchEvent(click);
			return;
		}
		tools[i].src = src;
		tools[i].style.visibility = "visible";
		this.classList.add("hide");
		tools[i].parentElement.classList.add("max");
		close.classList.remove("hide");
		currentIframeIdx = i;
	})
}
close.addEventListener("click", function () {
	tools[currentIframeIdx].src = "";
	tools[currentIframeIdx].style.visibility = null;
	this.classList.add("hide");
	tools[currentIframeIdx].parentElement.classList.remove("max");
	btns[currentIframeIdx].classList.remove("hide");
});
getE("#btnBox").addEventListener("click", changeWay);

function changeWay() {
	const toBe = {
		left: "right",
		right: "left"
	};
	const bg = {
		left: "darkred",
		right: "seagreen"
	}
	const key = {
		left: "",
		right: "1"
	}
	change.style.float = toBe[change.style.float];
	change.parentElement.style.backgroundColor = bg[change.style.float];
	aLoad = !aLoad;
	localStorage.setItem("wayChanged", key[change.style.float]);
}