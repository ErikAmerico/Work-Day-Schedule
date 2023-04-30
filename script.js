// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  const saveBtns = document.querySelectorAll('.saveBtn')
  saveBtns.forEach(function (saveBtn) {
    saveBtn.addEventListener('click', function () {
      const parentDiv = saveBtn.closest('.row');
      const id = parentDiv.getAttribute('id');
      const text = parentDiv.querySelector('textarea').value;
      localStorage.setItem(id, text);
    });
  });


  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  const divs = document.getElementsByTagName('div')
  for (let i = 0; i < divs.length; i++) {
    const idTime = divs[i].getAttribute('id')
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


  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

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

  // TODO: Add code to display the current date in the header of the page.
  function dayTime() {
    const date = dayjs();
    $('#currentDay').text(date.format('MMMM D, YYYY hh:mm:ss'))
  }
  setInterval(dayTime, 1000);

});
