const itemForm = document.getElementById('form');
const itemInput = document.getElementById('formInput');
const itemList = document.getElementById('itemList');

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

  const editBtn = createEditButton('editBtn');
  const deleteBtn = createDeleteButton('deleteBtn');

  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  console.log(li);
}

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
  const icon = createDeleteIcon('fa fa-trash');
  button.appendChild(icon);

  return button;
}

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

// Event Listeners
itemForm.addEventListener('submit', addItem);
