(function(){
"use strict";
/* ---------- data: 10 themes x 5 original tracks ---------- */
var BARS=32;
var SC={minor:[0,2,3,5,7,8,10],major:[0,2,4,5,7,9,11],dorian:[0,2,3,5,7,9,10]};
var PROGS={minor:[[0,5,2,6],[0,3,4,3],[0,6,5,6],[5,3,0,4],[0,4,5,3]],major:[[0,4,5,3],[0,5,3,4],[0,3,4,3],[0,2,3,4],[5,3,0,4]],dorian:[[0,3,0,4],[0,6,3,0],[0,4,3,6]]};
var DR={
  driving:{k:[0,4,8,12],s:[4,12],h:[2,6,10,14],hv:.5},
  boom:{k:[0,7,10],s:[4,12],h:[0,2,4,6,8,10,12,14],hv:.35},
  lofi:{k:[0,7,10],s:[4,12],h:[0,2,4,6,8,10,12,14],hv:.28},
  minimal:{k:[0,8],s:[],h:[4,12,14],hv:.3},
  none:{k:[0],s:[],h:[],hv:0},
  folk:{k:[0,8],s:[12],h:[4,10],hv:.3},
  funk:{k:[0,3,6,10],s:[4,12],h:[0,2,4,6,8,10,12,14],hv:.4}
};
var THEMES=[
  {id:"drive",name:"Ночная трасса",bpm:[100,118],scale:"minor",drum:"driving",bass:[0,2,4,6,8,10,12,14],bassLen:1.6,bassWave:"sawtooth",bassLp:520,padWave:"sawtooth",padVol:.035,padLp:1400,leadWave:"sawtooth",lead:[0,2,4,6,8,10,12,14],leadLen:1.5,leadVol:.05,leadLp:2600,mel:false,fb:.35,wet:.3,swing:0,
   verses:["Фары режут темноту, как нож","Мы летим, и город позади","Стрелка спидометра дрожит","Радио ловит далёкий свет","Асфальт блестит после дождя","Жёлтая линия ведёт вперёд","Не оглядывайся, ночь длинна","Горизонт горит, как неон","Мотор поёт в такт сердцу","Мы никуда не опоздаем"],chorus:"Жми на газ, пока горит рассвет",
   titles:["Неоновое шоссе","Полночный тоннель","Янтарный горизонт","Последний поворот","Ночной экспресс"]},
  {id:"rain",name:"Дождь за окном",bpm:[70,84],scale:"dorian",drum:"lofi",bass:[0,6,10],bassLen:3,bassWave:"triangle",bassLp:420,padWave:"triangle",padVol:.05,padLp:1100,leadWave:"triangle",lead:[0,3,8,11,14],leadLen:3,leadVol:.06,leadLp:1700,mel:true,fb:.4,wet:.28,swing:.14,
   verses:["Капли стучат по стеклу в такт","Чай остыл, а я не спешу","Серый город дышит тише","Пластинка шуршит на старом столе","Окно запотело, рисую круги","Где-то далеко гудит трамвай","Плед, и свет лампы, и ты","Дождь смывает лишние слова","Мысли тонут в мягком шуме","Сегодня можно никуда не идти"],chorus:"Пусть льёт, нам тепло внутри",
   titles:["Капли на стекле","Тёплый плед","Серый вторник","Чай и дождь","Запотевшее окно"]},
  {id:"sunrise",name:"Рассвет",bpm:[84,98],scale:"major",drum:"boom",bass:[0,8],bassLen:5,bassWave:"triangle",bassLp:500,padWave:"triangle",padVol:.05,padLp:1800,leadWave:"sine",lead:[0,4,8,12],leadLen:3,leadVol:.08,leadLp:3200,mel:false,fb:.4,wet:.35,swing:0,
   verses:["Первый луч касается крыш","Туман уходит с реки","Новый день пахнет хлебом","Птицы настраивают небо","Золото льётся на холмы","Просыпайся, мир уже готов","Тихо, как перед первым шагом","Свет входит без стука","Каждая тень становится короче","Всё начинается с одного вдоха"],chorus:"Вставай, солнце ждёт тебя",
   titles:["Первый луч","Утренний туман","Золотые крыши","Новый день","Свет входит"]},
  {id:"focus",name:"Фокус",bpm:[108,122],scale:"minor",drum:"minimal",bass:[0,2,4,6,8,10,12,14],bassLen:1.4,bassWave:"square",bassLp:380,padWave:"sine",padVol:.06,padLp:1000,leadWave:"square",lead:[0,2,4,6,8,10,12,14],leadLen:1,leadVol:.03,leadLp:1300,mel:false,fb:.3,wet:.2,swing:0,
   verses:["Один шаг, потом ещё один","Тишина работает на меня","Шум отступает за дверь","Мысли выстраиваются в ряд","Пульс ровный, взгляд острый","Задача ясна, путь прямой","Только цель и ритм","Время течёт сквозь пальцы","Каждая секунда на счету","Вдох, выдох и вперёд"],chorus:"Держи ритм, не сбивайся",
   titles:["Глубокая работа","Ровный пульс","Тихий режим","Прямая линия","Один шаг"]},
  {id:"ocean",name:"Океан",bpm:[76,90],scale:"major",drum:"none",bass:[0],bassLen:15,bassWave:"sine",bassLp:300,padWave:"sine",padVol:.07,padLp:1500,leadWave:"sine",lead:[0,6,12],leadLen:4,leadVol:.07,leadLp:2400,mel:true,fb:.5,wet:.4,swing:0,
   verses:["Волна приходит и уходит","Соль на губах, песок в ладонях","Чайки пишут в небе строки","Горизонт тянется вечно","Лодка качается как колыбель","Глубина хранит тишину","Ветер приносит запах юга","Пена тает у ног","Мы плывём туда, где нет карт","Закат плавит воду в золото"],chorus:"Океан дышит вместе с нами",
   titles:["Солёный ветер","Дрейф","Пена и песок","Глубина","Закатная волна"]},
  {id:"city",name:"Город",bpm:[86,96],scale:"minor",drum:"boom",bass:[0,3,6,10,13],bassLen:2.2,bassWave:"sawtooth",bassLp:360,padWave:"triangle",padVol:.04,padLp:1200,leadWave:"triangle",lead:[2,6,10,14],leadLen:2,leadVol:.07,leadLp:2200,mel:true,fb:.35,wet:.25,swing:.06,
   verses:["Перекрёсток мигает жёлтым","Витрины дышат неоном","Шаги по мокрому бетону","Метро выносит толпу на свет","Крыши считают звёзды","Каждый прохожий — своя история","Ритм улиц не знает сна","Лифт летит на сороковой","Такси растворяется в огнях","Город не спит, и мы с ним"],chorus:"Это наш город, наш бит",
   titles:["Мокрый бетон","Сороковой этаж","Последнее такси","Ритм улиц","Метро в полночь"]},
  {id:"space",name:"Космос",bpm:[72,86],scale:"dorian",drum:"none",bass:[0],bassLen:15,bassWave:"sine",bassLp:260,padWave:"sawtooth",padVol:.03,padLp:900,leadWave:"sine",lead:[0,2,4,6,8,10,12,14],leadLen:3,leadVol:.05,leadLp:3000,mel:false,fb:.6,wet:.5,swing:0,
   verses:["Тишина между звёзд","Корабль скользит сквозь пыль","Планеты кружатся, как пластинки","Свет далёких солнц идёт к нам","Невесомость держит мысли","Орбита, круг, возвращение","Туманность дышит фиолетом","Сигнал приходит из ниоткуда","Мы маленькие, и это красиво","Пустота звучит как музыка"],chorus:"Лети, пока хватает света",
   titles:["Орбита","Туманность","Невесомость","Сигнал","Дальний свет"]},
  {id:"forest",name:"Лес",bpm:[88,104],scale:"major",drum:"folk",bass:[0,8],bassLen:5,bassWave:"triangle",bassLp:450,padWave:"triangle",padVol:.035,padLp:1500,leadWave:"triangle",lead:[0,3,6,8,11,14],leadLen:2.5,leadVol:.075,leadLp:2800,mel:true,fb:.3,wet:.28,swing:.05,
   verses:["Мох мягкий, как старый плед","Сосны шепчут про зиму","Ручей несёт свои секреты","Тропа теряется в тумане","Костёр трещит в такт гитаре","Шишки падают в тишину","Лисица смотрит из-за ствола","Запах хвои и дымка","Ветви держат небо","Здесь не нужно спешить"],chorus:"Лес поёт, если слушать",
   titles:["Мох и хвоя","Тропа в тумане","Костёр","Лисья тропа","Ручей"]},
  {id:"retro",name:"Ретро",bpm:[110,122],scale:"major",drum:"funk",bass:[0,3,6,10,12],bassLen:1.8,bassWave:"sawtooth",bassLp:600,padWave:"square",padVol:.02,padLp:1600,leadWave:"square",lead:[2,6,10,14],leadLen:1.2,leadVol:.045,leadLp:2400,mel:false,fb:.25,wet:.2,swing:0,
   verses:["Диско-шар крутит звёзды","Кассета перемотана до конца","Золотые семидесятые зовут","Бас качает пол в клубе","Блёстки на ботинках","Танцуй, пока играет лента","Лампы мигают в ритм","Старый магнитофон не врёт","Плёнка шипит, и это любовь","Все выходят на танцпол"],chorus:"Включай свет, мы танцуем",
   titles:["Диско-шар","Перемотка","Магнитофон","Золотые 70-е","Танцпол"]},
  {id:"fire",name:"Огонь",bpm:[124,138],scale:"minor",drum:"driving",bass:[0,2,4,6,8,10,12,14],bassLen:1.5,bassWave:"sawtooth",bassLp:700,padWave:"sawtooth",padVol:.04,padLp:1800,leadWave:"sawtooth",lead:[0,3,6,8,11,14],leadLen:1.4,leadVol:.055,leadLp:3200,mel:false,fb:.3,wet:.22,swing:0,
   verses:["Искры летят из-под колёс","Сердце бьёт как барабан","Громче, пока дрожат стены","Мы зажгли и не потушим","Жар поднимается по рукам","Каждый удар — шаг вперёд","Сцена горит жёлтым","Толпа поёт вместе с нами","Не останавливайся, не сейчас","Всё или ничего"],chorus:"Гори ярче, мы с тобой",
   titles:["Искры","Барабан сердца","Громче","Горячий асфальт","Всё или ничего"]}
];
var ARTISTS=["Amber Tape","Neon Parlor","Mono Kettle","Static Fern","Velvet Voltage","Hollow Sunday","Paper Comet","Brass Static","Quiet Engine","Honey Circuit"];
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
var TRACKS=[];
for(var k=0;k<5;k++){THEMES.forEach(function(th,ti){
  var seed=ti*131+k*17+9,r=mulberry(seed);
  var bpm=th.bpm[0]+Math.round(r()*(th.bpm[1]-th.bpm[0]));
  TRACKS.push({id:TRACKS.length,title:th.titles[k],artist:ARTISTS[(ti+k*3)%ARTISTS.length],th:th,theme:th.id,bpm:bpm,seed:seed,dur:(60/bpm)*4*BARS+2});
});}

function lyricsFor(t){
  var th=t.th,bar=(60/t.bpm)*4,off=t.seed%10,v=function(i){return th.verses[(off+i)%10];},c=th.chorus;
  var texts=[v(0),v(1),v(2),v(3),c,v(4),v(5),v(6),v(7),c,v(8),c];
  return texts.map(function(txt,i){
    var t0=(2+2*i)*bar+.05,D=2*bar,sing=D*.88,words=txt.split(" "),tw=0,ws=words.map(function(w){var x=w.length+2;tw+=x;return x;}),acc=0;
    return {t0:t0,t1:t0+D,words:words.map(function(w,j){var s=t0+sing*acc/tw;acc+=ws[j];return {w:w,s:s,e:t0+sing*acc/tw};})};
  });
}

function mtof(m){return 440*Math.pow(2,(m-69)/12);}
function noteAt(sc,root,i){var n=SC[sc].length,o=Math.floor(i/n);return root+SC[sc][((i%n)+n)%n]+12*o;}
function chordOf(sc,root,d){return [noteAt(sc,root,d),noteAt(sc,root,d+2),noteAt(sc,root,d+4)];}
async function renderTrack(t){
  var th=t.th,sr=22050,spb=60/t.bpm,step=spb/4,bar=spb*4;
  var ctx=new OfflineAudioContext(2,Math.ceil(sr*t.dur),sr),rng=mulberry(t.seed*7+1);
  var master=ctx.createGain();master.gain.setValueAtTime(.9,0);master.gain.setValueAtTime(.9,bar*(BARS-2));master.gain.linearRampToValueAtTime(0,bar*BARS+1.2);
  var comp=ctx.createDynamicsCompressor();comp.threshold.value=-16;comp.ratio.value=3;master.connect(comp);comp.connect(ctx.destination);
  var dly=ctx.createDelay(1.5);dly.delayTime.value=spb*.75;var fb=ctx.createGain();fb.gain.value=th.fb;var wet=ctx.createGain();wet.gain.value=th.wet;
  dly.connect(fb);fb.connect(dly);dly.connect(wet);wet.connect(master);
  function bus(type,freq,pan,send){var f=ctx.createBiquadFilter();f.type=type;f.frequency.value=freq;var out=f;if(pan){var p=ctx.createStereoPanner();p.pan.value=pan;f.connect(p);out=p;}out.connect(master);if(send)out.connect(dly);return f;}
  var padA=bus("lowpass",th.padLp,-.4),padB=bus("lowpass",th.padLp,.4),bassB=bus("lowpass",th.bassLp),leadA=bus("lowpass",th.leadLp,-.3,true),leadB=bus("lowpass",th.leadLp,.3,true),hatB=bus("highpass",7000),snB=bus("highpass",1500);
  var nb=ctx.createBuffer(1,sr,sr),nd=nb.getChannelData(0);for(var i=0;i<sr;i++)nd[i]=Math.random()*2-1;
  function env(g,when,len,vol,att){g.gain.setValueAtTime(.0001,when);g.gain.linearRampToValueAtTime(vol,when+att);g.gain.exponentialRampToValueAtTime(.0001,when+Math.max(len,att+.02));}
  function tone(f,when,len,type,vol,dest,att,det){var osc=ctx.createOscillator();osc.type=type;osc.frequency.value=f;if(det)osc.detune.value=det;var g=ctx.createGain();env(g,when,len,vol,att||.01);osc.connect(g);g.connect(dest);osc.start(when);osc.stop(when+len+.05);}
  function hit(when,len,vol,dest){var s=ctx.createBufferSource();s.buffer=nb;var g=ctx.createGain();env(g,when,len,vol,.002);s.connect(g);g.connect(dest);s.start(when,Math.random()*.5);s.stop(when+len+.05);}
  function kick(when,v){var o=ctx.createOscillator();o.type="sine";o.frequency.setValueAtTime(160,when);o.frequency.exponentialRampToValueAtTime(42,when+.13);var g=ctx.createGain();env(g,when,.38,v,.002);o.connect(g);g.connect(master);o.start(when);o.stop(when+.45);}
  function snare(when,v){hit(when,.18,v,snB);tone(190,when,.1,"triangle",v*.5,master,.002);}
  var root=36+(t.seed*5)%12,progs=PROGS[th.scale],prog=progs[t.seed%progs.length],dr=DR[th.drum],walk=4+(t.seed%3);
  for(var b=0;b<BARS;b++){
    var t0=b*bar+.05,ch=chordOf(th.scale,root,prog[b%4]),tail=b>=BARS-2;
    ch.forEach(function(m,i){tone(mtof(m+24),t0,bar*1.08,th.padWave,th.padVol,i%2?padA:padB,.4,i*5-5);});
    if(b>=2&&!tail){th.bass.forEach(function(s){var w=t0+s*step+(s%2?th.swing*step:0);tone(mtof(ch[0]),w,th.bassLen*step,th.bassWave,.16,bassB,.01);});}
    if(th.drum!=="none"){
      var on=b>=2&&!tail;
      if(on||b<2){dr.h.forEach(function(s){var w=t0+s*step+(s%2?th.swing*step:0);hit(w,.05,dr.hv*(on?.26:.12),hatB);});}
      if(on){dr.k.forEach(function(s){kick(t0+s*step,.8);});dr.s.forEach(function(s){snare(t0+s*step,.3);});}
    }else if(b>=2&&!tail&&b%2===0){kick(t0,.45);}
    if(b>=4&&!tail&&(b%8)<6){
      th.lead.forEach(function(s,ix){
        var w=t0+s*step+(s%2?th.swing*step:0),m;
        if(th.mel){walk=Math.max(0,Math.min(9,walk+Math.floor(rng()*5)-2));m=noteAt(th.scale,root+48,walk-2);}
        else{var tones=[ch[0]+24,ch[1]+24,ch[2]+24,ch[0]+36,ch[1]+36];m=tones[(ix+b)%5];}
        tone(mtof(m),w,th.leadLen*step,th.leadWave,th.leadVol,ix%2?leadA:leadB,.01);
      });
    }
  }
  return ctx.startRendering();
}

var $=function(id){return document.getElementById(id);};
var AC=null,gainNode=null,analyser=null,src=null,buf=null,cur=-1,offset=0,startAt=0,playing=false,token=0,dragging=false;
var shuffle=false,repeat=0,cache=new Map(),lyr=[],lyrIdx=-2,ccOn=false,vol=.8;
var store={done:[],lastRec:0,optOut:false,rec:null};
try{var s=JSON.parse(localStorage.getItem("waxy.v1")||"null");if(s&&typeof s==="object"){store.done=Array.isArray(s.done)?s.done:[];store.lastRec=s.lastRec|0;store.optOut=!!s.optOut;store.rec=s.rec||null;}}catch(e){}
function save(){try{localStorage.setItem("waxy.v1",JSON.stringify(store));}catch(e){}}
function fmt(x){x=Math.max(0,Math.floor(x));return Math.floor(x/60)+":"+String(x%60).padStart(2,"0");}
function now(){return playing&&AC?Math.min(buf?buf.duration:0,offset+(AC.currentTime-startAt)):offset;}

function ensureAC(){if(AC)return;AC=new(window.AudioContext||window.webkitAudioContext)();gainNode=AC.createGain();gainNode.gain.value=vol;analyser=AC.createAnalyser();analyser.fftSize=128;analyser.smoothingTimeConstant=.8;gainNode.connect(analyser);analyser.connect(AC.destination);}
function loadBuf(i){if(!cache.has(i)){cache.set(i,renderTrack(TRACKS[i]));while(cache.size>4){var first=cache.keys().next().value;if(first===cur)break;cache.delete(first);}}return cache.get(i);}
function stopSrc(){if(src){src.onended=null;try{src.stop();}catch(e){}try{src.disconnect();}catch(e){}src=null;}}

function startPlay(from){
  stopSrc();ensureAC();if(AC.state==="suspended")AC.resume();
  var s=AC.createBufferSource();s.buffer=buf;s.connect(gainNode);offset=Math.max(0,Math.min(from,buf.duration-.05));
  startAt=AC.currentTime;s.start(0,offset);src=s;playing=true;
  s.onended=function(){if(s!==src)return;playing=false;offset=0;done(cur);advance(true);};
  ui();loop();
}

function pause(){
  if(!playing)return;
  offset=now();
  stopSrc();
  playing=false;
  ui();
}

async function play(i,from){
  cur=i;token++;var my=token;stopSrc();playing=false;buf=null;offset=from||0;lyr=lyricsFor(TRACKS[i]);lyrIdx=-2;ui();
  $("status").textContent="Готовлю трек…";
  try{var b=await loadBuf(i);if(my!==token)return;buf=b;$("status").textContent="";startPlay(offset);
    var nx=(i+1)%TRACKS.length;setTimeout(function(){if(my===token)loadBuf(nx);},50);
  }catch(e){$("status").textContent="Ошибка рендеринга звука.";}
}

function done(i){
  if(i<0||store.done.includes(i)||store.optOut)return;
  store.done.push(i);
  if(store.done.length-store.lastRec>=3){store.lastRec=store.done.length;pickRec();}
  save();renderRec();
}
function pickRec(){
  var counts={};store.done.forEach(function(i){var th=TRACKS[i].theme;counts[th]=(counts[th]||0)+1;});
  var best=null,max=0;Object.keys(counts).forEach(function(th){if(counts[th]>max){max=counts[th];best=th;}});
  if(!best)return;
  var cand=TRACKS.filter(function(t){return t.theme===best&&!store.done.includes(t.id);});
  if(!cand.length)cand=TRACKS.filter(function(t){return t.theme===best;});
  if(!cand.length)return;
  store.rec=cand[Math.floor(Math.random()*cand.length)].id;
}
function advance(auto){
  if(repeat===2&&auto){startPlay(0);return;}
  var list=filtered();var idx=list.indexOf(cur);
  if(shuffle){var r;do{r=Math.floor(Math.random()*TRACKS.length);}while(r===cur&&TRACKS.length>1);play(r);return;}
  if(idx>=0&&idx<list.length-1){play(list[idx+1]);return;}
  if(repeat===1){play(list[0]);return;}
  cur=-1;playing=false;ui();
}

function ui(){
  var t=cur>=0?TRACKS[cur]:null;
  var playIc = $("playIc");
  if(playIc) playIc.innerHTML=playing?'<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>':'<path d="M8 5v14l11-7z"/>';
  var vinyl = $("vinyl");
  if(vinyl) vinyl.classList.toggle("spinning",playing);
  var arm = $("arm");
  if(arm) arm.classList.toggle("on",playing);
  if($("title")) $("title").textContent=t?t.title:"Waxy Player";
  if($("artist")) $("artist").textContent=t?t.artist+" · "+t.th.name:"50 оригинальных треков без авторских прав";
  if($("themeTag")) $("themeTag").textContent=t?t.th.name.toUpperCase():"ВЫБЕРИТЕ ТРЕК";
  if($("vletter")) $("vletter").textContent=t?t.title.charAt(0):"W";
  document.querySelectorAll("#plist .tr").forEach(function(el){
    var id=+el.dataset.id;el.classList.toggle("on",id===cur);
    var n=el.querySelector(".n");if(n)n.innerHTML=id===cur?'<span class="eq"><i></i><i></i><i></i></span>':String(id+1);
  });
  bg(t);renderRec();
}

var canvas=$("viz"),ctx=canvas?canvas.getContext("2d"):null;
var bcan=$("bgc"),bctx=bcan?bcan.getContext("2d"):null;
function resize(){
  if(canvas && canvas.parentElement){canvas.width=canvas.offsetWidth*window.devicePixelRatio;canvas.height=canvas.offsetHeight*window.devicePixelRatio;}
  if(bcan){bcan.width=window.innerWidth*window.devicePixelRatio;bcan.height=window.innerHeight*window.devicePixelRatio;}
}
window.addEventListener("resize",resize);resize();

var bgHue=12;function bg(t){bgHue=t?(t.seed*37)%360:12;}
function drawBg(){
  if(!bcan||!bctx)return;
  var w=bcan.width,h=bcan.height;bctx.clearRect(0,0,w,h);
  var g=bctx.createRadialGradient(w*.3,h*.3,w*.1,w*.5,h*.5,w*.8);
  var beat=playing&&analyser?getData()[0]/255:0;
  document.body.style.setProperty("--beat",beat.toFixed(2));
  g.addColorStop(0,"hsla("+bgHue+",70%,15%,"+(.35+beat*.25)+")");
  g.addColorStop(1,"rgba(10,10,7,.9)");
  bctx.fillStyle=g;bctx.fillRect(0,0,w,h);
  requestAnimationFrame(drawBg);
}
requestAnimationFrame(drawBg);

function getData(){if(!analyser)return new Uint8Array(64);var arr=new Uint8Array(analyser.frequencyBinCount);analyser.getByteFrequencyData(arr);return arr;}
function loop(){
  if((playing||analyser)&&ctx&&canvas){
    var arr=getData(),w=canvas.width,h=canvas.height;ctx.clearRect(0,0,w,h);
    var len=Math.floor(arr.length*.75),barW=w/len;
    ctx.fillStyle="rgba(255,214,10,.75)";
    for(var i=0;i<len;i++){
      var val=arr[i]/255,bh=val*h*.9;
      ctx.fillRect(i*barW,h-bh,Math.max(1,barW-2),bh);
    }
  }
  var t=now(),dur=buf?buf.duration:0;
  if($("tcur")) $("tcur").textContent=fmt(t);
  if($("tdur")) $("tdur").textContent=fmt(dur);
  if(!dragging&&dur>0&&$("seek")){$("seek").value=Math.round((t/dur)*1000);$("seek").style.setProperty("--p",((t/dur)*100)+"%");}
  if(cur>=0&&ccOn){updateKaraoke(t);}
  if(playing)requestAnimationFrame(loop);
}

function updateKaraoke(t){
  var active=lyr.find(function(l){return t>=l.t0&&t<l.t1;});
  var idx=active?lyr.indexOf(active):-2;
  if(idx!==lyrIdx){
    lyrIdx=idx;
    var html="";
    if(lyrIdx===-2&&t<lyr[0].t0){html='<div class="kl intro">Скоро начнётся песня…</div>';}
    else if(!active){html='<div class="kl intro">Проигрыш…</div>';}
    else{
      var prev=lyr[lyrIdx-1],curL=active,next=lyr[lyrIdx+1];
      if(prev)html+='<div class="kl past">'+escapeHtml(prev.words.map(function(w){return w.w;}).join(" "))+'</div>';
      html+='<div class="kl cur" id="curL">'+renderLineWords(curL,t)+'</div>';
      if(next)html+='<div class="kl">'+escapeHtml(next.words.map(function(w){return w.w;}).join(" "))+'</div>';
    }
    if($("kar")) $("kar").innerHTML=html;
  }else if(active){
    var el=$("curL");if(el)el.innerHTML=renderLineWords(active,t);
  }
}
function renderLineWords(l,t){
  return l.words.map(function(w){
    var p=0;if(t>=w.e)p=1;else if(t>w.s)p=(t-w.s)/(w.e-w.s);
    return '<span class="w" style="--p:'+p.toFixed(2)+'">'+escapeHtml(w.w)+'</span>';
  }).join(" ");
}
function escapeHtml(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}

var q="",activeChip="all";
var CHIPS=[{id:"all",label:"Все"},{id:"drive",label:"Ночная трасса"},{id:"rain",label:"Дождь"},{id:"sunrise",label:"Рассвет"},{id:"focus",label:"Фокус"},{id:"ocean",label:"Океан"},{id:"city",label:"Город"},{id:"space",label:"Космос"},{id:"forest",label:"Лес"},{id:"retro",label:"Ретро"},{id:"fire",label:"Огонь"}];
function filtered(){
  return TRACKS.filter(function(t){
    if(activeChip!=="all"&&t.theme!==activeChip)return false;
    if(q&&!t.title.toLowerCase().includes(q)&&!t.artist.toLowerCase().includes(q)&&!t.th.name.toLowerCase().includes(q))return false;
    return true;
  }).map(function(t){return t.id;});
}
function renderChips(){
  var chipsEl=$("chips");
  if(!chipsEl)return;
  chipsEl.innerHTML=CHIPS.map(function(c){
    return '<button class="chip" data-id="'+c.id+'" aria-pressed="'+(activeChip===c.id)+'">'+c.label+'</button>';
  }).join("");
}
function renderList(){
  var plistEl=$("plist");
  if(!plistEl)return;
  var list=filtered();
  plistEl.innerHTML=list.map(function(id,idx){
    var t=TRACKS[id],on=id===cur;
    return '<li><button class="tr'+(on?" on":"")+'" data-id="'+id+'">'
      +'<span class="n">'+(on?'<span class="eq"><i></i><i></i><i></i></span>':(idx+1))+'</span>'
      +'<span class="t"><b>'+escapeHtml(t.title)+'</b><small>'+escapeHtml(t.artist+' · '+t.th.name)+'</small></span>'
      +'<span class="d">'+fmt(Math.round(t.dur))+'</span>'
      +'</button></li>';
  }).join("");
}

function renderRec(){
  var box=$("rec");
  if(!box)return;
  if(store.optOut){box.hidden=true;return;}
  box.hidden=false;
  if(store.rec!==null&&TRACKS[store.rec]){
    var t=TRACKS[store.rec];
    box.className="card rec hot";
    box.innerHTML='<h2>Специально для вас</h2><p class="sub">Вам нравится «'+escapeHtml(t.th.name)+'». Послушайте трек из этой же серии:</p>'
      +'<div class="mini"><b>'+escapeHtml(t.title)+'</b><small>'+escapeHtml(t.artist)+'</small></div>'
      +'<div class="actions"><button class="btn main" id="recPlay">Слушать</button><button class="btn" id="recHide">Больше не надо</button></div>';
    var rp=$("recPlay");if(rp)rp.onclick=function(){play(t.id);};
    var rh=$("recHide");if(rh)rh.onclick=function(){store.optOut=true;save();renderRec();};
  }else{
    var c=store.done.length,tot=Math.min(3,3-c%3);
    box.className="card rec";
    box.innerHTML='<h2>Персональная подборка</h2>'
      +'<p class="sub">Послушайте ещё '+tot+' '+(tot===1?'трек':'трека')+' до конца, чтобы алгоритм составил для вас индивидуальный плейлист.</p>'
      +'<div class="meter" aria-hidden="true">'+[0,1,2].map(function(i){return '<i class="'+((c%3)>i||c>=3?'f':'')+'"></i>';}).join("")+'</div>';
  }
}

document.addEventListener("DOMContentLoaded", function(){
  if($("play")) $("play").onclick=function(){
    if(cur<0){play(0);}
    else{
      if(playing) pause();
      else startPlay(offset);
    }
  };
  if($("prev")) $("prev").onclick=function(){var list=filtered();var idx=list.indexOf(cur);if(idx>0)play(list[idx-1]);else if(list.length)play(list[list.length-1]);};
  if($("next")) $("next").onclick=function(){advance(false);};
  if($("shuf")) $("shuf").onclick=function(){shuffle=!shuffle;this.setAttribute("aria-pressed",shuffle);};
  if($("rep")) $("rep").onclick=function(){
    repeat=(repeat+1)%3;
    var lbls=["Повтор: выкл","Повтор: плейлист","Повтор: трек"];
    this.setAttribute("aria-pressed",repeat>0);this.setAttribute("aria-label",lbls[repeat]);this.title=lbls[repeat];
  };
  if($("cc")) $("cc").onclick=function(){
    ccOn=!ccOn;this.setAttribute("aria-pressed",ccOn);$("kar").hidden=!ccOn;
    if(ccOn&&cur>=0)updateKaraoke(now());
  };
  var seek=$("seek");
  if(seek){
    seek.oninput=function(){dragging=true;var dur=buf?buf.duration:0;var t=(seek.value/1000)*dur;if($("tcur"))$("tcur").textContent=fmt(t);seek.style.setProperty("--p",(seek.value/10)+"%");};
    seek.onchange=function(){dragging=false;if(!buf)return;var dur=buf.duration;offset=(seek.value/1000)*dur;if(playing)startPlay(offset);};
  }
  var volRange=$("vol");
  if(volRange) volRange.oninput=function(){vol=volRange.value/100;if(gainNode)gainNode.gain.value=vol;};

  var qInput=$("q");
  if(qInput) qInput.oninput=function(e){q=e.target.value.trim().toLowerCase();renderList();};
  
  var chipsEl=$("chips");
  if(chipsEl) chipsEl.onclick=function(e){
    var btn=e.target.closest(".chip");if(!btn)return;
    activeChip=btn.dataset.id;renderChips();renderList();
  };
  
  var plistEl=$("plist");
  if(plistEl) plistEl.onclick=function(e){
    var btn=e.target.closest(".tr");if(!btn)return;
    play(+btn.dataset.id);
  };

  var photoIn=$("photoIn"),photoDiv=$("photo");
  if(photoIn && photoDiv){
    photoIn.onchange=function(e){
      var f=e.target.files[0];if(!f)return;
      var url=URL.createObjectURL(f);photoDiv.style.backgroundImage="url('"+url+"')";photoDiv.classList.add("on");
    };
  }

  renderChips();
  renderList();
  renderRec();
});
})();