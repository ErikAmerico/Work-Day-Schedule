
$(function () {

  const saveBtns = document.querySelectorAll('.saveBtn')
  saveBtns.forEach(function (saveBtn) {
    saveBtn.addEventListener('click', function () {
      const parentDiv = saveBtn.closest('.row');
      const id = parentDiv.getAttribute('id');
      const text = parentDiv.querySelector('textarea').value;
      localStorage.setItem(id, text);
    });
  });

  const divs = document.getElementsByTagName('div')
  for (let i = 0; i < divs.length; i++) {
    const idTime = parseInt(divs[i].getAttribute('id'))
    const time = dayjs();
    //alert(time.format('H'))
    console.log(idTime)

    if (idTime !== null && idTime < time.format('H')) {
      divs[i].setAttribute('class', 'row time-block past')
    } else if (idTime !== null && idTime == time.format('H')) {
      divs[i].setAttribute('class', 'row time-block present')
    } else if (idTime !== null && idTime > time.format('H')) {
      divs[i].setAttribute('class', 'row time-block future')
    }
  };

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    for (let j = 0; j < divs.length; j++) {
      const id = divs[j].id;
      if (id == key) {
        const textarea = divs[j].querySelector('textarea');
        textarea.value = value;
      }

    }

  };

  function dayTime() {
    const date = dayjs();
    $('#currentDay').text(date.format('MMMM D, YYYY'))
  }
  setInterval(dayTime, 1000);

});
