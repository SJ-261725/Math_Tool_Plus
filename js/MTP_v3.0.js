const tools = document.querySelectorAll("iframe");
const btns = document.querySelectorAll(".btn");
const close = document.querySelector(".close");
const toolName = ['MTPC_v2.8', 'MTPE_v2.1', 'MTPP_v0.8'];
let currentIframeIdx;
for (let i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", function() {
		tools[i].src = "./module/" + toolName[i] + ".html";
		tools[i].style.visibility = "visible";
		this.classList.add("hide");
		tools[i].parentElement.classList.add("max");
		close.classList.remove("hide");
		currentIframeIdx = i;
	})
}
close.addEventListener("click", function() {
	tools[currentIframeIdx].src = "";
	tools[currentIframeIdx].style.visibility = null;
	this.classList.add("hide");
	tools[currentIframeIdx].parentElement.classList.remove("max");
	btns[currentIframeIdx].classList.remove("hide");
});
