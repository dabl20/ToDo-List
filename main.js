document.addEventListener('DOMContentLoaded', function () {
  var items = [];

  if (localStorage.items != undefined) {
    items = JSON.parse(localStorage.items);
    renderList()
  }

  function renderList() {
    items.forEach(element => addItem(element));
  }

  document.forms[0].addEventListener('submit', function (event) {
    event.preventDefault();
    document.querySelector('ul').innerHTML = '';
    let data = document.querySelector('input[type="text"]').value;
    items.push(new Item(data));
    localStorage.items = JSON.stringify(items);
    renderList();
    this.reset();
  });

  function Item(data) {
    this.text = data;
    this.check = false;
  }

  function addItem(data) {
    let li = document.createElement('li');
    li.setAttribute('id', items.indexOf(data));
    document.querySelector('ul').append(li);

    let label = document.createElement('label');
    li.append(label);

    let input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    if (data.check) {
      input.setAttribute('checked', '');
    };
    label.append(input);

    let text = document.createElement('span');
    text.textContent = data.text;
    label.append(text);

    let del = document.createElement('i');
    del.classList = 'delButton fas fa-trash-alt';
    li.append(del);

    input.addEventListener('change', function () {
      if (this.checked) {
        items[items.indexOf(data)].check = true;
        this.setAttribute('checked', '');
      } else {
        items[items.indexOf(data)].check = false;
        this.removeAttribute('checked', '');
      }
      localStorage.items = JSON.stringify(items);
    });
    li.querySelector('.delButton').addEventListener('click', function () {
      document.querySelector('ul').removeChild(this.parentNode);
      items.splice(items.indexOf(data), 1);
      localStorage.items = JSON.stringify(items);
    });
  }

  document.querySelector('select').addEventListener('click', (event) => {
    document.querySelector('ul').innerHTML = '';
    items.forEach(element => {
      switch (event.target.value) {
        case 'all':
          addItem(element);
          break;
        case 'checked':
          if (element.check == true) {
            addItem(element);
          }
          break;
        case 'unchecked':
          if (element.check == false) {
            addItem(element);
          }
          break;
      }
    });
  });

});