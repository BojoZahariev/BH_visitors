const input1 = document.getElementById('item1');
const input2 = document.getElementById('item2');
const input3 = document.getElementById('item3');
input3.valueAsDate = new Date();

const radio1 = document.getElementById('radio1');
const radio2 = document.getElementById('radio2');
const radio3 = document.getElementById('radio3');
const submitButton = document.getElementById('submit');
const listContainer = document.getElementById('listContainer');

//local storage
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

class Visitor {
  constructor(firstName, lastName, date) {
    this.firstName = firstName.toUpperCase();
    this.lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    this.date = date;
  }
}

submitButton.addEventListener('click', function(e) {
  e.preventDefault();
  if (input1.checkValidity()) {
    if (input2.value === 'Details') {
      input2.value = '';
    }
    let visitor = new Visitor(input1.value, input2.value, input3.value);

    itemsArray.push(visitor);

    localStorage.setItem('items', JSON.stringify(itemsArray));
    listMaker(visitor);

    //reset to default after entry
    input1.value = '';
    input2.value = '';
    input3.valueAsDate = new Date();
    radio1.checked = true;
  }
});

const checked = () => {
  if (document.getElementById('radio1').checked) {
    return radio1.value;
  } else if (document.getElementById('radio2').checked) {
    return radio2.value;
  } else if (document.getElementById('radio3').checked) {
    return radio3.value;
  }
};

const listMaker = text => {
  let list = document.createElement('div');
  list.classList.add('list');
  for (let i = 0; i < 4; i++) {
    var item = document.createElement('p');
    item.classList.add('item');
    list.appendChild(item);
  }
  input3.valueAsDate = new Date();
  let child = list.querySelectorAll('p');
  child[0].textContent = text.firstName;
  child[1].textContent = text.lastName;
  child[2].textContent = text.date;

  //shows Today if the duedate is today

  listContainer.appendChild(list);
};

//Display after reload
const displayData = () => {
  data.forEach(item => {
    listMaker(item);
  });
};
displayData();
