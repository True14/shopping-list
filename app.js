//Application State
const appState = {
  items: [
    {name: 'apples', done: false},
    {name: 'oranges', done: false},
    {name: 'milk', done: true},
    {name: 'bread', done: false}
  ]
}

//List Template
const listTemplate = item => {
  return `<li>
    <span class="shopping-item">${item}</span>
    <div class="shopping-item-controls">
      <button class="shopping-item-toggle">
        <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete">
        <span class="button-label">delete</span>
      </button>
      <form id="js-edit-list-form">
        <button type="submit" class="shopping-item-edit">edit</button>
        <input type="text" name="edit-list-entry" id="edit-list-entry" placeholder="e.g., broccoli" required >
      </form>
    </div>
  </li>`;
}

//State Modification
//Add items to the list
const addItem = (state, item) => {
  const obj = {name: item, done: false};
  state.items.push(obj);

}

//Delete items from the list
const deleteItem = (state,itemIndex) => {
  state.items.splice(itemIndex, 1);
}

//Check items on the list
const checkItem = (state,itemIndex) => {
  if(state.items[itemIndex].done) {
    state.items[itemIndex].done = false;
  }
  else {
    state.items[itemIndex].done = true;
  }
}

const editItem = (state, itemIndex, title) => {
  state.items[itemIndex].name = title;

}



//Render functions
const searchItem = (state,element, value) => {
  const itemsHTML = state.items.map(item => {
    const toggle = $(listTemplate(item.name));
    if(item.name.includes(value)) {
      toggle.show();
    }
    else if(value === '*'){
      toggle.show();
    }
    else {
      toggle.hide();
    }
    return toggle;
  });

   element.html(itemsHTML);
}
const toggleHidden = (state, element, condition) => {
  const itemsHTML = state.items.map(item => {
    const toggle = $(listTemplate(item.name));
    if(item.done && condition) {
      toggle.hide();
    }
    else if(item.done && !condition) {
      toggle.find('.shopping-item').toggleClass('shopping-item__checked');
      toggle.show();
    }
    return toggle;
  });

   element.html(itemsHTML);
}

const renderItem = item => {
  const food = $(listTemplate(item.name));
  if(item.done){
    food.find('.shopping-item').toggleClass('shopping-item__checked');
  }
  return food;

}

const renderList = (state, element) => {
  const itemsHTML = state.items.map(item => {
    return renderItem(item);
  });

  element.html(itemsHTML);
}

//Event Listeners
const eventListeners = state => {
  //Check for Add
  $('#js-shopping-list-form').submit(event => {
    event.preventDefault();
    addItem(state, $('#shopping-list-entry').val());
    renderList(state, $('.shopping-list'));
    $('#js-shopping-list-form').find('input[type=text]').val('');
  });

  //Check for Search
  $('#js-shopping-list-search').submit(event => {
    event.preventDefault();
     searchItem(state, $('.shopping-list'), $('#shopping-list-search').val());
    $('#js-shopping-list-search').find('input[type=text]').val('');
  });

  //Check for deletion
  $('.shopping-list').on('click', 'li button.shopping-item-delete', event => {
    // event.preventDefault();
    deleteItem(state, $(event.currentTarget).closest('li').index());
    renderList(state, $('.shopping-list'));
  });

  //Check for Check
  $('.shopping-list').on('click', 'li button.shopping-item-toggle', event => {
    // event.preventDefault();
    checkItem(state, $(event.currentTarget).closest('li').index());
    renderList(state, $('.shopping-list'));
  });

  //Check for edit
  $('.shopping-list').on('submit','li form', event => {
    event.preventDefault();
    editItem(state, $(event.currentTarget).closest('li').index(), $(event.currentTarget).find('#edit-list-entry').val());
    renderList(state, $('.shopping-list'));
  });

  //Check hidden
  $('input[type=checkbox]').change(event => {
      toggleHidden(state, $('.shopping-list'), $(event.currentTarget).is(':checked'));
  });


}

$(() => {

  eventListeners(appState);
  renderList(appState, $('.shopping-list'));
})
