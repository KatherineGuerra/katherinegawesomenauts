game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings){
           this.setSuper(x, y);
           this.setPlayerTimers();      
           this.setAttributes();
           this.type = "PlayerEntity";
           this.setFlags();
           
           
           //this means that the screen will follow where ever the player goes
           me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
           
           this.addAnimation();
          
           this.renderable.setCurrentAnimation("idle");
    },
    
    setSuper: function(x, y){
         this._super(me.Entity, 'init', [x, y, {
                image: "player",
                /*the width and height are telling the screen the amount of space to preserve*/
                width: 64,
                height: 64,
                /*spritewidth and spriteheight are passing information*/
                spritewidth: "64",
                spriteheight: "64",
                getShape: function(){
                    return(new me.Rect(0,0, 64, 64)).toPolygon();
                }
        }]);
    },
    
    setPlayerTimers: function(){
        this.now = new Date().getTime();
        this.lastHit = this.now;
        this.lastSpear = this.now;
        this.lastAttack = new Date().getTime;//haven't use this
    },
    
    setAttributes: function(){
        this.health = game.data.playerHealth;
        this.body.setVelocity(game.data.playerMoveSpeed, 20);
        this.attack = game.data.playerAttack;
    },
    
    setFlags: function(){
        //keeps track of where your character is going
        this.facing = "right";
        this.dead = false;
        this.attacking = false;
    },
    
    addAnimation: function(){        
        //the animation images 
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
           
    },
    
    update: function(delta) {
        this.now = new Date().getTime();       
        this.dead = this.checkIfDead();       
        this.checkKeyPressesAndMove();
        this.checkAbilityKeys();
        this.setAnimation();
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        //delta is the change of time that happened
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    checkIfDead: function(){
         if(this.health <=0){
            return true;
        }
        return false;
    },
    
    checkKeyPressesAndMove: function(){
        //if this statement is true then it will go right but if its not true then it will try the else statement
          if (me.input.isKeyPressed("right")) {
            this.moveRight();
        } else if(me.input.isKeyPressed("left")){
            this.moveLeft();
        }else {
            this.body.vel.x = 0;
        }
        //if this statement doesnt work then else if statement will tell us if this doesnt work
        if(me.input.isKeyPressed("jump") && !this.jumping && !this.faling){
           this.jump();
        }else if(this.body.vel.y ===0){
            this.jumping = false;
        }
        //this will know to attck when you press the key
        this.attacking = me.input.isKeyPressed("attack");
    },
    
    moveRight: function(){
        //adds to the position of my x by the Velocity defined above in
        //setVelocity() and multiplying it by me.timer.tick
        //me.timer.tick makes the movement looks smooth
        this.body.vel.x += this.body.accel.x * me.timer.tick;
        this.facing = "right";
        this.flipX(true);
    },
    
    moveLeft: function(){
        this.facing = "left";
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        this.flipX(false);
    },
    
    jump: function(){
         this.jumping = true;
         this.body.vel.y -= this.body.accel.y * me.timer.tick;
    },
    
    checkAbilityKeys: function(){
        if(me.input.isKeyPressed("skill1")){
            //this.speedBurst();
        }else if(me.input.isKeyPressed("skill2")){
            //this.eatCreep();
        }else if(me.input.isKeyPressed("skill3")){
            this.throwSpear();
        }
    },
    
    throwSpear: function(){
        if((this.now-this.lastSpear) >= game.data.spearTimer*1000 && game.data.ability3 > 0){
        this.lastSpear = this.now;
        var spear = me.pool.pull("spear", this.pos.x, this.pos.y, {}, this.facing);
        me.game.world.addChild(spear, 10); 
        }
    },
    
    setAnimation: function(){
        if (this.attacking) {
            if (!this.renderable.isCurrentAnimation("attack")) {
                //sets the current animation to attack and once that is over
                //goes back to idle animation
                this.renderable.setCurrentAnimation("attack", "idle");
                //makes it so the next time we start this sequence we begin
                //from the first animation, not wherever we left off when we
                //switched to another animation
                this.renderable.setAnimationFrame();
            }
        }
        else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else if (!this.renderable.isCurrentAnimation("attack")) {
            this.renderable.setCurrentAnimation("idle");
        }
    },
    
    loseHealth: function(damage){
        this.health = this.health - damage;
       
    },
    
    collideHandler: function(response){
        if(response.b.type==='EnemyBaseEntity'){
        this.collideWithEnemyBase(response);
        }else if(response.b.type==='EnemyCreep'){
        this.collideWithEnemyCreep(response);
        }
    },
    
    collideWithEnemyBase: function(response){
        var ydif = this.pos.y - response.b.pos.y;
        var xdif = this.pos.x - response.b.pos.x;

        if (ydif < -40 && xdif < 70 && xdif > -35) {
            this.body.falling = false;
            this.body.vel.y = -1;
        }
        else if (xdif > -35 && this.facing === 'right' && (xdif < 0)) {
            this.body.vel.x = 0;
            // this.pos.x = this.pos.x -1;
        } else if (xdif < 70 && this.facing === 'left' && xdif > 0) {
            this.body.vel.x = 0;
            // this.pos.x = this.pos.x +1;
        }

        if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer) {

            this.lastHit = this.now;
            response.b.loseHealth(game.data.playerAttack);
        }
    },
    
    collideWithEnemyCreep: function(response){
        var xdif = this.pos.x - response.b.pos.x;
        var ydif = this.pos.y - response.b.pos.y;

        this.stopMovement(xdif);
        
        if(this.checkAttack(xdif, ydif)){
         this.hitCreep(response);
        };
    },
    
    stopMovement: function(xdif){
         if (xdif > 0) {
            //  this.pos.x = this.pos.x + 1;
            if (this.facing === "left") {
                this.body.vel.x = 0;
            }
        } else {
            //   this.pos.x = this.pos.x - 1;
            if (this.facing === "right") {
                this.body.vel.x = 0;
            }
        }
    },
    
    checkAttack: function(xdif, ydif){
         if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer
                && (Math.abs(ydif) <= 40) &&
                (((xdif > 0) && this.facing === "left") || ((xdif < 0) && this.facing === "right"))
                ) {
            this.lastHit = this.now;
            return true;
        }
        return false;
    },
    
    hitCreep: function(response){
           //if the creeps health is less than our attack execute code in if statement
            if (response.b.health <= game.data.playerAttack) {
                //adds one gold when creep is killed
                game.data.gold += 1;
            }
            response.b.loseHealth(game.data.playerAttack);
    }
    
});



