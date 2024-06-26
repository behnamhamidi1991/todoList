const itemForm = document.getElementById('form');
const itemInput = document.getElementById('formInput');
const itemList = document.getElementById('itemList');
const clearBtn = document.getElementById('clearAll');

function addItem(e) {
  e.preventDefault();

  //   Validate input
  const newItem = itemInput.value;

  if (newItem.value === '') {
    alert('Please add an item');
    return;
  }

  // Create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));
  li.className = 'item';

  const btnContainer = createBtnContainer('btnContainer');
  li.appendChild(btnContainer);

  itemList.appendChild(li);
  itemInput.value = '';
}

// Create Btn Container
function createBtnContainer(classes) {
  const btnContainer = document.createElement('div');
  btnContainer.className = classes;

  const deleteBtn = createDeleteBtn('deleteBtn');
  const editBtn = createEditBtn('editBtn');

  btnContainer.appendChild(editBtn);
  btnContainer.appendChild(deleteBtn);

  return btnContainer;
}

// Create Buttons
function createEditBtn(classes) {
  const button = document.createElement('button');
  button.className = classes;

  const icon = createEditIcon('fas fa-edit');
  button.appendChild(icon);

  return button;
}

function createDeleteBtn(classes) {
  const button = document.createElement('button');
  button.className = classes;

  const icon = createDeleteIcon('fa fa-trash');
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

// @ Remove Item
function removeItem(e) {
  if (e.target.parentElement.classList.contains('deleteBtn')) {
    e.target.parentElement.parentElement.parentElement.remove();
  }
}

function clearItems() {
  if (window.confirm('Are you sure you want to clear all items?')) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
  }
}

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
