document.addEventListener('DOMContentLoaded', function () {
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselCards = document.querySelectorAll('.servicio-card');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  const cardWidth = carouselCards[0].offsetWidth;
  let currentIndex = 0;

  // Clona la primera y última tarjeta para crear el efecto de bucle infinito
  const cloneFirst = carouselCards[0].cloneNode(true);
  const cloneLast = carouselCards[carouselCards.length - 1].cloneNode(true);

  // Añade los clones al carrusel
  carouselTrack.appendChild(cloneFirst); // Clona la primera tarjeta y la añade al final
  carouselTrack.insertBefore(cloneLast, carouselTrack.firstChild); // Clona la última tarjeta y la añade al principio

  // Ajusta la posición inicial del carrusel
  carouselTrack.style.transform = `translateX(${-cardWidth}px)`;

  // Función para mover el carrusel
  function moveCarousel(index, animate = true) {
    if (animate) {
      carouselTrack.style.transition = 'transform 0.5s ease-in-out';
    } else {
      carouselTrack.style.transition = 'none';
    }
    const offset = -index * cardWidth;
    carouselTrack.style.transform = `translateX(${offset}px)`;
  }

  // Función para manejar el bucle infinito
  function handleLoop() {
    // Si estamos en el clon de la última tarjeta, saltamos a la primera tarjeta real sin animación
    if (currentIndex >= carouselCards.length) {
      currentIndex = 0;
      moveCarousel(currentIndex + 1, false); // +1 para compensar el clon al principio
    }
    // Si estamos en el clon de la primera tarjeta, saltamos a la última tarjeta real sin animación
    else if (currentIndex < 0) {
      currentIndex = carouselCards.length - 1;
      moveCarousel(currentIndex + 1, false); // +1 para compensar el clon al principio
    }
  }

  // Evento para el botón "Anterior"
  prevButton.addEventListener('click', () => {
    currentIndex--;
    moveCarousel(currentIndex + 1); // +1 para compensar el clon al principio
    handleLoop();
  });

  // Evento para el botón "Siguiente"
  nextButton.addEventListener('click', () => {
    currentIndex++;
    moveCarousel(currentIndex + 1); // +1 para compensar el clon al principio
    handleLoop();
  });

  // Evento para reiniciar la transición al finalizar
  carouselTrack.addEventListener('transitionend', () => {
    handleLoop();
  });
});
