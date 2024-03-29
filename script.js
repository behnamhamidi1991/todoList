const itemForm = document.getElementById('form');
const formInput = document.getElementById('formInput');
const filterInput = document.getElementById('filter');
const itemList = document.getElementById('itemList');
const clearBtn = document.getElementById('clearAll');

function addItem(e) {
  e.preventDefault();

  const newItem = formInput.value;
  if (newItem === '') {
    alert('You must add a task!');
    return;
  }

  const li = document.createElement('li');
  li.className = 'item';

  const button = createButtonContainer('btnContainer');
  li.appendChild(document.createTextNode(newItem));
  li.appendChild(button);

  itemList.appendChild(li);
  formInput.value = '';

  checkUI();
}

// Button Container
function createButtonContainer(classes) {
  const div = document.createElement('div');
  div.className = classes;

  const editButton = createEditButton('editBtn');
  const deleteButton = createDeleteButton('deleteBtn');

  div.appendChild(editButton);
  div.appendChild(deleteButton);

  return div;
}

// Create Buttons
function createEditButton(classes) {
  const button = document.createElement('button');
  button.className = classes;

  const icon = createEditIcon('fas fa-edit');
  button.appendChild(icon);

  return button;
}

function createDeleteButton(classes) {
  const button = document.createElement('button');
  button.className = classes;

  const icon = createDeleteIcon('fas fa-trash');
  button.appendChild(icon);

  return button;
}

// Create Icons
function createEditIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function createDeleteIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

// Remove item
function removeItem(e) {
  let element = e.target;
  while (element != null && element.classList.contains('deleteBtn')) {
    element = element.parentElement;
  }

  if (
    element != null &&
    e.target.parentElement.classList.contains('deleteBtn')
  ) {
    e.target.parentElement.parentElement.parentElement.remove();
  }
  checkUI();
}

function removeAll() {
  if (window.confirm('Are you sure you want to delete all tasks?!')) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
  }
  checkUI();
}

function checkUI() {
  const items = document.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    filterInput.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    filterInput.style.display = 'block';
  }
}

function filterItems(e) {
  const items = document.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function taskDone(e) {
  const element = e.target;
}

checkUI();

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
itemList.addEventListener('click', taskDone);
clearBtn.addEventListener('click', removeAll);
filterInput.addEventListener('input', filterItems);
