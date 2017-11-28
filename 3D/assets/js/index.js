var Orbit {
    constructor(target, dumping=10, from={ x: 0, y: 0 }, to={ x: 0, y: 0 }) {
        this.__target = target
        this.dumping = dumping;
        this.desire_rotateZ = -to.y;
        this.desire_rotateX = -to.x;
        this.rz = from.y;
        this.rx = from.x;
        this.isDragging = false;
        this.previousMousePosition = {
            x: 0,
            y: 0
        };
        this.behaviours();
    }

    behaviours(){
        $(document).on("mousedown", this.handleDown.bind(this))
        $(document).on("mouseup",   this.handleUp.bind(this))
        $(document).on("mousemove", this.handleMove.bind(this))
        window.requestAnimationFrame(this.update.bind(this));
    }

    handleDown(e){
        this.isDragging = true;
        if( !this.firstDrag ){
            this.previousMousePosition = {
                x: e.pageX,
                y: e.pageY
            }
            this.firstDrag = true;
        }
    }

    handleUp(e){
        this.isDragging = false;
    }

    handleMove(e){
        var deltaMove = {
            x: e.pageX-this.previousMousePosition.x,
            y: e.pageY-this.previousMousePosition.y
        };

        if(this.isDragging){
            this.desire_rotateZ += deltaMove.x;
            this.desire_rotateX += deltaMove.y;
        }

        this.previousMousePosition = {
            x: e.pageX,
            y: e.pageY
        };
    }

    rotation(x, y){
        this.desire_rotateZ = x;
        this.desire_rotateX = y;
    }

    update(){
        this.rz += (( (this.desire_rotateZ*-1) - this.rz) / this.dumping);
        this.rx += (( (this.desire_rotateX*-1) - this.rx) / this.dumping);
        this.__target.css({
            "transform": "translateZ(-300px) rotateX("+this.rx+"deg) rotateZ("+this.rz+"deg)"
        })
        window.requestAnimationFrame(this.update.bind(this));
    }
}

var orbit1 = new Orbit( $("#plane1"), 40, { x: 0,  y: 0 }, { x: 40, y: 30 } )

function animate(){
    $(".item").removeClass("animate")
    setTimeout(function(){
        $(".item").addClass("animate")
    }, 250)
    setTimeout(animate, 6000);
}

animate()