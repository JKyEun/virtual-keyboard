// AudioContext 생성
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 오실레이터 노드 생성 (음원)
const oscillator = audioContext.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // 440Hz = A4

// 게인 노드 생성 (볼륨 조절)
const gainNode = audioContext.createGain();
gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // 50% 볼륨

// 패너 노드 생성 (패닝 조절)
const pannerNode = audioContext.createStereoPanner();
pannerNode.pan.setValueAtTime(-0.3, audioContext.currentTime); // 왼쪽으로 0.3 패닝

function play() {
  // 노드 연결 (오실레이터 -> 게인 -> 패너 -> 리버브 -> 오디오 출력)
  oscillator.connect(gainNode);
  gainNode.connect(pannerNode);
  pannerNode.connect(audioContext.destination);

  // 소리 재생
  oscillator.start();

  // 3초 후에 소리 멈춤
  setTimeout(() => {
    oscillator.stop();
  }, 3000);

  // 패닝 값을 점진적으로 변경
  let startTime = audioContext.currentTime;
  let duration = 3; // 3초 동안 패닝 변경
  let interval = 50; // 50ms 간격으로 패닝 변경
  let panValue = -1; // 초기 패닝 값 (왼쪽)

  let panInterval = setInterval(() => {
    let elapsedTime = audioContext.currentTime - startTime;
    if (elapsedTime >= duration) {
      clearInterval(panInterval);
      oscillator.stop();
    } else {
      panValue = -1 + (elapsedTime / duration) * 2; // -1에서 1로 변경
      pannerNode.pan.setValueAtTime(panValue, audioContext.currentTime);
    }
  }, interval);
}

const playBtn = document.querySelector('.play-btn');
playBtn.addEventListener('click', play);
