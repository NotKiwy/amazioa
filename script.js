// Данные
let balance = 0;
let timerInterval;
const leaders = Array.from({ length: 100 }, (_, i) => ({ name: `Игрок ${i + 1}`, score: 100 - i }));

// Элементы
const balanceAmount = document.getElementById('balance-amount');
const earnButton = document.getElementById('earn-button');
const timerDisplay = document.getElementById('timer');
const timeLeft = document.getElementById('time-left');
const leaderboardList = document.getElementById('leaderboard');

// Вкладки
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tab = button.dataset.tab;
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    button.classList.add('active');
    document.getElementById(tab).classList.add('active');
  });
});

// Earn кнопка
earnButton.addEventListener('click', startTimer);

// Таймер
function startTimer() {
  if (timerInterval) return; // Уже запущен
  earnButton.disabled = true;
  timerDisplay.classList.remove('hidden');

  let time = 3600; // 1 час в секундах
  timerInterval = setInterval(() => {
    time--;
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    timeLeft.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (time <= 0) {
      clearInterval(timerInterval);
      balance += 100; // Начисляем монетки
      balanceAmount.textContent = `${balance} AMZ`;
      earnButton.disabled = false;
      timerDisplay.classList.add('hidden');
    }
  }, 1000);
}

// Лидеры
leaders.forEach((leader, index) => {
  const li = document.createElement('li');
  li.textContent = `${index + 1}. ${leader.name} - ${leader.score} AMZ`;
  leaderboardList.appendChild(li);
});
