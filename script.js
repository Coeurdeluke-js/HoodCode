document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.servicio-card');
  const indicators = document.querySelectorAll('.indicator');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');

  let currentIndex = 0;

  // Función para calcular el número de tarjetas visibles según el tamaño de la pantalla
  function getVisibleCards() {
    if (window.innerWidth >= 1024) return 4;
    if (window.innerWidth >= 768) return 3;
    if (window.innerWidth >= 480) return 2;
    return 1;
  }

  // Función para actualizar el carrusel
  function updateCarousel(index) {
    const visibleCards = getVisibleCards();
    const cardWidth = cards[0].offsetWidth; // Ancho de una tarjeta
    track.style.transform = `translateX(-${cardWidth * index}px)`;
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
  }

  // Función para avanzar al siguiente conjunto de tarjetas
  function nextSlide() {
    const maxIndex = Math.ceil(cards.length / getVisibleCards()) - 1;
    currentIndex = (currentIndex + 1) % (maxIndex + 1);
    updateCarousel(currentIndex);
  }

  // Función para retroceder al conjunto anterior de tarjetas
  function prevSlide() {
    const maxIndex = Math.ceil(cards.length / getVisibleCards()) - 1;
    currentIndex = (currentIndex - 1 + (maxIndex + 1)) % (maxIndex + 1);
    updateCarousel(currentIndex);
  }

  // Eventos de los botones
  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);

  // Eventos de los indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel(currentIndex);
    });
  });

  // Iniciar el carrusel
  updateCarousel(currentIndex);

  // Ajustar el carrusel al cambiar el tamaño de la ventana
  window.addEventListener('resize', () => {
    updateCarousel(currentIndex);
  });
});
