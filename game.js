var app = new Vue({
    el: '#app',
    data: {
     startingGame:false,
     playerHealth:100,
     monsterHealth:100,
     logs:[],
     player:true
    },
    methods: {
        attack:function(){
            var damage =this.calDamage(3,10);
            this.monsterHealth-=damage;
            this.writeLogs(true,damage,'none'); 
            if(this.playerWin()){
               return;
            }
            this.monsterAttack();
        },
        specialAttack:function(){
            var damage =this.calDamage(6,15);
            this.monsterHealth-=damage;
            this.writeLogs(true,damage,'special'); 
            if(this.playerWin()){
                return;
            }
            this.monsterAttack();
        },
        heal: function(){
            if(this.playerHealth > 90){
               this.playerHealth = 100;
            }
            else{
                this.playerHealth+=10;
            }
            this.writeLogs(true,0,'heal');
        },
        giveUp: function(){
            this.startingGame = false;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.logs = []
            return;
        },
        calDamage:function(min,max){
           return (Math.max(Math.floor(Math.random()*max) , min));
        },
        playerWin: function(){
            debugger;
            if(this.playerHealth >0 && this.monsterHealth<0){
                if(confirm('YOU WIN!! start New Game??')){
                    this.startingGame = true;
                    this.playerHealth = 100;
                    this.monsterHealth = 100;
                    this.logs = [];
                    return true;
                }
                this.startingGame = false;
                this.playerHealth = 100;
                this.monsterHealth = 100;
                this.logs=[];
            }
            else if(this.playerHealth <0 && this.monsterHealth>0){
                if(confirm('YOU lose!! start New Game??')){
                    this.startingGame = true;
                    this.playerHealth = 100;
                    this.monsterHealth = 100;
                    this.logs = [];
                    return false;
                }
                this.startingGame = false;
                this.playerHealth = 100;
                    this.monsterHealth = 100;
                this.logs=[];
            }
        },
        monsterAttack:function(){
            damage =this.calDamage(5,12);
            this.playerHealth-=damage;
            this.writeLogs(false , damage , 'none');
            this.playerWin();
        },
        writeLogs:function(player , damage , extra){
            if(!player && extra =='none' ){
                this.logs.unshift({
                    player:false,
                    text:'the monster hit by',
                    damage:damage
                });
            }
            else if(player && extra== 'none'){
                this.logs.unshift({
                    player:true,
                    text:'the player hit by',
                    damage:damage
                });
            }
            else if(player && extra == 'heal'){
                this.logs.unshift({
                    player:true,
                    text:'the player heal by',
                    damage:10
                });
            }
            else if(player && extra== 'special'){
                this.logs.unshift({
                    player:true,
                    text:'the player hard hit by',
                    damage:damage
                });
            }
        }

    }
  })