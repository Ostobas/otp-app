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
        }, {
            index: 4,
            value: ''
        }, {
            index: 5,
            value: ''
        }, {
            index: 6,
            value: ''
        }, {
            index: 7,
            value: ''
        }, {
            index: 8,
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
            desc: '<p>A távoli jövőben a Földet megtámadták a földönkívüliek. Mészárlás helyett azonban alkut kínáltak: ha helyesen válaszolunk a kérdésükre, megkímélik a Föld élőlényeit és szövetségre lépnek, ha helytelenül, akkor minden élőlényt rabszolgasorba állítanak.</p> \
            <p>A Föld vezetősége ezért összehívta a legokosabb tudósokat, hogy a próba után az egyetlen kiválasztott válaszolhasson a földönkívüliek kérdésére. A tudós 13 óra gondolkozás után végül megoldotta a feladatot, így a Föld páratlan, soha nem látott képességekre tett szert a szövetségnek köszönhetően.</p> \
            <p>Vajon mi lehetett a tudós válasza, ha a kérdése a földönkívülieknek ez volt: 7x7-es interdimenzionális négyzetrácsra bolygókat helyezünk el. A négyzetrács minden oszlopa és sora csak egy bolygót tartalmazhat. A helyzetet bonyolítja, hogy az idegenek által generált interdimenzionális tér sajátosságai miatt nem engedhető meg hogy az átlókkal párhuzamos egyenesek mentén kettő vagy több bolygó együttálása megfigyelhető legyen. Ezeket a bolygókat ugyanis egy harmadik, ellenséges lények megsemmisítik, gyengítve a szövetség erőforrásait.</p> \
            <p>Hány olyan lehetséges elrendezése van 7 bolygónak, ha a földönkívüliek szerint nem engedhető meg egy bolygó megsemmisülése sem?</p>'
        }, {
            index: 6,
            title: 'Mátrix',
            desc: '<p> \
            37107287533902102798797998220837590246510135740250 <br \> \
            46376937677490009712648124896970078050417018260538 <br \> \
            74324986199524741059474233309513058123726617309629 <br \> \
            91942213363574161572522430563301811072406154908250 <br \> \
            23067588207539346171171980310421047513778063246676 <br \> \
            89261670696623633820136378418383684178734361726757 <br \> \
            28112879812849979408065481931592621691275889832738 <br \> \
            44274228917432520321923589422876796487670272189318 <br \> \
            47451445736001306439091167216856844588711603153276 <br \> \
            70386486105843025439939619828917593665686757934951 <br \> \
            62176457141856560629502157223196586755079324193331 <br \> \
            64906352462741904929101432445813822663347944758178 <br \> \
            92575867718337217661963751590579239728245598838407 <br \> \
            58203565325359399008402633568948830189458628227828 <br \> \
            80181199384826282014278194139940567587151170094390 <br \> \
            18336384825330154686196124348767681297534375946515 <br \> \
            80386287592878490201521685554828717201219257766954 <br \> \
            78182833757993103614740356856449095527097864797581 <br \> \
            16726320100436897842553539920931837441497806860984 <br \> \
            48403098129077791799088218795327364475675590848030 <br \> \
            87086987551392711854517078544161852424320693150332 <br \> \
            59959406895756536782107074926966537676326235447210 <br \> \
            69793950679652694742597709739166693763042633987085 <br \> \
            41052684708299085211399427365734116182760315001271 <br \> \
            65378607361501080857009149939512557028198746004375 <br \> \
            35829035317434717326932123578154982629742552737307 <br \> \
            94953759765105305946966067683156574377167401875275 <br \> \
            88902802571733229619176668713819931811048770190271 <br \> \
            25267680276078003013678680992525463401061632866526 <br \> \
            36270218540497705585629946580636237993140746255962 <br \> \
            24074486908231174977792365466257246923322810917141 <br \> \
            91430288197103288597806669760892938638285025333403 <br \> \
            34413065578016127815921815005561868836468420090470 <br \> \
            23053081172816430487623791969842487255036638784583 <br \> \
            11487696932154902810424020138335124462181441773470 <br \> \
            63783299490636259666498587618221225225512486764533 <br \> \
            67720186971698544312419572409913959008952310058822 <br \> \
            95548255300263520781532296796249481641953868218774 <br \> \
            76085327132285723110424803456124867697064507995236 <br \> \
            37774242535411291684276865538926205024910326572967 <br \> \
            23701913275725675285653248258265463092207058596522 <br \> \
            29798860272258331913126375147341994889534765745501 <br \> \
            18495701454879288984856827726077713721403798879715 <br \> \
            41698116222072977186158236678424689157993532961922 <br \> \
            62467957194401269043877107275048102390895523597457 <br \> \
            22918802058777319719839450180888072429661980811197 <br \> \
            77158542502016545090413245809786882778948721859617 <br \> \
            72107838435069186155435662884062257473692284509516 <br \> \
            20849603980134001723930671666823555245252804609722 <br \> \
            53503534226472524250874054075591789781264330331690 <br \> \
            </p> \
            <p>A különböző rendszerek teszteléséhez szükségünk van véletlenszerű bankszámlaszámokra (pénzforgalmi jelzőszám), amelyeknek azonban nem kell szabályosnak lenniük. Mivel a számítógépek csak pszeudo-véletlengenerátort tartalmaznak, egy kicsit javítottunk ezen. Minden esetben generálunk egy 50 x 50-es számmátrixot, amelyet spirálisan bejárunk, majd leírjuk a számokat. Az így kapott számsorhoz választunk egy megfelelő kezdési pontot (79. pozíció), s ezt, majd utána minden 103. karakterét kiolvasva megkapjuk a számlaszámot. A számsor indexelését 0-tól kezdjük. A fenti mátrixhoz melyik számlaszám tartozik, ha a mátrixot a bal felső sarokból indítva, jobbra kezdünk el? </p> \
            <p>Itt egy 3x4-es példa a bejárásra:</p> \
            <p> \
                1 2 3 4 <br \>\
                5 6 7 8 <br \>\
                9 0 1 2 <br \>\
            </p> \
            <p>1, 2, 3, 4, 8, 2, 1, 0, 9, 5, 6, 7</p>'
        }, {
            index: 7,
            title: 'Rajzolás',
            desc: '<p>Az alábbi ábrák közül mennyit lehet lerajzolni egy vonallal a ceruza felemelése nélkül?</p> \
            <div class="img-grid"> \
                <img src="./src/img/tasks/task-7-img-1.png"></img> \
                <img src="./src/img/tasks/task-7-img-2.png"></img> \
                <img src="./src/img/tasks/task-7-img-3.png"></img> \
                <img src="./src/img/tasks/task-7-img-4.png"></img> \
            </div>'
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