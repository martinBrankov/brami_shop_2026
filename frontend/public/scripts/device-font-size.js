// Проверка за мобилно устройство
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// Прилагане на 135% размер на шрифтовете само за десктоп
const applyDesktopFontSize = () => {
  if (!isMobileDevice()) {
    document.documentElement.style.fontSize = '135%';
  } else {
    document.documentElement.style.fontSize = '';
  }
}

// Прилагане при зареждане
applyDesktopFontSize();

// Обновяване при resize
window.addEventListener('resize', applyDesktopFontSize);
