console.log(localStorage);
var items = []; 

if (localStorage.length !== 0) {
    items = JSON.parse(localStorage.items);
    for (let el of items) {
        addItem(el);
    };
};

function addItem(data){
    let li = document.createElement('li');
    li.innerHTML = `<label id="${data.id}"><input type="checkbox" class="stat"><span> ${data.text} </span></label>`;
    list.append(li);
};

function Item(data){
    this.id = items.length;
    this.text = data;
    this.checked = false;
};

function createItem(data) {
    items.push(new Item(data));
    localStorage.items = JSON.stringify(items);
    addItem(data);
};

let stat = document.querySelectorAll('.stat');
stat.forEach(el => {
    el.addEventListener("click", modifyStat);
    function modifyStat(){
        if (el.hasAttribute("checked")) { 
            el.removeAttribute("checked", "");
        } else {
            el.setAttribute("checked", "");
        }
    };    
});

