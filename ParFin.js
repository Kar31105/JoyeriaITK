document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section-hidden");
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("section-visible");
                    observer.unobserve(entry.target); 
                }
            });
        },
        { threshold: 0.1 } 
    );
    sections.forEach(section => {
        observer.observe(section);
    });
    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.carousel-button.right');
        const prevButton = document.querySelector('.carousel-button.left');
        let currentIndex = 0;

        const moveToSlide = (index) => {
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = 'translateX(-' + slideWidth * index + 'px)';
            currentIndex = index;
        };
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            moveToSlide(currentIndex);
        });
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            moveToSlide(currentIndex);
        });
    }
    const navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            if (href.includes('#')) {
                event.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
function toggleMenu(menuId) {
    const menus = document.querySelectorAll('.image-menu');
    menus.forEach(menu => {
        if (menu.id !== menuId) {
            menu.classList.remove('show');
        }
    });
    const targetMenu = document.getElementById(menuId);
    if (targetMenu) {
        targetMenu.classList.toggle('show');
    }
}
window.toggleMenu = toggleMenu;
const descriptions = {
    1: " Elegante, clásica y moderna.",
    2: " Clásicos para regalar a una bella novia.",
    3: " Una buena opción para regalar en la época navideña."
};
const images = {
    1: ["https://joyerialafamosa.com/cdn/shop/files/DSC_0378.jpg?v=1723823942&width=1500", "https://joyerialafamosa.com/cdn/shop/files/Compartido_desde_Lightroom_mobile_59_8ce55969-bd08-409f-829d-7039cc7d9338.jpg?v=1730830711&width=1500", "https://joyerialafamosa.com/cdn/shop/files/DSC_2024-07-29T20_24_19.882Z.png?v=1722284666&width=1500"],
    2: ["https://joyerialafamosa.com/cdn/shop/products/WhatsAppImage2023-03-17at10.18.21AM.jpg?v=1679521435&width=1200", "https://joyerialafamosa.com/cdn/shop/products/WhatsAppImage2023-03-21at3.35.55PM.jpg?v=1679521381&width=1200", "https://joyerialafamosa.com/cdn/shop/products/WhatsAppImage2023-03-17at10.18.18AM_1.jpg?v=1679521348&width=1200"],
    3: ["https://luxenter.com/cdn/shop/files/SGDM011701_01_960x960_crop_center.jpg?v=1731178559", "https://luxenter.com/cdn/shop/files/EH148Y20_01_960x960_crop_center.jpg?v=1731211205", "https://luxenter.com/cdn/shop/files/SGBX385114_01_960x960_crop_center.jpg?v=1731178966"]
}
function openMenu(boxNumber) {
    const menu = document.getElementById("menu");
    const description = document.getElementById("description");
    const imageContainer = document.getElementById("image-container");
    description.textContent = descriptions[boxNumber];
    const randomImages = images[boxNumber]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    imageContainer.innerHTML = "";
    randomImages.forEach(image => {
        const img = document.createElement("img");
        img.src = image;
        imageContainer.appendChild(img);
    });
    menu.style.display = "block";
}
function closeMenu() {
    const menu = document.getElementById("menu");
    menu.style.display = "none";
}