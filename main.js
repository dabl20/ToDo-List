var items = [];

if (localStorage.length !== 0) {
  items = JSON.parse(localStorage.items);
  for (let el of items) {
    addItem(el);
  }
}

function createItem(data) {
  items.push(new Item(data));
  localStorage.items = JSON.stringify(items);
  addItem(data);
}

function Item(data) {
  this.text = data;
  this.check = false;
}

function addItem(data) {
  let li = document.createElement('li');
  li.setAttribute('id', items.indexOf(data));
  let stat;
  if (data.check) {
    stat = 'checked';
  } else {
    stat = '';
  };
  li.innerHTML = `<button>DEL</button><label><input type="checkbox" ${stat}><span> ${data.text} </span></label>`;
  list.append(li);
}

for (let i = 0; i < list.children.length; i++) {
  let el = list.children[i].querySelector('input[type="checkbox"]');
  el.addEventListener('click', modifyStat);
  function modifyStat() {
    if (el.hasAttribute('checked')) {
      el.removeAttribute('checked', '');
      items[i].check = false;
    } else {
      el.setAttribute('checked', '');
      items[i].check = true;
    }
    localStorage.items = JSON.stringify(items);
  }
}

for (let i = 0; i < list.children.length; i++) {
  console.log(list.childNodes[i])
  let el = list.childNodes[i].querySelector('button');
  el.addEventListener('click', delItem);
  function delItem() {
    items.splice(i, 1);
    localStorage.items = JSON.stringify(items);
    list.childNodes[i].remove();
  }
}
