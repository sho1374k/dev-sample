import SimpleBar from "simplebar";

function SetSimplebar() {
  const simplebarList = [];
  const simplebarElementList = [...document.querySelectorAll(".js-simplebar")];
  if (simplebarElementList && simplebarElementList.length > 0) {
    simplebarElementList.forEach((ele) => {
      const obj = new SimpleBar(ele);
      simplebarList.push(obj);
    });
  }
}

window.addEventListener("DOMContentLoaded", (e) => {
  SetSimplebar();
});
