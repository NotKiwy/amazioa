import { init, WebApp } from '@twa-dev/sdk';

// Инициализация Telegram Mini App
init();

// Данные пользователя
let user = {
    id: null,
    balanceAMZ: 0,
    earnPerHour: 100,
    level: 1,
    friends: [],
};

// Получение данных пользователя из Telegram
if (WebApp.initDataUnsafe.user) {
    user.id = WebApp.initDataUnsafe.user.id;
    console.log('Пользователь авторизован:', user.id);
} else {
    console.log('Пользователь не авторизован');
}

// Показать раздел
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// Улучшение заработка
function upgradeEarn() {
    const cost = user.level * 100;
    if (user.balanceAMZ >= cost) {
        user.balanceAMZ -= cost;
        user.level += 1;
        user.earnPerHour = user.level * 100;
        document.getElementById('earnPerHour').textContent = user.earnPerHour;
        document.getElementById('balanceAMZ').textContent = user.balanceAMZ;
        alert(`Уровень повышен до ${user.level}!`);
    } else {
        alert('Недостаточно $AMZ');
    }
}

// Инициализация
document.getElementById('balanceAMZ').textContent = user.balanceAMZ;
document.getElementById('earnPerHour').textContent = user.earnPerHour;
showSection('earn');
