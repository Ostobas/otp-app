var answers = new Vue({
    el: '#answers',
    data: {
        fetching: false,
        disabled: false,
        answers: store.answers
    },
    methods: {
        onSubmit: function(index, value) {
            if (value === '') {
                this.failed({ msg: 'Üresen nem lehet menteni!' })
            } else {
                postData('/inc/process/p.saveAnswer.php', {index, value}, this.responseHandler)
            }
        },
        responseHandler(res) {
            if (res.isValid) {
                this.success(res)
            } else {
                this.failed(res)
            }
        },
        success: function (res) {
            ui.alert({
                type: 'success',
                content: `Megoldás sikeresen elmentve: <br> ${res.data.index}. feladat: ${res.data.value}`
            })
        },
        failed: function (res) {
            ui.alert({
                type: 'danger',
                content: `Megoldás mentése sikertelen: <br> ${res.msg}`
            })
        },
        update(answers) {
            this.answers = answers
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
            var sizeOfRoom = 1170
            var sizeOfOffice = 8193
            var maxTranslate = -8193 + windowWidth
            var translateAmount = this.translate === 0 || this.translate === maxTranslate
                ? Math.min( sizeOfRoom - (windowWidth - sizeOfRoom) / 2, windowWidth )
                : Math.min( sizeOfRoom, windowWidth )
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
        aswers: store.answers
    },
    methods: {
        task(index) {
            if (this.tasks.length === 0) {
                return { title: '', desc: '<h2>A feladat jelenleg nem elérhető!</h2>' }
            }
            return this.tasks.filter((t) => t.index === index)[0]
        },
        answer(index) {
            if (!index) return false
            else {
                return this.aswers.filter((a) => a.index === index)[0].value
            }
        },
        update(tasks) {
            this.tasks = tasks
        }
    }
})

var user = new Vue({
    el: '#topNav',
    data: {
        user: store.user
    },
    methods: {
        update(user) {
            this.user = user
        }
    }
})
