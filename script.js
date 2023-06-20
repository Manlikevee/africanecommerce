window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    var scrollPosition = window.scrollY;
  
    if (scrollPosition > 0) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });