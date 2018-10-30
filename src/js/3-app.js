new Vue({
    el: '#solutions',
    data: {
        fetching: false,
        disabled: false,
        solutions: store.solutions
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

new Vue({
    el: 'main',
    data: {
        arrows: {
            left: true,
            right: false
        },
        translate: 0,
        heroes: store.heroes
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
            if (typeof index === 'undefined') return
            ui.openModal('#taskModal')
            tasks.index = index
        },
        cursor(index) {
            if (typeof index === 'undefined') {
                return 'auto'
            } else {
                return 'pointer'
            }
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

var tasks = new Vue({
    el: '#taskModal',
    data: {
        index: 0,
        tasks: store.tasks,
        solutions: store.solutions
    },
    methods: {
        task(index) {
            return this.tasks.filter((t) => t.index === index)[0]
        },
        solution(index) {
            if (!index) return false
            else {
                return this.solutions.filter((s) => s.index === index)[0].value
            }
        }
    }
})