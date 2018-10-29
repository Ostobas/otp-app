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
            position: 310
        }, {
            index: 2,
            image: 2,
            position: 420
        }, {
            index: 3,
            image: 3,
            position: 635
        }, {
            index: 4,
            image: 4,
            position: 1650
        }, {
            index: 5,
            image: 5,
            position: 1800
        }, {
            index: 6,
            image: 6,
            position: 1950
        }, {
            index: 7,
            image: 7,
            position: 2850
        }, {
            index: 8,
            image: 8,
            position: 2950
        }, {
            index: 9,
            image: 9,
            position: 3110
        }, {
            index: 10,
            image: 10,
            position: 3700
        }, {
            index: 11,
            image: 11,
            position: 4150
        }, {
            index: 12,
            image: 12,
            position: 4900
        }, {
            index: 13,
            image: 13,
            position: 6050
        }, {
            index: 14,
            image: 14,
            position: 6600
        }, {
            index: 15,
            image: 15,
            position: 7350
        }, {
            index: 16,
            image: 16,
            position: 7500
        }, {
            index: 17,
            image: 17,
            position: 7900
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
        bgTranslate() {
            return { transform: 'translateX(' + this.translate + 'px)' }
        },
        heroesTranslate() {
            return { transform: 'translate(' + this.translate + 'px, 260px)' }
        }
    }
})

