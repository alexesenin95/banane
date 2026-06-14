/* Банановый поход — игровая логика (Phaser 3).
   Ассеты грузятся из /assets. Пока один файл — в Claude Code первым делом
   можно безопасно разнести по модулям (levels / entities / combat / ui / game). */
/* --- временная диагностика: метка сборки + видимый ловец ошибок --- */
(function(){ const BUILD='build-5 · heroSize62+spriteClean · 2026-06-14';
  window.__BUILD=BUILD; try{ console.log('BANANE',BUILD); }catch(e){}
  function showErr(msg){ let d=document.getElementById('__err');
    if(!d){ d=document.createElement('div'); d.id='__err';
      d.style.cssText='position:fixed;left:6px;right:6px;bottom:6px;z-index:99999;background:#b00020;color:#fff;font:12px/1.4 monospace;padding:8px 10px;white-space:pre-wrap;max-height:48vh;overflow:auto;border-radius:8px;box-shadow:0 4px 18px rgba(0,0,0,.5)';
      (document.body||document.documentElement).appendChild(d); }
    d.textContent='⚠ '+BUILD+'\n'+msg; }
  window.__showErr=showErr;
  window.addEventListener('error',e=>showErr((e.error&&e.error.stack)||e.message||String(e)));
  window.addEventListener('unhandledrejection',e=>showErr('promise: '+((e.reason&&e.reason.stack)||e.reason||e)));
})();
const TEX = {"p_idle": "assets/sprites/p_idle.webp", "p_run1": "assets/sprites/p_run1.webp", "p_run2": "assets/sprites/p_run2.webp", "p_run3": "assets/sprites/p_run3.webp", "p_jump": "assets/sprites/p_jump.webp", "p_attack": "assets/sprites/p_attack.webp", "s1": "assets/sprites/s1.webp", "s2": "assets/sprites/s2.webp", "orc1": "assets/sprites/orc1.webp", "orc2": "assets/sprites/orc2.webp", "orc3": "assets/sprites/orc3.webp", "spider": "assets/sprites/spider.webp", "proj": "assets/sprites/proj.webp", "banana": "assets/sprites/banana.webp", "flag": "assets/sprites/flag.webp", "tile": "assets/sprites/tile.webp", "bg_far": "assets/bg/bg_far.webp", "bg_mid": "assets/bg/bg_mid.webp", "bg_front": "assets/bg/bg_front.webp", "k_thrower": "assets/sprites/k_thrower.webp", "k_archer": "assets/sprites/k_archer.webp", "k_shield": "assets/sprites/k_shield.webp", "k_berserk": "assets/sprites/k_berserk.webp", "e_knife": "assets/sprites/e_knife.webp", "e_arrow": "assets/sprites/e_arrow.webp", "b_spikes": "assets/sprites/b_spikes.webp", "b_thorn": "assets/sprites/b_thorn.webp", "b_stone": "assets/sprites/b_stone.webp", "b_palisade": "assets/sprites/b_palisade.webp", "b_gate": "assets/sprites/b_gate.webp", "wi_boom2": "assets/sprites/wi_boom2.webp", "wi_club2": "assets/sprites/wi_club2.webp", "wi_boom": "assets/sprites/wi_boom.webp", "wi_club": "assets/sprites/wi_club.webp"};
Object.assign(TEX,{
  swamp_far:'assets/bg/swamp_far.webp', swamp_mid:'assets/bg/swamp_mid.webp', swamp_front:'assets/bg/swamp_front.webp',
  tile_swamp:'assets/sprites/tile_swamp.webp',
  b_spikes_swamp:'assets/sprites/b_spikes_swamp.webp', b_thorn_swamp:'assets/sprites/b_thorn_swamp.webp',
  b_stone_swamp:'assets/sprites/b_stone_swamp.webp', b_palisade_swamp:'assets/sprites/b_palisade_swamp.webp',
  b_gate_swamp:'assets/sprites/b_gate_swamp.webp',
  t_club:'assets/sprites/t_club.webp', t_bone:'assets/sprites/t_bone.webp', t_boulder:'assets/sprites/t_boulder.webp',
  boss_troll:'assets/sprites/boss_troll.webp', boulder:'assets/sprites/boulder.webp'
});
const MENTOR = {"Чичо":"assets/portraits/chicho.webp","Доня":"assets/portraits/donya.webp"};
const ORC="assets/portraits/orc.webp", HERO="assets/portraits/hero.webp";
const WI={boom:"assets/sprites/wi_boom.webp",club:"assets/sprites/wi_club.webp",boom2:"assets/sprites/wi_boom2.webp",club2:"assets/sprites/wi_club2.webp"};
const PW=109, PHH=62;
/* ---- персонажи (выбор героя) ---- */
const HEROES={
  mono:{name:'Обезьянка Бана', desc:'Прежний герой — компактный и быстрый.',
        idle:'p_idle', run:['p_run1','p_run2','p_run3'], jump:'p_jump', attack:'p_attack', files:null},
  orang:{name:'Орангутан', desc:'Эффектная анимация: бег, прыжок, удар.',
        idle:'h2_idle', run:['h2_run1','h2_run2','h2_run3'], jump:'h2_jump', attack:'h2_attack',
        files:{h2_idle:'assets/sprites/h2_idle.webp', h2_run1:'assets/sprites/h2_run1.webp',
               h2_run2:'assets/sprites/h2_run2.webp', h2_run3:'assets/sprites/h2_run3.webp',
               h2_jump:'assets/sprites/h2_jump.webp', h2_attack:'assets/sprites/h2_attack.webp'}}
};
let selectedHero='mono';
const HK=()=>HEROES[selectedHero];
const HERO_DH={ orang:62 };   // целевая экранная высота героя в px (= габарит старой обезьяны, чтобы пролазил в те же щели); моно — нативный размер
const ADMIN=true;                 // dev-only level switching; set false for players
const STOMP_DMG=3;
const WEAPONS={boomerang:{dmg:2,level:1},club:{dmg:2,level:1}};
const WEAPON_LIST=[
 {id:'boomerang',name:'Банановый бумеранг',unlocked:true},
 {id:'club',name:'Боевая дубина',unlocked:true},
 {id:'spear',name:'Бамбуковое копьё',unlocked:false},
 {id:'sling',name:'Праща',unlocked:false},
 {id:'coconut',name:'Кокос-бомбы',unlocked:false},
 {id:'whip',name:'Лиана-хлыст',unlocked:false},
 {id:'blowgun',name:'Духовая трубка',unlocked:false},
 {id:'shuriken',name:'Костяные сюрикены',unlocked:false},
 {id:'torch',name:'Огненный факел',unlocked:false},
 {id:'staff',name:'Грозовой посох',unlocked:false}
];
let currentWeapon='boomerang', upgraded=false;
let game=null, chosenWeapon=null, currentLevel=0;
let score=0, lives=3, gameOver=false, paused=false, pauseReason=null;
const show=id=>document.getElementById(id).classList.add('show');
const hide=id=>document.getElementById(id).classList.remove('show');

const STORY=[
 ["Чичо","Эй, мохнатый, проснулся? Отлично! У нас тут небольшая катастрофа."],
 ["Доня","...привет. Я Доня. Это Чичо. Он громкий."],
 ["Чичо","В Долину вломились ОРКИ: метатели ножей, лучники, щитоносцы и берсерки!"],
 ["Доня","Они съели мой обед. Я копил его... три дня."],
 ["Чичо","Щитоносцы порой ставят щит — тогда не пробить, выжди или прыгай сверху."],
 ["Чичо","Оружие меняй: 1 / 2 или открой инвентарь кнопкой I. Набьёшь очков — прокачка!"],
 ["Доня","...за 500 бананов можно купить броню на 5 секунд — кнопка B. Никто не ранит."],
 ["Чичо","Ну всё, банан, ВПЕРЁД! За Долину!"]
];
let storyI=0;
function startStory(){storyI=0;show('intro');renderStory();}
function renderStory(){const [spk,txt]=STORY[storyI];
  document.getElementById('introSpk').textContent=spk; document.getElementById('introText').textContent='«'+txt+'»';
  const img=document.getElementById('introPortrait'),psrc=MENTOR[spk];
  if(psrc){img.src=psrc;img.style.display='block';img.style.animation='none';void img.offsetWidth;img.style.animation='';}else img.style.display='none';
  document.getElementById('introNext').textContent=(storyI>=STORY.length-1)?'К оружию →':'Дальше →';}
function nextStory(){storyI++;if(storyI>=STORY.length){hide('intro');show('dialogue');return;}renderStory();}
/* ---- выбор персонажа ---- */
function startCharSelect(){ show('charselect'); probeHero2(); }
function probeHero2(){ const card=document.getElementById('chooseOrang'); if(!card)return;
  const im=new Image();
  im.onload=()=>{ card.classList.remove('locked'); card.dataset.ready='1';
    const pic=document.getElementById('orangImg'); if(pic)pic.src=HEROES.orang.files.h2_idle;
    const perk=document.getElementById('orangPerk'); if(perk)perk.textContent=HEROES.orang.desc; };
  im.onerror=()=>{ card.classList.add('locked'); card.dataset.ready='';
    const perk=document.getElementById('orangPerk'); if(perk)perk.textContent='Появится после добавления спрайта (assets/sprites/h2_*)'; };
  im.src=HEROES.orang.files.h2_idle+'?_='+Date.now(); }
function pickHero(h){ if(h==='orang' && !document.getElementById('chooseOrang').dataset.ready)return;
  selectedHero=h; hide('charselect'); startStory(); }
document.getElementById('startBtn').onclick=()=>{hide('title');startCharSelect();};
document.getElementById('chooseMono').onclick=()=>pickHero('mono');
document.getElementById('chooseOrang').onclick=()=>pickHero('orang');
['chooseMono','chooseOrang'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{
  if(e.key==='Enter'||e.key===' '){e.preventDefault();document.getElementById(id).click();}}));
document.getElementById('introNext').onclick=nextStory;
document.getElementById('introSkip').onclick=()=>{hide('intro');show('dialogue');};
function pick(w){chosenWeapon=w;currentWeapon=w;hide('dialogue');startGame(w);}
document.getElementById('chooseBoomerang').onclick=()=>pick('boomerang');
document.getElementById('chooseClub').onclick=()=>pick('club');
['chooseBoomerang','chooseClub'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{
  if(e.key==='Enter'||e.key===' '){e.preventDefault();document.getElementById(id).click();}}));

/* ---- inventory ---- */
function weaponIconURI(id){ if(id==='boomerang')return upgraded?WI.boom2:WI.boom; if(id==='club')return upgraded?WI.club2:WI.club; return null; }
function buildInvGrid(){
  const g=document.getElementById('invGrid'); g.innerHTML='';
  WEAPON_LIST.forEach(w=>{
    const card=document.createElement('div'); card.className='invCard'+(w.unlocked?'':' locked')+(w.id===currentWeapon?' sel':'');
    if(w.unlocked){ const im=document.createElement('img'); im.src=weaponIconURI(w.id); card.appendChild(im);
      card.onclick=()=>{ currentWeapon=w.id; if(activeScene)updateWeaponHUD(activeScene); closeInventory(); };
    } else { const lk=document.createElement('div'); lk.className='lk'; lk.textContent='🔒'; card.appendChild(lk); }
    const nm=document.createElement('div'); nm.className='nm'; nm.textContent=w.name; card.appendChild(nm);
    g.appendChild(card);
  });
}
function openInventory(){ if(paused||!activeScene||gameOver)return; paused=true; pauseReason='inv'; activeScene.physics.pause(); buildInvGrid(); show('inventory'); }
function closeInventory(){ if(pauseReason!=='inv')return; hide('inventory'); paused=false; pauseReason=null; if(activeScene)activeScene.physics.resume(); }
document.getElementById('invClose').onclick=closeInventory;
document.addEventListener('keydown',e=>{ if(e.code==='KeyI'){ if(pauseReason==='inv')closeInventory(); else openInventory(); } });

/* ---- cutscene ---- */
let cutLines=[], cutI=0, activeScene=null, currentCut=null;
function startCut(scene,cut){ cutLines=cut.lines; cutI=0; currentCut=cut; paused=true; pauseReason='cut'; scene.physics.pause(); activeScene=scene; renderCut(); show('cutscene'); }
function renderCut(){const [spk,txt]=cutLines[cutI];
  document.getElementById('cutSpk').textContent=spk; document.getElementById('cutText').textContent='«'+txt+'»';
  const img=document.getElementById('cutPortrait'); const src=spk.indexOf('Орк')===0?ORC:HERO;
  img.src=src;img.style.display='block';img.style.animation='none';void img.offsetWidth;img.style.animation='';
  document.getElementById('cutNext').textContent=(cutI>=cutLines.length-1)?'В бой →':'Дальше →';}
function advanceCut(){ cutI++; if(cutI>=cutLines.length){ hide('cutscene'); paused=false; pauseReason=null;
  if(activeScene){ activeScene.physics.resume(); if(currentCut&&currentCut.spawn) spawnSquad(activeScene,currentCut.spawn);} return;} renderCut(); }
document.getElementById('cutscene').onclick=advanceCut;

/* ---- кино-панели (драматичное интро этапа) ---- */
const CINEMATICS={ 3:{ panels:['assets/cutscenes/c4_1.webp','assets/cutscenes/c4_2.webp','assets/cutscenes/c4_3.webp','assets/cutscenes/c4_4.webp'],
  texts:['Долина животных цвела под банановым солнцем…',
         '…пока не пришли орки. Огонь и дым поглотили деревню зверей.',
         'Выжженная земля захлебнулась гнилью — джунгли стали ядовитой топью.',
         'Но герой ещё стоит на краю болот. За Долину — вперёд!'] } };
// прогреваем кэш браузера для кино-панелей заранее (чтобы переход на уровень не висел на их загрузке)
Object.values(CINEMATICS).forEach(d=>d.panels.forEach(src=>{ const im=new Image(); im.src=src; }));
let playedCine={}, cineQ=[], cineTexts=[], cineI=0, cineCb=null;
function playCinematic(def,cb){ cineQ=def.panels; cineTexts=def.texts||[]; cineI=0; cineCb=cb; show('cinematic'); renderCine(); }
function renderCine(){ const img=document.getElementById('cineImg'); img.src=cineQ[cineI];
  img.style.animation='none'; void img.offsetWidth; img.style.animation='kenburns 7s ease-out forwards';
  document.getElementById('cineText').textContent=cineTexts[cineI]||'';
  document.getElementById('cineNext').textContent=(cineI>=cineQ.length-1)?'В бой →':'Дальше →'; }
function advanceCine(){ cineI++; if(cineI>=cineQ.length){ hide('cinematic'); const cb=cineCb; cineCb=null; if(cb)cb(); return; } renderCine(); }
document.getElementById('cinematic').onclick=advanceCine;
function startLevelFlow(){ const def=CINEMATICS[currentLevel]; if(def&&!playedCine[currentLevel]){ playedCine[currentLevel]=true; playCinematic(def,startInstance); } else startInstance(); }

let endAction='restart';
function endScreenG(title,s,btn,action){ document.getElementById('endTitle').textContent=title;
  document.getElementById('endScore').textContent='Очки: '+s; document.getElementById('endBtn').textContent=btn; endAction=action; show('endScreen'); }
window.levelClear=n=>endScreenG('Уровень '+n+' пройден!',score,'Дальше →','next');
window.showWin=()=>endScreenG('Долина спасена! 🎉',score,'Сыграть снова','restart');
window.showGameOver=()=>endScreenG('Игра окончена',score,'Ещё раз','restart');
document.getElementById('endBtn').onclick=()=>{ hide('endScreen');
  if(activeScene&&activeScene.scene) activeScene.scene.pause();   // заморозить старый уровень: его update() не должен крутиться во время кат-сцены/перехода
  if(endAction==='next'){ currentLevel++; gameOver=false; startLevelFlow(); } else startGame(chosenWeapon); };

function rng(seed){let a=seed>>>0;return()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
/* ---- биомы: своя графика/враги/босс на группу уровней ----
   ref = временно переиспользовать арт другого биома, пока нет своего (cave/ice/sky). */
const BIOMES={
  jungle:{far:'bg_far',mid:'bg_mid',front:'bg_front',tile:'tile',
    obst:{spikes:'b_spikes',thorn:'b_thorn',stone:'b_stone',palisade:'b_palisade',gate:'b_gate'},
    boss:'spider',bossName:'ПАУК-СТРАЖ',tint:0xa6abb5,sky:0x0a1410},
  swamp:{far:'swamp_far',mid:'swamp_mid',front:'swamp_front',tile:'tile_swamp',
    obst:{spikes:'b_spikes_swamp',thorn:'b_thorn_swamp',stone:'b_stone_swamp',palisade:'b_palisade_swamp',gate:'b_gate_swamp'},
    boss:'boss_troll',bossName:'ТРОЛЛЬ-ВОЖАК',tint:0x9fb6a0,sky:0x0c1a0c},
  cave:{ref:'swamp',boss:'boss_troll',bossName:'ТРОЛЛЬ ПЕЩЕР',tint:0x8a90a8,sky:0x0a0a16},
  ice:{ref:'swamp',boss:'boss_troll',bossName:'ТРОЛЛЬ-ШАМАН',tint:0xc2d6e6,sky:0x14283a},
  sky:{ref:'jungle',boss:'boss_troll',bossName:'ВОЕНАЧАЛЬНИК',tint:0xdfe7f2,sky:0x18263e}
};
function vis(name){ const b=BIOMES[name]; return b.far?b:BIOMES[b.ref]; }   // источник текстур
const POOLS={
  jshrimp:[['shrimp',68],['orc',22],['thrower',10]],
  jmix:[['shrimp',18],['orc',28],['thrower',16],['archer',18],['shield',20]],
  jheavy:[['orc',38],['berserk',22],['archer',20],['shield',20]],
  swamp:[['orc',22],['thrower',13],['archer',10],['troll_club',16],['troll_bone',13],['troll_boulder',9],['berserk',17]]
};
function pickType(poolName,R){ const pool=POOLS[poolName]||POOLS.swamp; let tot=0; for(const x of pool)tot+=x[1];
  let r=R()*tot; for(const x of pool){ r-=x[1]; if(r<0)return x[0]; } return pool[0][0]; }
const GROUPS=[
  {biome:'jungle',pools:['jshrimp','jmix','jheavy']},                 // ур. 1-3
  {biome:'swamp', pools:['swamp','swamp','swamp','swamp']},           // ур. 4-7
  {biome:'cave',  pools:['swamp','swamp','swamp','swamp','swamp']},   // ур. 8-12
  {biome:'ice',   pools:['swamp','swamp','swamp','swamp']},           // ур. 13-16
  {biome:'sky',   pools:['swamp','swamp','swamp','swamp']}            // ур. 17-20
];
const META=[]; GROUPS.forEach(g=>g.pools.forEach((pl,i)=>META.push(
  {worldW:20000+((META.length*1700)%5000), biome:g.biome, pool:pl, boss:i===g.pools.length-1})));
function genLevel(idx){
  const m=META[idx], W=m.worldW, R=rng(2000+idx*167);
  const gaps=[],platforms=[],enemies=[],bananas=[],lifeUps=[],barriers=[];
  let x=1500;
  while(x<W-1700){ const w=110+Math.floor(R()*45); gaps.push([x,x+w]); platforms.push([Math.round(x+w/2),330]); x+=1700+Math.floor(R()*850); }
  const inGap=px=>gaps.some(g=>px>=g[0]-40&&px<=g[1]+40);
  x=650;
  while(x<W-650){ const y=288+Math.floor(R()*52);           // reachable height range
    if(!inGap(x)){ platforms.push([x,y]); if(R()<0.5) bananas.push([x,y-30]);
      if(R()<0.4) enemies.push({type:pickType(m.pool,R),x,y:y-46,min:x-70,max:x+70}); }
    x+=520+Math.floor(R()*340); }
  const towerTops=[]; let tx=2600;
  while(tx<W-1600){ if(!inGap(tx)){ const steps=3+Math.floor(R()*2); let sx=tx, sy=336;
    for(let i=0;i<steps;i++){ platforms.push([sx,sy]);
      if(i>0 && R()<0.4) enemies.push({type:pickType(m.pool,R),x:sx,y:sy-46,min:sx-50,max:sx+50});
      sx += (R()<0.5?-1:1)*(82+Math.floor(R()*20)); sy=Math.max(150,sy-(96+Math.floor(R()*18))); }  // gentler, reachable
    towerTops.push([sx,sy]); } tx+=3000+Math.floor(R()*1100); }
  x=420; while(x<W-300){ bananas.push([x,360]); x+=470+Math.floor(R()*300); }
  x=820; while(x<W-1000){ let ex=x; if(inGap(ex))ex+=170; enemies.push({type:pickType(m.pool,R),x:ex,y:300,min:ex-220,max:ex+220}); x+=720+Math.floor(R()*420); }
  towerTops.forEach((t,i)=>{ if(i%2===0 && lifeUps.length<3) lifeUps.push([t[0],t[1]-26]); else bananas.push([t[0],t[1]-26]); });
  while(lifeUps.length<2 && towerTops.length){ const t=towerTops.pop(); lifeUps.push([t[0],t[1]-26]); }
  let bx=1300;
  while(bx<W-1300){ if(!inGap(bx)){ const r=R();
      barriers.push({kind: r<0.42?'spikes':(r<0.66?'thorn':(r<0.84?'stone':'palisade')), x:bx}); }
    bx+=1250+Math.floor(R()*850); }
  if(!inGap(Math.round(W*0.5))) barriers.push({kind:'gate',x:Math.round(W*0.5)});  // decorative archway
  const CUT=({
    0:[[Math.round(W*0.16),[["Орк","Стой, обезьяна! Эта тропа теперь наша."],["Герой","Долина животных — не ваша."],["Орк","Скоро будет наша вся. ВЗЯТЬ ЕГО!"]]],
       [Math.round(W*0.6),[["Орк","Слышь, банан! За тобой должок — за вытоптанные грядки."],["Орк","Лови ребят на гостинец!"]]]],
    1:[[Math.round(W*0.14),[["Орк-капрал","А, тот самый банан, что прорвался. Босс будет рад твоей шкуре."],["Герой","Передай боссу: я уже иду."],["Орк-капрал","Сначала пройди МОИХ парней!"]]],
       [Math.round(W*0.62),[["Орк","Гррр! Окружай его, лучники — на холм!"]]]],
    2:[[Math.round(W*0.14),[["Орк-страж","Дальше — логово Паучихи. Поворачивай, мохнатый."],["Герой","Я пришёл не поворачивать."],["Орк-страж","Тогда ты пришёл умереть. В АТАКУ!"]]],
       [Math.round(W*0.6),[["Орк","Последний рубеж! Щитоносцы — вперёд!"]]]],
    3:[[Math.round(W*0.16),[["Орк","Добро пожаловать в наши топи, банан. Отсюда не выбираются."],["Герой","Я не уйду, пока вы не уйдёте."],["Орк","Тогда тут и сгниёшь! ТРОЛЛИ, к бою!"]]]],
    6:[[Math.round(W*0.14),[["Орк","Ты дошёл до Вожака? Глупец. Он раздавит тебя как банан."],["Герой","Пусть попробует."]]]]
  })[idx]||[];
  const cuts=CUT.map(c=>({x:c[0],lines:c[1],done:false}));
  cuts.forEach(c=>{ const n=2+Math.floor(R()*2); c.spawn=[]; for(let i=0;i<n;i++) c.spawn.push({type:(i===0&&R()<0.5?'thrower':'orc'),x:c.x+150+i*120,y:160,min:c.x+40,max:c.x+560}); });
  let flagX=null; if(m.boss){ enemies.push({type:'boss',x:W-320,y:250,min:W-720,max:W-130}); } else flagX=W-120;
  return {worldW:W,gaps,platforms,enemies,bananas,lifeUps,barriers,cuts,flagX,boss:m.boss,biome:m.biome};
}

// оборачиваем колбэки сцены, чтобы поймать настоящий текст ошибки (иначе CORS прячет его за «Script error.»)
function guard(fn){ return function(){ try{ return fn.apply(this,arguments); }
  catch(e){ if(window.__showErr) window.__showErr('['+fn.name+'] '+((e&&e.stack)||e)); throw e; } }; }
function makeConfig(){return{type:Phaser.AUTO,parent:'game',backgroundColor:'#2a4a30',
  scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH,width:800,height:450},
  physics:{default:'arcade',arcade:{gravity:{y:1250},debug:false}},
  scene:{preload:guard(preload),create:guard(create),update:guard(update)}};}
function startInstance(){ paused=false; pauseReason=null;
  // Один инстанс на всю сессию: рестарт сцены сохраняет кэш текстур (без перекачки ассетов на каждом уровне).
  const sc=game?(activeScene||game.scene.getScene('default')):null;
  if(game&&sc&&sc.scene){ sc.scene.restart(); return; }
  if(game){ try{game.destroy(true);}catch(e){} game=null; }
  game=new Phaser.Game(makeConfig()); }
function startGame(weapon){ chosenWeapon=weapon; currentWeapon=weapon; score=0; lives=3; currentLevel=0; playedCine={};
  upgraded=false; WEAPONS.boomerang.dmg=2; WEAPONS.club.dmg=2; WEAPONS.boomerang.level=1; WEAPONS.club.level=1; startInstance(); }
function preload(){ for(const k in TEX) this.load.image(k,TEX[k]);
  const hf=HK().files; if(hf) for(const k in hf) this.load.image(k,hf[k]);
  this.load.on('loaderror',(file)=>{ if(file&&file.key&&file.key.indexOf('h2_')===0) selectedHero='mono'; }); }   // нет спрайта героя — откат на моно
// Нормализация героя к постоянной экранной высоте (HERO_DH). Кадры орангутана разной высоты —
// без этого и спрайт, и хитбокс «прыгают» каждый кадр. Тело пересчитывается пропорционально кадру,
// а масштаб обратно пропорционален высоте кадра → мировые размеры/положение тела стабильны.
function fitHero(p){ const t=HERO_DH[selectedHero]; if(!t||!p.height) return;
  const fw=p.width, fh=p.height; p.setScale(t/fh);
  if(p.body){ p.body.setSize(fw*0.30,fh*0.80); p.body.setOffset(fw*0.35,fh*0.20); } }
function setSt(p,s){ if(p._st===s)return; p._st=s; const h=HK();
  if(s==='run')p.anims.play('run_'+selectedHero,true); else {p.anims.stop(); p.setTexture(s==='jump'?h.jump:h.idle);}
  fitHero(p); }
function updateWeaponHUD(scene){ if(!scene.whl)return;
  scene.whl.x=currentWeapon==='boomerang'?728:762;
  scene.wIcons.boomerang.setAlpha(currentWeapon==='boomerang'?1:0.45);
  scene.wIcons.club.setAlpha(currentWeapon==='club'?1:0.45); }
function checkUpgrade(scene){ if(!upgraded && score>=400){ upgraded=true; WEAPONS.boomerang.dmg=3; WEAPONS.club.dmg=3; WEAPONS.boomerang.level=2; WEAPONS.club.level=2;
    if(scene.wIcons){ scene.wIcons.boomerang.setTexture('wi_boom2').setDisplaySize(26,26); scene.wIcons.club.setTexture('wi_club2').setDisplaySize(26,26); }
    const t=scene.add.text(400,92,'Оружие улучшено!',{fontFamily:'Trebuchet MS',fontSize:'22px',color:'#ffd93d',stroke:'#3a2a08',strokeThickness:5}).setScrollFactor(0).setOrigin(0.5).setDepth(22);
    scene.tweens.add({targets:t,alpha:0,y:72,delay:1000,duration:700,onComplete:()=>t.destroy()}); } }
function activateArmor(scene){ if(score<500||scene.player.armor)return; score-=500; updateHud(scene);
  const p=scene.player; p.armor=true; p.invuln=true; p.setTint(0xffe27a);
  const t=scene.add.text(400,68,'БРОНЯ 5 сек!',{fontFamily:'Trebuchet MS',fontSize:'20px',color:'#ffe27a',stroke:'#3a2a08',strokeThickness:5}).setScrollFactor(0).setOrigin(0.5).setDepth(22);
  scene.tweens.add({targets:t,alpha:0,delay:1500,duration:600,onComplete:()=>t.destroy()});
  scene.time.delayedCall(5000,()=>{ if(p.active){ p.armor=false; p.invuln=false; p.clearTint(); } }); }

function create(){
  gameOver=false; paused=false; pauseReason=null; activeScene=this;
  this.bossBar=null; this.boss=null; this.flag=null;   // scene.restart переиспользует объект сцены — гасим ссылки прошлого уровня (иначе update зовёт методы на уничтоженных объектах)
  if(this.physics&&this.physics.world&&this.physics.world.isPaused) this.physics.resume();  // после рестарта со снятого с паузы уровня
  const cfg=genLevel(currentLevel), W=cfg.worldW;
  this.cuts=cfg.cuts; this.cpInGap=(x)=>cfg.gaps.some(g=>x>=g[0]-20&&x<=g[1]+20);
  this.jumpVel=-680;
  this.physics.world.setBounds(0,0,W,900); this.cameras.main.setBounds(0,0,W,450);
  if(!this.textures.exists('life')){ const hg=this.make.graphics({add:false});
    hg.fillStyle(0xff4d6d); hg.fillCircle(8,9,7); hg.fillCircle(18,9,7); hg.fillTriangle(2,12,24,12,13,27);
    hg.fillStyle(0xffffff,0.7); hg.fillCircle(6,7,2.2); hg.generateTexture('life',26,28); hg.destroy(); }
  const bc=BIOMES[cfg.biome], bvz=vis(cfg.biome), dim=bc.tint;
  this.biomeCfg={tile:bvz.tile,obst:bvz.obst,boss:bc.boss,bossName:bc.bossName};
  this.bgFar=this.add.tileSprite(400,225,800,450,bvz.far).setScrollFactor(0).setDepth(-5).setTint(dim);
  this.bgMid=this.add.tileSprite(400,225,800,450,bvz.mid).setScrollFactor(0).setDepth(-4).setTint(dim);
  this.bgFront=this.add.tileSprite(400,225,800,450,bvz.front).setScrollFactor(0).setDepth(-3).setTint(dim);
  this.add.rectangle(400,225,800,450,bc.sky,0.16).setScrollFactor(0).setDepth(-2);
  if(!this.anims.exists('run_'+selectedHero)){
    this.anims.create({key:'run_'+selectedHero,frames:HK().run.map(k=>({key:k})),frameRate:9,repeat:-1}); }
  if(!this.anims.exists('swim')){
    this.anims.create({key:'swim',frames:[{key:'s1'},{key:'s2'}],frameRate:5,repeat:-1});
    this.anims.create({key:'orcwalk',frames:[{key:'orc1'},{key:'orc2'}],frameRate:6,repeat:-1}); }
  this.platforms=this.physics.add.staticGroup(); const TKEY=this.biomeCfg.tile;
  for(let x=20;x<=W-20;x+=40){ if(!cfg.gaps.some(g=>x>=g[0]&&x<=g[1])) this.platforms.create(x,430,TKEY); }
  cfg.platforms.forEach(p=>{ for(let i=-1;i<=1;i++) this.platforms.create(p[0]+i*40,p[1],TKEY); });

  this.player=this.physics.add.sprite(80,300,HK().idle); this.player._st=null; this.player.invuln=false; this.player.armor=false;
  this.player.setCollideWorldBounds(true);
  const pw=this.player.width||PW, ph=this.player.height||PHH;
  this.player.body.setSize(pw*0.3,ph*0.8).setOffset(pw*0.35,ph*0.2);
  fitHero(this.player);                                            // ужать крупного героя (орангутан) до размера орков
  this.player.on('animationupdate',()=>fitHero(this.player));      // держать размер постоянным на каждом кадре бега
  this.physics.add.collider(this.player,this.platforms);
  this.cpX=80;

  this.boss=null; this.enemies=this.physics.add.group();
  cfg.enemies.forEach(e=>spawnEnemy(this,e));
  this.physics.add.collider(this.enemies,this.platforms);
  this.physics.add.collider(this.player,this.enemies,hitEnemy,null,this);

  this.projs=this.physics.add.group();
  this.physics.add.overlap(this.projs,this.enemies,projHit,null,this);
  this.eprojs=this.physics.add.group();
  this.physics.add.overlap(this.player,this.eprojs,(p,pr)=>{ const px=pr.x; pr.destroy(); hurtPlayer(this,px); },null,this);
  this.physics.add.collider(this.eprojs,this.platforms,pr=>pr.destroy());

  this.hazards=this.physics.add.staticGroup(); this.solids=this.physics.add.staticGroup();
  const OB=this.biomeCfg.obst, GY=412;
  const place=(grp,key,x)=>{ const s=grp.create(x,0,key); s.setPosition(x,GY+6-s.height*0.5); s.refreshBody(); return s; };
  cfg.barriers.forEach(b=>{
    if(b.kind==='spikes'){ const s=place(this.hazards,OB.spikes,b.x); s.body.setSize(s.width*0.82,s.height*0.55).setOffset(s.width*0.09,s.height*0.42); }
    else if(b.kind==='thorn'){ const s=place(this.hazards,OB.thorn,b.x); s.body.setSize(s.width*0.8,s.height*0.6).setOffset(s.width*0.1,s.height*0.35); }
    else if(b.kind==='stone'){ const s=place(this.solids,OB.stone,b.x); s.hp=8; s.breakable=true; }
    else if(b.kind==='palisade'){ place(this.solids,OB.palisade,b.x); }
    else if(b.kind==='gate'){ const g=this.add.image(b.x,0,OB.gate).setDepth(-1).setTint(dim); g.setY(GY+6-g.height*0.5); } // decor, не блокирует
  });
  this.physics.add.overlap(this.player,this.hazards,(p,h)=>hurtPlayer(this,h.x),null,this);
  this.physics.add.collider(this.player,this.solids);
  this.physics.add.collider(this.enemies,this.solids);
  this.physics.add.collider(this.projs,this.solids,(pr,s)=>{ if(s.breakable){ s.hp-=2; if(s.hp<=0)s.destroy(); else {s.setTint(0xffaaaa);this.time.delayedCall(80,()=>{if(s.active)s.clearTint();});} } pr.destroy(); });
  this.physics.add.collider(this.eprojs,this.solids,pr=>pr.destroy());

  this.rocks=this.physics.add.group();                       // катящиеся валуны троллей
  this.physics.add.collider(this.rocks,this.platforms);
  this.physics.add.collider(this.rocks,this.solids,(r,s)=>{ if(s.breakable){ s.hp-=3; if(s.hp<=0)s.destroy(); } r.destroy(); });
  this.physics.add.overlap(this.player,this.rocks,(p,r)=>{ const rx=r.x; r.destroy(); hurtPlayer(this,rx); },null,this);

  this.bananas=this.physics.add.staticGroup();
  cfg.bananas.forEach(b=>this.bananas.create(b[0],b[1],'banana'));
  this.physics.add.overlap(this.player,this.bananas,collectBanana,null,this);
  this.lifeups=this.physics.add.staticGroup();
  cfg.lifeUps.forEach(l=>this.lifeups.create(l[0],l[1],'life'));
  this.physics.add.overlap(this.player,this.lifeups,getLife,null,this);
  if(!cfg.boss){ this.flag=this.physics.add.staticSprite(cfg.flagX,366,'flag'); this.physics.add.overlap(this.player,this.flag,reachFlag,null,this); }

  this.cameras.main.startFollow(this.player,true,0.12,0.12); this.cameras.main.setFollowOffset(-60,0);
  this.cursors=this.input.keyboard.createCursorKeys();
  this.spaceKey=this.input.keyboard.addKey('SPACE');
  this.atkKeys=['X','Z','F'].map(k=>this.input.keyboard.addKey(k));
  this.k1=this.input.keyboard.addKey('ONE'); this.k2=this.input.keyboard.addKey('TWO'); this.buyKey=this.input.keyboard.addKey('B');
  this.nlk=this.input.keyboard.addKey('CLOSED_BRACKET'); this.plk=this.input.keyboard.addKey('OPEN_BRACKET');
  this.input.keyboard.addCapture('X,Z,F,ONE,TWO,B');
  this.input.on('pointerdown',()=>doAttack(this));
  this.atkReady=0;

  this.hud=this.add.text(16,12,'',{fontFamily:'Trebuchet MS, sans-serif',fontSize:'20px',color:'#fff',stroke:'#000',strokeThickness:4}).setScrollFactor(0).setDepth(20);
  updateHud(this);
  this.add.text(16,424,(ADMIN?'[ ] — уровень (admin)   ':'')+'B — броня (500🍌)   I — инвентарь',{fontFamily:'Trebuchet MS',fontSize:'12px',color:'rgba(255,255,255,.7)',stroke:'#000',strokeThickness:2}).setScrollFactor(0).setDepth(20);
  this.add.rectangle(745,24,74,36,0x10241a,0.55).setScrollFactor(0).setDepth(18).setStrokeStyle(1,0x3f9d4a);
  this.whl=this.add.rectangle(728,24,32,32,0x000000,0).setScrollFactor(0).setDepth(19).setStrokeStyle(3,0xffc93c);
  this.wIcons={boomerang:this.add.image(728,24,upgraded?'wi_boom2':'wi_boom').setScrollFactor(0).setDepth(20).setDisplaySize(26,26),
               club:this.add.image(762,24,upgraded?'wi_club2':'wi_club').setScrollFactor(0).setDepth(20).setDisplaySize(26,26)};
  updateWeaponHUD(this);

  if(cfg.boss){ this.add.rectangle(400,30,304,16,0x000000,0.5).setScrollFactor(0).setDepth(20);
    this.bossBar=this.add.rectangle(250,30,300,12,0xff4444).setScrollFactor(0).setDepth(21).setOrigin(0,0.5);
    this.add.text(400,46,this.biomeCfg.bossName,{fontFamily:'Trebuchet MS',fontSize:'12px',color:'#fff',stroke:'#000',strokeThickness:3}).setScrollFactor(0).setOrigin(0.5).setDepth(21); }
  const banner=this.add.text(400,150,cfg.boss?('Уровень '+(currentLevel+1)+'\n'+this.biomeCfg.bossName):('Уровень '+(currentLevel+1)),
    {fontFamily:'Trebuchet MS',fontSize:'34px',color:'#fff',align:'center',stroke:'#1c3a12',strokeThickness:6}).setScrollFactor(0).setOrigin(0.5).setDepth(15);
  this.tweens.add({targets:banner,alpha:0,delay:1300,duration:600,onComplete:()=>banner.destroy()});
}

function spawnEnemy(scene,e){
  const k=e.type, now=scene.time.now;
  const tex={shrimp:'s1',orc:'orc1',thrower:'k_thrower',archer:'k_archer',shield:'k_shield',berserk:'k_berserk',
    troll_club:'t_club',troll_bone:'t_bone',troll_boulder:'t_boulder',
    boss:(scene.biomeCfg&&scene.biomeCfg.boss)||'spider'}[k]||'orc1';
  const s=scene.enemies.create(e.x,e.y,tex); s.setData('type',k); s.setData('min',e.min); s.setData('max',e.max);
  const W=s.width,H=s.height;
  if(k==='shrimp'){ s.hp=1; s.speed=55; s.body.setSize(W*0.72,H*0.62).setOffset(W*0.14,H*0.38); s.setVelocityX(-55); s.play('swim'); }
  else if(k==='orc'){ s.hp=12; s.speed=95; s.chase=165; s.body.setSize(W*0.42,H*0.82).setOffset(W*0.29,H*0.18); s.setVelocityX(-95); s.play('orcwalk'); }
  else if(k==='berserk'){ s.hp=16; s.speed=110; s.chase=235; s.body.setSize(W*0.5,H*0.84).setOffset(W*0.25,H*0.16); }
  else if(k==='shield'){ s.hp=18; s.speed=65; s.chase=95; s.body.setSize(W*0.5,H*0.82).setOffset(W*0.25,H*0.18); s.nextInv=now+2200; }
  else if(k==='thrower'){ s.hp=8; s.speed=95; s.body.setSize(W*0.42,H*0.8).setOffset(W*0.29,H*0.2); s.fireReady=now+800; }
  else if(k==='archer'){ s.hp=8; s.speed=70; s.body.setSize(W*0.42,H*0.8).setOffset(W*0.29,H*0.2); s.fireReady=now+1100; }
  else if(k==='troll_club'||k==='troll_bone'){ s.hp=22; s.speed=66; s.chase=140; s.body.setSize(W*0.5,H*0.78).setOffset(W*0.25,H*0.2); s.setVelocityX(-66); }
  else if(k==='troll_boulder'){ s.hp=18; s.speed=42; s.body.setSize(W*0.5,H*0.78).setOffset(W*0.25,H*0.2); s.fireReady=now+1600; }
  else { s.hp=36; s.speed=95; s.body.setSize(W*0.55,H*0.7).setOffset(W*0.22,H*0.22); s.isBoss=true; scene.boss=s; }
  s.maxhp=s.hp; return s;
}
function spawnSquad(scene,list){ list.forEach(e=>{ const s=spawnEnemy(scene,e); if(s){ s.setAlpha(0); scene.tweens.add({targets:s,alpha:1,duration:280}); } }); }
function fireAt(scene,e,tex,speed){ const dir=scene.player.x<e.x?-1:1;
  const pr=scene.eprojs.create(e.x+dir*16,e.y-4,tex); pr.body.setAllowGravity(false);
  pr.setVelocityX(dir*speed); pr.setFlipX(dir<0); pr.setDepth(5); pr.born=scene.time.now; if(tex==='e_knife')pr.setAngularVelocity(dir*700); }
function fireRock(scene,e){ const dir=scene.player.x<e.x?-1:1;
  const r=scene.rocks.create(e.x+dir*30,e.y+8,'boulder'); r.setVelocityX(dir*235); r.setAngularVelocity(dir*330);
  r.setBounce(0.12); r.setDepth(5); r.born=scene.time.now; }

function update(){
  if(gameOver||paused)return;
  const p=this.player,c=this.cursors, now=this.time.now;
  if(ADMIN){ if(Phaser.Input.Keyboard.JustDown(this.nlk)){ currentLevel=Math.min(currentLevel+1,META.length-1); gameOver=false; this.scene.restart(); return; }
             if(Phaser.Input.Keyboard.JustDown(this.plk)){ currentLevel=Math.max(currentLevel-1,0); gameOver=false; this.scene.restart(); return; } }
  for(const cut of this.cuts){ if(!cut.done && p.x>=cut.x){ cut.done=true; startCut(this,cut); return; } }
  const left=c.left.isDown,right=c.right.isDown;
  if(left){p.setVelocityX(-210);p.setFlipX(true);} else if(right){p.setVelocityX(210);p.setFlipX(false);} else p.setVelocityX(0);
  const onGround=p.body.blocked.down||p.body.touching.down;
  if((c.up.isDown||this.spaceKey.isDown)&&onGround) p.setVelocityY(this.jumpVel);
  if(this.atkKeys.some(k=>Phaser.Input.Keyboard.JustDown(k))) doAttack(this);
  if(Phaser.Input.Keyboard.JustDown(this.k1)){currentWeapon='boomerang';updateWeaponHUD(this);}
  if(Phaser.Input.Keyboard.JustDown(this.k2)){currentWeapon='club';updateWeaponHUD(this);}
  if(Phaser.Input.Keyboard.JustDown(this.buyKey)) activateArmor(this);
  if(p._st!=='attack'){ if(!onGround)setSt(p,'jump'); else if(left||right)setSt(p,'run'); else setSt(p,'idle'); }
  if(onGround && !this.cpInGap(p.x)) this.cpX=Math.max(this.cpX,p.x-30);

  const sx=this.cameras.main.scrollX;
  this.bgFar.tilePositionX=sx*0.1; this.bgMid.tilePositionX=sx*0.35; this.bgFront.tilePositionX=sx*0.6;
  if(p.y>560) pitDeath(this);

  this.enemies.children.iterate(e=>{
    if(!e||!e.active)return;
    if(e.y>720){ if(e.isBoss)this.boss=null; e.disableBody(true,true); return; }
    const t=e.getData('type'),mn=e.getData('min'),mx=e.getData('max');
    const dx=p.x-e.x, dy=p.y-e.y, adx=Math.abs(dx);
    if(t==='shrimp'){ if(e.x<=mn){e.setVelocityX(e.speed);e.setFlipX(false);} else if(e.x>=mx){e.setVelocityX(-e.speed);e.setFlipX(true);} }
    else if(t==='boss'){ if(dx<-8&&e.x>mn)e.setVelocityX(-e.speed); else if(dx>8&&e.x<mx)e.setVelocityX(e.speed); else e.setVelocityX(0); e.setFlipX(dx<0); }
    else if(t==='thrower'||t==='archer'){ const rng=t==='archer'?560:380; e.setFlipX(dx<0);
      if(adx<rng&&Math.abs(dy)<150){ if(adx<120){ e.setVelocityX(dx<0?e.speed:-e.speed); }
        else { e.setVelocityX(0); if(now>e.fireReady){ e.fireReady=now+(t==='archer'?1500:1100); fireAt(this,e,t==='archer'?'e_arrow':'e_knife',t==='archer'?370:270);} } }
      else { if(e.x<=mn){e.setVelocityX(e.speed);} else if(e.x>=mx){e.setVelocityX(-e.speed);} } }
    else if(t==='troll_boulder'){ e.setFlipX(dx<0); const rng=540;
      if(adx<rng&&Math.abs(dy)<175){ if(adx<175){ e.setVelocityX(dx<0?e.speed:-e.speed); }      // отступает
        else { e.setVelocityX(0); if(now>e.fireReady){ e.fireReady=now+2400; fireRock(this,e); } } }
      else { if(e.x<=mn){e.setVelocityX(e.speed);} else if(e.x>=mx){e.setVelocityX(-e.speed);} } }
    else { if(t==='shield'){ if(now>e.nextInv){ e.inv=true; e.invEnd=now+1500; e.nextInv=now+3800; e.setTint(0x9fd8ff); } if(e.inv&&now>e.invEnd){ e.inv=false; e.clearTint(); } }
      const det=440, csp=e.chase||150;
      if(adx<det&&Math.abs(dy)<150){ e.setVelocityX(dx<0?-csp:csp); e.setFlipX(dx<0);
        if(t==='orc'){ if(adx<58){e.anims.stop();e.setTexture('orc3');} else { if(!e.anims.isPlaying||(e.anims.currentAnim&&e.anims.currentAnim.key!=='orcwalk'))e.play('orcwalk'); } } }
      else { if(e.x<=mn){e.setVelocityX(e.speed);e.setFlipX(false);} else if(e.x>=mx){e.setVelocityX(-e.speed);e.setFlipX(true);}
        if(t==='orc'&&(!e.anims.isPlaying||(e.anims.currentAnim&&e.anims.currentAnim.key!=='orcwalk')))e.play('orcwalk'); } }
  });

  this.projs.children.iterate(pr=>{ if(pr&&pr.active&&now-pr.born>1100) pr.destroy(); });
  this.eprojs.children.iterate(pr=>{ if(pr&&pr.active&&now-pr.born>2600) pr.destroy(); });
  if(this.rocks){ const camx=this.cameras.main.scrollX; this.rocks.children.iterate(r=>{ if(r&&r.active&&(now-r.born>5200||r.x<camx-120||r.x>camx+920||r.y>620)) r.destroy(); }); }
  if(this.bossBar&&this.bossBar.active) this.bossBar.setSize(this.boss?Math.max(0,300*(this.boss.hp/this.boss.maxhp)):0,12);
}

function doAttack(scene){
  if(gameOver||paused)return;
  const now=scene.time.now; if(now<scene.atkReady)return; scene.atkReady=now+360;
  const p=scene.player,dir=p.flipX?-1:1, dmg=WEAPONS[currentWeapon].dmg;
  if(currentWeapon==='boomerang'){ const pr=scene.projs.create(p.x+dir*22,p.y-6,'proj'); pr.body.setAllowGravity(false);
    pr.setVelocityX(dir*400); pr.setAngularVelocity(760); pr.setDepth(5); pr.born=now; }
  else { p.setTexture(HK().attack); p._st='attack'; scene.time.delayedCall(240,()=>{ if(p.active)p._st=null; });
    const slash=scene.add.ellipse(p.x+dir*42,p.y-4,64,52,0xffffff,0.55).setDepth(6);
    scene.tweens.add({targets:slash,alpha:0,scaleX:1.5,scaleY:1.5,duration:200,onComplete:()=>slash.destroy()});
    const range=76;
    scene.enemies.children.iterate(e=>{ if(!e||!e.active)return; const ddx=(e.x-p.x)*dir; if(ddx>-10&&ddx<range&&Math.abs(e.y-p.y)<66) damageEnemy(e,dmg); });
    scene.solids.children.iterate(s=>{ if(!s||!s.active||!s.breakable)return; const ddx=(s.x-p.x)*dir; if(ddx>-10&&ddx<range&&Math.abs(s.y-p.y)<70){ s.hp-=dmg+1; if(s.hp<=0)s.destroy(); else {s.setTint(0xffaaaa);scene.time.delayedCall(80,()=>{if(s.active)s.clearTint();});} } }); }
}
function projHit(pr,e){ if(e.inv){ blockSpark(e); pr.destroy(); return; } damageEnemy(e,WEAPONS[currentWeapon].dmg); pr.destroy(); }
function blockSpark(e){ const s=e.scene.add.text(e.x,e.y-30,'✦',{fontFamily:'Trebuchet MS',fontSize:'20px',color:'#bfe3ff'}).setOrigin(0.5).setDepth(7);
  e.scene.tweens.add({targets:s,alpha:0,y:e.y-52,duration:300,onComplete:()=>s.destroy()}); }
function damageEnemy(e,dmg){ const scene=e.scene; if(e.inv){ blockSpark(e); return; }
  e.hp-=dmg; e.setTint(0xff6666); scene.time.delayedCall(110,()=>{ if(e.active&&!e.inv)e.clearTint(); });
  if(e.hp<=0){ const t=e.getData('type'), pts=t==='shrimp'?50:(t==='boss'?700:(t==='berserk'?160:(t.indexOf('troll')===0?200:120))); score+=pts; updateHud(scene); checkUpgrade(scene);
    const boss=e.isBoss; e.disableBody(true,true);
    if(boss){ scene.boss=null; gameOver=true; scene.physics.pause();
      if(currentLevel<META.length-1) window.levelClear(currentLevel+1); else window.showWin(); } } }
function hitEnemy(player,e){ if(player.body.touching.down&&e.body.touching.up){ if(!e.inv)damageEnemy(e,STOMP_DMG); else blockSpark(e); player.setVelocityY(-440); } else hurtPlayer(player.scene,e.x); }
function collectBanana(player,banana){ banana.disableBody(true,true); score+=10; updateHud(player.scene); checkUpgrade(player.scene); }
function getLife(player,l){ l.disableBody(true,true); lives=Math.min(lives+1,9); updateHud(player.scene);
  const t=player.scene.add.text(l.x,l.y-10,'+1 ♥',{fontFamily:'Trebuchet MS',fontSize:'18px',color:'#ff7a93',stroke:'#3a0a14',strokeThickness:4}).setOrigin(0.5).setDepth(15);
  player.scene.tweens.add({targets:t,y:l.y-46,alpha:0,duration:800,onComplete:()=>t.destroy()}); }
function reachFlag(){ if(gameOver)return; gameOver=true; this.physics.pause(); this.player.setVelocity(0,0);
  if(currentLevel<META.length-1) window.levelClear(currentLevel+1); else window.showWin(); }
function hurtPlayer(scene,fromX){ const p=scene.player; if(p.invuln)return; lives-=1; updateHud(scene);
  if(lives<=0){ gameOver=true; scene.physics.pause(); window.showGameOver(); return; }
  const dir=(p.x<fromX)?-1:1; p.setVelocity(dir*200,-260); scene.cameras.main.flash(160,255,80,80);
  p.invuln=true; p.setAlpha(0.5); scene.time.delayedCall(1100,()=>{ if(p.active&&!p.armor){p.invuln=false;p.setAlpha(1);} }); }
function pitDeath(scene){ const p=scene.player; if(p.armor){ p.setVelocity(0,0); p.setPosition(scene.cpX,180); return; }
  if(p.invuln)return; lives-=1; updateHud(scene);
  if(lives<=0){ gameOver=true; scene.physics.pause(); window.showGameOver(); return; }
  p.setVelocity(0,0); p.setPosition(scene.cpX,180); scene.cameras.main.flash(160,120,160,255);
  p.invuln=true; p.setAlpha(0.5); scene.time.delayedCall(900,()=>{ if(p.active&&!p.armor){p.invuln=false;p.setAlpha(1);} }); }
function updateHud(s){ s.hud.setText('Очки: '+score+'    Жизни: '+lives+'    Уровень: '+(currentLevel+1)); }
