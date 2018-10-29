// Init the ui library
var ui = ui()

// Return value
var solutions =  new Vue({
    el: '#solutions',
    data: {
        fetching: false,
        disabled: false,
        solutions: [{
            index: 1,
            value: ''
        }, {
            index: 2,
            value: ''
        }, {
            index: 3,
            value: ''
        }]
    },
    methods: {
        onSubmit: function(index, value) {
            if (value === '') {
                saveSolutionFailed({index, msg: 'Üresen nem lehet menteni!'})
            } else {
                saveSolutionSuccess({index, value})
            }
        }
    }
})

function saveSolutionSuccess(res) {
    ui.alert({
        type: 'success',
        content: `Megoldás sikeresen elmentve: <br> ${res.index}. feladat: ${res.value}`
    })
}

function saveSolutionFailed(res) {
    ui.alert({
        type: 'danger',
        content: `Megoldás mentése sikertelen (${res.index}. feladat): <br> ${res.msg}`
    })
}

function moveRoom(dir) {
    console.log(dir)
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