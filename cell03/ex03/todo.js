function saveList() {
  var list = document.getElementById('ft_list')
  var todos = []
  for (var i = 0; i < list.children.length; i++) {
    todos.push(list.children[i].innerHTML)
  }
  setCookie('todos', todos.join(';'), 7)
}

//add todo
function newTodo() {
  var todo = prompt('Enter a new TODO:')
  if (todo != null && todo.trim() != ' ') {
    var list = document.getElementById('ft_list')
    var div = document.createElement('div')
    div.innerHTML = todo
    div.onclick = function () {
      removeTodo(div)
    }
    list.insertBefore(div, list.firstChild)
    saveList()
  }
}

//delete todo
function removeTodo(div) {
  if (confirm('Are you sure you want to delete this todo?')) {
    div.parentNode.removeChild(div)
    saveList()
  }
}

//cookies
function setCookie(name, value, days) {
  var expiration = new Date()
  expiration.setTime(expiration.getTime() + days * 24 * 60 * 60 * 1000) // days * hours * minutes * seconds * milliseconds
  var expires = 'expires=' + expiration.toUTCString()
  document.cookie =
    name + '=' + encodeURIComponent(value) + ';' + expires + ';path=/'
}

function getCookie(name) {
  var cookies = document.cookie.split(';')
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim()
    if (cookie.startsWith(name + '=')) {
      return decodeURIComponent(cookie.substring(name.length + 1))
    }
  }
  return ''
}

function loadList() {
  var list = document.getElementById('ft_list')
  var todos = getCookie('todos')
  if (todos !== '') {
    todos = todos.split(';')
    for (var i = 0; i < todos.length; i++) {
      var div = document.createElement('div')
      div.innerHTML = todos[i]
      div.onclick = function () {
        removeTodo(div)
      }
      list.insertBefore(div, list.firstChild)
    }
  }
}
window.onload = function () {
  loadList()
}
