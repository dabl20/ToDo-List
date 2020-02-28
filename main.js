console.log(localStorage);
var items = []; 

if (localStorage.length !== 0) {
    items = JSON.parse(localStorage.list);
    for (let el of items) {
        addItem(el);
    };
};

function addItem(data){
    let listItem = document.createElement('li');
    listItem.innerHTML = `<label id="${data.id}"><input type="checkbox" id="stat"><span> ${data.text} </span></label>`;
    list.append(listItem);
};

function Item(data){
    this.id = items.length;
    this.text = data;
    this.checked = false;
};

function createItem(data) {
    items.push(new Item(data));
    localStorage.list = JSON.stringify(items);
    addItem(data);
};

console.log(localStorage.list);