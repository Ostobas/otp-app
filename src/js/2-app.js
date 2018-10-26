// Init the ui library
var ui = ui()

var solutionIndex = 1
ui.form('#solution-' + solutionIndex,
    [{
        name: 'solution',
        rules: [{
            type: 'required',
            message: 'A feladatra nem lehet üres megoldást küldeni!'
        }]
    }], function(res) {
        if (res.valid) {
            var data = {
                index: solutionIndex,
                data: res.fields[0].value
            }
            sendData('/api/saveSolution.php', data, saveSolutionSuccess)
        }
    }
)

function saveSolutionSuccess(res) {
    console.log('Success', res)
}

function sendData(uri, data, callback) {
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(this.responseText))
        }
    }
    xhttp.open('POST', uri, true)
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhttp.send('data=' +  JSON.stringify(data))
}

// Lazy loading
document.addEventListener('DOMContentLoaded', function () {
    // Create an arra of imgaes with lazy classes
    var lazyImages = [].slice.call(document.querySelectorAll('img.lazy'))
    var active = false

    // Create the function
    var lazyLoad = function () {
        if (active === false) {
            active = true

            setTimeout(function () {
                lazyImages.forEach(function (lazyImage) {
                    // The imgage is entering the screen
                    if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== 'none') {
                        // Set the src attribute from the data-src
                        lazyImage.src = lazyImage.dataset.src
                        // Remove the class
                        lazyImage.classList.remove('lazy')

                        // Remove the image from the array
                        lazyImages = lazyImages.filter(function (image) {
                            return image !== lazyImage
                        })

                        // Check if the array is empty, then remove the event listeners
                        if (lazyImages.length === 0) {
                            document.removeEventListener('scroll', lazyLoad)
                            window.removeEventListener('resize', lazyLoad)
                            window.removeEventListener('orientationchange', lazyLoad)
                        }
                    }
                })

                active = false
            }, 200)
        }
    }

    // Add the event listeners
    document.addEventListener('scroll', lazyLoad)
    window.addEventListener('resize', lazyLoad)
    window.addEventListener('orientationchange', lazyLoad)
})