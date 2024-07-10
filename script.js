document.addEventListener('DOMContentLoaded', function() {
    const itemInput = document.getElementById('itemInput');
    const addItemBtn = document.getElementById('addItemBtn');
    const clearListBtn = document.getElementById('clearListBtn');
    const shoppingList = document.getElementById('shoppingList');
  
    let items = []; // JavaScript array to store shopping list items
  
    // Function to render items in the shopping list
    function renderItems() {
      shoppingList.innerHTML = ''; // Clear previous items
      items.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('shopping-item');
        if (item.completed) {
          li.classList.add('completed'); // Add completed class for purchased items
        }
  
        // Create item number and text
        const itemNumber = document.createElement('span');
        itemNumber.classList.add('item-number');
        itemNumber.textContent = index + 1 + '. ';
        li.appendChild(itemNumber);
  
        const itemText = document.createElement('span');
        itemText.classList.add('item');
        itemText.textContent = item.name;
        li.appendChild(itemText);
        
        // Create mark purchased button
        const markBtnContainer = document.createElement('span');
        markBtnContainer.classList.add('mark-btn');
  
        const markBtn = document.createElement('button');
        markBtn.textContent = item.completed ? 'Mark Not Purchased' : 'Mark Purchased';
        markBtn.addEventListener('click', () => {
          item.completed = !item.completed; // Toggle completed status
          renderItems(); // Re-render items to update UI
          saveToLocalStorage(); // Persist changes to local storage
        });
        markBtnContainer.appendChild(markBtn);
  
        li.appendChild(markBtnContainer);
  
        shoppingList.appendChild(li); // Append item to the list
      });
    }
  
    // Function to add new item to the list
    function addItem() {
      const itemName = itemInput.value.trim();
      if (itemName === '') return; // Ignore empty input
  
      items.push({ name: itemName, completed: false }); // Add item to array
      renderItems(); // Update UI to display new item
      saveToLocalStorage(); // Persist changes to local storage
  
      itemInput.value = ''; // Clear input field
      itemInput.focus(); // Return focus to input field for next entry
    }
  
    // Event listener for Add button
    if (addItemBtn) {
      addItemBtn.addEventListener('click', addItem);
    }
  
    // Event listener for Clear List button
    if (clearListBtn) {
      clearListBtn.addEventListener('click', () => {
        items = []; // Clear array
        renderItems(); // Update UI to reflect empty list
        saveToLocalStorage(); // Persist changes to local storage
      });
    }
  
    // Function to save items to localStorage
    function saveToLocalStorage() {
      localStorage.setItem('shoppingList', JSON.stringify(items)); // Store array as JSON string
    }
  
    // Load items from localStorage if available
    if (localStorage.getItem('shoppingList')) {
      items = JSON.parse(localStorage.getItem('shoppingList')); // Retrieve stored items
      renderItems(); // Display items on page load
    }
  });
  