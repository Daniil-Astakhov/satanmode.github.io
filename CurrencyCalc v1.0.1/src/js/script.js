window.addEventListener('DOMContentLoaded', () => {
  const USD = document.getElementById('usd'),
          EUR = document.getElementById('eur'),
          TRY = document.getElementById('tl'),
          GBP = document.getElementById('gbp'),
          GEL = document.getElementById('gel'),
          AUD = document.getElementById('aud'),
          KZT = document.getElementById('kzt'),
          RSD = document.getElementById('rsd'),
          KRW = document.getElementById('krw'),
          PREKRW = document.getElementById('prekrw'),
          PREKZT = document.getElementById('prekzt'),
          PREUSD = document.getElementById('preusd'),
          PREEUR = document.getElementById('preeur'),
          PRETRY = document.getElementById('pretl'),
          PREGBP = document.getElementById('pregbp'),
          PREGEL = document.getElementById('pregel'),
          PREAUD =document.getElementById('preaud'),
          PRERSD =document.getElementById('prersd'),
          calcLeft = document.getElementById('calc__result-submain'), 
          calcMain = document.getElementById('calc__result-main'),
          calc__buttons = document.querySelectorAll('.calc__button'),
          currency__box = document.querySelectorAll('.currency__box__current'),
          main = document.querySelector('.main'),
          submain = document.querySelector('.submain'),
          container = document.querySelector('.container'),
          currency = document.querySelector('.currency'),
          calc = document.querySelector('.calc'),
          inputs = document.querySelectorAll('.input'),
          odin = document.querySelector('.odin'),
          buttonSwipe = document.querySelector('.buttonSwipe'),
          switchs = document.querySelector('.switch__button_sun'),
          title = document.querySelectorAll('.title_black'),
          currencyBoxItem = document.querySelectorAll('.currency__box_item');
  //карточки
  fetch('https://www.cbr-xml-daily.ru/daily_json.js')
  .then(response => response.json())
  .then(data => {
      USD.innerHTML =  `${parseFloat(data.Valute.USD.Value).toFixed(2)}`
      EUR.innerHTML = `${parseFloat(data.Valute.EUR.Value).toFixed(2)}`
      TRY.innerHTML = `${parseFloat(data.Valute.TRY.Value / 10).toFixed(2)}`
      GBP.innerHTML = `${parseFloat(data.Valute.GBP.Value).toFixed(2)}`
      GEL.innerHTML = `${parseFloat(data.Valute.GEL.Value).toFixed(2)}`
      AUD.innerHTML = `${parseFloat(data.Valute.AUD.Value).toFixed(2)}`
      KZT.innerHTML = `${parseFloat(data.Valute.KZT.Value).toFixed(2)}`
      RSD.innerHTML = `${parseFloat(data.Valute.RSD.Value).toFixed(2)}`
      KRW.innerHTML = `${parseFloat(data.Valute.KRW.Value).toFixed(2)}`
      PRERSD.innerHTML = `${parseFloat(data.Valute.RSD.Previous).toFixed(2)}`
      PREUSD.innerHTML = `${parseFloat(data.Valute.USD.Previous).toFixed(2)}`
      PREEUR.innerHTML = `${parseFloat(data.Valute.EUR.Previous).toFixed(2)}`
      PRETRY.innerHTML = `${parseFloat(data.Valute.TRY.Previous / 10).toFixed(2)}`
      PREGBP.innerHTML = `${parseFloat(data.Valute.GBP.Previous).toFixed(2)}`
      PREGEL.innerHTML = `${parseFloat(data.Valute.GEL.Previous).toFixed(2)}`
      PREAUD.innerHTML = `${parseFloat(data.Valute.AUD.Previous).toFixed(2)}`
      PREKZT.innerHTML = `${parseFloat(data.Valute.KZT.Previous).toFixed(2)}`
      PREKRW.innerHTML = `${parseFloat(data.Valute.KRW.Previous).toFixed(2)}`;
  })
  .catch(error => {
    console.error(error);
  })
  // CВИЧ КНОПОК КАРТОЧЕК          
  let subMainNum = '';
  currency__box.forEach(function(item) {
      item.addEventListener('click', function(event) {    
      currency__box.forEach(function(item) {
      item.parentElement.classList.remove('currency__box__current_active');
      });
      const clickedElement = event.target;
      let calcLeft2 = document.getElementById('calc__result-submain')
      clickedElement.parentElement.classList.add('currency__box__current_active');
      let textId = '';
      textId += clickedElement.id.toUpperCase()
      subMainNum = clickedElement.textContent;
      submain.innerHTML = textId.toUpperCase()
      calcLeft2.value = '';
      main.innerHTML = 'RUB';
      calcMain.value =  subMainNum;
      mainCurr = calcMain.value ; 
      calcLeft.click()
      odin.style.display = 'block';
      if (window.matchMedia("(max-width: 768px)").matches) {
        setTimeout(function() {
          console.log('swipe left');
          container.style.gridTemplateAreas = "'calc calc'";
          currency.style.display = 'none';
          calc.style.display = 'block';
        }, 150)
      }
     });
  });
  buttonSwipe.addEventListener('click', () => {
    buttonSwipe.style.boxShadow = '0px 0px 9px 4px #922487ab';
    setTimeout(function() {
      container.style.gridTemplateAreas = "'currency currency'";
      currency.style.display = 'block';
      calc.style.display = 'none';
      buttonSwipe.style.boxShadow = 'none';
    }, 250)   
  })
  // Убираем ввод для мобилок
  if (window.matchMedia("(max-width: 768px)").matches) {
    // Логика свайпа для мобайл
  let xDown = null;
  let yDown = null;
  function handleTouchStart(evt) {
      xDown = evt.touches[0].clientX;
      yDown = evt.touches[0].clientY;
  };
  function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
      return};
    let xDiff = xDown - evt.touches[0].clientX;
    let yDiff = yDown - evt.touches[0].clientY;
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) { // движение горизонтально
      if (xDiff > 0) { // свайп влево
          console.log('swipe left');
          container.style.gridTemplateAreas = "'calc calc'";
          currency.style.display = 'none'
          calc.style.display = 'block'
      } else if (xDiff < 0) { // свайп вправо
          console.log('swipe right');
          container.style.gridTemplateAreas = "'currency currency'";
          currency.style.display = 'block'
          calc.style.display = 'none'
      };               
    };
    xDown = null;
    yDown = null;                                             
  };
  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);
    calcLeft.setAttribute('readonly', 'readonly');
    calcMain.setAttribute('readonly', 'readonly');
  } else {
    calcLeft.removeAttribute('readonly');
    calcMain.removeAttribute('readonly');
  }  
  // Обычная логика калькулятора
  let currentInput = document.getElementById('calc__result-submain');
  function calcCurr() {
    inputs.forEach((item) => {
      item.addEventListener('click', (element) => {
        currentInput = element.target;
        calc__buttons.forEach((item2) => {
          item2.removeEventListener('click', handleClick);
          item2.addEventListener('click', handleClick);
        });
      });    
      item.addEventListener('keydown', (event) => {
        const key = event.key;
        const numKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "DEL"];
        if (numKeys.includes(key) || key === "Backspace") {
          event.preventDefault();
          handleClick({ target: currentInput, key: key });
        }
      });
    });
  } 
  function handleClick(elem) {
    odin.style.display = 'none';
    const clickedElement = elem.key || elem.target.id;
    if (clickedElement === 'Backspace' || clickedElement == 'DEL' ) {
      currentInput.value = currentInput.value.slice(0, -1);
    } else if (clickedElement === '.') {
      if (!currentInput.value.includes('.')) {
        currentInput.value += '.';
      }
    } else { 
      currentInput.value += clickedElement;
    }
    let subMain = currentInput.value.replace(/[a-z]/gi, '');
    let calcLeft2 = document.getElementById('calc__result-submain');
    let calcMain2 = document.getElementById('calc__result-main');
    
    if (currentInput == calcLeft2) {
      calcMain2.value = (subMain * subMainNum).toFixed(2);
    } else {
      calcLeft2.value = (subMain / subMainNum).toFixed(2);
    }
  }
  calcCurr();
  //Логика калькулятора для мобилки
  if (window.matchMedia("(max-width: 768px)").matches) {
  let currentInput = document.getElementById('calc__result-submain');
  function calcCurr() {
    inputs.forEach((item) => {
      item.addEventListener('click', (element) => {
        currentInput = element.target;
        calc__buttons.forEach((item2) => {
          item2.removeEventListener('click', handleClick);
          item2.addEventListener('click', handleClick);
        });
      });
    });
  }
  function handleClick(elem) {
    odin.style.display = 'none'
    const clickedElement = elem.target.id;
    if (clickedElement == 'DEL') {
      currentInput.value = currentInput.value.slice(0, -1);
      let subMain = currentInput.value.replace(/[a-z]/gi, '');
      let calcLeft2 = document.getElementById('calc__result-submain');
      let calcMain2 = document.getElementById('calc__result-main');
      if (currentInput == calcLeft2) {
        calcMain2.value = (subMain * subMainNum).toFixed(2);
      } else {
        calcLeft2.value = (subMain / subMainNum).toFixed(2);
      }
    } else { 
      currentInput.value += clickedElement;
      let subMain = currentInput.value.replace(/[a-z]/gi, '');
      let calcLeft2 = document.getElementById('calc__result-submain');
      let calcMain2 = document.getElementById('calc__result-main');
      if (currentInput == calcLeft2) {
        calcMain2.value = (subMain * subMainNum).toFixed(2);
      } else {
        calcLeft2.value = (subMain / subMainNum).toFixed(2);
      }
    }
  }
  calcCurr();
}
  // CВИЧ КНОПОК КАЛЬКА
  calc__buttons.forEach(function(item) {
    item.addEventListener('click', function(event) {
      // Убираем активный класс со всех элементов
      calc__buttons.forEach(function(item) {
        item.classList.remove('calc__button_active');
      });
      const clickedElement = event.target;
      clickedElement.classList.add('calc__button_active');
    });
  });
  function swichCalc () {
    inputs.forEach((item) => {
      item.addEventListener('click', (element) => {
        currentInput = element.target;
        calcLeft.style.boxShadow ='none';
        calcMain.style.boxShadow = 'none';
        currentInput.style.boxShadow = '0px 0px 12px 3px #922487ab';

        });
      });
    }
    swichCalc()
    // Белая тема
    switchs.addEventListener('click',() => {
      document.body.classList.toggle('body_wh')
      setTimeout(()=>{
        switchs.style.scale = '100%'
      }, 500)
      title.forEach((i) =>{
        i.classList.toggle('title_wh')
      });
      currency__box.forEach((i) => {
        i.classList.toggle('currency__box__current_wh')
      });
      currencyBoxItem.forEach((i) => {
        i.classList.toggle('currency__box_item_wh') 
      });
      inputs.forEach((i) => {
        i.classList.toggle('input_wh')
      });
      calc__buttons.forEach((i) => {
        i.classList.toggle("calc__button_wh")
      });
      switchs.classList.toggle("switch__button_dark")
      switchs.style.scale = '120%';
    })
  // появление зеленых и красных стрелок
  setTimeout(function() {
    let currencyItems = document.querySelectorAll('.currency__box_item');
    currencyItems.forEach(function(item) {
      let previous = item.querySelector('.currency__previous');
      let current = item.querySelector('.currency__box__current');
      let previousValue = parseFloat(previous.textContent);
      let currentValue = parseFloat(current.textContent);
      if (previousValue > currentValue) {
        item.querySelectorAll('.currency__arrow_plus').forEach(function(arrow) {
          arrow.classList.remove('currency__arrow_plus');
          arrow.classList.add('currency__arrow_minus');
          });
        }
      });
    }, 1500);
    setTimeout()   
});

