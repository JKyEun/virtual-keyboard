const synth = new Tone.Synth().toDestination();

const keys = document.querySelectorAll('.key');

keys.forEach(key => {
  key.addEventListener('mousedown', () => {
    const note = key.dataset.note;
    synth.triggerAttackRelease(note, '8n');
  });
});
