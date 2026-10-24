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
  const places=[
    {
      name:"Suzhou",
      coordinates:[31.3243,120.6294],
      albumId:"suzhou-album",
      tooltipDirection:"right",
      tooltipOffset:[10,32],
      ariaLabel:"Open the Suzhou Humble Administrator's Garden July 2019 photo album"
    },
    {
      name:"Hangzhou",
      coordinates:[30.2741,120.1551],
      albumId:"hangzhou-album",
      tooltipDirection:"right",
      tooltipOffset:[10,-4],
      ariaLabel:"Open the Hangzhou July 2019 photo album"
    },
    {
      name:"Xiamen",
      coordinates:[24.4798,118.0894],
      albumId:"xiamen-album",
      tooltipDirection:"bottom",
      tooltipOffset:[0,26],
      ariaLabel:"Open the Xiamen July 2019 photo album"
    },
    {
      name:"Venice",
      coordinates:[45.4408,12.3155],
      albumId:"venice-album",
      tooltipDirection:"top",
      tooltipOffset:[0,-10],
      ariaLabel:"Open the Venice July 2014 photo album"
    },
    {
      name:"Vatican City",
      coordinates:[41.9029,12.4534],
      albumId:"vatican-album",
      tooltipDirection:"bottom",
      tooltipOffset:[0,10],
      ariaLabel:"Open the Vatican City July 2014 photo album"
    },
    {
      name:"Los Angeles",
      coordinates:[34.0522,-118.2437],
      albumId:"los-angeles-album",
      tooltipDirection:"right",
      tooltipOffset:[10,46],
      ariaLabel:"Open the Los Angeles December 2025 photo album"
    },
    {
      name:"Santa Barbara",
      coordinates:[34.414,-119.8489],
      albumId:"santa-barbara-album",
      tooltipDirection:"right",
      tooltipOffset:[10,18],
      ariaLabel:"Open the Santa Barbara and UCSB everyday photo album"
    },
    {
      name:"Yosemite",
      coordinates:[37.8651,-119.5383],
      albumId:"yosemite-album",
      tooltipDirection:"right",
      tooltipOffset:[10,0],
      ariaLabel:"Open the Yosemite National Park photo album"
    },
    {
      name:"Seattle",
      coordinates:[47.6062,-122.3321],
      albumId:"seattle-album",
      tooltipDirection:"left",
      tooltipOffset:[-10,0],
      ariaLabel:"Open the Seattle World Cup trip photo album"
    },
    {
      name:"San Diego",
      coordinates:[32.7157,-117.1611],
      albumId:"san-diego-album",
      tooltipDirection:"left",
      tooltipOffset:[-10,12],
      ariaLabel:"Open the San Diego, California photo album"
    },
    {
      name:"Leshan",
      coordinates:[29.5521,103.7656],
      albumId:"leshan-album",
      tooltipDirection:"left",
      tooltipOffset:[-10,0],
      ariaLabel:"Open the Leshan, Sichuan photo album"
    },
    {
      name:"Anshun",
      coordinates:[26.2531,105.9476],
      albumId:"anshun-album",
      tooltipDirection:"right",
      tooltipOffset:[10,0],
      ariaLabel:"Open the Anshun, Guizhou photo album"
    },
    {
      name:"Guiyang",
      coordinates:[26.647,106.6302],
      albumId:"guiyang-album",
      tooltipDirection:"top",
      tooltipOffset:[0,-10],
      ariaLabel:"Open the Guiyang and Guizhou photo album"
    },
    {
      name:"Zhaotong",
      coordinates:[27.337,103.717],
      albumId:"zhaotong-album",
      tooltipDirection:"bottom",
      tooltipOffset:[0,10],
      ariaLabel:"Open the Zhaotong, Yunnan photo album"
    },
    {
      name:"Beijing",
      coordinates:[39.9042,116.4074],
      albumId:"beijing-album",
      tooltipDirection:"right",
      tooltipOffset:[10,-2],
      ariaLabel:"Open the Beijing photo album"
    }
  ];
  const worldBounds=L.latLngBounds([[-85.0511,-180],[85.0511,180]]);
  const worldWidth=Math.max(window.innerWidth,256);
  const initialZoom=Math.max(1,Math.min(4,Math.round(Math.log2(worldWidth/256))));
  const initialCenter=window.innerWidth<720?[30,-8]:[20,0];
  const map=L.map(travelMapElement,{
    zoomControl:true,
    minZoom:1,
    maxZoom:18,
    maxBounds:worldBounds,
    maxBoundsViscosity:1
  }).setView(initialCenter,initialZoom);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{
    maxZoom:19,
    noWrap:true,
    bounds:worldBounds,
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  places.forEach(place=>{
    const marker=L.circleMarker(place.coordinates,{
      radius:8,
      color:"#f5f1e8",
      weight:4,
      fillColor:"#0b4f82",
      fillOpacity:1
    }).addTo(map).bindTooltip(place.name,{
      permanent:true,
      interactive:true,
      direction:place.tooltipDirection,
      offset:place.tooltipOffset,
      className:"travel-map__tooltip"
    });
    const markerElement=marker.getElement();
    markerElement.setAttribute("role","button");
    markerElement.setAttribute("tabindex","0");
    markerElement.setAttribute("aria-label",place.ariaLabel);
    const album=document.getElementById(place.albumId);
    const openAlbum=()=>showTravelDialog(album,markerElement);
    marker.on("click",openAlbum);
    marker.getTooltip().getElement()?.addEventListener("click",openAlbum);
    markerElement.addEventListener("keydown",event=>{
      if(event.key==="Enter"||event.key===" "){
        event.preventDefault();
        openAlbum();
      }
    });
  });
  travelMapElement.classList.add("is-ready");
}
