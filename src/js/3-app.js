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
        arrows: {
            left: true,
            right: false
        },
        translate: 0,
        heroes: [{
            index: 1,
            image: 1,
            position: 200
        }, {
            index: 2,
            image: 2,
            position: 400
        }]
    },
    methods: {
        moveRoom(dir) {
            var windowWidth = window.innerWidth
            var translateAmount = Math.min( 1170, windowWidth )
            var maxTranslate = -8193 + windowWidth
            var nextTranslate = Math.max( Math.min( this.translate + dir * translateAmount, 0), maxTranslate)

            if (nextTranslate >= 0) {
                this.arrows.left = true
            } else {
                this.arrows.left = false
            }

            if (nextTranslate <= maxTranslate) {
                this.arrows.right = true
            } else {
                this.arrows.right = false
            }

            this.translate = nextTranslate
        },
        openTask(index) {
            console.log('Open task: ', index)
        }
    },
    computed: {
        bgStyle() {
            return { transform: 'translateX(' + this.translate + 'px)' }
        }
    }
})

