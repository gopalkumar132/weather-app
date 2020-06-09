console.log('Client side app.js running')

// fetch('http://localhost:3000/weather/?location=hyderabad').then((response)=> {
//     response.json().then((data)=> {
//         console.log(data)
//     })
// })

weatherForm = document.querySelector('form')
locationInput = document.querySelector('input')
message1 = document.querySelector('#message-1')
message2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()

    input_loc = locationInput.value
    if(input_loc.length > 0) {
        weather_url = 'http://localhost:3000/weather/?location='+input_loc
        message1.textContent = 'Loading...'

        fetch(weather_url).then((response)=> {
            response.json().then((data)=> {
                if(data.hasOwnProperty('error')) {
                    message1.textContent = "Error: "+ data.error
                } else {
                    message1.textContent = "Report: " + data.data
                    message2.textContent = "Location: " + data.placename
                }
            })
        })
    } else {
        alert('Enter location')
    }
})