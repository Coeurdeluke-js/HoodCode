document.addEventListener('DOMContentLoaded', () => {
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselCards = document.querySelectorAll('.servicio-card');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  const indicators = document.querySelectorAll('.indicator');
  const totalCards = carouselCards.length;
  const visibleIndicators = 6; // Show only 6 indicators
  
  let currentIndex = 0;
  let cardsPerView = getCardsPerView();

  // Function to determine how many cards should be visible based on screen width
  function getCardsPerView() {
    return window.innerWidth <= 768 ? 1 : 4; // 1 card on mobile, 4 on desktop
  }

  // Function to move the carousel to a specific card
  const moveToCard = (index) => {
    // Limit navigation to prevent going beyond the first or last card
    if (index < 0) {
      index = 0; // Stop at the beginning
    } else if (index > totalCards - cardsPerView) {
      index = totalCards - cardsPerView; // Stop at the end
    }
    
    currentIndex = index;
    updateCarouselPosition();
    updateIndicators();
    updateButtonStates();
  };

  // Function to update the carousel position with proper centering
  const updateCarouselPosition = () => {
    const cardWidth = carouselCards[0].offsetWidth;
    const cardMargin = parseInt(window.getComputedStyle(carouselCards[0]).marginRight) || 0;
    const totalWidth = cardWidth + cardMargin;
    
    // Calculate offset with consideration for card margins
    let offset = -currentIndex * totalWidth;
    
    // Center single card in mobile view
    if (cardsPerView === 1) {
      const containerWidth = carouselTrack.parentElement.offsetWidth;
      const extraSpace = (containerWidth - cardWidth) / 2;
      offset -= cardMargin;
      offset += extraSpace;
    }
    
    carouselTrack.style.transform = `translateX(${offset}px)`;
  };

  // Function to update button states (disable when at edges)
  const updateButtonStates = () => {
    prevButton.disabled = currentIndex === 0;
    prevButton.style.opacity = currentIndex === 0 ? "0.5" : "1";
    
    const maxIndex = totalCards - cardsPerView;
    nextButton.disabled = currentIndex >= maxIndex;
    nextButton.style.opacity = currentIndex >= maxIndex ? "0.5" : "1";
  };

  // Function to update the indicators
  const updateIndicators = () => {
    // Calculate which group of indicators should be shown
    const indicatorsPerPage = Math.ceil(totalCards / cardsPerView);
    const currentPage = Math.floor(currentIndex / cardsPerView);
    
    indicators.forEach((indicator, i) => {
      // Set data-index to represent the actual starting card for each indicator
      const indicatorIndex = i * cardsPerView;
      indicator.setAttribute('data-index', indicatorIndex);
      
      // Show/hide indicators based on total pages
      if (i < indicatorsPerPage) {
        indicator.style.display = 'block';
        indicator.classList.toggle('active', i === currentPage);
      } else {
        indicator.style.display = 'none';
      }
    });
  };

  // Recalculate layout on window resize
  window.addEventListener('resize', () => {
    const newCardsPerView = getCardsPerView();
    
    if (newCardsPerView !== cardsPerView) {
      cardsPerView = newCardsPerView;
      
      // Ensure currentIndex is valid with new cardsPerView
      if (currentIndex > totalCards - cardsPerView) {
        currentIndex = totalCards - cardsPerView;
      }
      
      updateCarouselPosition();
      updateIndicators();
      updateButtonStates();
    }
  });

  // Navigation when clicking the buttons
  prevButton.addEventListener('click', () => {
    moveToCard(currentIndex - 1);
  });

  nextButton.addEventListener('click', () => {
    moveToCard(currentIndex + 1);
  });

  // Navigation when clicking the indicators
  indicators.forEach((indicator) => {
    indicator.addEventListener('click', () => {
      const index = parseInt(indicator.getAttribute('data-index'), 10);
      moveToCard(index);
    });
  });

  // Add CSS fix for card spacing
  carouselCards.forEach(card => {
    card.style.margin = "0 0.75rem"; // Add consistent horizontal margins
  });

  // Initialize the carousel
  moveToCard(0);
});

document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      question.addEventListener('click', () => {
          // Cierra todos los demás elementos FAQ abiertos
          faqItems.forEach(otherItem => {
              if (otherItem !== item) {
                  otherItem.querySelector('.faq-answer').style.maxHeight = null;
              }
          });

          // Abre o cierra el elemento actual
          if (answer.style.maxHeight) {
              answer.style.maxHeight = null;
          } else {
              answer.style.maxHeight = answer.scrollHeight + 'px';
          }
      });
  });
});
