document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // 1. АНИМАЦИЯ HERO (Anime.js)
    const canvas = document.getElementById('heroCanvas');
    if (canvas) {
        // Простая фоновая анимация кругов
        anime({
            targets: '.hero__title',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1500,
            easing: 'easeOutExpo',
            delay: 300
        });
        
        anime({
            targets: '.hero__text',
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 1500,
            easing: 'easeOutExpo',
            delay: 500
        });
    }

    // 2. МОБИЛЬНОЕ МЕНЮ
    const openBtn = document.getElementById('openMenu');
    const closeBtn = document.getElementById('closeMenu');
    const menu = document.getElementById('mobileMenu');
    const menuLinks = document.querySelectorAll('.mobile-menu__link');

    const toggleMenu = (state) => {
        menu.classList.toggle('active', state);
        document.body.style.overflow = state ? 'hidden' : '';
    };

    openBtn.addEventListener('click', () => toggleMenu(true));
    closeBtn.addEventListener('click', () => toggleMenu(false));
    menuLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));

    // 3. КАПЧА И ФОРМА
    const captchaQuest = document.getElementById('captchaQuest');
    const captchaInput = document.getElementById('captchaInput');
    const mainForm = document.getElementById('mainForm');
    const formSuccess = document.getElementById('formSuccess');

    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let captchaResult = num1 + num2;
    if(captchaQuest) captchaQuest.textContent = `${num1} + ${num2}`;

    mainForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (parseInt(captchaInput.value) !== captchaResult) {
            alert('Неверный ответ на капчу!');
            return;
        }

        // Имитация отправки
        const btn = mainForm.querySelector('button');
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Отправка...';

        setTimeout(() => {
            mainForm.classList.add('hidden');
            formSuccess.classList.remove('hidden');
            lucide.createIcons(); // Перерисовать иконку в сообщении успеха
        }, 1500);
    });

    // 4. COOKIE POPUP
    const cookiePopup = document.getElementById('cookiePopup');
    const acceptBtn = document.getElementById('acceptCookies');

    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookiePopup.classList.remove('hidden');
        }, 2000);
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookiePopup.classList.add('hidden');
    });

    // 5. ПЛАВНЫЙ СКРОЛЛ
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});