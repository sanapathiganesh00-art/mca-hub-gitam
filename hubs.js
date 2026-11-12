/* MCA-HUB  -  Placements and LeetCode dashboards
   Data lives in data/placements.js and data/leetcode.js (edit those, not this file). */
(function(){
"use strict";
var $=function(i){return document.getElementById(i)};
var PL=window.PLACEMENTS||{years:[]},LC=window.LEETCODE||{problems:[]},openK=null,py=0;
var lf={t:"All",d:"All",q:""};
function esc(t){return String(t==null?"":t).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function num(v){return(v===undefined||v===null||v==="")?null:Number(v)}
function fmt(v){return v===null?"—":String(Math.round(v*10)/10)}
function lcUrl(u){return /^https?:/.test(u)?u:"https://leetcode.com/problems/"+u+"/"}
function letters(t){return t.split("").map(function(c,i){return'<span class="lt" style="animation-delay:'+(i*55+250)+'ms">'+(c===" "?"&nbsp;":esc(c))+'</span>'}).join("")}
function countNum(el,v,suf,dec){if(!el)return;var t0=performance.now();(function f(){var k=Math.min(1,(performance.now()-t0)/1000),q=1-Math.pow(1-k,3),x=v*q;el.textContent=(dec?x.toFixed(dec):Math.round(x))+(suf||"");if(k<1)requestAnimationFrame(f)})()}
function st(id,l){return'<div class="dc st"><b id="'+id+'">0</b><span>'+l+'</span></div>'}
function ringHTML(id,label){return'<div class="dc ring"><svg viewBox="0 0 80 80" width="84" height="84"><defs><linearGradient id="'+id+'gr"><stop offset="0" style="stop-color:var(--accent)"/><stop offset="1" style="stop-color:var(--accent2)"/></linearGradient></defs><circle cx="40" cy="40" r="34" fill="none" stroke="var(--border)" stroke-width="8"/><circle id="'+id+'rg" cx="40" cy="40" r="34" fill="none" stroke="url(#'+id+'gr)" stroke-width="8" stroke-linecap="round" stroke-dasharray="213.63" stroke-dashoffset="213.63" transform="rotate(-90 40 40)" style="transition:stroke-dashoffset 1.3s cubic-bezier(.2,.8,.2,1)"/></svg><div><b id="'+id+'rp">0%</b><span>'+label+'</span></div></div>'}
function setRing(id,pct){var r=$(id+"rg");if(r)r.style.strokeDashoffset=213.63*(1-pct/100);countNum($(id+"rp"),pct,"%")}
function stagger(box){[].forEach.call(box.querySelectorAll(".dc"),function(c,i){c.style.animationDelay=(i*90+200)+"ms"})}

/* ---------------- home cards (right side of the first page) ---------------- */
function buildHome(){
 var box=$("rp");if(!box)return;
 var y=(PL.years||[])[0],pl=y&&y.total?Math.round(y.placed/y.total*100)+"% placed"+(y.highest!=null?" • "+y.highest+" LPA highest":""):"coming soon";
 var nq=((window.APTITUDE||{}).items||[]).length;
 var cards=[
  {k:"pl",cls:"cpl",g:"GITAM MCA",name:"Placements",line:pl,art:'<div class="pv"><div class="bars"><i style="--h:55%"></i><i style="--h:92%"></i><i style="--h:42%"></i><i style="--h:76%"></i><i style="--h:100%"></i></div></div>'},
  {k:"lc",cls:"clc",g:"Dashboard",name:"LeetCode",line:(LC.problems||[]).length+" important problems",art:'<div class="pv lcv"><b>{ }</b><div class="lns"><i></i><i></i><i></i></div></div>'},
  {k:"qa",cls:"cqa",g:"Formulas",name:"Quantitative Aptitude",line:nq+" formula files",art:'<div class="orbit"><b style="--i:0">π</b><b style="--i:1">∑</b><b style="--i:2">√</b><b style="--i:3">∫</b></div>'}];
 cards.forEach(function(x,i){
  var b=document.createElement("button");b.className="pc "+x.cls;b.dataset.k=x.k;b.style.setProperty("--d",900+i*150);
  var txt='<div><span class="pg">'+x.g+'</span><h3>'+x.name+'</h3><p>'+esc(x.line)+'</p></div>';
  b.innerHTML=(x.k==="qa"?txt+x.art:x.art+txt)+'<span class="arr">↗</span>';
  tilt(b);b.addEventListener("click",function(e){ripple(b,e);burst(e.clientX,e.clientY,14);openHub(x.k,e,b)});box.appendChild(b);
 });
}

/* ---------------- open / close ---------------- */
var META={
 pl:{title:"Placements",tag:"PL",info:"GITAM MCA",label:"Placements",grad:"linear-gradient(135deg,var(--accent3),var(--accent))",id:3},
 lc:{title:"LeetCode",tag:"LC",info:"important problems",label:"LeetCode",grad:"linear-gradient(135deg,var(--accent2),var(--accent))",id:4},
 qa:{title:"Quantitative Aptitude",tag:"QA",info:"formulas",label:"Aptitude",grad:"linear-gradient(135deg,var(--accent),var(--accent3))",id:5}
};
function openHub(k,e,btn){
 var h=$("hub"),m=META[k];
 function show(){
  openK=k;h.dataset.k=k;
  $("hst").innerHTML='<span class="eb">'+m.tag+'</span><h2>'+letters(m.title)+'</h2><span class="em">'+m.info+'</span>';
  h.classList.remove("out","rvl");h.classList.add("on","enter");document.body.classList.add("lock");h.scrollTop=0;
  if(k==="pl")buildPL();else if(k==="lc")buildLC();else buildQA();
 }
 if(btn&&document.body.animate&&!matchMedia("(prefers-reduced-motion:reduce)").matches)cinematic(btn,m.id,show,m.label,m.grad);
 else{show();revealFrom(h,e)}
}
function closeHub(){
 var h=$("hub");if(!h.classList.contains("on")||h.classList.contains("out"))return;
 h.classList.add("out");
 homeAnims.forEach(function(a){a.cancel()});homeAnims=[];
 [".hl",".hr"].forEach(function(q){var el=$("hero").querySelector(q);if(el&&el.animate)el.animate([{transform:"scale(.92)",opacity:.2,filter:"blur(8px)"},{transform:"scale(1)",opacity:1,filter:"blur(0px)"}],{duration:650,easing:"cubic-bezier(.2,.8,.2,1)"})});
 setTimeout(function(){h.classList.remove("on","out","rvl","enter");document.body.classList.remove("lock");openK=null},360);
}
$("hback").onclick=function(e){ripple($("hback"),e);closeHub()};
addEventListener("keydown",function(e){
 if(e.key!=="Escape"||!openK||$("vw").classList.contains("on"))return;
 var a=document.activeElement;if(a&&a.tagName==="INPUT"&&a.value){a.value="";a.dispatchEvent(new Event("input"));return}
 closeHub();
});

/* ---------------- placements ---------------- */
function buildPL(){
 var b=$("hbody"),ys=PL.years||[];
 if(!ys.length){b.innerHTML='<div class="empty">Add the data in data/placements.js</div>';return}
 if(py>=ys.length)py=0;
 var y=ys[py],total=+y.total||0,placed=+y.placed||0,pct=total?Math.round(placed/total*100):0;
 var cmp=y.companies||[],cc=y.companiesCame!=null?+y.companiesCame:cmp.length,sel=y.selected||[],qs=y.questions||[];
 var pk=sel.map(function(s){return num(s.package)}).filter(function(v){return v!==null});
 var hi=num(y.highest),lo=num(y.lowest),av=num(y.average);
 if(hi===null&&pk.length)hi=Math.max.apply(null,pk);
 if(lo===null&&pk.length)lo=Math.min.apply(null,pk);
 if(av===null&&pk.length)av=pk.reduce(function(a,c){return a+c},0)/pk.length;
 var h=(PL.sample?'<div class="smp">Sample layout • real data coming</div>':'');
 if(ys.length>1)h+='<div class="seg" id="yseg" style="margin:0 0 18px"></div>';
 h+='<div class="dash">'+ringHTML("pl","placed")+st("pa","placed of "+total)+st("pc","companies came")+st("ph","highest LPA")+st("pw","lowest LPA")+st("pv","average LPA")+'</div>';
 h+='<div class="pgrid">';
 if(hi!==null&&lo!==null)h+='<div class="rc"><h3>Package range<span class="n">LPA</span></h3><div class="gauge"><i class="gb"></i><span class="gm" id="gl" style="left:0%">'+fmt(lo)+'<small>lowest</small></span><span class="gm" id="ga" style="left:0%">'+fmt(av)+'<small>average</small></span><span class="gm" id="gh" style="left:0%">'+fmt(hi)+'<small>highest</small></span></div></div>';
 var mx=Math.max.apply(null,cmp.map(function(c){return+c.hired||0}).concat([1]));
 h+='<div class="rc"><h3>Companies<span class="n">'+cc+'</span></h3>'+(cmp.length?cmp.map(function(c){return'<div class="cr"><b title="'+esc(c.name)+'">'+esc(c.name)+'</b><span class="bar"><i data-w="'+Math.round((+c.hired||0)/mx*100)+'"></i></span><em>'+esc(c.hired==null?"":c.hired)+'</em></div>'}).join(""):'<div class="empty">Coming soon</div>')+'</div></div>';
 var rounds=["All"].concat(qs.map(function(q){return q.round}).filter(function(v,i,a){return v&&a.indexOf(v)===i})),cos=["All"].concat(qs.map(function(q){return q.company}).filter(function(v,i,a){return v&&a.indexOf(v)===i}));
 h+='<div class="rc" style="margin-bottom:26px"><h3>Questions asked<span class="n" id="qn">'+qs.length+'</span></h3>'+(qs.length?'<div class="qf"><select id="qr">'+rounds.map(function(r){return'<option>'+esc(r)+'</option>'}).join("")+'</select><select id="qco">'+cos.map(function(r){return'<option>'+esc(r)+'</option>'}).join("")+'</select><input id="qs" placeholder="Search" autocomplete="off"></div><div id="ql"></div>':'<div class="empty">Coming soon</div>')+'</div>';
 h+='<h2 class="rt">Selected students</h2><div class="stu" id="stu">'+(sel.length?'':'<div class="empty" style="grid-column:1/-1">Coming soon</div>')+'</div>';
 b.innerHTML=h;
 stagger(b.querySelector(".dash"));
 /* year buttons */
 if(ys.length>1){var sg=$("yseg");ys.forEach(function(yy,i){var bt=document.createElement("button");bt.textContent=yy.label||("Year "+(i+1));if(i===py)bt.className="on";bt.onclick=function(e){ripple(bt,e);py=i;buildPL()};sg.appendChild(bt)})}
 /* animate numbers, ring, gauge, bars */
 setTimeout(function(){
  setRing("pl",pct);countNum($("pa"),placed);countNum($("pc"),cc);
  if(hi!==null)countNum($("ph"),hi,"",hi%1?1:0);if(lo!==null)countNum($("pw"),lo,"",lo%1?1:0);if(av!==null)countNum($("pv"),av,"",1);
  if($("ga")&&hi!==null&&lo!==null){var sp=hi===lo?50:Math.max(0,Math.min(100,((av===null?lo:av)-lo)/(hi-lo)*100));$("gl").style.left="0%";$("gh").style.left="100%";$("ga").style.left=sp+"%"}
  [].forEach.call(b.querySelectorAll(".bar i"),function(i){i.style.width=i.dataset.w+"%"});
 },500);
 /* questions */
 if(qs.length){
  function rq(){
   var r=$("qr").value,c=$("qco").value,t=$("qs").value.trim().toLowerCase(),list=$("ql");
   var f=qs.filter(function(x){return(r==="All"||x.round===r)&&(c==="All"||x.company===c)&&(!t||((x.q||"")+" "+(x.company||"")).toLowerCase().indexOf(t)>-1)});
   $("qn").textContent=f.length;list.innerHTML="";
   if(!f.length){list.innerHTML='<div class="empty">No questions</div>';return}
   f.forEach(function(x,i){var d=document.createElement("div");d.className="qi";d.style.animationDelay=Math.min(i,10)*60+"ms";
    d.innerHTML='<div class="qm"><span class="tg1">'+esc(x.company||"")+'</span><span class="tg2">'+esc(x.round||"")+'</span></div><div>'+esc(x.q)+'</div>'+(x.ans?'<div class="qa">'+esc(x.ans)+'</div><div class="hint">tap for answer</div>':'');
    if(x.ans)d.onclick=function(){d.classList.toggle("open")};list.appendChild(d)});
  }
  $("qr").onchange=rq;$("qco").onchange=rq;$("qs").oninput=rq;rq();
 }
 /* selected students */
 sel.forEach(function(s,i){$("stu").appendChild(stuCard(s,i))});
}
function stuCard(s,i){
 var c=document.createElement("div");c.className="sc";c.style.animationDelay=(i*90+300)+"ms";
 var ini=String(s.name||"?").split(/\s+/).map(function(w){return w.charAt(0)}).slice(0,2).join("").toUpperCase();
 c.innerHTML='<div class="av"><b>'+esc(ini)+'</b>'+(s.photo?'<img alt="" src="'+esc(s.photo)+'">':'')+'</div><h4>'+esc(s.name)+'</h4><p>'+esc(s.company||"")+(s.role?" • "+esc(s.role):"")+'</p>'+(s.package!=null&&s.package!==""?'<span class="pk">'+esc(s.package)+' LPA</span>':'')+((s.phone||s.email)?'<button class="rvb">Show contact</button>':'');
 var im=c.querySelector("img");if(im)im.onerror=function(){im.remove()};
 tilt(c);
 var rv=c.querySelector(".rvb");
 if(rv)rv.onclick=function(e){
  ripple(rv,e);var old=c.querySelector(".ct");
  if(old){old.remove();rv.textContent="Show contact";return}
  var d=document.createElement("div");d.className="ct";
  d.innerHTML=(s.phone?'<a href="tel:'+esc(String(s.phone).replace(/[^\d+]/g,""))+'">'+esc(s.phone)+'</a>':'')+(s.email?'<a href="mailto:'+esc(s.email)+'">'+esc(s.email)+'</a>':'')+(s.phone?'<button class="rvb cpy">Copy number</button>':'');
  c.appendChild(d);rv.textContent="Hide contact";
  var cp=d.querySelector(".cpy");if(cp)cp.onclick=function(e2){ripple(cp,e2);try{navigator.clipboard.writeText(String(s.phone))}catch(x){}burst(e2.clientX,e2.clientY,10);toast("Number copied","📋")};
 };
 return c;
}

/* ---------------- leetcode ---------------- */
var LCP=[];
function buildLC(){
 var b=$("hbody");
 LCP=(LC.problems||[]).map(function(p){return{t:p.t,f:lcUrl(p.u),d:p.d||"Medium",topic:p.topic||"General"}});
 if(!LCP.length){b.innerHTML='<div class="empty">Add problems in data/leetcode.js</div>';return}
 lf={t:"All",d:"All",q:""};
 var cnt={Easy:0,Medium:0,Hard:0};LCP.forEach(function(p){if(cnt[p.d]!==undefined)cnt[p.d]++});
 b.innerHTML=(LC.sample?'<div class="smp">Starter list • add your own in data/leetcode.js</div>':'')
  +'<div class="dash">'+ringHTML("lc","solved")+st("l1","problems")+st("l2","easy")+st("l3","medium")+st("l4","hard")+'<div class="dc srch"><span>🔍</span><input id="lq" placeholder="Search" autocomplete="off"><button id="lqx" aria-label="Clear">×</button></div></div>'
  +'<div class="dist" style="margin:-6px 0 22px"><i style="background:#22c55e" data-w="'+cnt.Easy/LCP.length*100+'"></i><i style="background:#f59e0b" data-w="'+cnt.Medium/LCP.length*100+'"></i><i style="background:#ef4444" data-w="'+cnt.Hard/LCP.length*100+'"></i></div>'
  +'<div class="lcf" id="lft"></div><div class="lcf" id="lfd"></div><div class="rc"><h3>Problems<span class="n" id="ln">0</span></h3><div id="ll"></div></div>';
 stagger(b.querySelector(".dash"));
 var topics=["All"].concat(LCP.map(function(p){return p.topic}).filter(function(v,i,a){return a.indexOf(v)===i}));
 function chips(box,arr,key){box.innerHTML="";arr.forEach(function(v){var bt=document.createElement("button");bt.textContent=v;if(lf[key]===v)bt.className="on";bt.onclick=function(e){ripple(bt,e);lf[key]=v;chips(box,arr,key);renderLC()};box.appendChild(bt)})}
 chips($("lft"),topics,"t");chips($("lfd"),["All","Easy","Medium","Hard"],"d");
 $("lq").oninput=function(){lf.q=this.value.trim().toLowerCase();renderLC()};
 $("lqx").onclick=function(){$("lq").value="";lf.q="";renderLC();$("lq").focus()};
 setTimeout(function(){countNum($("l1"),LCP.length);countNum($("l2"),cnt.Easy);countNum($("l3"),cnt.Medium);countNum($("l4"),cnt.Hard);updLcRing();[].forEach.call(b.querySelectorAll(".dist i"),function(i){i.style.width=i.dataset.w+"%"})},500);
 renderLC();
}
function updLcRing(){var d=LCP.filter(isDone).length;setRing("lc",LCP.length?Math.round(d/LCP.length*100):0)}
function renderLC(){
 var f=LCP.filter(function(p){return(lf.t==="All"||p.topic===lf.t)&&(lf.d==="All"||p.d===lf.d)&&(!lf.q||(p.t+" "+p.topic).toLowerCase().indexOf(lf.q)>-1)});
 $("ln").textContent=f.length;var box=$("ll");box.innerHTML="";
 if(!f.length){box.innerHTML='<div class="empty">No problems</div>';return}
 var l=document.createElement("div");l.className="list";
 f.forEach(function(p,n){
  var d=document.createElement("div");d.className="item"+(isDone(p)?" done":"");d.style.animationDelay=Math.min(n,12)*45+"ms";
  d.innerHTML='<div class="it"><b>'+esc(p.t)+'</b><small><span class="df '+p.d.charAt(0).toLowerCase()+'">'+esc(p.d)+'</span>'+esc(p.topic)+'</small></div><div class="ia"><button class="dn" title="Mark as done" aria-label="Mark as done"><svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></button><a class="opn" href="'+esc(p.f)+'" target="_blank" rel="noopener">Open ↗</a></div>';
  var dn=d.querySelector(".dn"),op=d.querySelector(".opn");
  dn.onclick=function(e){ripple(dn,e);var on=!isDone(p);if(on)DONE[p.f]=1;else delete DONE[p.f];saveDone();d.classList.toggle("done",on);if(on){burst(e.clientX,e.clientY,14);if(LCP.every(isDone)){burst(innerWidth/2,innerHeight/3,80);toast("All problems done","🏆")}}updLcRing()};
  op.addEventListener("click",function(e){ripple(op,e);burst(e.clientX,e.clientY,10)});
  l.appendChild(d);
 });
 box.appendChild(l);
}


/* ---------------- quantitative aptitude ---------------- */
var QA=window.APTITUDE||{items:[],topics:[]};
var FORM=["(a+b)² = a²+2ab+b²","a²−b² = (a+b)(a−b)","n(n+1)/2","Sn = n/2 [2a+(n−1)d]","P(E) = n(E)/n(S)","nCr = n!/[r!(n−r)!]","nPr = n!/(n−r)!","SI = PRT/100","A = P(1+R/100)ⁿ","sin²θ + cos²θ = 1","1 + tan²θ = sec²θ","HCF × LCM = a × b","a²+b² = c²","πr²","2πr","1/3 πr²h","4/3 πr³","2xy/(x+y)","d = s × t","x% = x/100","√(s(s−a)(s−b)(s−c))","∑","∫","π","√","∞","Δ","θ","a³+b³ = (a+b)(a²−ab+b²)","Tn = a + (n−1)d"];
var CUBE={v:[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]],e:[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]]};
var OCT={v:[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],e:[[0,2],[0,3],[0,4],[0,5],[1,2],[1,3],[1,4],[1,5],[2,4],[2,5],[3,4],[3,5]]};
var TET={v:[[1,1,1],[-1,-1,1],[-1,1,-1],[1,-1,-1]],e:[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]]};
var FF={run:false,ps:[],sh:[],mx:0,my:0,W:0,H:0,d:1,col:["#8b8bff","#2de0cd","#ff6ec4"],last:0};
function ffColors(){var cs=getComputedStyle(document.documentElement);FF.col=[cs.getPropertyValue("--accent").trim()||"#8b8bff",cs.getPropertyValue("--accent2").trim()||"#2de0cd",cs.getPropertyValue("--accent3").trim()||"#ff6ec4"]}
function ffSize(){var cv=$("hc");FF.d=Math.min(devicePixelRatio||1,1.5);FF.W=innerWidth;FF.H=innerHeight;cv.width=FF.W*FF.d;cv.height=FF.H*FF.d}
function newP(far){return{x:(Math.random()-.5)*28,y:(Math.random()-.5)*16,z:far?24+Math.random()*4:2+Math.random()*22,vz:-(.35+Math.random()*.8),ph:Math.random()*6.28,rv:.4+Math.random()*.9,rz:(Math.random()-.5)*.5,t:FORM[Math.floor(Math.random()*FORM.length)],c:Math.floor(Math.random()*3),s:.55+Math.random()*.75}}
function ffFrame(t){
 if(!FF.run||openK!=="qa"||!$("hub").classList.contains("on")){FF.run=false;return}
 requestAnimationFrame(ffFrame);
 var c=$("hc").getContext("2d"),W=FF.W,H=FF.H,d=FF.d,f=Math.min(W,H)*.95,dt=Math.min(.05,(t-FF.last)/1000||0),ts=t/1000,camx=FF.mx*5,camy=FF.my*3;
 FF.last=t;c.setTransform(d,0,0,d,0,0);c.clearRect(0,0,W,H);
 c.lineWidth=1.4;
 FF.sh.forEach(function(s){
  var a=ts*.35+s.x,b=ts*.22+s.y,ca=Math.cos(a),sa=Math.sin(a),cb=Math.cos(b),sb=Math.sin(b);
  var pts=s.g.v.map(function(v){var x1=v[0]*ca+v[2]*sa,z1=-v[0]*sa+v[2]*ca,y1=v[1]*cb-z1*sb,z2=v[1]*sb+z1*cb,wz=s.z+z2*s.s;return[W/2+(s.x+x1*s.s-camx)*f/wz,H/2+(s.y+y1*s.s-camy)*f/wz]});
  c.strokeStyle=FF.col[s.c];c.globalAlpha=.34;c.beginPath();s.g.e.forEach(function(e){c.moveTo(pts[e[0]][0],pts[e[0]][1]);c.lineTo(pts[e[1]][0],pts[e[1]][1])});c.stroke();
 });
 FF.ps.forEach(function(p){p.z+=p.vz*dt;if(p.z<1.6)Object.assign(p,newP(true))});
 FF.ps.sort(function(a,b){return b.z-a.z});
 c.textAlign="center";c.textBaseline="middle";
 FF.ps.forEach(function(p){
  var sx=W/2+(p.x-camx)*f/p.z,sy=H/2+(p.y-camy)*f/p.z,px=p.s*f/p.z*.9;
  if(px<5||sx<-300||sx>W+300||sy<-100||sy>H+100)return;
  var al=Math.min(1,(p.z-1.6)/3.5)*Math.min(1,(27-p.z)/7)*.9;
  c.save();c.translate(sx,sy);c.rotate(p.rz);c.scale(Math.cos(Math.sin(ts*p.rv+p.ph)*1.05),1);
  c.globalAlpha=Math.max(0,al);c.font="italic 600 "+px+"px Georgia,'Times New Roman',serif";
  c.shadowColor=FF.col[p.c];c.shadowBlur=14;c.fillStyle=FF.col[p.c];c.fillText(p.t,0,0);c.restore();
 });
 c.globalAlpha=1;
}
function ffStart(){
 if(FF.run)return;ffColors();ffSize();
 if(!FF.ps.length){for(var i=0;i<42;i++)FF.ps.push(newP(false));FF.sh=[{g:CUBE,x:-9,y:3,z:14,s:1.6,c:1},{g:OCT,x:9,y:-3,z:12,s:2,c:0},{g:TET,x:-6,y:-5,z:9,s:1.4,c:2},{g:OCT,x:7,y:5,z:18,s:2.2,c:2},{g:CUBE,x:1,y:-7,z:20,s:2,c:0}]}
 FF.run=true;FF.last=performance.now();requestAnimationFrame(ffFrame);
}
addEventListener("resize",function(){if(FF.run)ffSize()});
addEventListener("pointermove",function(e){FF.mx=e.clientX/innerWidth-.5;FF.my=e.clientY/innerHeight-.5});

/* formula storm: formulas rush toward you, then the file opens */
function storm(x,y,done){
 if(!document.body.animate||matchMedia("(prefers-reduced-motion:reduce)").matches){done();return}
 var cv=document.createElement("canvas"),d=Math.min(devicePixelRatio||1,1.5),W=innerWidth,H=innerHeight,i;
 cv.width=W*d;cv.height=H*d;cv.style.cssText="position:fixed;inset:0;width:100%;height:100%;z-index:68;pointer-events:none";document.body.appendChild(cv);
 ffColors();var cols=FF.col,c=cv.getContext("2d"),f=Math.min(W,H)*.95,ps=[];
 for(i=0;i<90;i++)ps.push({x:(Math.random()-.5)*15,y:(Math.random()-.5)*10,z0:14+Math.random()*26,sp:.85+Math.random()*.5,t:FORM[Math.floor(Math.random()*FORM.length)],c:i%3,s:.55+Math.random()*.8,rz:(Math.random()-.5)*1.1,ry:Math.random()*6.28});
 var t0=performance.now(),fired=false;
 (function fr(){
  var t=(performance.now()-t0)/1000;
  c.setTransform(d,0,0,d,0,0);c.clearRect(0,0,W,H);
  var g=c.createRadialGradient(x,y,0,x,y,Math.max(W,H)*.7);g.addColorStop(0,"rgba(139,139,255,"+(.3*Math.max(0,1-t*1.1))+")");g.addColorStop(1,"rgba(139,139,255,0)");c.fillStyle=g;c.fillRect(0,0,W,H);
  c.textAlign="center";c.textBaseline="middle";
  ps.forEach(function(p){
   var z=p.z0*(1-t*p.sp);if(z<.7)return;
   var sx=x+p.x*f/z,sy=y+p.y*f/z,px=p.s*f/z*.8,al=Math.min(1,t*5)*Math.min(1,(z-.7)/3);
   c.save();c.translate(sx,sy);c.rotate(p.rz*(1-z/p.z0));c.scale(Math.cos(p.ry+t*3),1);
   c.globalAlpha=Math.max(0,al)*.95;c.font="italic 700 "+px+"px Georgia,'Times New Roman',serif";c.shadowColor=cols[p.c];c.shadowBlur=16;c.fillStyle=cols[p.c];c.fillText(p.t,0,0);c.restore();
  });
  if(!fired&&t>.62){fired=true;done()}
  if(t<1.25)requestAnimationFrame(fr);
  else{cv.style.transition="opacity .5s";cv.style.opacity="0";setTimeout(function(){cv.remove()},600)}
 })();
}

function buildQA(){
 var b=$("hbody"),items=QA.items||[];
 b.innerHTML='<div class="tpc" id="tpc"></div><div class="qgrid" id="qg"></div>';
 (QA.topics||[]).forEach(function(t,i){var sp=document.createElement("span");sp.textContent=t;sp.style.animationDelay=(i*35+300)+"ms";$("tpc").appendChild(sp)});
 if(!items.length){$("qg").innerHTML='<div class="empty">Add files in data/aptitude.js</div>'}
 items.forEach(function(it,i){
  var c=document.createElement("div");c.className="qc";c.style.animationDelay=(i*110+250)+"ms";
  c.innerHTML='<div class="th">'+(it.img?'<img alt="" src="'+esc(it.img)+'">':'')+'</div><div class="qb"><div><h4>'+esc(it.t)+'</h4><small>'+esc(it.m||"")+'</small></div><div class="ia"><button class="vbt"><span class="bl">View</span></button><a class="dbt" href="'+esc(it.f)+'" download><span class="bl">Download</span><i class="pr"></i></a></div></div>';
  var im=c.querySelector("img");if(im)im.onerror=function(){im.remove()};
  tilt(c);
  var v=c.querySelector(".vbt"),a=c.querySelector(".dbt");
  v.onclick=function(e){ripple(v,e);v.classList.add("busy");v.firstChild.textContent="Opening";storm(e.clientX,e.clientY,function(){openV({t:it.t,f:it.f,m:it.m||""},e);v.classList.remove("busy");v.firstChild.textContent="View"})};
  a.addEventListener("click",function(e){ripple(a,e);burst(e.clientX,e.clientY,18);a.classList.remove("ok");a.classList.add("dl");a.firstChild.textContent="Downloading…";toast("Downloading <b>"+esc(it.t)+"</b>","⬇️");
   setTimeout(function(){a.classList.remove("dl");a.classList.add("ok");a.firstChild.textContent="✓ Saved"},1600);
   setTimeout(function(){a.classList.remove("ok");a.firstChild.textContent="Download"},3400)});
  $("qg").appendChild(c);
 });
 ffStart();
}

buildHome();
})();
