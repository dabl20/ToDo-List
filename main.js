console.log(localStorage);
var items = []; 
items = JSON.parse(localStorage["list"]);

for (let i of items) {
    addItem(i);
};

function createItem(data) {
  items.push(data);
  localStorage["list"] = JSON.stringify(items);
  addItem(data);
};

function addItem(data){
  let listItem = document.createElement('li');
  listItem.innerHTML = `<label><input type="checkbox"><span> ${data} </span></label>`;
  list.append(listItem);
};