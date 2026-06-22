/* Обёртка Yandex Games SDK v2 — безопасная деградация вне Яндекс.Игр.
   Игра полностью работает и без SDK (локально / на Vercel): все методы тогда no-op. */
window.YA=(function(){
  let sdk=null, player=null, cloud={}, saveTimer=null, loadedReq=false, loadedDone=false;
  const D={ inited:false, ready:false, hasAds:false, lang:null };
  const safe=fn=>{ try{ return fn(); }catch(e){ return undefined; } };

  // сообщить платформе, что игра загружена и готова к игре (обязательный вызов).
  // вызывать ровно один раз и именно когда контент готов — не раньше (иначе игрок видит чёрный экран).
  function flushLoaded(){ if(loadedDone||!loadedReq||!sdk)return; loadedDone=true;
    safe(()=>sdk.features&&sdk.features.LoadingAPI&&sdk.features.LoadingAPI.ready()); }
  D.loaded=function(){ loadedReq=true; flushLoaded(); };

  D.init=function(onReady){
    if(D.inited){ onReady&&onReady(); return; } D.inited=true;
    let done=false; const fin=()=>{ if(done)return; done=true; onReady&&onReady(); };
    if(typeof YaGames==='undefined'){ fin(); return; }          // SDK не загрузился — играем без него
    const to=setTimeout(fin,4500);                               // не блокируем игру, если init завис
    Promise.resolve().then(()=>YaGames.init()).then(s=>{
      sdk=s; window.ysdk=s; D.ready=true; D.hasAds=!!(s.adv); clearTimeout(to);
      D.lang=safe(()=>s.environment.i18n.lang)||null;
      flushLoaded();                                             // если игра уже сообщила о готовности — отправить ready() сейчас
      setTimeout(()=>{ loadedReq=true; flushLoaded(); }, 8000);  // страховка: вызвать ready() даже если игра почему-то не дёрнула loaded()
      safe(()=>s.getPlayer({scopes:false}).then(p=>{ player=p; loadCloud(); }).catch(()=>loadCloud()));
      fin();
    }).catch(()=>{ clearTimeout(to); fin(); });
  };

  function loadCloud(){
    if(player&&player.getData){ player.getData().then(d=>{ cloud=d||{}; window.YA_onCloud&&window.YA_onCloud(cloud); })
      .catch(()=>{ window.YA_onCloud&&window.YA_onCloud(null); }); }
    else { window.YA_onCloud&&window.YA_onCloud(null); }
  }
  D.cloudSet=function(obj){ Object.assign(cloud,obj);
    if(!player||!player.setData)return;
    clearTimeout(saveTimer); saveTimer=setTimeout(()=>{ safe(()=>player.setData(cloud,false)); },800); };

  D.gameplayStart=function(){ safe(()=>sdk&&sdk.features&&sdk.features.GameplayAPI&&sdk.features.GameplayAPI.start()); };
  D.gameplayStop =function(){ safe(()=>sdk&&sdk.features&&sdk.features.GameplayAPI&&sdk.features.GameplayAPI.stop());  };

  // межуровневая (fullscreen) реклама; cb вызывается после закрытия/ошибки/без SDK
  D.fullscreen=function(cb){ cb=cb||function(){};
    if(!sdk||!sdk.adv||!sdk.adv.showFullscreenAdv){ cb(); return; }
    let called=false; const go=()=>{ if(called)return; called=true; window.onAdEnd&&window.onAdEnd(); cb(); };
    try{ sdk.adv.showFullscreenAdv({ callbacks:{
      onOpen:()=>{ window.onAdStart&&window.onAdStart(); },
      onClose:go, onError:go, onOffline:go } }); }
    catch(e){ go(); }
  };
  // ролик за награду: onReward — если досмотрел; onDone — всегда после закрытия
  D.rewarded=function(onReward,onDone){ onReward=onReward||function(){}; onDone=onDone||function(){};
    if(!sdk||!sdk.adv||!sdk.adv.showRewardedVideo){ onDone(); return; }
    let rewarded=false, fin=false; const done=()=>{ if(fin)return; fin=true; window.onAdEnd&&window.onAdEnd(); if(rewarded)onReward(); onDone(); };
    try{ sdk.adv.showRewardedVideo({ callbacks:{
      onOpen:()=>{ window.onAdStart&&window.onAdStart(); },
      onRewarded:()=>{ rewarded=true; },
      onClose:done, onError:done } }); }
    catch(e){ done(); }
  };
  return D;
})();
