// lancé par le test « local » de NeoDex : un lancer (plouf), l'eau, les oiseaux et la musique, l'aquarium de la collection, le bouton SON,
// des textes d'aide lisibles, le plein écran et la place prise (avec NEO_SHOTS : garde des images du jeu et de l'aquarium)
module.exports = async ({ pj, sleep }) => {
  const C = code => pj(`(() => { const cv = document.getElementById('fiCanvas'), T = cv.__fi; ${code} })()`);
  const shot = async (n, id = 'fiCanvas') => { if (!process.env.NEO_SHOTS) return; const d = await pj(`(document.getElementById('${id}') || document.querySelector('.${id}')).toDataURL()`); require('fs').writeFileSync(require('path').join(process.env.NEO_SHOTS, 'peche-' + n + '.png'), Buffer.from(d.split(',')[1], 'base64')); };
  await pj(`window.__e = []; addEventListener('error', e => __e.push(e.message)); 0`);
  if (/COUPÉ/.test(await pj(`document.getElementById('fiSndBtn').textContent`))) await pj(`document.getElementById('fiSndBtn').click(), 0`);
  // un lancer : maintenir puis relâcher sur le canevas
  const ptr = t => pj(`(() => { const c = document.getElementById('fiCanvas'), r = c.getBoundingClientRect(); c.dispatchEvent(new PointerEvent('${t}', {bubbles: true, pointerId: 1, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2})); if ('${t}' === 'pointerup') dispatchEvent(new PointerEvent('pointerup', {pointerId: 1})); return 0; })()`);
  await ptr('pointerdown'); await sleep(700); await ptr('pointerup'); await sleep(3000); await shot('0-lancer');
  const s = await C('return T.snd();');
  if (!s.ac || s.amb <= 0 || s.mus < 2 || s.n < 3) throw new Error('sons : ' + JSON.stringify(s));
  // le bouton SON coupe tout (l'eau se tait), puis le remet
  await pj(`document.getElementById('fiSndBtn').click(), 0`); await sleep(1500);
  const quiet = await C('return T.snd().amb;'); await pj(`document.getElementById('fiSndBtn').click(), 0`);
  if (quiet > .005) throw new Error('le son ne se coupe pas : ' + quiet);
  // l'aquarium : des prises gardées nagent dans la collection, un clic sur l'une ouvre sa fiche
  await C('for (const [id, cm] of [[0, 20], [3, 31], [5, 18], [8, 44], [12, 26]]) T.keep(id, cm); return 0;');
  await pj(`document.getElementById('fiDexBtn').click(), 0`); await sleep(1500); await shot('1-aquarium', 'fiTank');
  const n = await pj(`document.querySelector('.fiTank').__fish.length`); if (n < 5) throw new Error('aquarium : ' + n + ' poissons');
  const det = await pj(`(() => { const c = document.querySelector('.fiTank'), o = c.__fish[0], r = c.getBoundingClientRect(); c.dispatchEvent(new MouseEvent('click', {bubbles: true, clientX: r.left + (o.x + o.a.width / 2) / 384 * r.width, clientY: r.top + (o.y + o.a.height / 2) / 120 * r.height})); return document.querySelector('.fiDetail b')?.textContent || ''; })()`);
  if (!det) throw new Error('clic dans l\'aquarium : « ' + det + ' »');
  await pj(`document.getElementById('fiDexBtn').click(), 0`);
  const fsz = await pj(`parseFloat(getComputedStyle(document.querySelector('.appWrap > .hint')).fontSize)`); if (fsz < 15) throw new Error('aide trop petite : ' + fsz + ' px');
  const errs = await pj(`window.__e.join(' | ')`); if (errs) throw new Error('erreur : ' + errs);
  await pj(`document.getElementById('fiFsBtn').click(), 0`); await sleep(700);
  const fs = await pj(`(() => { const c = document.getElementById('fiCanvas'), r = c.getBoundingClientRect(); return document.fullscreenElement === c.parentElement && (Math.abs(r.height - innerHeight) < 3 || Math.abs(r.width - innerWidth) < 3); })()`);
  await pj(`document.fullscreenElement && document.exitFullscreen(), 0`); await sleep(300);
  if (!fs) throw new Error('le plein écran ne remplit pas l\'écran');
  const L = await pj(`(() => { const r = document.getElementById('fiCanvas').getBoundingClientRect(); return { right: Math.round(r.right), h: Math.round(r.height), ww: innerWidth, sw: document.documentElement.scrollWidth }; })()`);
  if (L.sw > L.ww + 1 || L.h < 200) throw new Error('le jeu dépasse la fenêtre ou reste petit : ' + JSON.stringify(L));
  // 1.4 : vraie lune et vraies saisons, montages, atelier, légende en trois phases, tournoi de la semaine
  const sky = await C(`return {full: T.moon(Date.UTC(2024, 0, 25, 17, 54)), nw: T.moon(Date.UTC(2024, 1, 9, 22, 59)), sea: T.season(new Date(2026, 6, 14)) + T.season(new Date(2026, 0, 3)), name: T.moonName(.5)};`);
  if (Math.abs(sky.full - .5) > .02 || Math.min(sky.nw, 1 - sky.nw) > .02 || sky.sea !== 'EH' || sky.name !== 'Pleine lune') throw new Error('lune ou saison : ' + JSON.stringify(sky));
  const gear = await C(`const s = T.save(); s.spots = ['E', 'R', 'L', 'C', 'T', 'B', 'A']; s.spot = 'L'; s.rod = 4; s.weather = 'clair'; s.clock = 12 * 60; s.bait = 'p';
    const share = k => { s.gear = k; let big = 0, small = 0; for (let i = 0; i < 3000; i++) { const f = T.pick(.8); if (f.max >= 100) big++; if (f.max <= 40) small++; } return [big / 3000, small / 3000]; };
    const r = {std: share('std'), leger: share('leger'), lourd: share('lourd')}; s.gear = 'std'; return r;`);
  if (!(gear.lourd[0] > gear.std[0] * 1.5 && gear.leger[1] > gear.std[1] * 1.2)) throw new Error('montages : ' + JSON.stringify(gear));
  const craft = await C(`const s = T.save(); s.mats = {plume: 3, ecaille: 1}; const ok = T.craft('m'), again = T.craft('m'); return {ok, again, n: s.baits.m, left: s.mats.plume};`);
  if (!craft.ok || craft.again || craft.n !== 10 || craft.left !== 0) throw new Error('atelier : ' + JSON.stringify(craft));
  // the old pike of the lake: the story from Gaston to the catch, then a fight played by a simple bot
  const story = await C(`const s = T.save(), fi = T.st(), steps = []; s.xp = 60 * 9; s.spot = 'L'; s.clock = 6 * 60; s.weather = 'pluie'; s.rod = 2; s.gear = 'std';
    const pike = T.FISH.find(f => f.name === 'Brochet'), st = () => s.legends.brochet || {step: 0};
    const land = (f, cm) => { fi.special = null; fi.legend = null; fi.fish = f; fi.cm = cm; fi.perfect = false; T.land(); fi.card = null; };
    for (let i = 0; i < 3; i++) land(pike, 80); steps.push(st().step);
    for (let i = 0; i < 80 && st().step === 1; i++) land(pike, 70); steps.push(st().step);
    s.mats.plume = 2; s.mats.ecaille = 4; T.craft('x'); steps.push(st().step, s.baits.x);
    const results = [];
    for (let tries = 0; tries < 6 && st().step === 3; tries++) {
      s.bait = 'x'; s.clock = 6 * 60; s.weather = 'pluie'; fi.mode = 'play'; fi.card = null; fi.phase = 'wait'; fi.castPower = .9; fi.target = 340; fi.bob = {x: 340, y: 108}; fi.biteIn = 1; fi.nibble = 0;
      T.update(); if (!fi.legend) return {err: 'pas de légende', fish: fi.fish && fi.fish.name};
      fi.biteT = fi.biteMax; T.press(true); fi.holding = true; let top = 1, n = 0;
      while (fi.phase === 'fight' && n++ < 60 * 400) { fi.holding = !(fi.T > .7 || fi.jump > 0 || (fi.rush && fi.T > .45)); fi.steer = fi.dir ? -fi.dir : 0; T.update(); s.clock = 6 * 60; top = Math.max(top, fi.lphase || top); }
      results.push({top, end: fi.phase, s: Math.round(n / 60)});
      if (st().step === 3 && !(s.baits.x > 0)) s.baits.x = 3;
    }
    fi.card = null; fi.phase = 'idle'; fi.holding = false;
    return {steps, results, done: st().step, dex: !!s.dex[T.FISH.find(f => f.name === 'Vieux brochet').id]};`);
  if (story.err || story.steps.join() !== '1,2,3,3' || story.done !== 4 || !story.dex || !story.results.some(r => r.top === 3)) throw new Error('légende : ' + JSON.stringify(story));
  const tourn = await C(`const s = T.save(), t = T.tourn(), m0 = s.money; t.score = 999999; const r = T.rivals(t); T.pay(t); const gain = s.money - m0; delete s.tourn; const t2 = T.tourn(); return {kind: t.kind, spot: t.spot, rivals: r.length, gain, rank: s.tournHist.at(-1).rank, fresh: t2.score === 0 && !t2.paid};`);
  if (tourn.rivals !== 5 || tourn.rank !== 1 || tourn.gain < 2000 || !tourn.fresh) throw new Error('tournoi : ' + JSON.stringify(tourn));
  const panels = {};
  for (const p of ['craft', 'village', 'tourn', 'shop']) { await C(`T.panel('${p}'); return 0;`); await sleep(300); panels[p] = await pj(`(() => { const id = {craft: 'fiCraft', village: 'fiVillage', tourn: 'fiTourn', shop: 'fiShop'}['${p}'], e = document.getElementById(id); return e.style.display !== 'none' ? e.querySelectorAll('.sysCard, .fiBoard span').length : -1; })()`); if (process.env.NEO_SHOTS) await pj(`document.getElementById({craft: 'fiCraft', village: 'fiVillage', tourn: 'fiTourn', shop: 'fiShop'}['${p}']).scrollIntoView(), 0`); }
  await C(`T.panel(''); return 0;`);
  if (panels.craft < 6 || panels.village !== 3 || panels.tourn < 18 || panels.shop < 15) throw new Error('panneaux : ' + JSON.stringify(panels));
  // a night under the moon in autumn, then the legend fight on screen
  await C(`const s = T.save(); s.spot = 'E'; s.clock = 23 * 60; s.weather = 'clair'; T.st().phase = 'idle'; T.st().card = null; return 0;`); await sleep(1500); await shot('2-nuit');
  await C(`const s = T.save(), fi = T.st(); s.spot = 'L'; s.clock = 19 * 60; s.weather = 'pluie'; Object.assign(fi, {phase: 'fight', legend: 'brochet', lphase: 2, fish: T.FISH.find(f => f.name === 'Vieux brochet'), cm: 170, T: .5, D: .5, stam: .8, S: 1.1, rush: false, rushT: 999, dir: 1, dirT: 999, jump: 0, target: 340, bob: {x: 300, y: 108}, holding: false}); return 0;`);
  await sleep(400); await shot('3-legende'); await C(`const fi = T.st(); fi.phase = 'idle'; fi.legend = null; fi.bob = null; return 0;`);
  const errs2 = await pj(`window.__e.join(' | ')`); if (errs2) throw new Error('erreur : ' + errs2);
  return s.n + ' sons et ' + s.mus + ' notes de musique · aquarium de ' + n + ' poissons, fiche « ' + det + ' » · aide ' + fsz + ' px · plein écran · ' + L.h + ' px dans ' + L.ww + ' · lune ' + sky.full.toFixed(3) + ' · lourd ' + Math.round(gear.lourd[0] * 100) + ' % de monstres (polyvalent ' + Math.round(gear.std[0] * 100) + ' %) · légende : ' + story.results.map(r => r.end + ' phase ' + r.top + ' en ' + r.s + ' s').join(', ') + ' · tournoi ' + tourn.kind + ' +' + tourn.gain + ' · panneaux ' + JSON.stringify(panels);
};
