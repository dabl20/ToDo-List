document.addEventListener('DOMContentLoaded', function () {

  var items = [];
  if (localStorage.items != undefined) {
    items = JSON.parse(localStorage.items);
    items.forEach(element => addItem(element));
  }

  function Item(data) {
    this.text = data;
    this.check = false;
  }

  document.forms[0].addEventListener('submit', function () {
    let data = document.querySelector('input[type="text"]').value;
    items.unshift(new Item(data));
    localStorage.items = JSON.stringify(items);
    addItem(data);
  });

  function addItem(data) {
    let li, stat;
    if (data.check) {
      stat = 'checked';
    } else {
      stat = '';
    };
    li = document.createElement('li');
    li.setAttribute('id', items.indexOf(data));
    li.innerHTML = `<button>DEL</button><label><input type="checkbox" ${stat}><span> ${data.text} </span></label>`;
    document.querySelector('ul').append(li);
    li.querySelector('input[type="checkbox"]').addEventListener('change', function () {
      if (this.checked) {
        items[items.indexOf(data)].check = true;
      } else {
        items[items.indexOf(data)].check = false;
      }
      localStorage.items = JSON.stringify(items);
    });
    li.querySelector('button').addEventListener('click', function () {
      document.querySelector('ul').removeChild(this.parentNode);
      items.splice(items.indexOf(data), 1);
      localStorage.items = JSON.stringify(items);
    });
  }

  document.querySelector('select').addEventListener('change', (event) => {
    document.querySelectorAll('input[type="checkbox"]').forEach(element => {
      if (event.target.value == 'all') {
        element.parentElement.parentElement.removeAttribute('hidden', '');
      }
      if (event.target.value == 'checked') {
        element.parentElement.parentElement.removeAttribute('hidden', '');
        if (element.getAttribute('checked') == null) {
          element.parentElement.parentElement.setAttribute('hidden', '');
        }
      }
      if (event.target.value == 'unchecked') {
        element.parentElement.parentElement.removeAttribute('hidden', '');
        if (element.getAttribute('checked') == '') {
          element.parentElement.parentElement.setAttribute('hidden', '');
        }
      }
    });
  });

});