/* Case-study page behaviour — same helpers as the main portfolio (smooth scroll, nav, reveal). */
(function(){
"use strict";
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const RESUME_FILENAME="Ritesh_Bumbak_Resume.pdf";

let lenis=null;
if(!reduced&&window.Lenis){
  lenis=new Lenis({duration:1.15,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),smoothWheel:true});
  const raf=t=>{lenis.raf(t);requestAnimationFrame(raf)};requestAnimationFrame(raf);
}

/* resume download */
function downloadResume(){try{const a=document.createElement("a");a.href="assets/"+RESUME_FILENAME;a.download=RESUME_FILENAME;document.body.appendChild(a);a.click();a.remove()}catch(e){console.error(e)}}
["navDownload","mobileDownload"].forEach(id=>{const e=document.getElementById(id);if(e)e.addEventListener("click",downloadResume)});

/* mobile menu */
const navToggle=$("#navToggle"),mobile=$("#mobileMenu");
function closeMobile(){mobile.classList.remove("open");navToggle.setAttribute("aria-expanded","false");navToggle.setAttribute("aria-label","Open menu");if(lenis)lenis.start()}
navToggle.addEventListener("click",()=>{const open=!mobile.classList.contains("open");mobile.classList.toggle("open",open);navToggle.setAttribute("aria-expanded",String(open));navToggle.setAttribute("aria-label",open?"Close menu":"Open menu");if(lenis)open?lenis.stop():lenis.start()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMobile()});

/* in-page anchors (e.g. back to top) */
function goTo(y){if(lenis)lenis.scrollTo(y,{duration:1.4});else scrollTo({top:y,behavior:reduced?"auto":"smooth"})}
const top=$("#backToTop");if(top)top.addEventListener("click",()=>goTo(0));

/* figures open full-size in a new tab (small UI text is hard to read on phones) */
$$(".cs-fig img").forEach(img=>img.addEventListener("click",()=>window.open(img.currentSrc||img.src,"_blank","noopener")));

/* reveal + nav shadow */
if("IntersectionObserver" in window){
  const rio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");rio.unobserve(e.target)}}),{threshold:.08,rootMargin:"0px 0px -40px 0px"});
  $$(".reveal").forEach(el=>rio.observe(el));
}else $$(".reveal").forEach(el=>el.classList.add("in"));
const navWrap=$("#navWrap");
let ticking=false;
function onScroll(){ticking=false;navWrap.classList.toggle("is-scrolled",scrollY>8)}
addEventListener("scroll",()=>{if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});onScroll();
})();
