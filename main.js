document.addEventListener('DOMContentLoaded', function() {
  let items = [];
  if (localStorage.items != undefined) {
    items = JSON.parse(localStorage.items);
    for (let el of items) {
      addItem(el);
    }
  }

  function Item(data) {
    this.text = data;
    this.check = false;
  }

  document.querySelector('form').addEventListener('submit', function() {
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
    li.querySelector('input[type="checkbox"]').addEventListener('change', function() {
      if(this.checked) {
          items[items.indexOf(data)].check = true;
      } else {
          items[items.indexOf(data)].check = false;
      }
      localStorage.items = JSON.stringify(items);
    });
    li.querySelector('button').addEventListener('click', function() {
      document.querySelector('ul').removeChild(this.parentNode);
      items.splice(items.indexOf(data), 1);
      localStorage.items = JSON.stringify(items);
    });
  }
});