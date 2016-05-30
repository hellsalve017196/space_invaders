'use strict';
// helper functions
function AABBIntersect(ax,ay,aw,ah,bx,by,bw,bh) {
    return ax < bx + bw && bx < ax+aw && ay < by+bh && by < ay+ah;
};


// bullet class
function Bullet(x,y,vely,w,h,color) {
    this.x = x;
    this.y = y;
    this.vely = vely;
    this.width = w;
    this.height = h;
    this.color = color;
}

Bullet.prototype.update = function() {
    this.y += this.vely;
}

// Screen class ( drawing the game screen )
function Screen(width,height) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width = width;
    this.canvas.height = this.height = height;
    this.context = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);
}

Screen.prototype.clear = function() {
    this.context.clearRect(0,0,this.width,this.height);
}

Screen.prototype.drawSprite = function(sp,x,y) {
    this.context.drawImage(sp.img,sp.x,sp.y,sp.w,sp.h,x,y,sp.w,sp.h);
};

Screen.prototype.drawBullet = function(bullet) {
    this.context.fillStyle = bullet.color;
    this.context.fillRect(bullet.x,bullet.y,bullet.width,bullet.height)
}


// Sprite
function Sprite(img,x,y,w,h) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
};


// Input Handler
function InputHandler() {
    this.down = {};
    this.pressed = {};

    var _this = this;

    document.addEventListener("keydown",function(e) {
        _this.down[e.keyCode] = true;
    })


    document.addEventListener("keyup",function(e) {
        delete _this.down[e.keyCode];
        delete _this.pressed[e.keyCode];
    })
};

InputHandler.prototype.isDown = function(code) {
    return this.down[code];
};


InputHandler.prototype.isPressed = function(code) {
    if(this.pressed[code]) {
        return false;
    }
    else if(this.down[code]) {
        return this.pressed[code] = true;
    }
    return false;
};