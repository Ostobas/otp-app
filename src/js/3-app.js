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
            image: 2,
            position: 420
        }, {
            index: 2,
            image: 3,
            position: 635
        }, {
            image: 4,
            position: 1650
        }, {
            index: 3,
            image: 5,
            position: 1800
        }, {
            image: 6,
            position: 1950
        }, {
            image: 7,
            position: 2850
        }, {
            image: 8,
            position: 2950
        }, {
            index: 4,
            image: 9,
            position: 3110
        }, {
            index: 5,
            image: 10,
            position: 3700
        }, {
            image: 11,
            position: 4150
        }, {
            image: 12,
            position: 4900
        }, {
            index: 6,
            image: 13,
            position: 6050
        }, {
            image: 14,
            position: 6600
        }, {
            index: 7,
            image: 15,
            position: 7350
        }, {
            image: 16,
            position: 7500
        }, {
            index: 8,
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
        tasks: [{
            index: 0,
            title: 'Köszöntő',
            desc: 'Köszöntés'
        }, {
            index: 1,
            title: 'Akadálypálya',
            desc: '<p>Egy barátod akadályfutáson indul. Barátod jó fizikumú, de az erejének beosztásával vannak problémák és elég hamar kimerül, ha sokat erőlködik elszáll belőle a szufla. Úgy döntesz megpróbálsz neki segíteni, és arra jutsz, ha mindig a lehető legkisebbeket szökellve halad végig a pályán, akkor nem kell plusz erőt elhasználnia minden egyes akadály esetén, mert akár többet is legyűrhet, ráadásul az egyenletes erőkifejtés segít neki kihúzni a verseny végéig.</p> \
            <p>Véletlenül egy másik barátod az egyik versenyszervező és sikerül belőle kiszedned az akadályok elhelyezkedését, valamint azt is megtudod, hogy az akadályok elhelyezkedése mindig pontosan fél vagy egy méteren van, így fél méteres egységekkel kell számolni.</p> \
            <p>A verseny egy 200 méter hosszú (400 egység), kerítéssel határolt sávon történik (nem lehet kikerülni az akadályokat) és csak előre felé lehet haladni az optimális  eredmény eléréséhez.</p> \
            <p>Az egységnek állandónak kell lennie, nem változhat (ha a barátod kiesik a ritmusból, elfárad és nem tudja befejezni a versenyt).</p> \
            <p>Az elvárt eredmény: az a legkisebb egységnyi haladási hossz, amit ha folyamatosan tart a versenyző, akkor minden akadályt képes venni és a célig kitart az ereje is.</p>'
        }, {
            index: 2,
            title: 'Kötél',
            desc: 'Adott két kötél, amikről tudjuk, hogy ha meggyújtjuk a végét, akkor éppen 1 óra alatt ég végig, valamint nem hajtogathatók. Nincs nálunk óra, a feladat az, hogy mérjünk ki negyed órát. A kötelek nem egyenletesen égnek el, azaz az elégett hossz, és az eltelt idő nincs semmilyen arányban. Hány percre van szükségünk összesen a negyed óra kiméréséhez?'
        }, {
            index: 3,
            title: 'Einstein feladványa',
            desc: '<p>Van 5 ház, mindegyik más színű. Minden házban egy más-más nemzetiségű személy lakik. Minden háztulajdonos más-más állatot tart, más-más italt kedvel és más-más lábbelit visel.</p> \
            <p>Azt lehet tudni, hogy:</p> \
            <ul><li>Öt ház van.</li> \
            <li>A skót a piros házban lakik.</li> \
            <li>A görögnek kutyája van.</li> \
            <li>A zöld házban kávét isznak.</li> \
            <li>A bolíviai teát iszik.</li> \
            <li>A zöld ház közvetlenül a fehér ház mellett jobbra áll.</li> \
            <li>A bakancsot viselő férfi csigákat tart.</li> \
            <li>A sárga ház lakója cipőt hord.</li> \
            <li>A középső házban tejet isznak.</li> \
            <li>A dán az első házban lakik.</li> \
            <li>A szandált viselő férfi a rókát tartó férfi melletti házban lakik.</li> \
            <li>A cipőt viselő férfi a lovat tartó férfi melletti házban lakik.</li> \
            <li>A mamuszt viselő férfi narancslevet iszik.</li> \
            <li>A japán papucsot visel.</li> \
            <li>A dán a kék ház mellett lakik.</li></ul> \
            <p>A kérdés: milyen nemzetiségű iszik vizet és melyik tart zebrát?</p>'
        }, {
            index: 4,
            title: 'Patkány',
            desc: 'Adott 1000 palack bor, az egyik mérgezett, ha megiszunk belőle bármekkora mennyiséget a méreg 1 óra alatt megöl. Hány patkányra van szükségünk, hogy 100% - os biztonsággal meg tudjuk állapítani 1 óra alatt az előkészületi időt nem számítva, hogy melyik palackban van a méreg?'
        }, {
            index: 5,
            title: 'Sakktábla',
            desc: 'A távoli jövőben a Földet megtámadták a földönkívüliek. Mészárlás helyett azonban alkut kínáltak: ha helyesen válaszolunk a kérdésükre, megkímélik a Föld élőlényeit és szövetségre lépnek, ha helytelenül, akkor minden élőlényt rabszolgasorba állítanak. A Föld vezetősége ezért összehívta a legokosabb tudósokat, hogy a próba után az egyetlen kiválasztott válaszolhasson a földönkívüliek kérdésére. A tudós 13 óra gondolkozás után végül megoldotta a feladatot, így a Föld páratlan, soha nem látott képességekre tett szert a szövetségnek köszönhetően. Vajon mi lehetett a tudós válasza, ha a kérdése a földönkívülieknek ez volt: 7x7-es interdimenzionális négyzetrácsra bolygókat helyezünk el. A négyzetrács minden oszlopa és sora csak egy bolygót tartalmazhat. A helyzetet bonyolítja, hogy az idegenek által generált interdimenzionális tér sajátosságai miatt nem engedhető meg hogy az átlókkal párhuzamos egyenesek mentén kettő vagy több bolygó együttálása megfigyelhető legyen. Ezeket a bolygókat ugyanis egy harmadik, ellenséges lények megsemmisítik, gyengítve a szövetség erőforrásait. Hány olyan lehetséges elrendezése van 7 bolygónak, ha a földönkívüliek szerint nem engedhető meg egy bolygó megsemmisülése sem?'
        }, {
            index: 6,
            title: 'Mátrix',
            desc: '[desc]'
        }, {
            index: 7,
            title: 'Rajzolás',
            desc: 'Az alábbi ábrák közül mennyit lehet lerajzolni egy vonallal a ceruza felemelése nélkül?'
        }, {
            index: 8,
            title: 'Átkelés a Hídon',
            desc: '<p>Adam, Bob Clair és Dave sétálnak, mikor egy régi rozoga fahídhoz érnek. A híd gyenge és egyszerre csak két ember súlyát bírja el.</p> \
            <p>Mivel sietnek és sötétedik a lehető leggyorsabban kell átérniük, és magukkal kell vinni egy fáklyát minden egyes átkelésnél.</p> \
            <p>Csak egy fáklya van, amit nem lehet kettétörni. Mivel különböző az állóképességük, és néhányan kisebb sérüléssel küzdenek, különböző sebességgel tudnak átkelni a hídon.</p> \
            <p>Adam 1p, Bob 2p, Clair 5p, és Dave 10 p alatt.</p> \
            <p>Hány perc alatt teljesíthető a leggyorsabban az átkelés a hídon?</p>'
        }]
    },
    methods: {
        task(index) {
            return this.tasks.filter((t) => t.index === index)[0]
        }
    }
})