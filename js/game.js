/* Банан против орков — игровая логика (Phaser 3).
   Ассеты грузятся из /assets. Пока один файл — в Claude Code первым делом
   можно безопасно разнести по модулям (levels / entities / combat / ui / game). */
const TEX = {"p_idle": "assets/sprites/p_idle.webp", "p_run1": "assets/sprites/p_run1.webp", "p_run2": "assets/sprites/p_run2.webp", "p_run3": "assets/sprites/p_run3.webp", "p_jump": "assets/sprites/p_jump.webp", "p_attack": "assets/sprites/p_attack.webp", "s1": "assets/sprites/s1.webp", "s2": "assets/sprites/s2.webp", "orc1": "assets/sprites/orc1.webp", "orc2": "assets/sprites/orc2.webp", "orc3": "assets/sprites/orc3.webp", "spider": "assets/sprites/spider.webp", "proj": "assets/sprites/proj.webp", "banana": "assets/sprites/banana.webp", "flag": "assets/sprites/flag.webp", "tile": "assets/sprites/tile.webp", "bg_far": "assets/bg/bg_far.webp", "bg_mid": "assets/bg/bg_mid.webp", "bg_front": "assets/bg/bg_front.webp", "k_thrower": "assets/sprites/k_thrower.webp", "k_archer": "assets/sprites/k_archer.webp", "k_shield": "assets/sprites/k_shield.webp", "k_berserk": "assets/sprites/k_berserk.webp", "e_knife": "assets/sprites/e_knife.webp", "e_arrow": "assets/sprites/e_arrow.webp", "b_spikes": "assets/sprites/b_spikes.webp", "b_thorn": "assets/sprites/b_thorn.webp", "b_stone": "assets/sprites/b_stone.webp", "b_palisade": "assets/sprites/b_palisade.webp", "b_gate": "assets/sprites/b_gate.webp", "wi_boom2": "assets/sprites/wi_boom2.webp", "wi_club2": "assets/sprites/wi_club2.webp", "wi_boom": "assets/sprites/wi_boom.webp", "wi_club": "assets/sprites/wi_club.webp"};
Object.assign(TEX,{
  swamp_far:'assets/bg/swamp_far.webp', swamp_mid:'assets/bg/swamp_mid.webp', swamp_front:'assets/bg/swamp_front.webp',
  tile_swamp:'assets/sprites/tile_swamp.webp',
  b_spikes_swamp:'assets/sprites/b_spikes_swamp.webp', b_thorn_swamp:'assets/sprites/b_thorn_swamp.webp',
  b_stone_swamp:'assets/sprites/b_stone_swamp.webp', b_palisade_swamp:'assets/sprites/b_palisade_swamp.webp',
  b_gate_swamp:'assets/sprites/b_gate_swamp.webp',
  t_club:'assets/sprites/t_club.webp', t_bone:'assets/sprites/t_bone.webp', t_boulder:'assets/sprites/t_boulder.webp',
  boss_troll:'assets/sprites/boss_troll.webp', boulder:'assets/sprites/boulder.webp',
  t_club2:'assets/sprites/t_club2.webp', t_club3:'assets/sprites/t_club3.webp', t_bone2:'assets/sprites/t_bone2.webp', t_bone3:'assets/sprites/t_bone3.webp',
  t_boulder2:'assets/sprites/t_boulder2.webp', t_boulder3:'assets/sprites/t_boulder3.webp', boss_troll2:'assets/sprites/boss_troll2.webp', boss_troll3:'assets/sprites/boss_troll3.webp',
  boss_spider:'assets/sprites/boss_spider.webp', boss_spider2:'assets/sprites/boss_spider2.webp', boss_spider3:'assets/sprites/boss_spider3.webp',
  boss_king:'assets/sprites/boss_king.webp', boss_king2:'assets/sprites/boss_king2.webp', boss_king3:'assets/sprites/boss_king3.webp',
  boss_crystal:'assets/sprites/boss_crystal.webp', boss_crystal2:'assets/sprites/boss_crystal2.webp', boss_crystal3:'assets/sprites/boss_crystal3.webp',
  boss_ice:'assets/sprites/boss_ice.webp', boss_ice2:'assets/sprites/boss_ice2.webp', boss_ice3:'assets/sprites/boss_ice3.webp',
  boss_warlord:'assets/sprites/boss_warlord.webp', boss_warlord2:'assets/sprites/boss_warlord2.webp', boss_warlord3:'assets/sprites/boss_warlord3.webp',
  sky_far:'assets/bg/sky_far.webp', sky_mid:'assets/bg/sky_mid.webp', sky_front:'assets/bg/sky_front.webp',
  tile_sky:'assets/sprites/tile_sky.webp',
  b_spikes_sky:'assets/sprites/b_spikes_sky.webp', b_thorn_sky:'assets/sprites/b_thorn_sky.webp',
  b_stone_sky:'assets/sprites/b_stone_sky.webp', b_palisade_sky:'assets/sprites/b_palisade_sky.webp',
  b_gate_sky:'assets/sprites/b_gate_sky.webp',
  k_berserk_swamp:'assets/sprites/k_berserk_swamp.webp', k_thrower_swamp:'assets/sprites/k_thrower_swamp.webp',
  k_archer_swamp:'assets/sprites/k_archer_swamp.webp', k_shield_swamp:'assets/sprites/k_shield_swamp.webp',
  orc1_swamp:'assets/sprites/orc1_swamp.webp', orc2_swamp:'assets/sprites/orc2_swamp.webp', orc3_swamp:'assets/sprites/orc3_swamp.webp',
  k_berserk_swamp2:'assets/sprites/k_berserk_swamp2.webp', k_thrower_swamp2:'assets/sprites/k_thrower_swamp2.webp',
  k_archer_swamp2:'assets/sprites/k_archer_swamp2.webp', k_shield_swamp2:'assets/sprites/k_shield_swamp2.webp',
  k_berserk_ice:'assets/sprites/k_berserk_ice.webp', k_berserk_ice2:'assets/sprites/k_berserk_ice2.webp',
  k_thrower_ice:'assets/sprites/k_thrower_ice.webp', k_thrower_ice2:'assets/sprites/k_thrower_ice2.webp',
  k_archer_ice:'assets/sprites/k_archer_ice.webp', k_archer_ice2:'assets/sprites/k_archer_ice2.webp',
  k_shield_ice:'assets/sprites/k_shield_ice.webp', k_shield_ice2:'assets/sprites/k_shield_ice2.webp',
  k_berserk_sky:'assets/sprites/k_berserk_sky.webp', k_berserk_sky2:'assets/sprites/k_berserk_sky2.webp',
  k_thrower_sky:'assets/sprites/k_thrower_sky.webp', k_thrower_sky2:'assets/sprites/k_thrower_sky2.webp',
  k_archer_sky:'assets/sprites/k_archer_sky.webp', k_archer_sky2:'assets/sprites/k_archer_sky2.webp',
  k_shield_sky:'assets/sprites/k_shield_sky.webp', k_shield_sky2:'assets/sprites/k_shield_sky2.webp',
  orc1_ice:'assets/sprites/orc1_ice.webp', orc2_ice:'assets/sprites/orc2_ice.webp', orc3_ice:'assets/sprites/orc3_ice.webp',
  orc1_sky:'assets/sprites/orc1_sky.webp', orc2_sky:'assets/sprites/orc2_sky.webp', orc3_sky:'assets/sprites/orc3_sky.webp',
  k_berserk2:'assets/sprites/k_berserk2.webp', k_thrower2:'assets/sprites/k_thrower2.webp',
  k_archer2:'assets/sprites/k_archer2.webp', k_shield2:'assets/sprites/k_shield2.webp',
  k_berserk3:'assets/sprites/k_berserk3.webp', k_shield3:'assets/sprites/k_shield3.webp',
  k_berserk_swamp3:'assets/sprites/k_berserk_swamp3.webp', k_shield_swamp3:'assets/sprites/k_shield_swamp3.webp',
  k_berserk_ice3:'assets/sprites/k_berserk_ice3.webp', k_shield_ice3:'assets/sprites/k_shield_ice3.webp',
  k_berserk_sky3:'assets/sprites/k_berserk_sky3.webp', k_shield_sky3:'assets/sprites/k_shield_sky3.webp',
  cave_far:'assets/bg/cave_far.webp', cave_mid:'assets/bg/cave_mid.webp', cave_front:'assets/bg/cave_front.webp',
  tile_cave:'assets/sprites/tile_cave.webp',
  b_spikes_cave:'assets/sprites/b_spikes_cave.webp', b_thorn_cave:'assets/sprites/b_thorn_cave.webp',
  b_stone_cave:'assets/sprites/b_stone_cave.webp', b_palisade_cave:'assets/sprites/b_palisade_cave.webp',
  b_gate_cave:'assets/sprites/b_gate_cave.webp',
  ice_far:'assets/bg/ice_far.webp', ice_mid:'assets/bg/ice_mid.webp', ice_front:'assets/bg/ice_front.webp',
  tile_ice:'assets/sprites/tile_ice.webp',
  b_spikes_ice:'assets/sprites/b_spikes_ice.webp', b_thorn_ice:'assets/sprites/b_thorn_ice.webp',
  b_stone_ice:'assets/sprites/b_stone_ice.webp', b_palisade_ice:'assets/sprites/b_palisade_ice.webp',
  b_gate_ice:'assets/sprites/b_gate_ice.webp',
  plat_cave:'assets/sprites/plat_cave.webp', plat_ice:'assets/sprites/plat_ice.webp', plat_swamp:'assets/sprites/plat_swamp.webp',
  cl_idle:'assets/sprites/cl_idle.webp', cl_run1:'assets/sprites/cl_run1.webp', cl_run2:'assets/sprites/cl_run2.webp', cl_jump:'assets/sprites/cl_jump.webp', cl_attack:'assets/sprites/cl_attack.webp',
  gd_idle:'assets/sprites/gd_idle.webp', gd_run1:'assets/sprites/gd_run1.webp', gd_run2:'assets/sprites/gd_run2.webp', gd_jump:'assets/sprites/gd_jump.webp', gd_attack:'assets/sprites/gd_attack.webp',
  dk_idle:'assets/sprites/dk_idle.webp', dk_run1:'assets/sprites/dk_run1.webp', dk_run2:'assets/sprites/dk_run2.webp', dk_jump:'assets/sprites/dk_jump.webp', dk_attack:'assets/sprites/dk_attack.webp',
  cl_nb_idle:'assets/sprites/cl_nb_idle.webp', cl_nb_run1:'assets/sprites/cl_nb_run1.webp', cl_nb_run2:'assets/sprites/cl_nb_run2.webp', cl_nb_jump:'assets/sprites/cl_nb_jump.webp', cl_nb_attack:'assets/sprites/cl_nb_attack.webp',
  gd_nb_idle:'assets/sprites/gd_nb_idle.webp', gd_nb_run1:'assets/sprites/gd_nb_run1.webp', gd_nb_run2:'assets/sprites/gd_nb_run2.webp', gd_nb_jump:'assets/sprites/gd_nb_jump.webp', gd_nb_attack:'assets/sprites/gd_nb_attack.webp',
  dk_nb_idle:'assets/sprites/dk_nb_idle.webp', dk_nb_run1:'assets/sprites/dk_nb_run1.webp', dk_nb_run2:'assets/sprites/dk_nb_run2.webp', dk_nb_jump:'assets/sprites/dk_nb_jump.webp', dk_nb_attack:'assets/sprites/dk_nb_attack.webp',
  wi_sword:'assets/sprites/wi_sword.webp'
});
// враги со своей покадровой анимацией (2 кадра): базовая текстура -> кадры
const ENEMY_ANIMS={};
['berserk','thrower','archer','shield'].forEach(u=>{ ENEMY_ANIMS['k_'+u]=['k_'+u,'k_'+u+'2']; });   // джунгли (без суффикса)
['swamp','ice','sky'].forEach(b=>['berserk','thrower','archer','shield'].forEach(u=>{
  ENEMY_ANIMS['k_'+u+'_'+b]=['k_'+u+'_'+b, 'k_'+u+'_'+b+'2']; }));
['t_club','t_bone','t_boulder','boss_troll'].forEach(t=>{ ENEMY_ANIMS[t]=[t,t+'2']; });   // тролли — ходьба
['boss_spider','boss_king','boss_crystal','boss_ice','boss_warlord'].forEach(b=>{ ENEMY_ANIMS[b]=[b,b+'2']; });   // боссы блоков — ходьба + кадр атаки (b+'3')
const MENTOR = {"Чичо":"assets/portraits/chicho.webp","Доня":"assets/portraits/donya.webp"};
// портреты в диалогах — реальные игровые модели (орк / обезьяна-орангутан)
const ORC="assets/sprites/orc1.webp", HERO="assets/sprites/cl_idle.webp";
const WI={boom:"assets/sprites/wi_boom.webp",club:"assets/sprites/wi_club.webp",boom2:"assets/sprites/wi_boom2.webp",club2:"assets/sprites/wi_club2.webp"};
const PW=109, PHH=62;
/* ---- персонажи (выбор героя) ---- */
// у скинов два набора кадров: sword (с мечом — ближнее оружие) и banana (без оружия — метательное)
const HEROES={
  mono:{name:'Обезьянка Бана', idle:'p_idle', run:['p_run1','p_run2','p_run3'], jump:'p_jump', attack:'p_attack', files:null},
  classic:{name:'Орангутан',
    sword:{idle:'cl_idle',run:['cl_run1','cl_run2'],jump:'cl_jump',attack:'cl_attack'},
    banana:{idle:'cl_nb_idle',run:['cl_nb_run1','cl_nb_run2'],jump:'cl_nb_jump',attack:'cl_nb_attack'}},
  gold:{name:'Золотой чемпион',
    sword:{idle:'gd_idle',run:['gd_run1','gd_run2'],jump:'gd_jump',attack:'gd_attack'},
    banana:{idle:'gd_nb_idle',run:['gd_nb_run1','gd_nb_run2'],jump:'gd_nb_jump',attack:'gd_nb_attack'}},
  dark:{name:'Чёрный рыцарь',
    sword:{idle:'dk_idle',run:['dk_run1','dk_run2'],jump:'dk_jump',attack:'dk_attack'},
    banana:{idle:'dk_nb_idle',run:['dk_nb_run1','dk_nb_run2'],jump:'dk_nb_jump',attack:'dk_nb_attack'}}
};
const SKINS=[ {id:'classic',name:'Классический',unlock:0}, {id:'gold',name:'Золотой',unlock:4}, {id:'dark',name:'Чёрный рыцарь',unlock:12} ];  // unlock = индекс уровня, по достижении которого образ открывается
let selectedHero='classic';
function HK(){ const h=HEROES[selectedHero]||HEROES.classic;
  if(h.sword) return (currentWeapon==='boomerang')?h.banana:h.sword;   // банан (бумеранг) -> без меча; меч (дубина) -> с мечом
  return h; }
function heroAnimKey(){ return 'run_'+selectedHero+'_'+(currentWeapon==='boomerang'?'b':'s'); }
function skinCardImg(id){ const h=HEROES[id]; return 'assets/sprites/'+(h.sword?h.sword.idle:h.idle)+'.webp'; }
function applyHeroLook(scene){ if(!scene||!scene.player)return; const p=scene.player;   // обновить облик героя под текущий скин/оружие
  const rk=heroAnimKey(); if(!scene.anims.exists(rk)) scene.anims.create({key:rk,frames:HK().run.map(k=>({key:k})),frameRate:9,repeat:-1});
  p._st=null; p.anims.stop(); p.setTexture(HK().idle); fitHero(p); }
const HERO_DH={ classic:62, gold:62, dark:62 };   // целевая экранная высота героя в px; моно — нативный размер
let maxLevel=(()=>{ try{ return (+localStorage.getItem('banane_maxlvl'))||0; }catch(e){ return 0; } })();
function bumpMaxLevel(){ if(typeof currentLevel==='number' && currentLevel>maxLevel){ maxLevel=currentLevel; try{localStorage.setItem('banane_maxlvl',String(maxLevel));}catch(e){} } }
function skinUnlocked(id){ const s=SKINS.find(k=>k.id===id); return !s || maxLevel>=s.unlock; }
const ADMIN=true;                 // dev-only level switching; set false for players
const STOMP_DMG=6;   // прыжок сверху — ощутимый урон
const HERO_MAXHP=100, START_LIVES=3;          // у героя полоска HP; жизни = число респаунов на чекпоинте
const DMG={contact:22, proj:16, hazard:26};   // урон по герою от разных источников
const WEAPONS={boomerang:{dmg:2,level:1},club:{dmg:2,level:1}};
const WEAPON_LIST=[
 {id:'boomerang',name:'Банан',unlocked:true},
 {id:'club',name:'Меч',unlocked:true},
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
let score=0, lives=3, heroHP=HERO_MAXHP, gameOver=false, paused=false, pauseReason=null;
// временные эффекты из магазина наград (сбрасываются в начале уровня)
let scoreMul=1, dmgMul=1, heroSpeedMul=1, heroJumpMul=1, magnetUntil=0;
function resetPerks(s){ scoreMul=1; dmgMul=1; heroSpeedMul=1; heroJumpMul=1; magnetUntil=0; if(s)s.freezeUntil=0; }
const TOUCH={left:false,right:false,jump:false};   // состояние сенсорных кнопок (читается в update)
const show=id=>document.getElementById(id).classList.add('show');
const hide=id=>document.getElementById(id).classList.remove('show');
// экран загрузки: 'game' (логотип, первый запуск) / 'level' (путь по биомам, между уровнями)
const LOADBG={game:'assets/ui/gameload.webp', level:'assets/ui/levelload.webp'};
let loadShownAt=0;
function showLoad(kind){ const ls=document.getElementById('loadscreen'); if(!ls)return;
  document.getElementById('loadImg').src=LOADBG[kind]||LOADBG.level; ls.classList.add('show'); loadShownAt=Date.now(); }
function hideLoad(){ const ls=document.getElementById('loadscreen'); if(!ls)return;
  setTimeout(()=>ls.classList.remove('show'), Math.max(0,650-(Date.now()-loadShownAt))); }

/* ---- музыка (HTML5 Audio, луп + кроссфейд по биомам) ---- */
// слот -> файл в assets/audio/. Меняй раскладку здесь, файлы переименовывать не нужно.
const MUSIC={ menu:'moonstone', jungle:'moonstone', swamp:'miregate2', cave:'cloudgate3', ice:'miregate4', sky:'cloudgate5' };
const MUSIC_DIR='assets/audio/', MUS_VOL=0.5;
let musMuted=(localStorage.getItem('mute')==='1'), musTracks={}, musCurSlug=null, musCurEl=null, musInteracted=false, musFadeIv=null;
function musTrack(slug){ if(!musTracks[slug]){ const a=new Audio(MUSIC_DIR+slug+'.mp3'); a.loop=true; a.preload='auto'; a.volume=0; musTracks[slug]=a; } return musTracks[slug]; }
function playMusic(slot){ const slug=MUSIC[slot]; if(!slug||slug===musCurSlug) return;
  const prev=musCurEl, next=musTrack(slug); musCurSlug=slug; musCurEl=next;
  if(musMuted||!musInteracted) return;   // стартуем при первом взаимодействии (политика автоплея)
  musFade(next,prev); }
function musFade(next,prev){ if(musFadeIv)clearInterval(musFadeIv);
  try{ next.currentTime=0; }catch(e){} next.volume=0; const p=next.play(); if(p&&p.catch)p.catch(()=>{});
  const t0=Date.now(), dur=700, fromPrev=prev?prev.volume:0;
  musFadeIv=setInterval(()=>{ const k=Math.min(1,(Date.now()-t0)/dur);
    next.volume=musMuted?0:MUS_VOL*k; if(prev&&prev!==next) prev.volume=fromPrev*(1-k);
    if(k>=1){ clearInterval(musFadeIv); musFadeIv=null; if(prev&&prev!==next)prev.pause(); } },40); }
function musStart(){ audioInit(); if(musInteracted)return; musInteracted=true; if(!musMuted&&musCurEl)musFade(musCurEl,null); }
function musToggle(){ musMuted=!musMuted; localStorage.setItem('mute',musMuted?'1':'0');
  if(musMuted){ for(const k in musTracks)musTracks[k].pause(); }
  else { musInteracted=true; if(musCurEl)musFade(musCurEl,null); }
  const b=document.getElementById('muteBtn'); if(b)b.textContent=musMuted?'🔇':'🔊'; }
['pointerdown','keydown','touchstart'].forEach(ev=>window.addEventListener(ev,musStart));
(function(){ const b=document.getElementById('muteBtn'); if(b){ b.textContent=musMuted?'🔇':'🔊'; b.onclick=e=>{e.stopPropagation();musToggle();}; }
  playMusic('menu'); })();

/* ---- звуковые эффекты (синтез через Web Audio, без файлов) ---- */
let AC=null, sfxGain=null;
function audioInit(){ if(AC)return; try{ AC=new (window.AudioContext||window.webkitAudioContext)();
    sfxGain=AC.createGain(); sfxGain.gain.value=0.32; sfxGain.connect(AC.destination); }catch(e){ AC=null; }
  if(AC&&AC.state==='suspended'){ try{ AC.resume(); }catch(e){} } }
// тон с огибающей частоты и громкости
function blip(type,f0,f1,dur,vol,delay){ if(!AC||musMuted)return; const t=AC.currentTime+(delay||0);
  const o=AC.createOscillator(), g=AC.createGain();
  o.type=type||'square'; o.frequency.setValueAtTime(f0,t);
  if(f1&&f1!==f0) o.frequency.exponentialRampToValueAtTime(Math.max(1,f1),t+dur);
  g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(vol||0.3,t+0.008);
  g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  o.connect(g); g.connect(sfxGain); o.start(t); o.stop(t+dur+0.03); }
// шумовой всплеск (взмах/удар/взрыв)
function noise(dur,vol,freq,delay){ if(!AC||musMuted)return; const t=AC.currentTime+(delay||0);
  const n=Math.max(1,Math.floor(AC.sampleRate*dur)), buf=AC.createBuffer(1,n,AC.sampleRate), d=buf.getChannelData(0);
  for(let i=0;i<n;i++) d[i]=(Math.random()*2-1)*(1-i/n);
  const src=AC.createBufferSource(); src.buffer=buf;
  const f=AC.createBiquadFilter(); f.type='bandpass'; f.frequency.value=freq||800; f.Q.value=0.7;
  const g=AC.createGain(); g.gain.setValueAtTime(vol||0.3,t); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  src.connect(f); f.connect(g); g.connect(sfxGain); src.start(t); src.stop(t+dur+0.03); }
function sfx(name){ if(!AC||musMuted)return;
  switch(name){
    case 'jump':    blip('square',360,720,0.16,0.22); break;
    case 'throw':   blip('triangle',300,880,0.13,0.2); break;            // бросок банана-бумеранга
    case 'swing':   noise(0.12,0.28,1500); break;                        // взмах меча/дубины
    case 'stomp':   blip('sine',230,70,0.18,0.4); noise(0.07,0.18,260); break;
    case 'hit':     blip('square',210,150,0.07,0.28); break;             // попадание по врагу
    case 'block':   blip('square',950,1350,0.06,0.16); break;            // клинк по щиту/камню
    case 'enemyDie':blip('sawtooth',430,90,0.26,0.28); break;
    case 'bossDie': blip('sawtooth',300,45,0.7,0.4); noise(0.5,0.3,180); break;
    case 'banana':  blip('square',880,880,0.05,0.2); blip('square',1320,1320,0.09,0.2,0.05); break; // динь-динь
    case 'life':    [523,659,784,1046].forEach((f,i)=>blip('triangle',f,f,0.12,0.22,i*0.07)); break;  // джингл
    case 'hurt':    blip('sawtooth',190,90,0.2,0.32); noise(0.08,0.15,400); break;                    // урон/попадание стрелы
    case 'die':     blip('sawtooth',320,55,0.6,0.38); break;             // потеря жизни
    case 'perk':    [392,523,659,880].forEach((f,i)=>blip('square',f,f,0.1,0.2,i*0.05)); break;       // покупка награды
    case 'armor':   blip('sine',500,1000,0.3,0.28); blip('sine',1000,1400,0.25,0.18,0.1); break;
    case 'win':     [523,659,784,1046,1318].forEach((f,i)=>blip('triangle',f,f,0.16,0.26,i*0.11)); break; // фанфары
    case 'break':   noise(0.18,0.3,500); blip('square',160,80,0.14,0.22); break;                      // разлом барьера
    case 'checkpoint': blip('triangle',660,660,0.1,0.22); blip('triangle',990,990,0.14,0.22,0.08); break;
  } }

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
// герой один — орангутан; экран выбора убран
document.getElementById('startBtn').onclick=()=>{ selectedHero='classic'; hide('title'); playCinematic(INTRO_STORY,showTutorial); };   // ролик -> обучение -> игра (без выбора оружия)
function showTutorial(){ show('tutorial'); }
document.getElementById('tutStart').onclick=()=>{ hide('tutorial'); startGame('boomerang'); };   // стартовое оружие — банан-бумеранг, меняется клавишей 2 / в инвентаре
function refreshSoundBtn(){ const b=document.getElementById('soundBtn'); if(b)b.textContent='Звук: '+(musMuted?'выкл':'вкл'); }
(function(){ const sb=document.getElementById('soundBtn'); if(sb){ refreshSoundBtn(); sb.onclick=e=>{ e.stopPropagation(); musToggle(); refreshSoundBtn(); }; }
  const xb=document.getElementById('exitBtn'); if(xb) xb.onclick=()=>{ try{ for(const k in musTracks)musTracks[k].pause(); }catch(e){} hide('title'); show('byeScreen'); try{ window.close(); }catch(e){} };
  const yb=document.getElementById('byeBtn'); if(yb) yb.onclick=()=>{ hide('byeScreen'); show('title'); }; })();
document.getElementById('introNext').onclick=nextStory;
document.getElementById('introSkip').onclick=()=>{hide('intro');show('dialogue');};
function pick(w){chosenWeapon=w;currentWeapon=w;hide('dialogue');playCinematic(INTRO_STORY,()=>startGame(w));}
document.getElementById('chooseBoomerang').onclick=()=>pick('boomerang');
document.getElementById('chooseClub').onclick=()=>pick('club');
['chooseBoomerang','chooseClub'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{
  if(e.key==='Enter'||e.key===' '){e.preventDefault();document.getElementById(id).click();}}));

/* ---- inventory ---- */
function weaponIconURI(id){ if(id==='boomerang')return 'assets/sprites/banana.webp'; if(id==='club')return 'assets/sprites/wi_sword.webp'; return null; }
function buildInvGrid(){
  const g=document.getElementById('invGrid'); g.innerHTML='';
  WEAPON_LIST.forEach(w=>{
    const card=document.createElement('div'); card.className='invCard'+(w.unlocked?'':' locked')+(w.id===currentWeapon?' sel':'');
    if(w.unlocked){ const im=document.createElement('img'); im.src=weaponIconURI(w.id); card.appendChild(im);
      card.onclick=()=>{ currentWeapon=w.id; if(activeScene){updateWeaponHUD(activeScene);applyHeroLook(activeScene);} closeInventory(); };
    } else { const lk=document.createElement('div'); lk.className='lk'; lk.textContent='🔒'; card.appendChild(lk); }
    const nm=document.createElement('div'); nm.className='nm'; nm.textContent=w.name; card.appendChild(nm);
    g.appendChild(card);
  });
}
function buildSkinGrid(){
  const g=document.getElementById('skinGrid'); if(!g)return; g.innerHTML='';
  SKINS.forEach(sk=>{ const open=skinUnlocked(sk.id);
    const card=document.createElement('div'); card.className='invCard'+(open?'':' locked')+(sk.id===selectedHero?' sel':'');
    if(open){ const im=document.createElement('img'); im.src=skinCardImg(sk.id); card.appendChild(im);
      card.onclick=()=>selectSkin(sk.id); }
    else { const lk=document.createElement('div'); lk.className='lk'; lk.textContent='🔒'; card.appendChild(lk); }
    const nm=document.createElement('div'); nm.className='nm'; nm.textContent=open?sk.name:('Блок '+(Math.floor(sk.unlock/4)+1)); card.appendChild(nm);
    g.appendChild(card);
  });
}
function selectSkin(id){ if(!skinUnlocked(id))return; selectedHero=id; applyHeroLook(activeScene); buildSkinGrid(); }

/* ---- магазин наград (тратим очки за бананы/убийства) ---- */
function _timed(s,fn,ms){ s.time.delayedCall(ms,fn); }
function grantInvuln(s,ms){ const p=s.player; if(!p)return; sfx('armor'); p.invuln=true; p.armor=true; p.setTint(0xffe27a);
  _timed(s,()=>{ if(p.active){ p.armor=false; p.invuln=false; p.clearTint(); } },ms); }
function perkBanner(s,txt){ const t=s.add.text(400,108,txt,{fontFamily:'"Russo One","Trebuchet MS",sans-serif',fontSize:'18px',color:'#ffe27a',stroke:'#3a2a08',strokeThickness:5}).setScrollFactor(0).setOrigin(0.5).setDepth(22);
  s.tweens.add({targets:t,y:88,alpha:0,duration:1100,onComplete:()=>t.destroy()}); }
function bananaStorm(s){ const x0=s.cameras.main.scrollX-60, x1=s.cameras.main.scrollX+860;
  s.enemies.children.iterate(e=>{ if(e&&e.active&&e.x>x0&&e.x<x1) damageEnemy(e,e.isBoss?8:99); });
  s.cameras.main.flash(240,255,232,120); return true; }
function freezeEnemies(s,ms){ s.freezeUntil=s.time.now+ms;
  _timed(s,()=>{ if(s.enemies) s.enemies.children.iterate(e=>{ if(e&&e.active)e.clearTint(); }); },ms); return true; }
const PERKS=[
  {id:'heal',  icon:'💚', name:'Полное здоровье',          cost:150, fn:s=>{ heroHP=HERO_MAXHP; return true; }},
  {id:'shield',icon:'🛡️', name:'Бессмертие 5 сек',          cost:300, fn:s=>{ grantInvuln(s,5000); return true; }},
  {id:'life',  icon:'❤️', name:'+1 жизнь',                  cost:350, fn:s=>{ lives=Math.min(lives+1,9); return true; }},
  {id:'rage',  icon:'⚔️', name:'Ярость ×2 урон · 12 сек',   cost:300, fn:s=>{ dmgMul=2; _timed(s,()=>dmgMul=1,12000); return true; }},
  {id:'speed', icon:'👟', name:'Скорость +60% · 12 сек',    cost:200, fn:s=>{ heroSpeedMul=1.6; _timed(s,()=>heroSpeedMul=1,12000); return true; }},
  {id:'jump',  icon:'🦘', name:'Супер-прыжок · 12 сек',     cost:200, fn:s=>{ heroJumpMul=1.35; _timed(s,()=>heroJumpMul=1,12000); return true; }},
  {id:'magnet',icon:'🧲', name:'Магнит бананов · 15 сек',   cost:200, fn:s=>{ magnetUntil=s.time.now+15000; return true; }},
  {id:'freeze',icon:'❄️', name:'Заморозка врагов · 6 сек',  cost:350, fn:s=>freezeEnemies(s,6000)},
  {id:'storm', icon:'🍌', name:'Банановый шторм (урон всем)',cost:500, fn:bananaStorm},
  {id:'x2',    icon:'✨', name:'Двойные очки · 20 сек',      cost:300, fn:s=>{ scoreMul=2; _timed(s,()=>scoreMul=1,20000); return true; }}
];
function buildShopGrid(){ const g=document.getElementById('shopGrid'); if(!g)return; g.innerHTML='';
  const bal=document.getElementById('shopBal'); if(bal)bal.textContent='· у тебя '+score+' 🍌';
  PERKS.forEach(pk=>{ const ok=score>=pk.cost;
    const card=document.createElement('div'); card.className='invCard perkCard'+(ok?'':' locked');
    const ic=document.createElement('div'); ic.className='perkIcon'; ic.textContent=pk.icon; card.appendChild(ic);
    const nm=document.createElement('div'); nm.className='nm'; nm.textContent=pk.name; card.appendChild(nm);
    const ct=document.createElement('div'); ct.className='cost'; ct.textContent=pk.cost+' 🍌'; card.appendChild(ct);
    if(ok) card.onclick=()=>buyPerk(pk.id);
    g.appendChild(card); }); }
function buyPerk(id){ const pk=PERKS.find(p=>p.id===id); if(!pk||!activeScene||score<pk.cost)return;
  const s=activeScene; closeInventory();   // закрываем магазин и запускаем эффект в бою
  score-=pk.cost; if(pk.fn(s)===false){ score+=pk.cost; } else { perkBanner(s,pk.icon+' '+pk.name); sfx('perk'); }
  updateHud(s); }
function openInventory(){ if(paused||!activeScene||gameOver)return; paused=true; pauseReason='inv'; activeScene.physics.pause(); buildInvGrid(); buildSkinGrid(); buildShopGrid(); show('inventory'); }
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
const CINEMATICS={ 4:{ endLabel:'В бой ▶',
  panels:['assets/cutscenes/c_swamp1.webp','assets/cutscenes/c_swamp2.webp','assets/cutscenes/c_swamp3.webp','assets/cutscenes/c_swamp4.webp','assets/cutscenes/c_swamp5.webp'],
  texts:['Там, где когда-то цвели джунгли его детства, теперь чернела топь. Орки осушили живой лес до гнили и тлена. Банан ступил на шаткий мост — и сердце сжалось: от родного дома остались лишь мёртвые деревья да чужие флаги вдали.',
         'За пеленой тумана он увидел то, от чего застыла кровь: клетки. Звери Долины — соседи, друзья его детства — томились в неволе, согнанные орками на работы. Их глаза давно разучились надеяться.',
         'Ярость вспыхнула в груди. Банан ворвался в лагерь, и плечом к плечу встал верный Мастер Бо. Орки не ждали бури — а буря не щадила. Замки трещали, клетки распахивались: с каждым ударом возвращалась свобода.',
         'Освобождённые звери обступили героя, дрожа и плача от счастья. «Спасибо… но мы не последние», — шептали они, указывая во тьму топей. «Там, дальше, ещё сотни наших. Все ждут. Все верят, что кто-то придёт».',
         'Банан поднялся на утёс и окинул взглядом бескрайнюю топь, тонущую в рассвете. Где-то там, в дыму и тумане, томились его братья и сёстры. Он сжал оружие. «Я приду за каждым. Слышите? За каждым».'] },
  8:{ endLabel:'В бой ▶',
  panels:['assets/cutscenes/c_cave1.webp','assets/cutscenes/c_cave2.webp','assets/cutscenes/c_cave3.webp','assets/cutscenes/c_cave4.webp','assets/cutscenes/c_cave5.webp'],
  texts:['У самого входа в пещеры Банана встретили беглецы — измождённые, перепачканные рудой звери. «Ты тот самый? — выдохнул старший. — Тот, кто ломает клетки?» Их дрожащие лапы тянулись к нему, как к последней надежде.',
         'В тусклом свете фонаря они рассказали страшное: глубоко в рудниках орки согнали сотни пленников — копать руду до последнего вздоха. «Там наши дети, наши старики. Они не продержатся долго».',
         'Решение пришло само. «Дрём, Бо — выводите спасённых к свету. Я задержу орков». Ленивец и панда повели колонну измученных зверей прочь, в безопасность, — а Банан остался один лицом к тьме.',
         'Он вышел к сердцу рудника — и замер. Внизу кишела целая армия орков: кузни, цепи, плети надсмотрщиков. Один против тысячи. Но за его спиной уходили те, кого он поклялся спасти.',
         'Банан крепче сжал оружие и шагнул навстречу орде. «Бегите и не оглядывайтесь, — шепнул он друзьям. — Я куплю вам время. Столько, сколько смогу». И кристальная пещера вспыхнула от первого удара.'] },
  12:{ endLabel:'В бой ▶',
  panels:['assets/cutscenes/c_ice1.webp','assets/cutscenes/c_ice2.webp','assets/cutscenes/c_ice3.webp','assets/cutscenes/c_ice4.webp','assets/cutscenes/c_ice5.webp'],
  texts:['Дальше дорога вела в стылую белую тишину. Там, где Банан помнил тёплые джунгли и пение птиц, теперь застыл ледник — пальмы вмёрзли в лёд, реки окаменели. Холод пробирал не кожу, а саму память.',
         'У замёрзшего пруда он опустился на колено. Подо льдом ещё теплился крошечный огонёк — последний живой цветок Долины. И вдруг воздух задрожал, наполняясь тёплым светом…',
         'Из сияния северного неба вышли двое. Банан узнал их сразу — сердцем, которое помнило их всю жизнь. Мама. Папа. Духи родителей, которых орки забрали в ту страшную ночь.',
         '«Сынок… как же ты вырос. Мы гордимся тобой», — прошелестели они, окутывая его тёплым светом. По щекам героя покатились слёзы: впервые за долгие годы он снова был просто их ребёнком.',
         'Банан поднялся и вскинул меч к небу, и слёзы его блеснули сталью. «Ради вас я верну Долине весну! Растоплю этот лёд, верну нашу природу! ОРКИ — ПАДУТ!» Духи улыбнулись — и растаяли в рассвете.'] },
  16:{ endLabel:'В бой ▶',
  panels:['assets/cutscenes/c_sky1.webp','assets/cutscenes/c_sky2.webp','assets/cutscenes/c_sky3.webp','assets/cutscenes/c_sky4.webp','assets/cutscenes/c_sky5.webp','assets/cutscenes/c_sky6.webp','assets/cutscenes/c_sky7.webp','assets/cutscenes/c_sky8.webp'],
  texts:['Дорога привела Банана к Небесным Вратам — последнему рубежу. Среди парящих островов и древних храмов собралась вся Долина: тысячи зверей, что он освободил по пути. А вдали, в багровом зареве, ждала крепость Властелина Теней.',
         'Там, за стенами огня, восседал он — Тёмный Властелин орков. Тот, кто сжёг джунгли, заковал народы в цепи и отнял у Банана родителей. Главный враг. Конец пути — или его, или героя.',
         '«Мы прошли это вместе, малыш», — сказал Мастер Бо, кладя лапу ему на плечо. «И я ни разу не уснул в бою. Почти», — улыбнулся Дрём. Банан кивнул: время пришло.',
         'Вожди зверей склонились над картой. Лев, медведь, панда — все, кто когда-то прятался по лесам, теперь стояли плечом к плечу. План был прост и страшен: армия отвлечёт орду, а Банан прорвётся к Властелину один.',
         'И поднялось небывалое войско. Многотысячные легионы союза зверей — обезьяны, медведи, лоси, барсуки — встали стеной под знамёнами Долины. Земля гудела от их поступи. Впервые за годы орки ощутили страх.',
         'Грянул бой. Звериные легионы обрушились на орков и троллей, и Небесные Врата содрогнулись от рёва тысяч глоток. Клык о клинок, сталь о сталь — союз зверей теснил орду назад, шаг за шагом.',
         'Пока армии схлестнулись, Банан рванул вперёд — один, сквозь огонь и хаос. Орки бежали перед натиском зверей, а он мчался по мостам к самому сердцу крепости. Каждый шаг приближал расплату.',
         'И вот они — врата замка, дышащие пламенем и злобой. Дальше Банан должен пройти один. За спиной — целый народ, впереди — Тёмный Властелин. Он стиснул оружие и шагнул во тьму. Пора покончить с этим. НАВСЕГДА.'] } };
// вступительный ролик (история героя) — играет один раз в начале новой игры, перед первым уровнем
const INTRO_STORY={ endLabel:'К обучению ▶',
  panels:['assets/cutscenes/c_intro1.webp','assets/cutscenes/c_intro2.webp','assets/cutscenes/c_intro3.webp',
          'assets/cutscenes/c_intro4.webp','assets/cutscenes/c_intro5.webp','assets/cutscenes/c_intro6.webp','assets/cutscenes/c_intro7.webp'],
  texts:[
    'Высоко в зелёном сердце джунглей жила деревня орангутанов и лесных зверей. По мостам из лиан носились детёныши, в домиках на ветвях горели тёплые огни, и под банановой луной звучали песни. Никто не знал, что эта ночь станет последней мирной ночью Долины.',
    'Они пришли на рассвете — орки в грубой броне, с факелами и злобой в глазах. Вспыхнули мосты, затрещали сторожевые башни, древние деревья обратились в живые костры. Дом, что строили поколениями, рушился за один час.',
    'Звери бежали сквозь дым и пепел, прижимая к груди самое дорогое. Крики тонули в рёве пламени. Когда огонь утих, от шумной деревни остались лишь угли да горький ветер над опустевшей землёй.',
    'Но судьба сберегла одну искру. У холодной горной реки два старых хранителя леса нашли крошечного орангутана, завёрнутого в банановые листья. Он не плакал — лишь крепко сжимал палец спасителя. В этих глазах теплилась надежда целого народа.',
    'Годы текли, как горные ручьи. На каменной площадке под облаками малыш рос и креп. Хранители учили его не только бить и прыгать, но и подниматься после каждого падения. «Сила — в сердце, Банан», — повторяли они. И сердце его закалялось.',
    'И вот настал тот день. На краю утёса стоял уже не детёныш, а воин — с оружием в руках и огнём в груди. За спиной остались приютившие его горы. Впереди, в синей дымке, лежала родина, которую он не помнил, но любил всем существом. Он поклялся вернуть её.',
    'Банан спустился к границе старого леса. Там, среди родных деревьев, торчали башни орков, реяли красные флаги, стелился дым. Он сжал оружие и сделал первый шаг домой. За Долину. За тех, кого хранит сердце. ВПЕРЁД!'
  ]};
// держим ссылки на прелоад-картинки, иначе браузер может выгрузить их до загрузки (панели мелькали пустыми)
const _preloadKeep=[];
[].concat(...Object.values(CINEMATICS).map(d=>d.panels), INTRO_STORY.panels,
    ['assets/portraits/sloth.webp','assets/portraits/panda.webp','assets/sprites/cl_idle.webp'])   // портреты болтовни
  .forEach(src=>{ const im=new Image(); im.decoding='sync'; im.src=src; _preloadKeep.push(im); });
let playedCine={}, cineQ=[], cineTexts=[], cineI=0, cineCb=null;
let cineEndLabel='Начать ▶';
function playCinematic(def,cb){ cineQ=def.panels; cineTexts=def.texts||[]; cineEndLabel=def.endLabel||'Начать ▶'; cineI=0; cineCb=cb; show('cinematic'); renderCine(); }
function renderCine(){ const img=document.getElementById('cineImg'); const src=cineQ[cineI];
  const kb=()=>{ img.style.animation='none'; void img.offsetWidth; img.style.animation='kenburns 7s ease-out forwards'; };
  img.style.opacity='0'; img.onload=()=>{ img.style.opacity='1'; kb(); };   // не крутим пустой кадр — ждём картинку
  img.onerror=()=>{ img.style.opacity='1'; };
  img.src=src; if(img.complete && img.naturalWidth){ img.style.opacity='1'; kb(); }   // уже в кэше
  document.getElementById('cineText').textContent=cineTexts[cineI]||'';
  const last=cineI>=cineQ.length-1;
  const nx=document.getElementById('cineNext'); nx.textContent=last?cineEndLabel:'Дальше →'; nx.classList.toggle('cineStart',last);
  const pv=document.getElementById('cinePrev'); pv.disabled=(cineI===0);
  const dots=document.getElementById('cineDots'); if(dots)dots.textContent=(cineI+1)+' / '+cineQ.length; }
function cineFinish(){ hide('cinematic'); const cb=cineCb; cineCb=null; if(cb)cb(); }
function cineFwd(){ if(cineI<cineQ.length-1){ cineI++; renderCine(); } }        // клик по картинке: только вперёд, последний кадр игру не запускает
function cineBack(){ if(cineI>0){ cineI--; renderCine(); } }
document.getElementById('cinematic').onclick=cineFwd;
document.getElementById('cineNext').onclick=(e)=>{ e.stopPropagation(); if(cineI<cineQ.length-1){ cineI++; renderCine(); } else cineFinish(); };
document.getElementById('cinePrev').onclick=(e)=>{ e.stopPropagation(); cineBack(); };
document.getElementById('cineSkip').onclick=(e)=>{ e.stopPropagation(); cineFinish(); };   // пропустить всё — игра начинается
/* ---- предуровневый трёп: птица + ленивец + обезьяна (по уровню) ---- */
const SPK={ sloth:{name:'Дрём', img:'assets/portraits/sloth.webp', color:'#cdb482'},
            panda:{name:'Мастер Бо', img:'assets/portraits/panda.webp', color:'#bfe3a8'},
            hero:{name:'Банан', img:'assets/sprites/cl_idle.webp', color:'#ffc93c'} };
const BANTER={
  0:[['panda','Помнишь, малыш, как я учил тебя падать и снова вставать? Сегодня ты встаёшь за всю Долину.'],['sloth','А я учил тебя спать. Тоже навык. Но, видимо, не сегодня…'],['hero','Спасибо, что верили в меня. Я не подведу.']],
  1:[['sloth','Орки сожгли твою колыбель, Банан. И мой любимый гамак заодно. Гамак-то за что?'],['panda','Гнев — плохой попутчик. Дерись сердцем, а не злостью.'],['hero','Сердцем — так сердцем. Но и кулаком немножко.']],
  2:[['panda','Орки рубят наш лес на топливо для своих кузниц. Каждое дерево помнило чей-то дом.'],['sloth','И мой обед под ним. Вот это уже личное.'],['hero','Отомстим за каждое. Идём дальше.']],
  3:[['panda','Впереди Паук-Страж — последняя тень над джунглями. Восемь ног, восемь шансов оступиться. Жди момент и бей.'],['sloth','Спит наверняка меньше меня. Уже проигрывает.'],['hero','Стой за мной. Я порву эту паутину.']],
  4:[['panda','В детстве ты боялся тёмной воды. Помнишь? А теперь идёшь прямо сквозь неё.'],['sloth','Я до сих пор боюсь. Поэтому держусь сзади. Стратегически.'],['hero','Прикрою. Идите след в след.']],
  5:[['sloth','Тролли впереди. Большие, как моё нежелание шевелиться.'],['panda','Сила без разума — гора, что рушится сама. Будь водой, обойди удар.'],['hero','Буду водой. С банановым вкусом.']],
  6:[['panda','Топь забирает силы у того, кто спешит. Дыши ровно, ступай твёрдо.'],['sloth','Я и так не спешу. Считай, прирождённый мастер болот.'],['hero','Тогда веди, мастер. Шаг за шагом.']],
  7:[['panda','Вожак троллей силён, но медлителен. Твоя ловкость — вот твой настоящий меч.'],['sloth','Если что — я громко поверю в тебя отсюда. Очень громко.'],['hero','И этого хватит. За Долину!']],
  8:[['panda','Помнишь, как ты потерялся в пещере ещё детёнышем? Мы искали тебя три дня.'],['sloth','Я нашёл первым. Потому что прилёг отдохнуть аккурат рядом с тобой.'],['hero','И до сих пор не вернул банан за спасение!']],
  9:[['sloth','Своды трещат. Прямо как мои колени по утрам.'],['panda','Страх — это тень. Посвети факелом воли — и тень отступит.'],['hero','Воли хватит. Бегом под обвалом.']],
  10:[['panda','Орки роют здесь не золото — твой страх. Не оставляй им добычи.'],['sloth','А я бы отдал. Страх тяжёлый, без него и спится крепче.'],['hero','Страх — вам. Себе оставлю победу.']],
  11:[['panda','Кристальный голем твёрд, но и алмаз треснет по слабине. Найди её.'],['sloth','Бей туда, где блестит меньше. Это я и без медитаций знаю.'],['hero','Найду трещину. Разнесу на осколки.']],
  12:[['sloth','Лёд! Холод — моё топливо для спячки. Разбудите весной, ладно?'],['panda','Холод закаляет. Кто дрожит, но идёт — тот сильнее любого тепла.'],['hero','Идём и дрожим. Строго по-геройски.']],
  13:[['panda','Малышом ты лепил орков из снега и героически их побеждал. Сегодня — без шуток.'],['sloth','А я был снеговиком-судьёй. Самая активная роль в моей жизни.'],['hero','Тогда судите честно. Я снова выигрываю.']],
  14:[['sloth','Орки в тёплых шубах. Везёт же гадам.'],['panda','Не завидуй врагу — зависть холодит сердце сильнее любого льда.'],['hero','Согрею сердце в бою. Вперёд.']],
  15:[['panda','Ледяной Титан огромен. Но и ледник тает от упорства одной капли.'],['sloth','Будь каплей, Банан. А я буду… лужей поддержки.'],['hero','Капля за каплей — и Титан падёт.']],
  16:[['panda','Небесные руины. Выше облаков — ближе к мечте. И к опасности.'],['sloth','Высоко. Падать долго. Если что — успею вздремнуть на лету.'],['hero','Не упадём. Держитесь троп.']],
  17:[['sloth','Помнишь, ты мечтал летать? Прыгал с ветки с листом в лапах.'],['panda','И падал. Но всякий раз вставал. Вот это и есть полёт, ученик.'],['hero','Значит, я летаю всю жизнь. Просто пониже.']],
  18:[['panda','Логово Властелина близко. Помни, зачем ты здесь — не ради мести, ради дома.'],['sloth','И ради бананов. Дом без бананов — просто стены.'],['hero','Ради дома. И бананов. Ещё один рывок.']],
  19:[['panda','Вот он — Властелин Тени, тот, кто отнял твою колыбель. Покажи всё, чему научился.'],['sloth','В этот раз я не усну. Честно. Ну… почти.'],['hero','За маму, за Долину, за вас двоих. ВЛАСТЕЛИН — ПАДЁТ!']]
};
let banLines=[], banI=0, banCb=null, playedBanter={};
function playBanter(idx,cb){ const lines=BANTER[idx]; if(!lines||playedBanter[idx]){ if(cb)cb(); return; }
  playedBanter[idx]=true; banLines=lines; banI=0; banCb=cb; show('banter'); renderBanter(); }
function renderBanter(){ const [who,txt]=banLines[banI]; const s=SPK[who]||SPK.hero;
  const im=document.getElementById('banImg'); im.src=s.img; im.style.animation='none'; void im.offsetWidth; im.style.animation='pop .25s ease';
  const nm=document.getElementById('banName'); nm.textContent=s.name; nm.style.color=s.color;
  document.getElementById('banText').textContent='«'+txt+'»';
  document.getElementById('banNext').textContent=(banI>=banLines.length-1)?'В путь →':'Дальше →'; }
function advanceBanter(){ banI++; if(banI>=banLines.length){ endBanter(); return; } renderBanter(); }
function endBanter(){ hide('banter'); const cb=banCb; banCb=null; if(cb)cb(); }
document.getElementById('banter').onclick=e=>{ if(e.target&&e.target.id==='banSkip') endBanter(); else advanceBanter(); };

/* ---- бой-диалог при появлении босса (по биому) ---- */
const BOSSCUT={
  jungle:[['Орк','Босс учуял тебя, банан. Паучиха голодна!'],['Герой','Тогда не будем заставлять её ждать.']],
  swamp:[['Орк','ВОЖАК идёт! Топи дрогнут!'],['Герой','Пусть дрогнут. Я устою.']],
  cave:[['Орк','Из темноты выходит наш силач. Беги!'],['Герой','Я принёс свет. И кулаки.']],
  ice:[['Орк','Шаман заморозит твою кровь!'],['Герой','Согреюсь об его посох.']],
  sky:[['Орк','Сам ВЛАСТЕЛИН ТЕНИ встречает тебя. Это честь — и твой конец.'],['Герой','Честь приму. Конец оставь себе.']]
};

/* ---- сохранение прогресса ---- */
const SAVE_KEY='banane_save_v1';
function saveProgress(level){ try{ localStorage.setItem(SAVE_KEY,JSON.stringify({level,score,hero:selectedHero,weapon:currentWeapon,upgraded})); }catch(e){} }
function loadSave(){ try{ return JSON.parse(localStorage.getItem(SAVE_KEY)||'null'); }catch(e){ return null; } }
function clearSave(){ try{ localStorage.removeItem(SAVE_KEY); }catch(e){} }
function applyUpgradeState(){ const lv=upgraded?2:1, dm=upgraded?3:2;
  WEAPONS.boomerang.dmg=dm; WEAPONS.club.dmg=dm; WEAPONS.boomerang.level=lv; WEAPONS.club.level=lv; }
function continueGame(){ const s=loadSave(); if(!s)return; hide('title');
  selectedHero=s.hero||'classic'; if(!HEROES[selectedHero])selectedHero='classic';   // старые сейвы 'orang' -> классический
  chosenWeapon=s.weapon||'boomerang'; currentWeapon=chosenWeapon;
  score=s.score||0; currentLevel=Math.min(s.level||0,META.length-1); upgraded=!!s.upgraded;
  playedCine={}; playedBanter={}; applyUpgradeState(); startLevelFlow(); }

function startLevelFlow(){   // сюжетный ролик блока (если есть) -> иначе болтовня друзей -> уровень
  const cine=CINEMATICS[currentLevel];
  if(cine && !playedCine[currentLevel]){ playedCine[currentLevel]=true; playCinematic(cine, startInstance); }
  else playBanter(currentLevel, startInstance); }

let endAction='restart';
function endScreenG(title,s,btn,action){ document.getElementById('endTitle').textContent=title;
  document.getElementById('endScore').textContent='Очки: '+s; document.getElementById('endBtn').textContent=btn; endAction=action; show('endScreen'); }
window.levelClear=n=>{ sfx('win'); saveProgress(n); endScreenG('Уровень '+n+' пройден!',score,'Дальше →','next'); };  // n = индекс следующего уровня (автосейв)
window.showWin=()=>{ sfx('win'); clearSave(); endScreenG('Долина спасена! 🎉',score,'Сыграть снова','restart'); };
window.showGameOver=()=>endScreenG('Игра окончена',score,'Ещё раз','restart');   // сейв сохраняем — «Продолжить» вернёт на последний уровень
document.getElementById('endBtn').onclick=()=>{ hide('endScreen');
  if(activeScene&&activeScene.scene) activeScene.scene.pause();   // заморозить старый уровень: его update() не должен крутиться во время кат-сцены/перехода
  if(endAction==='next'){ currentLevel++; gameOver=false; startLevelFlow(); } else startGame(chosenWeapon); };

function rng(seed){let a=seed>>>0;return()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
/* ---- биомы: своя графика/враги/босс на группу уровней ----
   ref = временно переиспользовать арт другого биома, пока нет своего (cave/ice/sky). */
const BIOMES={
  jungle:{far:'bg_far',mid:'bg_mid',front:'bg_front',tile:'tile',
    obst:{spikes:'b_spikes',thorn:'b_thorn',stone:'b_stone',palisade:'b_palisade',gate:'b_gate'},
    boss:'boss_spider',bossName:'ПАУК-СТРАЖ',tint:0xa6abb5,sky:0x0a1410},
  swamp:{far:'swamp_far',mid:'swamp_mid',front:'swamp_front',tile:'tile_swamp',plat:'plat_swamp',
    obst:{spikes:'b_spikes_swamp',thorn:'b_thorn_swamp',stone:'b_stone_swamp',palisade:'b_palisade_swamp',gate:'b_gate_swamp'},
    boss:'boss_king',bossName:'ТРОЛЛЬ-ВОЖАК',tint:0x9fb6a0,sky:0x0c1a0c},
  cave:{far:'cave_far',mid:'cave_mid',front:'cave_front',tile:'tile_cave',plat:'plat_cave',
    obst:{spikes:'b_spikes_cave',thorn:'b_thorn_cave',stone:'b_stone_cave',palisade:'b_palisade_cave',gate:'b_gate_cave'},
    ref:'swamp',boss:'boss_crystal',bossName:'КРИСТАЛЬНЫЙ ГОЛЕМ',tint:0xffffff,sky:0x120a24},   // свой арт; ref:swamp оставлен для отката врагов
  ice:{far:'ice_far',mid:'ice_mid',front:'ice_front',tile:'tile_ice',plat:'plat_ice',
    obst:{spikes:'b_spikes_ice',thorn:'b_thorn_ice',stone:'b_stone_ice',palisade:'b_palisade_ice',gate:'b_gate_ice'},
    ref:'swamp',boss:'boss_ice',bossName:'ЛЕДЯНОЙ ТИТАН',tint:0xffffff,sky:0xaad0f0},   // своё окружение; враги — золотые стражи (k_*_ice)
  sky:{far:'sky_far',mid:'sky_mid',front:'sky_front',tile:'tile_sky',
    obst:{spikes:'b_spikes_sky',thorn:'b_thorn_sky',stone:'b_stone_sky',palisade:'b_palisade_sky',gate:'b_gate_sky'},
    boss:'boss_warlord',bossName:'ВЛАСТЕЛИН ТЕНИ',tint:0xffffff,sky:0xbcd6ff}
};
function vis(name){ const b=BIOMES[name]; return b.far?b:BIOMES[b.ref]; }   // источник текстур
const POOLS={
  jshrimp:[['shrimp',68],['orc',22],['thrower',10]],
  jmix:[['shrimp',18],['orc',28],['thrower',16],['archer',18],['shield',20]],
  jheavy:[['orc',38],['berserk',22],['archer',20],['shield',20]],
  swamp:[['orc',20],['thrower',12],['archer',10],['shield',10],['troll_club',15],['troll_bone',12],['troll_boulder',9],['berserk',15]]
};
function pickType(poolName,R){ const pool=POOLS[poolName]||POOLS.swamp; let tot=0; for(const x of pool)tot+=x[1];
  let r=R()*tot; for(const x of pool){ r-=x[1]; if(r<0)return x[0]; } return pool[0][0]; }
const GROUPS=[            // 5 блоков × 4 уровня = 20; типы орков задаёт пул блока, босс — на 4-м уровне блока
  {biome:'jungle',pools:['jshrimp','jmix','jheavy','jheavy']},        // ур. 1-4
  {biome:'swamp', pools:['swamp','swamp','swamp','swamp']},           // ур. 5-8
  {biome:'cave',  pools:['swamp','swamp','swamp','swamp']},           // ур. 9-12
  {biome:'ice',   pools:['swamp','swamp','swamp','swamp']},           // ур. 13-16
  {biome:'sky',   pools:['swamp','swamp','swamp','swamp']}            // ур. 17-20
];
const META=[]; GROUPS.forEach(g=>g.pools.forEach((pl,i)=>META.push(
  {worldW:20000+((META.length*1700)%5000), biome:g.biome, pool:pl, boss:i===g.pools.length-1})));
function genLevel(idx){
  const m=META[idx], W=m.worldW, R=rng(1234+idx*9973);   // свой сид на уровень
  const gaps=[],platforms=[],enemies=[],bananas=[],lifeUps=[],barriers=[];
  // --- стиль карты: свой на каждом уровне (поэтому все карты уникальны) ---
  const gapStep=1250+Math.floor(R()*1500);        // как часто пропасти
  const gapWmax=40+Math.floor(R()*70);            // разброс ширины пропасти
  const platStep=440+Math.floor(R()*400);         // частота висячих платформ
  const yLo=262+Math.floor(R()*34), ySpan=44+Math.floor(R()*42);   // высотный разброс платформ
  const hasTowers=R()<0.8;                          // не на каждом уровне «лестницы»
  const towerStep=2500+Math.floor(R()*2000);
  const barStep=1000+Math.floor(R()*1100);         // частота препятствий
  const grndStep=620+Math.floor(R()*480);          // частота наземных врагов
  const enemyDens=0.30+R()*0.22;                    // плотность врагов на платформах
  const bw=[0.18+R()*0.4, 0.14+R()*0.34, 0.1+R()*0.34, 0.08+R()*0.3];   // микс препятствий (spikes/thorn/stone/palisade)
  const bwS=bw[0]+bw[1]+bw[2]+bw[3];
  let x=1400+Math.floor(R()*700);
  while(x<W-1700){ const w=85+Math.floor(R()*gapWmax); gaps.push([x,x+w]); platforms.push([Math.round(x+w/2),316+Math.floor(R()*34)]); x+=gapStep+Math.floor(R()*650); }
  const inGap=px=>gaps.some(g=>px>=g[0]-40&&px<=g[1]+40);
  x=600+Math.floor(R()*350);
  while(x<W-650){ const y=yLo+Math.floor(R()*ySpan);
    if(!inGap(x)){ platforms.push([x,y]); if(R()<0.5) bananas.push([x,y-30]);
      if(R()<enemyDens) enemies.push({type:pickType(m.pool,R),x,y:y-46,min:x-40,max:x+40}); }   // патруль в пределах платформы
    x+=platStep+Math.floor(R()*280); }
  const towerTops=[]; let tx=2200+Math.floor(R()*900);
  while(hasTowers && tx<W-1600){ if(!inGap(tx)){ const steps=3+Math.floor(R()*2); let sx=tx, sy=336;
    for(let i=0;i<steps;i++){ platforms.push([sx,sy,1]);   // 1 = башенная ступень (мелкая, без декор-уступа)
      if(i>0 && R()<0.4) enemies.push({type:pickType(m.pool,R),x:sx,y:sy-46,min:sx-12,max:sx+12});   // узкая башенная плитка
      sx += (R()<0.5?-1:1)*(82+Math.floor(R()*20)); sy=Math.max(150,sy-(96+Math.floor(R()*18))); }
    towerTops.push([sx,sy]); } tx+=towerStep+Math.floor(R()*900); }
  x=420; while(x<W-300){ bananas.push([x,360]); x+=470+Math.floor(R()*300); }
  x=760+Math.floor(R()*420); while(x<W-1000){ let ex=x; if(inGap(ex))ex+=170; enemies.push({type:pickType(m.pool,R),x:ex,y:300,min:ex-260,max:ex+260}); x+=grndStep+Math.floor(R()*380); }
  towerTops.forEach((t,i)=>{ if(i%2===0 && lifeUps.length<3) lifeUps.push([t[0],t[1]-26]); else bananas.push([t[0],t[1]-26]); });
  while(lifeUps.length<2 && towerTops.length){ const t=towerTops.pop(); lifeUps.push([t[0],t[1]-26]); }
  let bx=1150+Math.floor(R()*700);
  while(bx<W-1300){ if(!inGap(bx)){ let r=R()*bwS; const kind = r<bw[0]?'spikes':(r<bw[0]+bw[1]?'thorn':(r<bw[0]+bw[1]+bw[2]?'stone':'palisade'));
      barriers.push({kind, x:bx}); }
    bx+=barStep+Math.floor(R()*650); }
  if(!inGap(Math.round(W*0.5))) barriers.push({kind:'gate',x:Math.round(W*0.5)});  // decorative archway
  // --- чекпоинты: 2-3 на уровень, равномерно, не в пропасти ---
  const ncp=2+Math.floor(R()*2); const cps=[];
  for(let i=1;i<=ncp;i++){ let cx=Math.round(W*i/(ncp+1)), g=0; while(inGap(cx)&&g<10){cx+=70;g++;} cps.push(cx); }
  const CUT=({                                          // 5 блоков × 4 уровня; босс-интро добавляется отдельно (BOSSCUT)
    0:[[Math.round(W*0.16),[["Орк","Стой, обезьяна! Эта тропа теперь наша."],["Герой","Долина животных — не ваша."],["Орк","Скоро будет наша вся. ВЗЯТЬ ЕГО!"]]],
       [Math.round(W*0.6),[["Орк","Слышь, банан! За тобой должок — за вытоптанные грядки."],["Орк","Лови ребят на гостинец!"]]]],
    1:[[Math.round(W*0.14),[["Орк-капрал","А, тот самый банан, что прорвался. Босс будет рад твоей шкуре."],["Герой","Передай боссу: я уже иду."],["Орк-капрал","Сначала пройди МОИХ парней!"]]],
       [Math.round(W*0.62),[["Орк","Гррр! Окружай его, лучники — на холм!"]]]],
    2:[[Math.round(W*0.14),[["Орк-страж","Дальше — логово Паучихи. Поворачивай, мохнатый."],["Герой","Я пришёл не поворачивать."],["Орк-страж","Тогда ты пришёл умереть. В АТАКУ!"]]],
       [Math.round(W*0.6),[["Орк","Последний рубеж перед логовом! Щитоносцы — вперёд!"]]]],
    4:[[Math.round(W*0.16),[["Орк","Добро пожаловать в наши топи, банан. Отсюда не выбираются."],["Герой","Я не уйду, пока вы не уйдёте."],["Орк","Тогда тут и сгниёшь! ТРОЛЛИ, к бою!"]]]]
  })[idx]||[];
  const cuts=CUT.map(c=>({x:c[0],lines:c[1],done:false}));
  if(m.boss){ cuts.push({x:Math.round(W*0.86),lines:BOSSCUT[m.biome]||BOSSCUT.jungle,done:false}); }   // бой-диалог + подкрепление перед боссом
  cuts.forEach(c=>{ const n=2+Math.floor(R()*2); c.spawn=[]; for(let i=0;i<n;i++) c.spawn.push({type:(i===0&&R()<0.5?'thrower':'orc'),x:c.x+150+i*120,y:160,min:c.x+40,max:c.x+560}); });
  let flagX=null; if(m.boss){ enemies.push({type:'boss',x:W-320,y:250,min:W-720,max:W-130}); } else flagX=W-120;
  return {worldW:W,gaps,platforms,enemies,bananas,lifeUps,barriers,cps,cuts,flagX,boss:m.boss,biome:m.biome};
}

function makeConfig(){return{type:Phaser.AUTO,parent:'game',backgroundColor:'#2a4a30',
  scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH,width:800,height:450},
  physics:{default:'arcade',arcade:{gravity:{y:1250},debug:false}},scene:{preload,create,update}};}
function startInstance(){ paused=false; pauseReason=null;
  // Один инстанс на всю сессию: рестарт сцены сохраняет кэш текстур (без перекачки ассетов на каждом уровне).
  const sc=game?(activeScene||game.scene.getScene('default')):null;
  if(game&&sc&&sc.scene){ showLoad('level'); sc.scene.restart(); return; }
  if(game){ try{game.destroy(true);}catch(e){} game=null; }
  showLoad('game'); game=new Phaser.Game(makeConfig()); }
function startGame(weapon){ chosenWeapon=weapon; currentWeapon=weapon; score=0; lives=START_LIVES; heroHP=HERO_MAXHP; currentLevel=0; playedCine={}; playedBanter={};
  upgraded=false; WEAPONS.boomerang.dmg=2; WEAPONS.club.dmg=2; WEAPONS.boomerang.level=1; WEAPONS.club.level=1; startLevelFlow(); }
function preload(){ for(const k in TEX) this.load.image(k,TEX[k]);
  const hf=HK().files; if(hf) for(const k in hf) this.load.image(k,hf[k]);
  this.load.on('loaderror',(file)=>{ if(file&&file.key&&file.key.indexOf('h2_')===0) selectedHero='mono'; }); }   // нет спрайта героя — откат на моно
// Нормализация героя к постоянной экранной высоте (HERO_DH). Кадры орангутана разной высоты —
// без этого и спрайт, и хитбокс «прыгают» каждый кадр. Тело пересчитывается пропорционально кадру,
// а масштаб обратно пропорционален высоте кадра → мировые размеры/положение тела стабильны.
function fitHero(p){ const t=HERO_DH[selectedHero]; if(!t||!p.height) return;
  const fw=p.width, fh=p.height; p.setScale(t/fh);
  // тело — по высоте и по центру кадра (холст широкий из-за оружия, но хитбокс остаётся компактным)
  if(p.body){ const bw=fh*0.34; p.body.setSize(bw,fh*0.80); p.body.setOffset((fw-bw)/2,fh*0.20); } }
function setSt(p,s){ if(p._st===s)return; p._st=s; const h=HK();
  if(s==='run')p.anims.play(heroAnimKey(),true); else {p.anims.stop(); p.setTexture(s==='jump'?h.jump:h.idle);}
  fitHero(p); }
function updateWeaponHUD(scene){ if(!scene.whl)return;
  scene.whl.x=currentWeapon==='boomerang'?728:762;
  scene.wIcons.boomerang.setAlpha(currentWeapon==='boomerang'?1:0.45);
  scene.wIcons.club.setAlpha(currentWeapon==='club'?1:0.45); }
function checkUpgrade(scene){ if(!upgraded && score>=400){ upgraded=true; WEAPONS.boomerang.dmg=3; WEAPONS.club.dmg=3; WEAPONS.boomerang.level=2; WEAPONS.club.level=2; sfx('perk');
    // иконки оружия не меняем (банан/меч), апгрейд только усиливает урон
    const t=scene.add.text(400,92,'Оружие улучшено!',{fontFamily:'Fredoka, "Trebuchet MS", sans-serif',fontSize:'22px',color:'#ffd93d',stroke:'#3a2a08',strokeThickness:5}).setScrollFactor(0).setOrigin(0.5).setDepth(22);
    scene.tweens.add({targets:t,alpha:0,y:72,delay:1000,duration:700,onComplete:()=>t.destroy()}); } }
function activateArmor(scene){ if(score<500||scene.player.armor)return; score-=500; sfx('armor'); updateHud(scene);
  const p=scene.player; p.armor=true; p.invuln=true; p.setTint(0xffe27a);
  const t=scene.add.text(400,68,'БРОНЯ 5 сек!',{fontFamily:'Fredoka, "Trebuchet MS", sans-serif',fontSize:'20px',color:'#ffe27a',stroke:'#3a2a08',strokeThickness:5}).setScrollFactor(0).setOrigin(0.5).setDepth(22);
  scene.tweens.add({targets:t,alpha:0,delay:1500,duration:600,onComplete:()=>t.destroy()});
  scene.time.delayedCall(5000,()=>{ if(p.active){ p.armor=false; p.invuln=false; p.clearTint(); } }); }

function create(){
  gameOver=false; paused=false; pauseReason=null; activeScene=this; resetPerks(this);
  this.bossBar=null; this.boss=null; this.flag=null;   // scene.restart переиспользует объект сцены — гасим ссылки прошлого уровня (иначе update зовёт методы на уничтоженных объектах)
  lives=Math.max(lives,START_LIVES); heroHP=HERO_MAXHP; bumpMaxLevel();   // на входе в уровень — жизни/HP + учёт прогресса для разблокировки образов
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
  this.bchain=[cfg.biome, bc.ref].filter(Boolean);   // выбор арта врага: свой биом → ref-биом → базовый (джунгли)
  this.bgFar=this.add.tileSprite(400,225,800,450,bvz.far).setScrollFactor(0).setDepth(-5).setTint(dim);
  this.bgMid=this.add.tileSprite(400,225,800,450,bvz.mid).setScrollFactor(0).setDepth(-4).setTint(dim);
  this.bgFront=this.add.tileSprite(400,225,800,450,bvz.front).setScrollFactor(0).setDepth(-3).setTint(dim);
  this.add.rectangle(400,225,800,450,bc.sky,0.16).setScrollFactor(0).setDepth(-2);
  if(!this.anims.exists(heroAnimKey())){
    this.anims.create({key:heroAnimKey(),frames:HK().run.map(k=>({key:k})),frameRate:9,repeat:-1}); }
  if(!this.anims.exists('swim')){
    this.anims.create({key:'swim',frames:[{key:'s1'},{key:'s2'}],frameRate:5,repeat:-1});
    this.anims.create({key:'orcwalk',frames:[{key:'orc1'},{key:'orc2'}],frameRate:6,repeat:-1}); }
  // ходьба/удар базового орка под биом (цепочка: свой биом → ref → базовый)
  const o1=biomeTex(this,'orc1'), o2=biomeTex(this,'orc2'), o3=biomeTex(this,'orc3'), owKey='ow_'+o1;
  if(!this.anims.exists(owKey)) this.anims.create({key:owKey,frames:[{key:o1},{key:o2}],frameRate:6,repeat:-1});
  this.orcWalk=owKey; this.orcAtk=o3;
  for(const tex in ENEMY_ANIMS){ const fr=ENEMY_ANIMS[tex];
    if(!this.anims.exists('A_'+tex) && fr.every(k=>this.textures.exists(k)))
      this.anims.create({key:'A_'+tex,frames:fr.map(k=>({key:k})),frameRate:4,repeat:-1}); }
  this.platforms=this.physics.add.staticGroup(); const TKEY=this.biomeCfg.tile;
  for(let x=20;x<=W-20;x+=40){ if(!cfg.gaps.some(g=>x>=g[0]&&x<=g[1])) this.platforms.create(x,430,TKEY); }
  const PLAT=bvz.plat, platSrc=PLAT?this.textures.get(PLAT).getSourceImage():null;
  cfg.platforms.forEach(p=>{ const decor=PLAT&&p[2]!==1;   // обычные платформы — художественный уступ; башенные ступени (p[2]==1) — мелкая плитка
    for(let i=-1;i<=1;i++){ const t=this.platforms.create(p[0]+i*40,p[1],TKEY); if(decor)t.setVisible(false); }
    if(decor){ const dw=136, dh=dw*platSrc.height/platSrc.width;
      this.add.image(p[0],p[1]-26,PLAT).setOrigin(0.5,0).setDisplaySize(dw,dh).setDepth(-1); }
  });

  this.player=this.physics.add.sprite(80,300,HK().idle); this.player._st=null; this.player.invuln=false; this.player.armor=false;
  this.player.setCollideWorldBounds(true);
  const pw=this.player.width||PW, ph=this.player.height||PHH;
  this.player.body.setSize(pw*0.3,ph*0.8).setOffset(pw*0.35,ph*0.2);
  fitHero(this.player);                                            // ужать крупного героя (орангутан) до размера орков
  this.player.on('animationupdate',()=>fitHero(this.player));      // держать размер постоянным на каждом кадре бега
  this.physics.add.collider(this.player,this.platforms);
  this.cpX=80;
  // видимые чекпоинты: герой касается → активируется точка респауна
  this.checkpoints=this.physics.add.staticGroup();
  (cfg.cps||[]).forEach(cx=>{ const c=this.checkpoints.create(cx,366,'flag'); c.setTint(0x6a7a8a); c.activated=false; });
  this.physics.add.overlap(this.player,this.checkpoints,(pl,c)=>{ if(c.activated)return; c.activated=true; c.clearTint(); this.cpX=c.x;
    sfx('checkpoint'); this.cameras.main.flash(120,120,200,150);
    const t=this.add.text(c.x,300,'Чекпоинт!',{fontFamily:'Fredoka, "Trebuchet MS", sans-serif',fontSize:'18px',color:'#9effa0',stroke:'#06320a',strokeThickness:4}).setOrigin(0.5).setDepth(16);
    this.tweens.add({targets:t,y:262,alpha:0,duration:1100,onComplete:()=>t.destroy()}); },null,this);

  this.boss=null; this.enemies=this.physics.add.group();
  cfg.enemies.forEach(e=>spawnEnemy(this,e));
  this.physics.add.collider(this.enemies,this.platforms);
  this.physics.add.collider(this.player,this.enemies,hitEnemy,null,this);

  this.projs=this.physics.add.group();
  this.physics.add.overlap(this.projs,this.enemies,projHit,null,this);
  this.eprojs=this.physics.add.group();
  this.physics.add.overlap(this.player,this.eprojs,(p,pr)=>{ const px=pr.x; pr.destroy(); hurtPlayer(this,px,DMG.proj); },null,this);
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
  this.physics.add.overlap(this.player,this.hazards,(p,h)=>hurtPlayer(this,h.x,DMG.hazard),null,this);
  this.physics.add.collider(this.player,this.solids);
  this.physics.add.collider(this.enemies,this.solids);
  this.physics.add.collider(this.projs,this.solids,(pr,s)=>{ if(s.breakable){ s.hp-=2; if(s.hp<=0)s.destroy(); else {s.setTint(0xffaaaa);this.time.delayedCall(80,()=>{if(s.active)s.clearTint();});} } pr.destroy(); });
  this.physics.add.collider(this.eprojs,this.solids,pr=>pr.destroy());

  this.rocks=this.physics.add.group();                       // катящиеся валуны троллей
  this.physics.add.collider(this.rocks,this.platforms);
  this.physics.add.collider(this.rocks,this.solids,(r,s)=>{ if(s.breakable){ s.hp-=3; if(s.hp<=0)s.destroy(); } r.destroy(); });
  this.physics.add.overlap(this.player,this.rocks,(p,r)=>{ const rx=r.x; r.destroy(); hurtPlayer(this,rx,DMG.proj); },null,this);

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

  this.hud=this.add.text(16,12,'',{fontFamily:'Fredoka, "Trebuchet MS", sans-serif',fontSize:'20px',color:'#fff',stroke:'#000',strokeThickness:4}).setScrollFactor(0).setDepth(20);
  this.add.rectangle(16,42,168,16,0x000000,0.55).setScrollFactor(0).setOrigin(0,0.5).setDepth(19).setStrokeStyle(1,0x000000);
  this.hpBar=this.add.rectangle(18,42,160,11,0x4caf50).setScrollFactor(0).setOrigin(0,0.5).setDepth(20);
  this.add.text(186,42,'HP',{fontFamily:'Fredoka, "Trebuchet MS", sans-serif',fontSize:'12px',color:'#fff',stroke:'#000',strokeThickness:3}).setScrollFactor(0).setOrigin(0,0.5).setDepth(20);
  updateHud(this);
  this.add.text(16,424,(ADMIN?'[ ] — уровень (admin)   ':'')+'B — броня (500🍌)   I — инвентарь',{fontFamily:'Fredoka, "Trebuchet MS", sans-serif',fontSize:'12px',color:'rgba(255,255,255,.7)',stroke:'#000',strokeThickness:2}).setScrollFactor(0).setDepth(20);
  this.add.rectangle(745,24,74,36,0x10241a,0.55).setScrollFactor(0).setDepth(18).setStrokeStyle(1,0x3f9d4a);
  this.whl=this.add.rectangle(728,24,32,32,0x000000,0).setScrollFactor(0).setDepth(19).setStrokeStyle(3,0xffc93c);
  this.wIcons={boomerang:this.add.image(728,24,'banana').setScrollFactor(0).setDepth(20).setDisplaySize(24,24),
               club:this.add.image(762,24,'wi_sword').setScrollFactor(0).setDepth(20).setDisplaySize(24,24)};
  updateWeaponHUD(this);

  if(cfg.boss){ this.add.rectangle(400,30,304,16,0x000000,0.5).setScrollFactor(0).setDepth(20);
    this.bossBar=this.add.rectangle(250,30,300,12,0xff4444).setScrollFactor(0).setDepth(21).setOrigin(0,0.5);
    this.add.text(400,46,this.biomeCfg.bossName,{fontFamily:'"Russo One","Trebuchet MS",sans-serif',fontSize:'13px',color:'#fff',stroke:'#000',strokeThickness:3}).setScrollFactor(0).setOrigin(0.5).setDepth(21); }
  const banner=this.add.text(400,150,cfg.boss?('Уровень '+(currentLevel+1)+'\n'+this.biomeCfg.bossName):('Уровень '+(currentLevel+1)),
    {fontFamily:'"Russo One","Trebuchet MS",sans-serif',fontSize:'32px',color:'#fff',align:'center',stroke:'#1c3a12',strokeThickness:6}).setScrollFactor(0).setOrigin(0.5).setDepth(15);
  this.tweens.add({targets:banner,alpha:0,delay:1300,duration:600,onComplete:()=>banner.destroy()});
  hideLoad();   // уровень построен — убрать экран загрузки
  playMusic(cfg.biome);   // музыка биома (один трек на блок, кроссфейд на границе)
}

// текстура врага по цепочке биомов: свой биом → ref-биом → базовая (если своего арта нет)
function biomeTex(scene,base){ const ch=scene.bchain||[]; for(const b of ch){ const v=base+'_'+b; if(scene.textures.exists(v))return v; } return base; }
function spawnEnemy(scene,e){
  const k=e.type, now=scene.time.now;
  const base={shrimp:'s1',orc:'orc1',thrower:'k_thrower',archer:'k_archer',shield:'k_shield',berserk:'k_berserk',
    troll_club:'t_club',troll_bone:'t_bone',troll_boulder:'t_boulder',
    boss:(scene.biomeCfg&&scene.biomeCfg.boss)||'spider'}[k]||'orc1';
  // текстура по биому: если есть свой арт врага (например k_berserk_swamp) — берём его, иначе общий
  let tex=biomeTex(scene,base);
  const s=scene.enemies.create(e.x,e.y,tex); s.setData('type',k); s.setData('min',e.min); s.setData('max',e.max);
  const W=s.width,H=s.height;
  if(k==='shrimp'){ s.hp=1; s.speed=55; s.body.setSize(W*0.72,H*0.62).setOffset(W*0.14,H*0.38); s.setVelocityX(-55); s.play('swim'); }
  else if(k==='orc'){ s.hp=12; s.speed=95; s.chase=165; s.body.setSize(W*0.42,H*0.82).setOffset(W*0.29,H*0.18); s.setVelocityX(-95); s.play(scene.orcWalk); s.atkTex=scene.orcAtk; s.walkAnim=scene.orcWalk; }
  else if(k==='berserk'){ s.hp=16; s.speed=110; s.chase=235; const bw=H*0.42; s.body.setSize(bw,H*0.84).setOffset((W-bw)/2,H*0.14); s.atkTex=scene.textures.exists(tex+'3')?tex+'3':null; }
  else if(k==='shield'){ s.hp=18; s.speed=65; s.chase=95; const bw=H*0.44; s.body.setSize(bw,H*0.82).setOffset((W-bw)/2,H*0.16); s.nextInv=now+2200; s.atkTex=scene.textures.exists(tex+'3')?tex+'3':null; }
  else if(k==='thrower'){ s.hp=8; s.speed=95; s.body.setSize(W*0.42,H*0.8).setOffset(W*0.29,H*0.2); s.fireReady=now+800; }
  else if(k==='archer'){ s.hp=8; s.speed=70; s.body.setSize(W*0.42,H*0.8).setOffset(W*0.29,H*0.2); s.fireReady=now+1100; }
  else if(k==='troll_club'||k==='troll_bone'){ s.hp=22; s.speed=66; s.chase=140; s.body.setSize(W*0.5,H*0.78).setOffset(W*0.25,H*0.2); s.setVelocityX(-66); s.atkTex=scene.textures.exists(tex+'3')?tex+'3':null; }
  else if(k==='troll_boulder'){ s.hp=18; s.speed=42; s.body.setSize(W*0.5,H*0.78).setOffset(W*0.25,H*0.2); s.fireReady=now+1600; s.atkTex=scene.textures.exists(tex+'3')?tex+'3':null; }
  else { s.hp=36; s.speed=95; s.body.setSize(W*0.55,H*0.7).setOffset(W*0.22,H*0.22); s.isBoss=true; scene.boss=s; s.atkTex=scene.textures.exists(tex+'3')?tex+'3':null; }
  if(scene.anims.exists('A_'+tex)){ s.play('A_'+tex); s.walkAnim='A_'+tex; }   // покадровая ходьба спецотряда
  // масштаб по уровню: чем выше уровень — тем крепче и быстрее враги (боссам HP растёт мягче, чтобы бой не затягивался)
  const i=currentLevel;
  const hpMul=s.isBoss?(1+i*0.05):(1+i*0.075);   // обычные ×до ~2.4, боссы ×до ~1.95 к 20-му уровню
  const spdMul=Math.min(1.6,1+i*0.035);          // скорость/преследование — до +60%
  s.hp=Math.max(1,Math.round(s.hp*hpMul));
  s.speed=Math.round(s.speed*spdMul); if(s.chase)s.chase=Math.round(s.chase*spdMul);
  s.maxhp=s.hp; return s;
}
function spawnSquad(scene,list){ list.forEach(e=>{ const s=spawnEnemy(scene,e); if(s){ s.setAlpha(0); scene.tweens.add({targets:s,alpha:1,duration:280}); } }); }
// патруль по участку [mn,mx]: всегда в движении (фикс «стояния»), разворот у границ и перед пропастью
function patrolMove(scene,e,mn,mx){ const v=e.body.velocity.x; let dir=v<-1?-1:(v>1?1:-1);
  if(e.x<=mn)dir=1; else if(e.x>=mx)dir=-1; else if(Math.abs(v)<5)dir=-1;
  if(scene.cpInGap&&scene.cpInGap(e.x+dir*34))dir=-dir;   // не уходить в пропасть
  e.setVelocityX(dir*e.speed); e.setFlipX(dir<0); }
const projScale=()=>Math.min(1.6,1+currentLevel*0.035);   // снаряды быстрее на высоких уровнях (труднее увернуться)
function fireAt(scene,e,tex,speed){ const p=scene.player, dir=p.x<e.x?-1:1;
  const sx=e.x+dir*16, sy=e.y-4, sp=speed*projScale();
  const ang=Math.atan2((p.y-6)-sy, p.x-sx);   // целимся прямо в героя (а не строго по горизонтали)
  const pr=scene.eprojs.create(sx,sy,tex); pr.body.setAllowGravity(false);
  pr.setVelocity(Math.cos(ang)*sp, Math.sin(ang)*sp); pr.setDepth(5); pr.born=scene.time.now;
  if(tex==='e_knife') pr.setAngularVelocity(dir*700); else pr.setRotation(ang); }   // стрела смотрит по направлению полёта
function fireRock(scene,e){ const p=scene.player, dir=p.x<e.x?-1:1;
  const sx=e.x+dir*26, sy=e.y-18, g=1250;   // бросок из рук, по баллистической дуге в героя
  const dxr=p.x-sx, T=Phaser.Math.Clamp(Math.abs(dxr)/360,0.5,0.95);
  const r=scene.rocks.create(sx,sy,'boulder');
  r.setVelocity(dxr/T, ((p.y-10)-sy)/T - 0.5*g*T); r.setAngularVelocity(dir*330);
  r.setBounce(0.15); r.setDepth(5); r.born=scene.time.now; }

function update(){
  if(gameOver||paused)return;
  const p=this.player,c=this.cursors, now=this.time.now;
  if(ADMIN){ const dir=Phaser.Input.Keyboard.JustDown(this.nlk)?1:(Phaser.Input.Keyboard.JustDown(this.plk)?-1:0);
    if(dir){ currentLevel=Phaser.Math.Clamp(currentLevel+dir,0,META.length-1); gameOver=false;
      delete playedCine[currentLevel]; delete playedBanter[currentLevel];   // показать ролик/болтовню заново при тесте
      this.scene.pause(); startLevelFlow(); return; } }
  for(const cut of this.cuts){ if(!cut.done && p.x>=cut.x){ cut.done=true; startCut(this,cut); return; } }
  const left=c.left.isDown||TOUCH.left, right=c.right.isDown||TOUCH.right;
  const spd=210*heroSpeedMul;
  if(left){p.setVelocityX(-spd);p.setFlipX(true);} else if(right){p.setVelocityX(spd);p.setFlipX(false);} else p.setVelocityX(0);
  const onGround=p.body.blocked.down||p.body.touching.down;
  if((c.up.isDown||this.spaceKey.isDown||TOUCH.jump)&&onGround){ p.setVelocityY(this.jumpVel*heroJumpMul); sfx('jump'); }
  if(this.atkKeys.some(k=>Phaser.Input.Keyboard.JustDown(k))) doAttack(this);
  if(Phaser.Input.Keyboard.JustDown(this.k1)){currentWeapon='boomerang';updateWeaponHUD(this);applyHeroLook(this);}
  if(Phaser.Input.Keyboard.JustDown(this.k2)){currentWeapon='club';updateWeaponHUD(this);applyHeroLook(this);}
  if(Phaser.Input.Keyboard.JustDown(this.buyKey)) activateArmor(this);
  if(p._st!=='attack'){ if(!onGround)setSt(p,'jump'); else if(left||right)setSt(p,'run'); else setSt(p,'idle'); }

  const sx=this.cameras.main.scrollX;
  this.bgFar.tilePositionX=sx*0.1; this.bgMid.tilePositionX=sx*0.35; this.bgFront.tilePositionX=sx*0.6;
  if(p.y>560) pitDeath(this);
  if(now<magnetUntil && this.bananas){ this.bananas.children.iterate(b=>{   // магнит: бананы рядом подбираются сами
    if(b&&b.active && Phaser.Math.Distance.Between(b.x,b.y,p.x,p.y)<220) collectBanana(p,b); }); }

  this.enemies.children.iterate(e=>{
    if(!e||!e.active)return;
    if(e.y>720){ if(e.isBoss)this.boss=null; e.disableBody(true,true); return; }
    if(now<(e.fleeUntil||0)){ e.setFlipX(e.body.velocity.x<0); return; }   // отпрыгивает после стомпа — не перебиваем скорость ИИ
    if(now<(this.freezeUntil||0)){ e.setVelocityX(0); e.setTint(0x9ad4ff); return; }   // заморозка из магазина наград
    const t=e.getData('type'),mn=e.getData('min'),mx=e.getData('max');
    const dx=p.x-e.x, dy=p.y-e.y, adx=Math.abs(dx);
    const DZ=16, above=dy<=-55;   // герой заметно выше — не догоняем по горизонтали (без дёрганья), а патрулируем
    if(t==='shrimp'){ patrolMove(this,e,mn,mx); }
    else if(t==='boss'){ e.setFlipX(dx<0);
      if(adx>DZ && dy>-90) e.setVelocityX(dx<0?-e.speed:e.speed); else patrolMove(this,e,mn,mx);
      if(e.atkTex && now<(e.atkUntil||0)){ e.anims.stop(); e.setTexture(e.atkTex); e.setFlipX(dx<0); }
      else if(e.atkTex && adx<82 && Math.abs(dy)<95 && now>(e.atkCd||0)){ e.atkUntil=now+340; e.atkCd=now+1200; e.anims.stop(); e.setTexture(e.atkTex); e.setFlipX(dx<0); }
      else if(e.walkAnim && (!e.anims.isPlaying||(e.anims.currentAnim&&e.anims.currentAnim.key!==e.walkAnim))) e.play(e.walkAnim); }
    else if(t==='thrower'||t==='archer'){ const rng=t==='archer'?560:380; e.setFlipX(dx<0);
      if(adx<rng && !above && Math.abs(dy)<150){
        if(adx>=120){ e.setVelocityX(0); if(now>e.fireReady){ e.fireReady=now+(t==='archer'?1500:1100); fireAt(this,e,t==='archer'?'e_arrow':'e_knife',t==='archer'?370:270);} }
        else if(adx>DZ){ e.setVelocityX(dx<0?e.speed:-e.speed); } else e.setVelocityX(0); }
      else patrolMove(this,e,mn,mx); }
    else if(t==='troll_boulder'){ e.setFlipX(dx<0); const rng=540;
      if(adx<rng && !above && Math.abs(dy)<175){
        if(adx>=175){ e.setVelocityX(0); if(now>e.fireReady){ e.fireReady=now+2400; e.atkUntil=now+380; fireRock(this,e); } }
        else if(adx>DZ){ e.setVelocityX(dx<0?e.speed:-e.speed); } else e.setVelocityX(0); }
      else patrolMove(this,e,mn,mx);
      if(e.atkTex && now<(e.atkUntil||0)){ e.anims.stop(); e.setTexture(e.atkTex); e.setFlipX(dx<0); }   // кадр броска валуна
      else if(e.walkAnim && (!e.anims.isPlaying||(e.anims.currentAnim&&e.anims.currentAnim.key!==e.walkAnim))) e.play(e.walkAnim); }
    else { if(t==='shield'){ if(now>e.nextInv){ e.inv=true; e.invEnd=now+1500; e.nextInv=now+3800; e.setTint(0x9fd8ff); } if(e.inv&&now>e.invEnd){ e.inv=false; e.clearTint(); } }
      const det=440, csp=e.chase||150, overhead=adx<34 && dy<-12 && dy>-175;
      if(overhead){ e.setVelocityX(0); e.setFlipX(dx<0); }                          // герой прямо сверху — стоим, даём стомпнуть
      else if(adx>=40 && adx<det && !above && Math.abs(dy)<150){ e.setVelocityX(dx<0?-csp:csp); e.setFlipX(dx<0); }
      else patrolMove(this,e,mn,mx);                                                // вплотную/далеко/высоко — ровное движение (без дёрганья)
      // ближний бой: вплотную к герою — кадр удара (замах), иначе ходьба
      if(e.atkTex && now<(e.atkUntil||0)){ e.anims.stop(); e.setTexture(e.atkTex); e.setFlipX(dx<0); }
      else if(e.atkTex && adx<58 && Math.abs(dy)<72 && !above && now>(e.atkCd||0)){ e.atkUntil=now+300; e.atkCd=now+1000; e.anims.stop(); e.setTexture(e.atkTex); e.setFlipX(dx<0); }
      else if(e.walkAnim && (!e.anims.isPlaying||(e.anims.currentAnim&&e.anims.currentAnim.key!==e.walkAnim))) e.play(e.walkAnim); }
  });

  this.projs.children.iterate(pr=>{ if(pr&&pr.active&&now-pr.born>1100) pr.destroy(); });
  this.eprojs.children.iterate(pr=>{ if(pr&&pr.active&&now-pr.born>2600) pr.destroy(); });
  if(this.rocks){ const camx=this.cameras.main.scrollX; this.rocks.children.iterate(r=>{ if(r&&r.active&&(now-r.born>5200||r.x<camx-120||r.x>camx+920||r.y>620)) r.destroy(); }); }
  if(this.bossBar&&this.bossBar.active) this.bossBar.setSize(this.boss?Math.max(0,300*(this.boss.hp/this.boss.maxhp)):0,12);
}

function doAttack(scene){
  if(gameOver||paused)return;
  const now=scene.time.now; if(now<scene.atkReady)return; scene.atkReady=now+360;
  const p=scene.player,dir=p.flipX?-1:1, dmg=WEAPONS[currentWeapon].dmg*dmgMul;
  if(currentWeapon==='boomerang'){ const pr=scene.projs.create(p.x+dir*22,p.y-6,'proj'); pr.body.setAllowGravity(false);
    pr.setVelocityX(dir*400); pr.setAngularVelocity(760); pr.setDepth(5); pr.born=now; sfx('throw'); }
  else { p.setTexture(HK().attack); p._st='attack'; sfx('swing'); scene.time.delayedCall(240,()=>{ if(p.active)p._st=null; });
    const slash=scene.add.ellipse(p.x+dir*42,p.y-4,64,52,0xffffff,0.55).setDepth(6);
    scene.tweens.add({targets:slash,alpha:0,scaleX:1.5,scaleY:1.5,duration:200,onComplete:()=>slash.destroy()});
    const range=76;
    scene.enemies.children.iterate(e=>{ if(!e||!e.active)return; const ddx=(e.x-p.x)*dir; if(ddx>-10&&ddx<range&&Math.abs(e.y-p.y)<66) damageEnemy(e,dmg); });
    scene.solids.children.iterate(s=>{ if(!s||!s.active||!s.breakable)return; const ddx=(s.x-p.x)*dir; if(ddx>-10&&ddx<range&&Math.abs(s.y-p.y)<70){ s.hp-=dmg+1; if(s.hp<=0){s.destroy();sfx('break');} else {s.setTint(0xffaaaa);scene.time.delayedCall(80,()=>{if(s.active)s.clearTint();});} } }); }
}
function projHit(pr,e){ if(e.inv){ blockSpark(e); pr.destroy(); return; } damageEnemy(e,WEAPONS[currentWeapon].dmg*dmgMul); pr.destroy(); }
function blockSpark(e){ sfx('block'); const s=e.scene.add.text(e.x,e.y-30,'✦',{fontFamily:'Fredoka, "Trebuchet MS", sans-serif',fontSize:'20px',color:'#bfe3ff'}).setOrigin(0.5).setDepth(7);
  e.scene.tweens.add({targets:s,alpha:0,y:e.y-52,duration:300,onComplete:()=>s.destroy()}); }
function damageEnemy(e,dmg){ const scene=e.scene; if(e.inv){ blockSpark(e); return; }
  e.hp-=dmg; e.setTint(0xff6666); scene.time.delayedCall(110,()=>{ if(e.active&&!e.inv)e.clearTint(); });
  if(e.hp>0){ sfx('hit'); return; }
  { const t=e.getData('type'), pts=t==='shrimp'?50:(t==='boss'?700:(t==='berserk'?160:(t.indexOf('troll')===0?200:120))); score+=pts*scoreMul; updateHud(scene); checkUpgrade(scene);
    const boss=e.isBoss; sfx(boss?'bossDie':'enemyDie'); e.disableBody(true,true);
    if(boss){ scene.boss=null; gameOver=true; scene.physics.pause();
      if(currentLevel<META.length-1) window.levelClear(currentLevel+1); else window.showWin(); } } }
function hitEnemy(player,e){ if(player.body.touching.down&&e.body.touching.up){ sfx('stomp'); if(!e.inv)damageEnemy(e,STOMP_DMG); else blockSpark(e); player.setVelocityY(-440);
    if(e.active){ const now=e.scene.time.now, away=player.x<e.x?1:-1;   // выживший враг подпрыгивает (скидывает героя) и удирает в другую сторону
      e.setVelocityY(-460); e.setVelocityX(away*Math.max(150,(e.speed||90)*1.4)); e.setFlipX(away<0); e.fleeUntil=now+600; }
  } else hurtPlayer(player.scene,e.x); }
function collectBanana(player,banana){ banana.disableBody(true,true); score+=10*scoreMul; sfx('banana'); updateHud(player.scene); checkUpgrade(player.scene); }
function getLife(player,l){ l.disableBody(true,true); lives=Math.min(lives+1,9); sfx('life'); updateHud(player.scene);
  const t=player.scene.add.text(l.x,l.y-10,'+1 ♥',{fontFamily:'Fredoka, "Trebuchet MS", sans-serif',fontSize:'18px',color:'#ff7a93',stroke:'#3a0a14',strokeThickness:4}).setOrigin(0.5).setDepth(15);
  player.scene.tweens.add({targets:t,y:l.y-46,alpha:0,duration:800,onComplete:()=>t.destroy()}); }
function reachFlag(){ if(gameOver)return; gameOver=true; this.physics.pause(); this.player.setVelocity(0,0);
  if(currentLevel<META.length-1) window.levelClear(currentLevel+1); else window.showWin(); }
function hurtPlayer(scene,fromX,dmg){ const p=scene.player; if(gameOver||p.invuln)return;
  heroHP-=(dmg||DMG.contact); updateHud(scene);
  if(heroHP<=0){ loseLife(scene); return; }
  sfx('hurt');
  const dir=(p.x<fromX)?-1:1; p.setVelocity(dir*200,-250); scene.cameras.main.flash(120,255,90,90);
  p.invuln=true; p.setAlpha(0.55); scene.time.delayedCall(700,()=>{ if(p.active&&!p.armor){p.invuln=false;p.setAlpha(1);} }); }
function loseLife(scene){ lives-=1; heroHP=HERO_MAXHP; sfx('die');
  if(lives<=0){ gameOver=true; scene.physics.pause(); scene.cameras.main.flash(400,160,0,0);
    scene.add.text(400,200,'Уровень заново',{fontFamily:'Fredoka, "Trebuchet MS", sans-serif',fontSize:'30px',color:'#fff',stroke:'#3a0a0a',strokeThickness:6}).setScrollFactor(0).setOrigin(0.5).setDepth(30);
    scene.time.delayedCall(1200,()=>{ lives=START_LIVES; heroHP=HERO_MAXHP; gameOver=false; scene.scene.restart(); }); return; }
  const p=scene.player; p.setVelocity(0,0); p.setPosition(scene.cpX,180); p.clearTint();   // респаун на чекпоинте, полный HP
  scene.cameras.main.flash(160,255,80,80); updateHud(scene);
  p.invuln=true; p.setAlpha(0.5); scene.time.delayedCall(1000,()=>{ if(p.active&&!p.armor){p.invuln=false;p.setAlpha(1);} }); }
function pitDeath(scene){ const p=scene.player; if(gameOver)return;
  if(p.armor){ p.setVelocity(0,0); p.setPosition(scene.cpX,180); return; }
  if(p.invuln)return; loseLife(scene); }
function updateHud(s){ s.hud.setText('Очки: '+score+'    Жизни: '+lives+'    Уровень: '+(currentLevel+1));
  if(s.hpBar){ const f=Math.max(0,heroHP)/HERO_MAXHP; s.hpBar.width=160*f;
    s.hpBar.fillColor = f>0.5?0x4caf50:(f>0.25?0xffc93c:0xff4d4d); } }

/* ---- сенсорное управление (мобильные) ---- */
function setupTouch(){
  const coarse=window.matchMedia&&window.matchMedia('(pointer:coarse)').matches;
  if(!(coarse||('ontouchstart'in window)||navigator.maxTouchPoints>0)) return;  // только тач-устройства
  document.body.classList.add('touch');
  const hold=(id,prop)=>{ const el=document.getElementById(id); if(!el)return;
    const on=e=>{ e.preventDefault(); TOUCH[prop]=true; };
    const off=e=>{ e.preventDefault(); TOUCH[prop]=false; };
    el.addEventListener('pointerdown',on); el.addEventListener('pointerup',off);
    el.addEventListener('pointercancel',off); el.addEventListener('pointerleave',off); };
  hold('btnLeft','left'); hold('btnRight','right'); hold('btnJump','jump');
  const tap=(id,fn)=>{ const el=document.getElementById(id); if(!el)return;
    el.addEventListener('pointerdown',e=>{ e.preventDefault(); fn(); }); };
  tap('btnAtk',()=>{ if(activeScene) doAttack(activeScene); });
  tap('btnWeap',()=>{ currentWeapon=currentWeapon==='boomerang'?'club':'boomerang'; if(activeScene){updateWeaponHUD(activeScene);applyHeroLook(activeScene);} });
  tap('btnArmor',()=>{ if(activeScene) activateArmor(activeScene); });
  tap('btnInv',()=>{ if(pauseReason==='inv') closeInventory(); else openInventory(); });
  // сброс зажатий при сворачивании/потере фокуса — чтобы кнопки не «залипали»
  const clear=()=>{ TOUCH.left=TOUCH.right=TOUCH.jump=false; };
  window.addEventListener('blur',clear);
  document.addEventListener('visibilitychange',()=>{ if(document.hidden)clear(); });
}
setupTouch();

/* ---- кнопка «Продолжить» на титуле (если есть сохранение) ---- */
(function(){ const b=document.getElementById('continueBtn'); if(!b)return; const s=loadSave();
  if(s&&typeof s.level==='number'&&s.level>0){ const n=Math.min(s.level,META.length-1)+1;
    b.style.display=''; b.textContent='Продолжить (ур. '+n+')'; b.onclick=continueGame; } })();

/* ---- полный экран (ПК) ---- */
function fsActive(){ return document.fullscreenElement||document.webkitFullscreenElement; }
function enterFS(){ const st=document.getElementById('stage'); const req=st.requestFullscreen||st.webkitRequestFullscreen; if(req){ try{ const p=req.call(st); if(p&&p.catch)p.catch(()=>{}); }catch(e){} } }
function toggleFS(){ if(fsActive()){ const ex=document.exitFullscreen||document.webkitExitFullscreen; if(ex)try{ex.call(document);}catch(e){} } else enterFS(); }
(function(){ const b=document.getElementById('fsBtn'); if(!b)return;
  b.onclick=e=>{ e.stopPropagation(); toggleFS(); };
  const upd=()=>{ b.textContent=fsActive()?'🗗':'⛶'; };
  document.addEventListener('fullscreenchange',upd); document.addEventListener('webkitfullscreenchange',upd);
  // мобильные: автоматически на весь экран при первом касании (где API доступен)
  if(document.body.classList.contains('touch')){
    const once=()=>{ enterFS(); window.removeEventListener('pointerdown',once); };
    window.addEventListener('pointerdown',once); } })();
