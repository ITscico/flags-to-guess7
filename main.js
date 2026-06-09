'use strict';

const GAME_ROUNDS = 5;
const MAX_TRIES = 7;
const POINTS_BY_TRY = [100, 80, 60, 40, 25, 10, 5];

const FLAG_POOLS = {
  easy: [
    { code: 'it', names: { it: ['italia'], en: ['italy'] } },
    { code: 'fr', names: { it: ['francia'], en: ['france'] } },
    { code: 'de', names: { it: ['germania'], en: ['germany'] } },
    { code: 'es', names: { it: ['spagna'], en: ['spain'] } },
    { code: 'pt', names: { it: ['portogallo'], en: ['portugal'] } },
    { code: 'gb', names: { it: ['regno unito', 'gran bretagna', 'inghilterra'], en: ['united kingdom', 'great britain', 'england'] } },
    { code: 'us', names: { it: ['stati uniti', 'usa', 'america'], en: ['united states', 'usa', 'america'] } },
    { code: 'ca', names: { it: ['canada'], en: ['canada'] } },
    { code: 'br', names: { it: ['brasile'], en: ['brazil'] } },
    { code: 'ar', names: { it: ['argentina'], en: ['argentina'] } },
    { code: 'mx', names: { it: ['messico'], en: ['mexico'] } },
    { code: 'jp', names: { it: ['giappone'], en: ['japan'] } }
  ],
  medium: [
    { code: 'nl', names: { it: ['paesi bassi', 'olanda'], en: ['netherlands', 'holland'] } },
    { code: 'ch', names: { it: ['svizzera'], en: ['switzerland'] } },
    { code: 'se', names: { it: ['svezia'], en: ['sweden'] } },
    { code: 'no', names: { it: ['norvegia'], en: ['norway'] } },
    { code: 'dk', names: { it: ['danimarca'], en: ['denmark'] } },
    { code: 'fi', names: { it: ['finlandia'], en: ['finland'] } },
    { code: 'pl', names: { it: ['polonia'], en: ['poland'] } },
    { code: 'gr', names: { it: ['grecia'], en: ['greece'] } },
    { code: 'tr', names: { it: ['turchia'], en: ['turkey', 'turkiye'] } },
    { code: 'au', names: { it: ['australia'], en: ['australia'] } },
    { code: 'in', names: { it: ['india'], en: ['india'] } },
    { code: 'cn', names: { it: ['cina'], en: ['china'] } },
    { code: 'kr', names: { it: ['corea del sud', 'sud corea'], en: ['south korea', 'korea'] } },
    { code: 'za', names: { it: ['sudafrica', 'sud africa'], en: ['south africa'] } },
    { code: 'eg', names: { it: ['egitto'], en: ['egypt'] } },
    { code: 'ma', names: { it: ['marocco'], en: ['morocco'] } }
  ],
  advanced: [
    { code: 'be', names: { it: ['belgio'], en: ['belgium'] } },
    { code: 'at', names: { it: ['austria'], en: ['austria'] } },
    { code: 'ie', names: { it: ['irlanda'], en: ['ireland'] } },
    { code: 'cz', names: { it: ['cechia', 'repubblica ceca'], en: ['czechia', 'czech republic'] } },
    { code: 'hu', names: { it: ['ungheria'], en: ['hungary'] } },
    { code: 'ro', names: { it: ['romania'], en: ['romania'] } },
    { code: 'bg', names: { it: ['bulgaria'], en: ['bulgaria'] } },
    { code: 'ua', names: { it: ['ucraina'], en: ['ukraine'] } },
    { code: 'is', names: { it: ['islanda'], en: ['iceland'] } },
    { code: 'nz', names: { it: ['nuova zelanda'], en: ['new zealand'] } },
    { code: 'cl', names: { it: ['cile'], en: ['chile'] } },
    { code: 'co', names: { it: ['colombia'], en: ['colombia'] } },
    { code: 'pe', names: { it: ['peru', 'perù'], en: ['peru'] } },
    { code: 've', names: { it: ['venezuela'], en: ['venezuela'] } },
    { code: 'sa', names: { it: ['arabia saudita'], en: ['saudi arabia'] } },
    { code: 'ae', names: { it: ['emirati arabi uniti', 'emirati'], en: ['united arab emirates', 'uae'] } },
    { code: 'qa', names: { it: ['qatar'], en: ['qatar'] } },
    { code: 'il', names: { it: ['israele'], en: ['israel'] } },
    { code: 'th', names: { it: ['thailandia', 'tailandia'], en: ['thailand'] } },
    { code: 'vn', names: { it: ['vietnam'], en: ['vietnam'] } },
    { code: 'id', names: { it: ['indonesia'], en: ['indonesia'] } },
    { code: 'my', names: { it: ['malesia'], en: ['malaysia'] } },
    { code: 'ph', names: { it: ['filippine'], en: ['philippines'] } },
    { code: 'sg', names: { it: ['singapore'], en: ['singapore'] } }
  ],
  hard: [
    { code: 'ee', names: { it: ['estonia'], en: ['estonia'] } },
    { code: 'lv', names: { it: ['lettonia'], en: ['latvia'] } },
    { code: 'lt', names: { it: ['lituania'], en: ['lithuania'] } },
    { code: 'si', names: { it: ['slovenia'], en: ['slovenia'] } },
    { code: 'sk', names: { it: ['slovacchia'], en: ['slovakia'] } },
    { code: 'hr', names: { it: ['croazia'], en: ['croatia'] } },
    { code: 'rs', names: { it: ['serbia'], en: ['serbia'] } },
    { code: 'ba', names: { it: ['bosnia ed erzegovina', 'bosnia'], en: ['bosnia and herzegovina', 'bosnia'] } },
    { code: 'me', names: { it: ['montenegro'], en: ['montenegro'] } },
    { code: 'al', names: { it: ['albania'], en: ['albania'] } },
    { code: 'mk', names: { it: ['macedonia del nord', 'macedonia'], en: ['north macedonia', 'macedonia'] } },
    { code: 'ge', names: { it: ['georgia'], en: ['georgia'] } },
    { code: 'am', names: { it: ['armenia'], en: ['armenia'] } },
    { code: 'az', names: { it: ['azerbaigian', 'azerbaijan'], en: ['azerbaijan'] } },
    { code: 'kz', names: { it: ['kazakistan'], en: ['kazakhstan'] } },
    { code: 'uz', names: { it: ['uzbekistan'], en: ['uzbekistan'] } },
    { code: 'mn', names: { it: ['mongolia'], en: ['mongolia'] } },
    { code: 'np', names: { it: ['nepal'], en: ['nepal'] } },
    { code: 'lk', names: { it: ['sri lanka'], en: ['sri lanka'] } },
    { code: 'bd', names: { it: ['bangladesh'], en: ['bangladesh'] } },
    { code: 'pk', names: { it: ['pakistan'], en: ['pakistan'] } }
  ],
  expert: [
    { code: 'bt', names: { it: ['bhutan'], en: ['bhutan'] } },
    { code: 'bn', names: { it: ['brunei'], en: ['brunei'] } },
    { code: 'kh', names: { it: ['cambogia'], en: ['cambodia'] } },
    { code: 'la', names: { it: ['laos'], en: ['laos'] } },
    { code: 'mm', names: { it: ['myanmar', 'birmania'], en: ['myanmar', 'burma'] } },
    { code: 'mv', names: { it: ['maldive'], en: ['maldives'] } },
    { code: 'tl', names: { it: ['timor est', 'timor leste'], en: ['timor leste', 'east timor'] } },
    { code: 'fj', names: { it: ['fiji'], en: ['fiji'] } },
    { code: 'ws', names: { it: ['samoa'], en: ['samoa'] } },
    { code: 'to', names: { it: ['tonga'], en: ['tonga'] } },
    { code: 'tv', names: { it: ['tuvalu'], en: ['tuvalu'] } },
    { code: 'ki', names: { it: ['kiribati'], en: ['kiribati'] } },
    { code: 'nr', names: { it: ['nauru'], en: ['nauru'] } },
    { code: 'pw', names: { it: ['palau'], en: ['palau'] } },
    { code: 'fm', names: { it: ['micronesia'], en: ['micronesia'] } },
    { code: 'mh', names: { it: ['isole marshall', 'marshall'], en: ['marshall islands'] } },
    { code: 'vu', names: { it: ['vanuatu'], en: ['vanuatu'] } },
    { code: 'sb', names: { it: ['isole salomone'], en: ['solomon islands'] } },
    { code: 'pg', names: { it: ['papua nuova guinea'], en: ['papua new guinea'] } },
    { code: 'bz', names: { it: ['belize'], en: ['belize'] } },
    { code: 'gy', names: { it: ['guyana'], en: ['guyana'] } },
    { code: 'sr', names: { it: ['suriname'], en: ['suriname'] } },
    { code: 'bb', names: { it: ['barbados'], en: ['barbados'] } },
    { code: 'lc', names: { it: ['santa lucia'], en: ['saint lucia'] } },
    { code: 'vc', names: { it: ['saint vincent e grenadine', 'san vincenzo e grenadine'], en: ['saint vincent and the grenadines'] } },
    { code: 'ag', names: { it: ['antigua e barbuda'], en: ['antigua and barbuda'] } },
    { code: 'gd', names: { it: ['grenada'], en: ['grenada'] } },
    { code: 'dm', names: { it: ['dominica'], en: ['dominica'] } },
    { code: 'kn', names: { it: ['saint kitts e nevis', 'san kitts e nevis'], en: ['saint kitts and nevis'] } },
    { code: 'cv', names: { it: ['capo verde'], en: ['cape verde', 'cabo verde'] } },
    { code: 'st', names: { it: ['sao tome e principe', 'san tome e principe'], en: ['sao tome and principe'] } },
    { code: 'gw', names: { it: ['guinea bissau'], en: ['guinea-bissau', 'guinea bissau'] } },
    { code: 'dj', names: { it: ['gibuti'], en: ['djibouti'] } },
    { code: 'er', names: { it: ['eritrea'], en: ['eritrea'] } },
    { code: 'km', names: { it: ['comore'], en: ['comoros'] } },
    { code: 'sc', names: { it: ['seychelles'], en: ['seychelles'] } },
    { code: 'mu', names: { it: ['mauritius', 'maurizio'], en: ['mauritius'] } },
    { code: 'rw', names: { it: ['ruanda', 'rwanda'], en: ['rwanda'] } },
    { code: 'bi', names: { it: ['burundi'], en: ['burundi'] } },
    { code: 'bw', names: { it: ['botswana'], en: ['botswana'] } },
    { code: 'ls', names: { it: ['lesotho'], en: ['lesotho'] } },
    { code: 'sz', names: { it: ['eswatini', 'swaziland'], en: ['eswatini', 'swaziland'] } },
    { code: 'mw', names: { it: ['malawi'], en: ['malawi'] } },
    { code: 'mz', names: { it: ['mozambico'], en: ['mozambique'] } },
    { code: 'bj', names: { it: ['benin'], en: ['benin'] } },
    { code: 'tg', names: { it: ['togo'], en: ['togo'] } },
    { code: 'bf', names: { it: ['burkina faso'], en: ['burkina faso'] } },
    { code: 'ne', names: { it: ['niger'], en: ['niger'] } },
    { code: 'td', names: { it: ['ciad', 'chad'], en: ['chad'] } },
    { code: 'cf', names: { it: ['repubblica centrafricana'], en: ['central african republic'] } },
    { code: 'gq', names: { it: ['guinea equatoriale'], en: ['equatorial guinea'] } }
  ]
};

const ROUND_POOLS = ['easy', 'medium', 'advanced', 'hard', 'expert'];
const FLAGS = Object.values(FLAG_POOLS).flat();
const TEXT = {
  it: {
    subtitle: 'Indovina 5 bandiere. Hai 7 tentativi per ogni round.',
    start: 'Inizia gioco', settings: 'Impostazioni', settingsTitle: 'Impostazioni', language: 'Lingua', back: 'Torna al menu',
    round: 'Round', tries: 'Tentativi usati', score: 'Punteggio', placeholder: 'Scrivi il nome dello Stato', submit: 'Conferma', loading: 'Caricamento...',
    empty: 'Scrivi una risposta prima di confermare.', wrong: 'Sbagliato. Si rivela un altro pezzo della bandiera.',
    correct: points => `Corretto! +${points} punti`, answerWas: name => `La risposta era: ${name}`,
    pause: round => `Continua al prossimo round: Round ${round}`, next: 'Prosegui',
    finalTitle: 'Partita finita!', finalScore: 'Punteggio totale', restart: "Ritorna all'inizio",
    finalLow: 'Puoi fare meglio: riprova e punta a indovinare prima.',
    finalMid: 'Buona partita! Hai riconosciuto diverse bandiere.',
    finalHigh: 'Ottimo lavoro! Sei molto forte con le bandiere.'
  },
  en: {
    subtitle: 'Guess 5 flags. You have 7 tries for each round.',
    start: 'Start game', settings: 'Settings', settingsTitle: 'Settings', language: 'Language', back: 'Back to menu',
    round: 'Round', tries: 'Tries used', score: 'Score', placeholder: 'Type the country name', submit: 'Confirm', loading: 'Loading...',
    empty: 'Type an answer before confirming.', wrong: 'Wrong. Another part of the flag is revealed.',
    correct: points => `Correct! +${points} points`, answerWas: name => `The answer was: ${name}`,
    pause: round => `Continue to next round: Round ${round}`, next: 'Continue',
    finalTitle: 'Game over!', finalScore: 'Total score', restart: 'Return to start',
    finalLow: 'You can do better: try again and guess earlier.',
    finalMid: 'Good game! You recognized several flags.',
    finalHigh: 'Great job! You are strong with flags.'
  }
};

const state = {
  lang: localStorage.getItem('gtf-lang') || 'it',
  score: 0,
  roundIndex: 0,
  triesUsed: 1,
  selectedFlags: [],
  currentFlag: null,
  currentImage: null,
  roundLocked: false
};

const $ = id => document.getElementById(id);
const screens = {
  menu: $('screen-menu'), settings: $('screen-settings'), game: $('screen-game'), pause: $('screen-pause'), final: $('screen-final')
};
const canvas = $('flag-canvas');
const ctx = canvas.getContext('2d');

function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.remove('active'));
  screens[name].classList.add('active');
}

function t(key, arg) {
  const value = TEXT[state.lang][key];
  return typeof value === 'function' ? value(arg) : value;
}

function applyLanguage() {
  $('menu-subtitle').textContent = t('subtitle');
  $('start-btn').textContent = t('start');
  $('settings-btn').textContent = t('settings');
  $('settings-title').textContent = t('settingsTitle');
  $('language-label').textContent = t('language');
  $('back-menu-btn').textContent = t('back');
  $('round-label').textContent = t('round');
  $('tries-label').textContent = t('tries');
  $('score-label').textContent = t('score');
  $('answer-input').placeholder = t('placeholder');
  $('submit-btn').textContent = t('submit');
  $('loading-flag').textContent = t('loading');
  $('next-round-btn').textContent = t('next');
  $('final-title').textContent = t('finalTitle');
  $('final-score-label').textContent = t('finalScore');
  $('restart-btn').textContent = t('restart');
  $('language-select').value = state.lang;
  updateHud();
}

function normalizeAnswer(text) {
  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ');
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function pickProgressiveFlags() {
  const picked = [];
  const usedCodes = new Set();

  ROUND_POOLS.forEach(poolName => {
    const available = shuffle(FLAG_POOLS[poolName]).filter(flag => !usedCodes.has(flag.code));
    const selected = available[0];
    picked.push(selected);
    usedCodes.add(selected.code);
  });

  return picked;
}

function startGame() {
  state.score = 0;
  state.roundIndex = 0;
  state.selectedFlags = pickProgressiveFlags();
  startRound();
}

function startRound() {
  state.currentFlag = state.selectedFlags[state.roundIndex];
  state.triesUsed = 1;
  state.roundLocked = false;
  $('answer-input').value = '';
  setFeedback('', '');
  showScreen('game');
  updateHud();
  loadFlagImage(state.currentFlag.code);
}

function loadFlagImage(code) {
  $('loading-flag').classList.remove('hidden');
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    state.currentImage = img;
    $('loading-flag').classList.add('hidden');
    drawFlagReveal();
    $('answer-input').focus();
  };
  img.onerror = () => {
    $('loading-flag').textContent = 'Flag loading error';
  };
  img.src = `https://flagcdn.com/w1280/${code}.png`;
}

function drawFlagReveal() {
  const img = state.currentImage;
  if (!img) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#05070d';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const revealParts = Math.min(state.triesUsed, MAX_TRIES);
  const revealWidth = canvas.width * (revealParts / MAX_TRIES);

  const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
  const drawW = img.width * scale;
  const drawH = img.height * scale;
  const x = (canvas.width - drawW) / 2;
  const y = (canvas.height - drawH) / 2;

  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, revealWidth, canvas.height);
  ctx.clip();
  ctx.drawImage(img, x, y, drawW, drawH);
  ctx.restore();

  ctx.fillStyle = 'rgba(255,255,255,0.055)';
  for (let i = 1; i < MAX_TRIES; i++) {
    const lineX = (canvas.width / MAX_TRIES) * i;
    ctx.fillRect(lineX - 1, 0, 2, canvas.height);
  }

  if (revealParts < MAX_TRIES) {
    ctx.fillStyle = 'rgba(0,0,0,0.72)';
    ctx.fillRect(revealWidth, 0, canvas.width - revealWidth, canvas.height);
    ctx.fillStyle = 'rgba(255,255,255,0.16)';
    ctx.font = 'bold 28px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(`${revealParts}/${MAX_TRIES}`, revealWidth + (canvas.width - revealWidth) / 2, canvas.height / 2);
  }
}

function updateHud() {
  $('round-number').textContent = `${Math.min(state.roundIndex + 1, GAME_ROUNDS)}/${GAME_ROUNDS}`;
  $('tries-number').textContent = `${state.triesUsed}/${MAX_TRIES}`;
  $('score-number').textContent = state.score;
}

function setFeedback(message, type) {
  const el = $('feedback');
  el.textContent = message;
  el.className = `feedback ${type}`;
}

function submitAnswer() {
  if (state.roundLocked) return;

  const userAnswer = normalizeAnswer($('answer-input').value);
  if (!userAnswer) {
    setFeedback(t('empty'), 'no');
    return;
  }

  const validNames = [...state.currentFlag.names.it, ...state.currentFlag.names.en].map(normalizeAnswer);
  const isCorrect = validNames.includes(userAnswer);

  if (isCorrect) {
    const points = POINTS_BY_TRY[state.triesUsed - 1];
    state.score += points;
    setFeedback(t('correct', points), 'ok');
    finishRound(true, points);
    return;
  }

  if (state.triesUsed >= MAX_TRIES) {
    drawFlagReveal();
    finishRound(false, 0);
    return;
  }

  state.triesUsed += 1;
  updateHud();
  drawFlagReveal();
  setFeedback(t('wrong'), 'no');
  $('answer-input').select();
}

function finishRound(wasCorrect, points) {
  state.roundLocked = true;
  updateHud();
  state.triesUsed = MAX_TRIES;
  drawFlagReveal();

  const publicName = state.currentFlag.names[state.lang][0];
  const resultText = wasCorrect ? t('correct', points) : t('answerWas', publicName);

  setTimeout(() => {
    if (state.roundIndex === GAME_ROUNDS - 1) {
      showFinalScreen();
    } else {
      $('round-result').textContent = resultText;
      $('pause-title').textContent = t('pause', state.roundIndex + 2);
      showScreen('pause');
    }
  }, 800);
}

function nextRound() {
  state.roundIndex += 1;
  startRound();
}

function showFinalScreen() {
  $('final-score').textContent = state.score;
  $('final-title').textContent = t('finalTitle');
  $('final-score-label').textContent = t('finalScore');

  let message = t('finalLow');
  if (state.score >= 360) message = t('finalHigh');
  else if (state.score >= 220) message = t('finalMid');
  $('final-message').textContent = message;

  showScreen('final');
}

function backToMenu() {
  state.score = 0;
  state.roundIndex = 0;
  state.triesUsed = 1;
  state.selectedFlags = [];
  state.currentFlag = null;
  state.currentImage = null;
  state.roundLocked = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setFeedback('', '');
  updateHud();
  showScreen('menu');
}

$('start-btn').addEventListener('click', startGame);
$('settings-btn').addEventListener('click', () => showScreen('settings'));
$('back-menu-btn').addEventListener('click', () => showScreen('menu'));
$('next-round-btn').addEventListener('click', nextRound);
$('restart-btn').addEventListener('click', backToMenu);
$('submit-btn').addEventListener('click', submitAnswer);
$('answer-input').addEventListener('keydown', event => {
  if (event.key === 'Enter') submitAnswer();
});
$('language-select').addEventListener('change', event => {
  state.lang = event.target.value;
  localStorage.setItem('gtf-lang', state.lang);
  applyLanguage();
});

applyLanguage();
showScreen('menu');
