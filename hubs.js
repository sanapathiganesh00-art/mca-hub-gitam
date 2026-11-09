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

/* ---------------- home cards ---------------- */
function buildHome(){
 var box=$("hubs");if(!box)return;
 var y=(PL.years||[])[0],pl=y&&y.total?Math.round(y.placed/y.total*100)+"% placed"+(y.highest!=null?" • "+y.highest+" LPA highest":""):"coming soon";
 [{k:"pl",tag:"PL",icon:"🎯",name:"Placements",line:pl},{k:"lc",tag:"LC",icon:"💻",name:"LeetCode",line:(LC.problems||[]).length+" problems"}].forEach(function(x){
  var b=document.createElement("button");b.className="ex hubc";b.dataset.k=x.k;
  b.innerHTML='<span class="eb">'+x.tag+'</span><div><h3>'+x.icon+" "+x.name+'</h3><div class="em">'+esc(x.line)+'</div></div><span class="arr">→</span>';
  tilt(b);b.addEventListener("click",function(e){ripple(b,e);burst(e.clientX,e.clientY,14);openHub(x.k,e,b)});box.appendChild(b);
 });
}

/* ---------------- open / close ---------------- */
function openHub(k,e,btn){
 var h=$("hub"),title=k==="pl"?"Placements":"LeetCode";
 function show(){
  openK=k;h.dataset.k=k;
  $("hst").innerHTML='<span class="eb">'+(k==="pl"?"PL":"LC")+'</span><h2>'+letters(title)+'</h2><span class="em">'+(k==="pl"?"previous year":"important problems")+'</span>';
  h.classList.remove("out","rvl");h.classList.add("on","enter");document.body.classList.add("lock");h.scrollTop=0;
  if(k==="pl")buildPL();else buildLC();
 }
 var grad=k==="pl"?"linear-gradient(135deg,var(--accent3),var(--accent))":"linear-gradient(135deg,var(--accent2),var(--accent))";
 if(btn&&document.body.animate&&!matchMedia("(prefers-reduced-motion:reduce)").matches)cinematic(btn,k==="pl"?3:4,show,title,grad);
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
buildHome();
})();
