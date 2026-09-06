const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals=[...document.querySelectorAll('.reveal')];
if(reduced)reveals.forEach(el=>el.classList.add('in'));else{
 const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -7%'});
 reveals.forEach(el=>io.observe(el));
}
const tabs=[...document.querySelectorAll('[data-shot]')];
const shot=document.querySelector('.demo-shot');
tabs.forEach(btn=>btn.addEventListener('click',()=>{
 if(btn.classList.contains('active'))return;
 tabs.forEach(x=>x.classList.remove('active'));btn.classList.add('active');shot.classList.add('switching');
 setTimeout(()=>{shot.src=`assets/${btn.dataset.shot}`;shot.onload=()=>shot.classList.remove('switching')},130);
}));
const canvas=document.getElementById('wave');const ctx=canvas?.getContext('2d');let t=0;
function size(){if(!canvas)return;const d=Math.min(devicePixelRatio||1,2);canvas.width=canvas.clientWidth*d;canvas.height=canvas.clientHeight*d;ctx.setTransform(d,0,0,d,0,0)}
addEventListener('resize',size,{passive:true});size();
function draw(){if(!ctx||!canvas)return;const w=canvas.clientWidth,h=canvas.clientHeight;ctx.clearRect(0,0,w,h);const lines=7;for(let j=0;j<lines;j++){ctx.beginPath();for(let x=0;x<=w;x+=8){const amp=24+j*8;const y=h/2+Math.sin(x*.008+t*.018+j*.7)*amp*Math.sin((x/w)*Math.PI);x?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.strokeStyle=`rgba(${55+j*7},${160+j*11},255,${.08+j*.035})`;ctx.lineWidth=1.1;ctx.stroke()}t++;if(!reduced)requestAnimationFrame(draw)}draw();
if(!reduced){addEventListener('scroll',()=>{const y=scrollY;document.documentElement.style.setProperty('--scroll',y+'px')},{passive:true});}
