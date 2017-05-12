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

//Render functions
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
  //Check
  $('#js-shopping-list-form').submit(event => {
    event.preventDefault();
    addItem(state, $('#shopping-list-entry').val());
    renderList(state, $('.shopping-list'));
    $('#js-shopping-list-form').find('input[type=text]').val('');
  })

  //Check for deletion
  $('.shopping-list').on('click', 'li button.shopping-item-delete', event => {
    // event.preventDefault();
    deleteItem(state, $(event.currentTarget).closest('li').index());
    renderList(state, $('.shopping-list'));
  })

  //Check for Check
  $('.shopping-list').on('click', 'li button.shopping-item-toggle', event => {
    // event.preventDefault();
    checkItem(state, $(event.currentTarget).closest('li').index());
    renderList(state, $('.shopping-list'));
  })
}

$(() => {

  eventListeners(appState);
  renderList(appState, $('.shopping-list'));
})
