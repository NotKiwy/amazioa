// Данные
let balance = parseInt(localStorage.getItem('balance')) || 0;
let timerInterval;
const leaders = [];

// Элементы
const accessDenied = document.getElementById('access-denied');
const app = document.getElementById('app');
const balanceAmount = document.getElementById('balance-amount');
const earnButton = document.getElementById('earn-button');
const timerDisplay = document.getElementById('timer');
const timeLeft = document.getElementById('time-left');
const leaderboardList = document.getElementById('leaderboard');

// Проверка на доступ через Telegram
function checkAccess() {
  const isTelegram = window.Telegram && window.Telegram.WebApp;
  if (!isTelegram) {
    accessDenied.classList.remove('hidden');
    return false;
  }
  app.classList.remove('hidden');
  return true;
}

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

// Обновление баланса
function updateBalance() {
  balanceAmount.textContent = `${balance} AMZ`;
  localStorage.setItem('balance', balance);
}

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
      updateBalance();
      earnButton.disabled = false;
      timerDisplay.classList.add('hidden');
    }
  }, 1000);
}

// Лидеры
function updateLeaderboard() {
  leaderboardList.innerHTML = '';
  leaders.forEach((leader, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${leader.name} - ${leader.score} AMZ`;
    leaderboardList.appendChild(li);
  });
}

// Инициализация
if (checkAccess()) {
  updateBalance();
  updateLeaderboard();
}
