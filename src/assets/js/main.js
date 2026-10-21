document.documentElement.classList.add("js");
const toggle=document.querySelector(".nav-toggle");
const navigation=document.querySelector(".primary-nav");
if(toggle&&navigation){
  const setMenuState=open=>{toggle.setAttribute("aria-expanded",String(open));navigation.classList.toggle("is-open",open);toggle.querySelector(".nav-toggle__label").textContent=open?"Close":"Menu"};
  toggle.addEventListener("click",()=>setMenuState(toggle.getAttribute("aria-expanded")!=="true"));
  navigation.addEventListener("click",event=>{if(event.target.closest("a"))setMenuState(false)});
  document.addEventListener("keydown",event=>{if(event.key==="Escape")setMenuState(false)});
}

const prepareTravelDialog=dialog=>{
  if(!dialog||dialog.dataset.ready==="true")return;
  dialog.dataset.ready="true";
  const closeButton=dialog.querySelector("[data-travel-close]");
  closeButton?.addEventListener("click",()=>dialog.close());
  dialog.addEventListener("click",event=>{
    if(event.target===dialog)dialog.close();
  });
  dialog.addEventListener("close",()=>dialog.returnFocus?.focus());
};

const showTravelDialog=(dialog,trigger)=>{
  if(!dialog)return;
  prepareTravelDialog(dialog);
  dialog.returnFocus=trigger;
  if(typeof dialog.showModal==="function")dialog.showModal();
  else dialog.setAttribute("open","");
};

document.querySelectorAll("[data-travel-dialog]").forEach(trigger=>{
  const dialog=document.getElementById(trigger.dataset.travelDialog);
  trigger.addEventListener("click",()=>showTravelDialog(dialog,trigger));
});

const travelMapElement=document.querySelector("[data-travel-map]");
if(travelMapElement&&window.L){
  const yosemite=[37.8651,-119.5383];
  const map=L.map(travelMapElement,{zoomControl:true,minZoom:1,maxZoom:18,worldCopyJump:true}).fitWorld({padding:[24,24]});
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{
    maxZoom:19,
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  const marker=L.circleMarker(yosemite,{
    radius:8,
    color:"#f5f1e8",
    weight:4,
    fillColor:"#0b4f82",
    fillOpacity:1
  }).addTo(map).bindTooltip("Yosemite",{permanent:true,direction:"right",offset:[10,0],className:"travel-map__tooltip"});
  const markerElement=marker.getElement();
  markerElement.setAttribute("role","button");
  markerElement.setAttribute("tabindex","0");
  markerElement.setAttribute("aria-label","Open the Yosemite National Park photo album");
  const album=document.getElementById(travelMapElement.dataset.album);
  const openAlbum=()=>showTravelDialog(album,markerElement);
  marker.on("click",openAlbum);
  markerElement.addEventListener("keydown",event=>{
    if(event.key==="Enter"||event.key===" "){
      event.preventDefault();
      openAlbum();
    }
  });
  travelMapElement.classList.add("is-ready");
}
