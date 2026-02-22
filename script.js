// Элементы
const aboutToggle = document.getElementById('aboutToggle');
const aboutContent = document.getElementById('aboutContent');
const buttonsContainer = document.getElementById('buttonsContainer');
const arrow = document.querySelector('.arrow');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeBtn');
const confirmBtn = document.getElementById('confirmBtn');
const cancelBtn = document.getElementById('cancelBtn');
const socialBtns = document.querySelectorAll('.social-btn');

let currentLink = '';
let currentIcon = '';
let currentTitle = '';

// Переключение "Обо мне"
aboutToggle.addEventListener('click', () => {
    const isActive = aboutContent.classList.contains('active');
    
    if (isActive) {
        // Закрываем "Обо мне" и показываем кнопки
        aboutContent.classList.remove('active');
        arrow.classList.remove('rotated');
        
        setTimeout(() => {
            buttonsContainer.classList.remove('hidden');
        }, 300);
    } else {
        // Открываем "Обо мне" и скрываем кнопки
        aboutContent.classList.add('active');
        arrow.classList.add('rotated');
        buttonsContainer.classList.add('hidden');
    }
});

// Модальное окно для кнопок
socialBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Проверяем, не является ли кнопка неактивной
        if (btn.classList.contains('disabled')) {
            // Показываем уведомление для неактивной кнопки
            document.querySelector('.modal-icon').className = 'modal-icon ' + btn.querySelector('i').className;
            document.querySelector('.modal-title').textContent = btn.getAttribute('data-name');
            document.querySelector('.modal-text').textContent = btn.getAttribute('data-desc');
            
            // Скрываем кнопку "Перейти"
            confirmBtn.style.display = 'none';
            cancelBtn.textContent = 'Понятно';
            
            modal.classList.add('active');
            return;
        }
        
        currentLink = btn.getAttribute('href');
        currentTitle = btn.getAttribute('data-name');
        currentIcon = btn.querySelector('i').className;
        
        // Устанавливаем данные в модальное окно
        document.querySelector('.modal-icon').className = 'modal-icon ' + currentIcon;
        document.querySelector('.modal-title').textContent = currentTitle;
        document.querySelector('.modal-text').textContent = btn.getAttribute('data-desc');
        
        // Показываем кнопку "Перейти"
        confirmBtn.style.display = 'inline-block';
        cancelBtn.textContent = 'Отмена';
        
        // Показываем модальное окно
        modal.classList.add('active');
    });
});

// Закрытие модального окна
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

cancelBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Подтверждение перехода
confirmBtn.addEventListener('click', () => {
    window.open(currentLink, '_blank');
    modal.classList.remove('active');
});

// Закрытие модального окна при клике вне его
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Запрет выделения текста
document.addEventListener('selectstart', (e) => {
    e.preventDefault();
});

// Запрет контекстного меню
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
