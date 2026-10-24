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
      name:"Stockholm", coordinates:[59.3293,18.0686], albumId:"stockholm-album",
      ariaLabel:"Open the Stockholm and Sweden July 2014 photo album"
    },
    {
      name:"Copenhagen", coordinates:[55.6761,12.5683], albumId:"copenhagen-album",
      ariaLabel:"Open the Copenhagen July 2014 photo album"
    },
    {
      name:"Brussels", coordinates:[50.8503,4.3517], albumId:"brussels-album",
      ariaLabel:"Open the Brussels July 2014 photo album"
    },
    {
      name:"Wattens", coordinates:[47.2931,11.6008], albumId:"wattens-album",
      ariaLabel:"Open the Wattens Swarovski Crystal Worlds July 2014 photo album"
    },
    {
      name:"Innsbruck", coordinates:[47.2686,11.3933], albumId:"innsbruck-album",
      ariaLabel:"Open the Innsbruck Golden Roof July 2014 photo album"
    },
    {
      name:"Dujiangyan", coordinates:[31.0049,103.6193], albumId:"dujiangyan-album",
      ariaLabel:"Open the Dujiangyan June 2023 photo album"
    },
    {
      name:"Dali", coordinates:[25.6065,100.2676], albumId:"dali-album",
      ariaLabel:"Open the Dali April 2023 photo album"
    },
    {
      name:"Xi'an", coordinates:[34.2658,108.9541], albumId:"xian-album",
      ariaLabel:"Open the Xi'an November 2023 photo album"
    },
    {
      name:"Tokyo", coordinates:[35.6762,139.6503], albumId:"tokyo-album",
      ariaLabel:"Open the Tokyo August 2017 photo album"
    },
    {
      name:"Mount Fuji", coordinates:[35.4308,138.8006], albumId:"mount-fuji-album",
      ariaLabel:"Open the Mount Fuji and surroundings August 2017 photo album"
    },
    {
      name:"Kyoto", coordinates:[35.0116,135.7681], albumId:"kyoto-album",
      ariaLabel:"Open the Kyoto August 2017 photo album"
    },
    {
      name:"Osaka", coordinates:[34.6937,135.5023], albumId:"osaka-album",
      ariaLabel:"Open the Osaka August 2017 photo album"
    },
    {
      name:"Nara", coordinates:[34.6851,135.8048], albumId:"nara-album",
      ariaLabel:"Open the Nara August 2017 photo album"
    },
    {
      name:"Shanghai",
      coordinates:[31.2304,121.4737],
      albumId:"shanghai-album",
      ariaLabel:"Open the Shanghai July 2019 photo album"
    },
    {
      name:"Suzhou",
      coordinates:[31.3243,120.6294],
      albumId:"suzhou-album",
      ariaLabel:"Open the Suzhou Humble Administrator's Garden July 2019 photo album"
    },
    {
      name:"Hangzhou",
      coordinates:[30.2741,120.1551],
      albumId:"hangzhou-album",
      ariaLabel:"Open the Hangzhou July 2019 photo album"
    },
    {
      name:"Xiamen",
      coordinates:[24.4798,118.0894],
      albumId:"xiamen-album",
      ariaLabel:"Open the Xiamen July 2019 photo album"
    },
    {
      name:"Venice",
      coordinates:[45.4408,12.3155],
      albumId:"venice-album",
      ariaLabel:"Open the Venice July 2014 photo album"
    },
    {
      name:"Vatican City",
      coordinates:[41.9029,12.4534],
      albumId:"vatican-album",
      ariaLabel:"Open the Vatican City July 2014 photo album"
    },
    {
      name:"Los Angeles",
      coordinates:[34.0522,-118.2437],
      albumId:"los-angeles-album",
      ariaLabel:"Open the Los Angeles December 2025 photo album"
    },
    {
      name:"Santa Barbara",
      coordinates:[34.414,-119.8489],
      albumId:"santa-barbara-album",
      ariaLabel:"Open the Santa Barbara and UCSB everyday photo album"
    },
    {
      name:"Yosemite",
      coordinates:[37.8651,-119.5383],
      albumId:"yosemite-album",
      ariaLabel:"Open the Yosemite National Park photo album"
    },
    {
      name:"Seattle",
      coordinates:[47.6062,-122.3321],
      albumId:"seattle-album",
      ariaLabel:"Open the Seattle World Cup trip photo album"
    },
    {
      name:"San Diego",
      coordinates:[32.7157,-117.1611],
      albumId:"san-diego-album",
      ariaLabel:"Open the San Diego, California photo album"
    },
    {
      name:"Leshan",
      coordinates:[29.5521,103.7656],
      albumId:"leshan-album",
      ariaLabel:"Open the Leshan, Sichuan photo album"
    },
    {
      name:"Anshun",
      coordinates:[26.2531,105.9476],
      albumId:"anshun-album",
      ariaLabel:"Open the Anshun, Guizhou photo album"
    },
    {
      name:"Guiyang",
      coordinates:[26.647,106.6302],
      albumId:"guiyang-album",
      ariaLabel:"Open the Guiyang and Guizhou photo album"
    },
    {
      name:"Zhaotong",
      coordinates:[27.337,103.717],
      albumId:"zhaotong-album",
      ariaLabel:"Open the Zhaotong, Yunnan photo album"
    },
    {
      name:"Beijing",
      coordinates:[39.9042,116.4074],
      albumId:"beijing-album",
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
    }).addTo(map);
    const markerElement=marker.getElement();
    markerElement.setAttribute("role","button");
    markerElement.setAttribute("tabindex","0");
    markerElement.setAttribute("aria-label",place.ariaLabel);
    const album=document.getElementById(place.albumId);
    const openAlbum=()=>showTravelDialog(album,markerElement);
    marker.on("click",openAlbum);
    markerElement.addEventListener("keydown",event=>{
      if(event.key==="Enter"||event.key===" "){
        event.preventDefault();
        openAlbum();
      }
    });
  });
  travelMapElement.classList.add("is-ready");
}
