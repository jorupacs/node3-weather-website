console.log('Client side javascript');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const searchLocation = (location) => {
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            console.log(data);
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
}


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    searchLocation(search.value)
})