const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const synth = new Tone.Synth().toDestination();
let currentOctave = 4;

const KEY_NOTE_MAP = {
  Q: 'C',
  2: 'C#',
  W: 'D',
  3: 'D#',
  E: 'E',
  R: 'F',
  5: 'F#',
  T: 'G',
  6: 'G#',
  Y: 'A',
  7: 'A#',
  U: 'B',
  I: 'C',
  9: 'C#',
  O: 'D',
  0: 'D#',
  P: 'E',
  '[': 'F',
  '=': 'F#',
  ']': 'G',
  Backspace: 'G#',
  '\\': 'A'
};

const KEY_ORDER = [
  'Q',
  '2',
  'W',
  '3',
  'E',
  'R',
  '5',
  'T',
  '6',
  'Y',
  '7',
  'U',
  'I',
  '9',
  'O',
  '0',
  'P',
  '[',
  '=',
  ']',
  'Backspace',
  '\\'
];

document.addEventListener('DOMContentLoaded', () => {
  const keys = document.querySelectorAll('.key');
  keys.forEach(key => {
    const note = KEY_NOTE_MAP[key.textContent.trim()];
    if (note) {
      const keyIndex = KEY_ORDER.indexOf(key.textContent.trim());
      const octave = keyIndex >= KEY_ORDER.indexOf('I') ? currentOctave + 1 : currentOctave;
      key.dataset.note = note + octave;
    }
  });
});

document.addEventListener('keydown', event => {
  const note = KEY_NOTE_MAP[event.key];
  if (note) {
    const keyIndex = KEY_ORDER.indexOf(event.key);
    const octave = keyIndex >= KEY_ORDER.indexOf('I') ? currentOctave + 1 : currentOctave;
    const fullNote = note + octave;
    synth.triggerAttackRelease(fullNote, '8n');
    const keyElement = document.querySelector(`.key[data-note="${fullNote}"]`);
    if (keyElement) {
      keyElement.classList.add('active');
    }
  }
});

document.addEventListener('keyup', event => {
  const note = KEY_NOTE_MAP[event.key];
  if (note) {
    const keyIndex = KEY_ORDER.indexOf(event.key);
    const octave = keyIndex >= KEY_ORDER.indexOf('I') ? currentOctave + 1 : currentOctave;
    const fullNote = note + octave;
    const keyElement = document.querySelector(`.key[data-note="${fullNote}"]`);
    if (keyElement) {
      keyElement.classList.remove('active');
    }
  }
});

document.getElementById('octave-up').addEventListener('click', () => {
  if (currentOctave < 8) {
    currentOctave++;
    updateOctaveDisplay();
    updateKeyNotes();
  }
});

document.getElementById('octave-down').addEventListener('click', () => {
  if (currentOctave > 1) {
    currentOctave--;
    updateOctaveDisplay();
    updateKeyNotes();
  }
});

function updateOctaveDisplay() {
  document.getElementById('current-octave').textContent = `옥타브: ${currentOctave}`;
}

function updateKeyNotes() {
  const keys = document.querySelectorAll('.key');
  keys.forEach(key => {
    const note = KEY_NOTE_MAP[key.textContent.trim()];
    if (note) {
      const keyIndex = KEY_ORDER.indexOf(key.textContent.trim());
      const octave = keyIndex >= KEY_ORDER.indexOf('I') ? currentOctave + 1 : currentOctave;
      key.dataset.note = note + octave;
    }
  });
}
