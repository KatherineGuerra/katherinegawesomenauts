game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings){
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
    
           this.body.setVelocity(5, 20);
           //keeps track of where your character is going
           this.facing = "right";
           //this means that the screen will follow where ever the player goes
           me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
           
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
           
           this.renderable.setCurrentAnimation("idle");
    },
    
    update: function(delta) {
        if (me.input.isKeyPressed("right")) {
            //adds to the position of my x by the Velocity defined above in
            //setVelocity() and multiplying it by me.timer.tick
            //me.timer.tick makes the movement looks smooth
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.facing = "right";
            this.flipX(true);
        } else if(me.input.isKeyPressed("left")){
            this.facing = "left";
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            this.flipX(false);
        }else {
            this.body.vel.x = 0;
        }
        
        if(me.input.isKeyPressed("jump") && !this.jumping && !this.faling){
            this.jumping = true;
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        }
        

        if(me.input.isKeyPressed("attack")){
           
            if(!this.renderable.isCurrentAnimation("attack")){
                //sets the current animation to attack and once that is over
                //goes back to idle animation
                this.renderable.setCurrentAnimation("attack", "idle");
                //makes it so the next time we start this sequence we begin
                //from the first animation, not wherever we left off when we
                //switched to another animation
                this.renderable.setAnimationFrame();
            }
        }
       else if (this.body.vel.x !== 0) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else {
            this.renderable.setCurrentAnimation("idle");
        }

        if(me.input.isKeyPressed("attack")){
           
            if(!this.renderable.isCurrentAnimation("attack")){
                //sets the current animation to attack and once that is over
                //goes back to idle animation
                this.renderable.setCurrentAnimation("attack", "idle");
                //makes it so the next time we start this sequence we begin
                //from the first animation, not wherever we left off when we
                //switched to another animation
                this.renderable.setAnimationFrame();
            }
        }
        
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        //delta is the change of time that happened
        this.body.update(delta);

   
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    collideHandler: function(response){
        if(response.b.type==='EnemyBaseEntity'){
           var ydif = this.pos.y - response 
        }
    }
    
});

game.PlayerBaseEntity = me.Entity.extend({
    init : function(x, y, settings){
         this._super(me.Entity, 'init', [x, y, {
              image: "tower",
              width: 100,
              height: 100,
              spritewidth: "100",
              spriteheight: "100",
              getShape: function(){
                  return (new me.Rect(0, 0, 100, 70)).toPolygon();
              }
        }]);
    
        this.broken = false;
        this.health = 10;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        
        this.type = "PlayerBaseEntity";
        
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
    },
    update: function(delta){
        if(this.health<=0){
            this.broken = true;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    onCollision: function(){
        
    }
});
game.EnemyBaseEntity = me.Entity.extend({
    init : function(x, y, settings){
         this._super(me.Entity, 'init', [x, y, {
              image: "tower",
              width: 100,
              height: 100,
              spritewidth: "100",
              spriteheight: "100",
              getShape: function(){
                  return (new me.Rect(0, 0, 100, 70)).toPolygon();
              }
        }]);
    
        this.broken = false;
        this.health = 10;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        
        this.type = "EnemyBaseEntity";
        
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
    },
    update: function(delta){
        if(this.health<=0){
            this.broken = true;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    onCollision: function(){
        
    }
});