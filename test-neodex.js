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
  return s.n + ' sons et ' + s.mus + ' notes de musique · aquarium de ' + n + ' poissons, fiche « ' + det + ' » · aide ' + fsz + ' px · plein écran · ' + L.h + ' px dans ' + L.ww;
};
