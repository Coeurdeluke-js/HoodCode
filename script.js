// Función para asignar una clase aleatoria al hero
document.addEventListener('DOMContentLoaded', () => {
    console.log('Script iniciado'); // Confirmar que el script se ejecuta
  
    const heroClasses = [
      'hero-bg-1',
      'hero-bg-2',
      'hero-bg-3',
      'hero-bg-4',
      'hero-bg-5',
      'hero-bg-6'
    ];
  
    // Seleccionar una clase aleatoria
    const randomClass = heroClasses[Math.floor(Math.random() * heroClasses.length)];
    console.log(`Clase seleccionada: ${randomClass}`); // Depuración
  
    // Asignar la clase al elemento #heroSection
    const heroSection = document.getElementById('heroSection');
    if (heroSection) {
      console.log('Elemento #heroSection encontrado.'); // Confirmar que el elemento existe
      heroSection.classList.add(randomClass);
    } else {
      console.error('El elemento #heroSection no fue encontrado.');
    }
  });