document.addEventListener('DOMContentLoaded', () => {
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselCards = document.querySelectorAll('.servicio-card');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  const indicators = document.querySelectorAll('.indicator');
  const totalCards = carouselCards.length;
  const visibleIndicators = 6; // Mostrar solo 6 indicadores
  let currentIndex = 0;

  // Función para mover el carrusel a una tarjeta específica
  const moveToCard = (index) => {
    if (index < 0) {
      index = totalCards - 1; // Vuelve al final si es menor que 0
    } else if (index >= totalCards) {
      index = 0; // Vuelve al principio si es mayor que el total
    }

    currentIndex = index;
    const cardWidth = carouselCards[0].offsetWidth; // Ancho de una tarjeta
    const offset = -currentIndex * cardWidth; // Desplazamiento en píxeles
    carouselTrack.style.transform = `translateX(${offset}px)`;

    // Actualizar indicadores
    updateIndicators();
  };

  // Función para actualizar los indicadores
  const updateIndicators = () => {
    const start = Math.floor(currentIndex / visibleIndicators) * visibleIndicators;
    const end = start + visibleIndicators;

    indicators.forEach((indicator, i) => {
      const indicatorIndex = start + i;
      indicator.setAttribute('data-index', indicatorIndex);
      indicator.classList.toggle('active', indicatorIndex === currentIndex);

      // Ocultar indicadores fuera del rango actual
      if (indicatorIndex >= totalCards) {
        indicator.style.display = 'none';
      } else {
        indicator.style.display = 'block';
      }
    });
  };

  // Navegación al hacer clic en los botones
  prevButton.addEventListener('click', () => {
    moveToCard(currentIndex - 1);
  });

  nextButton.addEventListener('click', () => {
    moveToCard(currentIndex + 1);
  });

  // Navegación al hacer clic en los indicadores
  indicators.forEach((indicator) => {
    indicator.addEventListener('click', () => {
      const index = parseInt(indicator.getAttribute('data-index'), 10);
      moveToCard(index);
    });
  });

  // Inicializar el carrusel
  moveToCard(0);
});
