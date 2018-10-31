// Init the ui library
var ui
document.addEventListener('DOMContentLoaded', function() {
    ui = ui()
    init()
}, false)

function init() {
    getData('/inc/process/p.userInit.php', function(res) {
        answers.update(res.data.answers)
        tasks.update(res.data.tasks)
        user.update(res.data.user)
    })
}

function postData(uri, data, callback) {
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

function getData(uri, callback) {
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(this.responseText))
        }
    }
    xhttp.open('GET', uri, true)
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhttp.send()
}