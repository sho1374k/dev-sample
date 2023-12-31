/**
 * @param {number} w // window.innerWidth
 * @param {number} h // window.innerHeight
 */
export function SetPropertySize(w, h) {
  const vw = w * 0.01,
    vh = h * 0.01,
    longer = w > h ? w : h,
    shorter = w > h ? h : w;

  document.documentElement.style.setProperty("--vw", vw + "px"); // width: calc(var(--vw, 1vw) * 100);
  document.documentElement.style.setProperty("--vh", vh + "px"); // height: calc(var(--vh, 1vh) * 100);
  document.documentElement.style.setProperty("--longer", longer + "px");
  document.documentElement.style.setProperty("--shorter", shorter + "px");
}
