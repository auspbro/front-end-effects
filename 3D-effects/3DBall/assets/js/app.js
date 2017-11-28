// JS is optional for changing the rotation manually
// Use arrow keys & A, D to rotate

var pitch = 90, 
    yaw = 0,
    roll = 0,
    n = 3;

setInterval(movePlane, 50);
var keys = {};

$(document).keydown(function(e) {
    keys[e.keyCode] = true;
});

$(document).keyup(function(e) {
    delete keys[e.keyCode];
});

function movePlane() {
	
   for (var direction in keys) {
	   if (!keys.hasOwnProperty(direction)) continue;
	   
               $("#plans").removeClass("spin3D");
         
		   if (direction == 68) { // yaw right
			   yaw -= n;
		   }
		   if (direction == 65) { // yaw left
			   yaw += n;         
		   }
		   if (direction == 40) { // pitch down
			   pitch -= n;          
		   }
		   if (direction == 38) { // pitch up
			   pitch += n; 
		   }
		   if (direction == 39) { // roll right
			   roll -= n;          
		   }
		   if (direction == 37) { // roll left
			   roll += n; 
		   }
	   
		   document.querySelector('#plans').style.transform = 
                  'rotateX(' + pitch + 'deg)'+
                  'rotateY(' + yaw + 'deg)'+
                  'rotateZ(' + roll + 'deg)';
       
	    }

}
