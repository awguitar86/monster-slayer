new Vue({
    el: '#app',
    data: {
        loadingGame: true,
        startGame: false,
        gameOver: false,
        turn: true,
        youHealth: 100,
        monsterHealth: 100,
        youPowerStatus: true,
        monsterPowerStatus: true,
        youPower: 0,
        monsterPower: 0,
        youStyles: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "green",
            margin: 0,
            color: "white",
            width: "100%",
        },
        monsterStyles: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "green",
            margin: 0,
            color: "white",
            width: "100%",
        },
        youPowerStyles: {
            background: "#197BBD",
            margin: 0,
            width: "0%"
        },
        monsterPowerStyles: {
            background: "#197BBD",
            margin: 0,
            width: "0%"
        },
        youLose: {
            background: "#eee"
        },
        monsterLose: {
            background: "#eee"
        },
        hits: [],
        swapiChar: ''
    },
    created() {
        console.log('created');
        axios.get("https://swapi.co/api/people")
        .then(res => {
            this.swapiChar = res.data.results[Math.floor(Math.random()*10)].name;
            console.log(this.swapiChar);
            this.loadingGame = false;
        })
        .catch( err => {throw err});
    },
    methods: {
        startNewGame(){
            this.startGame = true;
            this.turn = true;
            this.youStyles.width = "100%";
            this.youHealth = 100;
            this.monsterStyles.width = "100%";
            this.monsterHealth = 100;
            this.youPower = 0
            this.youPowerStyles.width = "0%";
            this.monsterPower = 0
            this.monsterPowerStyles.width = "0%";
            this.gameOver = false;
            this.youPowerStatus = true;
            this.monsterPowerStatus = true;
            this.hits = [];
        },
        damage(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        attack() {
            if(this.turn){
                let damage = this.damage(1, 6);
                let attackPower = this.youPower >= 100 ? 100 : this.youPower += 10;
                let monsterWidth = this.monsterHealth -= damage;
                this.monsterStyles.width = `${monsterWidth}%`;
                this.youPowerStyles.width = `${attackPower}%`;
                this.youPower >= 100 ? this.youPowerStatus = false : this.youPowerStatus = true;
                this.turn = false;
                this.hits.push(`You hit ${this.swapiChar} for ${damage}. You gain 10 power.`);
            }
            else {
                let damage = this.damage(1, 6);
                let attackPower = this.monsterPower >= 100 ? 100 : this.monsterPower += 10;
                let youWidth = this.youHealth -= damage;
                this.youStyles.width = `${youWidth}%`;
                this.monsterPowerStyles.width = `${attackPower}%`;
                this.monsterPower >= 100 ? this.monsterPowerStatus = false : this.monsterPowerStatus = true;
                this.turn = true;
                this.hits.push(`${this.swapiChar} hit You for ${damage}. ${this.swapiChar} gains 10 power.`);
            }
        },
        specialAttack() {
            if (this.turn) {
                let damage = this.damage(7, 12);
                let attackPower = this.youPower >= 100 ? 100 : this.youPower += 20;
                let monsterWidth = this.monsterHealth -= damage;
                this.monsterStyles.width = `${monsterWidth}%`;
                this.youPowerStyles.width = `${attackPower}%`;
                this.youPower >= 100 ? this.youPowerStatus = false : this.youPowerStatus = true;
                this.turn = false;
                this.hits.push(`You hit ${this.swapiChar} for ${damage}. You gain 20 power.`);
            }
            else {
                let damage = this.damage(7, 12);
                let attackPower = this.monsterPower >= 100 ? 100 : this.monsterPower += 20;
                let youWidth = this.youHealth -= damage;
                this.youStyles.width = `${youWidth}%`;
                this.monsterPowerStyles.width = `${attackPower}%`;
                this.monsterPower >= 100 ? this.monsterPowerStatus = false : this.monsterPowerStatus = true;
                this.turn = true;
                this.hits.push(`${this.swapiChar} hit You for ${damage}. ${this.swapiChar} gains 20 power.`);
            }
        },
        block() {
            if(this.turn){
                let youWidth = this.youHealth += 5;
                this.youStyles.width = `${youWidth}%`;
                this.youPower >= 100 ? this.youPowerStatus = false : this.youPowerStatus = true;
                this.turn = false;
                this.hits.push(`You block ${this.swapiChar} and gain 5 health.`);
            }
            else {
                let monsterWidth = this.monsterHealth += 5;
                this.monsterStyles.width = `${monsterWidth}%`;
                this.monsterPower >= 100 ? this.monsterPowerStatus = false : this.monsterPowerStatus = true;
                this.turn = true;
                this.hits.push(`${this.swapiChar} blocks You and gains 5 health.`);
            }
        },
        heal() {
            if(this.turn){
                let attackPower = this.youPower -= 5;
                let youWidth = this.youHealth += 5;
                this.youStyles.width = `${youWidth}%`;
                this.youPowerStyles.width = `${attackPower}%`;
                this.youPower >= 100 ? this.youPowerStatus = false : this.youPowerStatus = true;
                this.turn = false;
                this.hits.push(`You heal and gain 5 health, but lose 5 power.`);
            }
            else {
                let attackPower = this.monsterPower -= 5;
                let monsterWidth = this.monsterHealth += 5;
                this.monsterStyles.width = `${monsterWidth}%`;
                this.monsterPowerStyles.width = `${attackPower}%`;
                this.monsterPower >= 100 ? this.monsterPowerStatus = false : this.monsterPowerStatus = true;
                this.turn = true;
                this.hits.push(`${this.swapiChar} heals and gains 5 health, but loses 5 power.`);
            }
        },
        obliterate() {
            if(this.turn) {
                this.monsterStyles.width = "0%";
                this.monsterHealth = 0;
                this.monsterPower = 0;
                this.monsterPowerStyles.width = "0%";
            }
            else {
                this.youStyles.width = "0%";
                this.youHealth = 0;
                this.youPower = 0;
                this.youPowerStyles.width = "0%";
            }
        },
        giveUp() {
            if(this.turn) {
                this.youStyles.width = "0%";
                this.youHealth = 0;
                this.youPower = 0
                this.youPowerStyles.width = "0%";
            }
            else {
                this.monsterStyles.width = "0%";
                this.monsterHealth = 0;
                this.monsterPower = 0
                this.monsterPowerStyles.width = "0%";
            }
        }
    },
    watch: {
        youHealth() {
            if(this.youHealth <= 0){
                this.youLose.background = "red";
                this.gameOver = true;
            }
            else {
                this.youLose.background = "#eee";
            }
        },
        monsterHealth() {
            if(this.monsterHealth <= 0) {
                this.monsterLose.background = "red";
                this.gameOver = true;
            }
            else {
                this.monsterLose.background = "#eee";
            }
        }
    }
});