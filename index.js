const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const track = document.querySelector(".track");

let current = 0;
let autoSlide;

function moveSlider(index){
 slides.forEach((slide,i)=>{
 slide.classList.remove("active");
 dots[i].classList.remove("active");
 });

 slides[index].classList.add("active");
 dots[index].classList.add("active");

 const slideWidth = slides[0].offsetWidth + 40;
 track.style.transform =
 `translateX(${-(index * slideWidth) + slideWidth}px)`;

 current = index;
}

// AUTO SLIDE
function startAuto(){
 autoSlide = setInterval(()=>{
 let next = (current + 1) % slides.length;
 moveSlider(next);
 },3000);
}


dots.forEach(dot=>{
 dot.addEventListener("click", function(){
 clearInterval(autoSlide);
 const index = parseInt(this.dataset.index);
 moveSlider(index);
 startAuto();
 });
});

moveSlider(0);
startAuto();

