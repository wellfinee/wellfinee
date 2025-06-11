import { gsap } from "gsap";
import { useRef, useEffect, useState, useCallback } from "react";
function Header() {
    const refHeader = useRef(null);
    const refMenu = useRef(null);
    const refToggle = useRef(null);
    const refLogo = useRef(null);


    // Функция сброса inline-стилей transform и opacity для меню и его элементов
    const resetMenuStyles = (menu, items) => {
        items.forEach((li) => {
            li.style.transform = "none";
            li.style.opacity = "1";
        });
        menu.style.transform = "none";
    };

    useEffect(() => {
        const header = refHeader.current;
        const logo = refLogo.current;
        const menu = refMenu.current;
        const toggleIcon = refToggle.current;
        const items = menu.querySelectorAll("li");

        // Анимация вылета шапки справа
        gsap.fromTo(
            header,
            { x: 300 },
            { x: 0, duration: 1, delay: 2, ease: "power3.out" }
        );

        gsap.fromTo(
            logo,
            {x: "-100%"},
            {x: "-50%",  duration: 1, delay: 2, ease: "power3.out"},
        )

        // Если изначально узкий экран — сразу скрываем шапку
        if (window.innerWidth <= 900) {
            header.classList.add("header__close");
        }

        const onScroll = () => {
            const shouldClose = window.scrollY > 400 || window.innerWidth <= 900;
            if (shouldClose) {
                header.classList.add("header__close");
                logo.classList.add("logo--close")
            } else {
                document.body.classList.remove("hidden");
                logo.classList.remove("logo--close")
                header.classList.remove("header__close");
                menu.classList.remove("header__menu--active");
                toggleIcon.classList.add("fa-bars");
                toggleIcon.classList.remove("fa-xmark");
                // Сбрасываем стили при возвращении в исходное состояние
                resetMenuStyles(menu, items);
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleToggle = () => {
        const menu = refMenu.current;
        const toggleIcon = refToggle.current;
        const items = menu.querySelectorAll("li");
        const isActive = menu.classList.contains("header__menu--active");

        if (!isActive) {
            // Перед открытием сброс inline-стилей, чтобы gsap-анимации корректно работали
            resetMenuStyles(menu, items);

            menu.classList.add("header__menu--active");
            toggleIcon.classList.replace("fa-bars", "fa-xmark");
            document.body.classList.add("hidden");

            gsap.fromTo(
                menu,
                { y: -1000 },
                { y: 0, duration: 1.2, ease: "power3.out" }
            );
            gsap.fromTo(
                items,
                { x: 1000, y: 1000, opacity: 0 },
                {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power3.out",
                    stagger: 0.1,
                }
            );
        } else {
            const tl = gsap.timeline({
                onComplete: () => {
                    menu.classList.remove("header__menu--active");
                    toggleIcon.classList.replace("fa-xmark", "fa-bars");
                    document.body.classList.remove("hidden");
                    resetMenuStyles(menu, items);
                },
            });

            tl.to(items, {
                y: 1000,
                opacity: 0,
                duration: 0.4,
                ease: "power3.in",
            }).to(
                menu,
                {
                    y: 1000,
                    duration: 0.4,
                    ease: "power3.in",
                },
                "<"
            );
        }
    };

    return (
        <>
            <nav className="header" ref={refHeader}>
                <ul ref={refMenu} className="header__menu">
                    <li className="header__item">
                        <a href="#" className="header__link">
                            ГЛАВНАЯ
                        </a>
                    </li>
                    <li className="header__item">
                        <a href="#" className="header__link">
                            ОБО МНЕ
                        </a>
                    </li>
                    <li className="header__item">
                        <a href="#" className="header__link">
                            КОНТАКТЫ
                        </a>
                    </li>
                    <li className="header__item">
                        <a href="#" className="header__link">
                            ПАРТНЕРСТВО
                        </a>
                    </li>
                    <li className="header__item">
                        <a href="#" className="header__link">
                            ПОЧЕМУ Я?
                        </a>
                    </li>
                    <li className="header__item">
                        <a href="#" className="header__link">
                            ОБРАТНАЯ СВЯЗЬ
                        </a>
                    </li>
                </ul>
                <button
                    type="button"
                    onClick={handleToggle}
                    className="header__toggle"
                >
                    <i className="fa-solid fa-bars" ref={refToggle}></i>
                </button>

            </nav>
            <h1 ref={refLogo} className="logo">WELLFINEE</h1></>
    );
}

export default Header;
