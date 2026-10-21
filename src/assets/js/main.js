document.documentElement.classList.add("js");
const toggle=document.querySelector(".nav-toggle");
const navigation=document.querySelector(".primary-nav");
if(toggle&&navigation){
  const setMenuState=open=>{toggle.setAttribute("aria-expanded",String(open));navigation.classList.toggle("is-open",open);toggle.querySelector(".nav-toggle__label").textContent=open?"Close":"Menu"};
  toggle.addEventListener("click",()=>setMenuState(toggle.getAttribute("aria-expanded")!=="true"));
  navigation.addEventListener("click",event=>{if(event.target.closest("a"))setMenuState(false)});
  document.addEventListener("keydown",event=>{if(event.key==="Escape")setMenuState(false)});
}

document.querySelectorAll("[data-travel-dialog]").forEach(trigger=>{
  const dialog=document.getElementById(trigger.dataset.travelDialog);
  if(!dialog)return;
  const closeButton=dialog.querySelector("[data-travel-close]");
  trigger.addEventListener("click",()=>{
    if(typeof dialog.showModal==="function")dialog.showModal();
    else dialog.setAttribute("open","");
  });
  closeButton?.addEventListener("click",()=>dialog.close());
  dialog.addEventListener("click",event=>{
    if(event.target===dialog)dialog.close();
  });
  dialog.addEventListener("close",()=>trigger.focus());
});
