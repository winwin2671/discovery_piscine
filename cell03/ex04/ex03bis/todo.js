//set cookie str
const setCookie = (cookie_name, cookie_value) => {
  document.cookie = `${cookie_name}=${cookie_value};path=/` //path on server where cookie is vaild
}

const getCookie = (cookie_name) => {
  let name = cookie_name + '='
  let decodedCookie = document.cookie
  let ca = decodedCookie.split(';')

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]

    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }

  return ''
}

const _resetCookie = () => {
  setCookie('todoData', '')
}

//create new btn then append to html body
$('document').ready(() => {
  jQuery('<button>', {
    text: 'New',
    id: 'btn',
  }).appendTo('body')

  const updateTodo = () => {
    let todoData = getCookie('todoData').split(',')
    const todoContainer = $('#ft_list')

    if (todoData == '') {
      return
    }

    todoContainer.empty()

    todoData.reverse().forEach((todo) => {
      todo = decodeURIComponent(todo)

      const todoItem = jQuery('<li>', {
        text: todo,
        click: () => {
          const deleteConfirm = confirm(`Do you wish to delete "${todo}"?`)

          if (deleteConfirm) {
            todoData.splice(todoData.indexOf(todo), 1)
            todoItem.remove()
            setCookie('todoData', todoData.reverse().join(','))
          }
        },
      }).appendTo('#ft_list')
    })
  }

  $('#btn').click(() => {
    let cookieData = getCookie('todoData')
    let input = prompt('Please enter your TODO:')

    if (!input || input.trim() === '') {
      return
    }

    input = encodeURIComponent(input)

    if (cookieData === '') {
      setCookie('todoData', input)
    } else if (cookieData !== '') {
      cookieData += `,${input}`
      setCookie('todoData', cookieData)
    }

    updateTodo()
  })

  updateTodo()
})
