`localStorage Methods`

```javascript
localStorage.setItem('name', 'Brad');
```

```javascript
localStorage.getItem('name');
```

```javascript
localStorage.removeItem('name');
```

```javascript
localStorage.clear();
```

`First Part`

```javascript
localStorage.setItem('name', 'Martin');

console.log(localStorage.getItem('name'));

localStorage.removeItem('name');

localStorage.clear();
```

```javascript
function addItemToStorage(item) {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    // What happens if I don't JSON.parse ???
    // It gives us a string, we want an array!
  }
}
```
