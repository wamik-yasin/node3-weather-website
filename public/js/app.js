const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error)
            {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            }
            else
            {
                messageOne.textContent = data.data.location
                messageTwo.textContent = data.data1
                // console.log(data.data.location)
                // console.log(data.data1)
            }
        })
    })

})