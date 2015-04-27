game.MiniMap = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, "init", [x, y, {
                image: "minimap",
                width: 282,
                height: 157,
                spritewidth: "282",
                spriteheight: "157",
                getShape: function(){
                    return (new me.Rect(0, 0, 282, 157)).toPolygon();
                }
        }]);
        this.floating = true;
    }
});
