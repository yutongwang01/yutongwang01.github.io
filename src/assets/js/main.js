document.documentElement.classList.add("js");
const toggle=document.querySelector(".nav-toggle");
const navigation=document.querySelector(".primary-nav");
if(toggle&&navigation){
  const setMenuState=open=>{toggle.setAttribute("aria-expanded",String(open));navigation.classList.toggle("is-open",open);toggle.querySelector(".nav-toggle__label").textContent=open?"Close":"Menu"};
  toggle.addEventListener("click",()=>setMenuState(toggle.getAttribute("aria-expanded")!=="true"));
  navigation.addEventListener("click",event=>{if(event.target.closest("a"))setMenuState(false)});
  document.addEventListener("keydown",event=>{if(event.key==="Escape")setMenuState(false)});
}
