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
                this.failed({index, msg: 'Üresen nem lehet menteni!'})
            } else {
                this.success({index, value})
            }
        },
        success: function (res) {
            ui.alert({
                type: 'success',
                content: `Megoldás sikeresen elmentve: <br> ${res.index}. feladat: ${res.value}`
            })
        },
        failed: function (res) {
            ui.alert({
                type: 'danger',
                content: `Megoldás mentése sikertelen (${res.index}. feladat): <br> ${res.msg}`
            })
        }
    }
})

var room = new Vue({
    el: 'main',
    data: {
        translate: 0
    },
    methods: {
        moveRoom: function(dir) {
            console.log('Move room, directon: ', dir)
            this.translate += dir * 1440
            console.log('Tranlate value: ', this.translate)
        }
    },
    computed: {
        bgStyle() {
            return { transform: 'translateX(' + this.translate + 'px)' }
        }
    }
})

