game.MiniPlayerLocation = me.Entity.extend({
    init: function(x, y, settings){
        this.settings = settings;
        //this is the radius of the circle we draw on our player
        this.r = 5;
        //+2 is to add some width to our radius
        this.diameter = (this.r+2)*2;
        //keeps track of where our circle goes
        this.anchorPoint = new me.Vector2d(0, 0);
        this.loc = x, y;
        //this is to set up our dimension
        this.settings.width = this.diameter;
        this.settings.height = this.diameter;
        this.settings.spritewidth = this.diameter;
        this.settings = this.diameter;
        this.floating = true;
        this.image = me.video.createCanvas(this.settings.width, this.settings.height);
        //we need a context to draw on
        var ctx = me.video.renderer.getContext2d(this.image);
        //allows you to choose a color for your location
        ctx.fillStyle = "rgba(0, 192, 32, 0.75)";
        //stroke is the line that goes around the circle
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        console.log("miniPInit");
        ctx.arc(this.r + 2, this.r + 2, this.r, 0, Math.PI*2);
        ctx.fill();
        ctx.stroke();
        //allows you to have access to the scope of our class
        var my = this;
        this._super(me.Entity, "init", [x, y, {
                width: 14,
                height: 14,
                spritewidth: 14,
                spriteheight: 14,
                getShape: function (){
                    return(new me.Rect(0, 0, 14, 14)).toPolygon();
                }
        }]);
    },
    //we're using a draw function like from our other project snake
    //the parenthese in a function is the parameter
    draw: function(renderer) {
        this._super(me.Entity, "draw", (renderer));
        this.floating = true;
        renderer.drawImage(
                this.image,
                0, 0, this.width, this.height,
                this.pos.x, this.pos.y, this.width, this.height          
                );
    },
    update: function(){
        console.log(this.pos.x + " " + this.pos.y);
        //the mini map starts on the 10 value
        this.pos.x = (10 + (game.data.player.pos.x * 0.25));
        this.pos.y = (10 + (game.data.player.pos.y * 0.25));
    }
});
