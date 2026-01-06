document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // 1. ВАЛИДАЦИЯ ТЕЛЕФОНА (Только цифры)
    const phoneInput = document.getElementById('phoneInput');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            // Удаляем всё, кроме цифр
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    // 2. HERO ANIMATION (Anime.js)
    anime({
        targets: '.hero__title',
        translateY: [50, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 2000,
        delay: 500
    });

    // 3. МОБИЛЬНОЕ МЕНЮ
    const openMenu = document.getElementById('openMenu');
    const closeMenu = document.getElementById('closeMenu');
    const menu = document.getElementById('mobileMenu');

    openMenu.onclick = () => menu.classList.add('active');
    closeMenu.onclick = () => menu.classList.remove('active');
    document.querySelectorAll('.mobile-menu__link').forEach(l => l.onclick = () => menu.classList.remove('active'));

    // 4. КАПЧА
    const captchaQuest = document.getElementById('captchaQuest');
    const n1 = Math.floor(Math.random() * 9) + 1;
    const n2 = Math.floor(Math.random() * 9) + 1;
    const sum = n1 + n2;
    if (captchaQuest) captchaQuest.textContent = `${n1} + ${n2}`;

    // 5. ОТПРАВКА ФОРМЫ
    const form = document.getElementById('mainForm');
    const successMsg = document.getElementById('formSuccess');

    form.onsubmit = (e) => {
        e.preventDefault();
        const captchaInput = document.getElementById('captchaInput').value;

        if (parseInt(captchaInput) !== sum) {
            alert('Неверный ответ на пример!');
            return;
        }

        const btn = form.querySelector('button');
        btn.disabled = true;
        btn.textContent = 'Отправка...';

        setTimeout(() => {
            form.classList.add('hidden');
            successMsg.classList.remove('hidden');
        }, 1500);
    };

    // 6. COOKIES
    const cookiePop = document.getElementById('cookiePopup');
    if (!localStorage.getItem('lytra_cookies')) {
        setTimeout(() => cookiePop.classList.remove('hidden'), 2000);
    }
    document.getElementById('acceptCookies').onclick = () => {
        localStorage.setItem('lytra_cookies', 'true');
        cookiePop.classList.add('hidden');
    };
});