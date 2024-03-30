const itemForm = document.getElementById('form');
const formInput = document.getElementById('formInput');
const filterInput = document.getElementById('filter');
const itemList = document.getElementById('itemList');
const clearBtn = document.getElementById('clearAll');

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });
  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = formInput.value;
  if (newItem === '') {
    alert('You must add a task!');
    return;
  }

  // Create item DOM element
  addItemToDOM(newItem);

  // Add item to localStorage
  addItemToStorage(newItem);

  formInput.value = '';

  checkUI();
}

function addItemToDOM(item) {
  // Create list item
  const li = document.createElement('li');
  li.className = 'item';

  const button = createButtonContainer('btnContainer');
  li.appendChild(document.createTextNode(item));
  li.appendChild(button);

  itemList.appendChild(li);
}

/**
 * Begin
 * @localStorage
 */
function addItemToStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  itemsFromStorage.push(item);

  // Convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Re-set to localStorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

/**
 * End
 * @localStorage
 */

// Button Container
function createButtonContainer(classes) {
  const div = document.createElement('div');
  div.className = classes;

  const editButton = createEditButton('editBtn');
  const deleteButton = createDeleteButton('deleteBtn');
  const checkedButton = createCheckedButton('checkedBtn');

  // div.appendChild(checkedButton);
  div.appendChild(checkedButton);
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

function createCheckedButton(classes) {
  const button = document.createElement('button');
  button.className = classes;

  const checkedIcon = createCheckedIcon('fa-solid fa-circle-check');
  const notCheckedIcon = createNotCheckedIcon('fa-regular fa-circle');
  button.appendChild(notCheckedIcon);
  button.appendChild(checkedIcon);

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

function createCheckedIcon(classes) {
  const icon = document.createElement('icon');
  icon.id = 'checkedIcon';
  icon.className = classes;

  return icon;
}

function createNotCheckedIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  icon.id = 'notCheckedIcon';
  return icon;
}

function onClickItem(e) {
  let element = e.target;
  while (element != null && element.classList.contains('deleteBtn')) {
    element = element.parentElement;
  }
  if (
    element != null &&
    e.target.parentElement.classList.contains('deleteBtn')
  ) {
    removeItem(e.target.parentElement.parentElement.parentElement);
  }
}

// Remove item
function removeItem(item) {
  if (confirm('Are you sure?')) {
    // Remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeAll() {
  if (window.confirm('Are you sure you want to delete all tasks?!')) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
  }

  localStorage.removeItem('items');
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

function isDone(e) {
  const element = e.target.closest('.item');
  if (e.target.closest('.checkedBtn')) {
    element.classList.toggle('toggle');

    const notCheckedIcon = element.querySelector('#notCheckedIcon');
    const checkedIcon = element.querySelector('#checkedIcon');

    // Toggle the display property of the icons
    if (element.classList.contains('toggle')) {
      notCheckedIcon.style.display = 'none';
      checkedIcon.style.display = 'block';
    } else {
      notCheckedIcon.style.display = 'block';
      checkedIcon.style.display = 'none';
    }
  }
}

// Initiale App
function init() {
  // Event Listeners
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  itemList.addEventListener('click', isDone);
  clearBtn.addEventListener('click', removeAll);
  filterInput.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);

  checkUI();
}

init();
