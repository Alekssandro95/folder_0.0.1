$(function(){
    $('.slider__clients').slick({
        dots: false,
        arrows: false,
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
    });
});

$(document).ready(function() {
    const himallays = $('.himallays');
    const numberOfStars = 10;
    const animationDurationBase = 1500; // Базовая продолжительность падения (в миллисекундах)
    const animationDelayBase = 500;   // Базовая задержка перед началом падения

    for (let i = 0; i < numberOfStars; i++) {
        createShootingStar();
    }

    function createShootingStar() {
        const star = $('<div class="shooting-star"></div>');

        // Случайные начальные позиции
        const startTop = Math.random() * 30 + 10; // От 10% до 40% сверху
        const startRight = Math.random() * 80 + 10; // От 10% до 90% справа

        // Случайные параметры анимации
        const duration = animationDurationBase + Math.random() * 1000; // Случайная продолжительность
        const delay = Math.random() * animationDelayBase * 2; // Случайная задержка
        const endTranslateX = -Math.random() * 300 - 100; // Случайное смещение по X влево
        const endTranslateY = Math.random() * 400 + 200; // Случайное смещение по Y вниз
        const endScale = Math.random() * 0.3 + 0.1; // Случайное уменьшение размера
        const rotation = -45 - Math.random() * 10; // Случайный угол поворота

        // Случайная задержка для появления хвоста
        const tailDelay = Math.random() * 200;

        star.css({
            top: `${startTop}%`,
            right: `${startRight}%`,
            opacity: 1,
            transform: `rotate(${rotation}deg) scale(1)`
        });

        star.appendTo(himallays).animate({
            transform: `translate(${endTranslateX}px, ${endTranslateY}px) rotate(${rotation - 5}deg) scale(${endScale})`,
            opacity: 0
        }, {
            duration: duration,
            easing: 'linear',
            delay: delay,
            complete: function() {
                $(this).remove(); // Удаляем звезду после падения
                createShootingStar(); // Создаем новую падающую звезду
            }
        });

        // Анимация хвоста
        star.find('::before').delay(delay + tailDelay).animate({
            width: '15px',
            opacity: 0.7
        }, duration / 2, function() {
            $(this).animate({ width: '0', opacity: 0 }, duration / 2);
        });
    }
});

// Мобільне меню
