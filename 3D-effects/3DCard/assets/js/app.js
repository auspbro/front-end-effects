/**
 * Created by H_VK on 2017/3/13.
 */

window.onload = function () {
    var oBox = document.getElementsByClassName("box")[0],
        span = document.getElementsByTagName("span");
}








//
// function r2n(n){
//     return n*Math.PI/180
// }
// window.onload=function(){
//     var oBox=document.getElementsByClassName('box')[0];
//     var aS=document.getElementsByTagName('span');
//     for(var i=0;i<aS.length;i++){
//         aS[i].style.WebkitTransition='1s all ease '+(aS.length-i)*.1+'s';
//         aS[i].style.WebkitTransform='rotateY('+i*360/aS.length+'deg)'+' translateZ(500px) '
//     }
//     var pos=[];
//     var x=0;
//     var y=0;
//     var timer=null;
//     var timer2=null;
//     document.onmousedown=function(ev){
//         timer=setInterval(function(){
//             pos[0]=pos[2];
//             pos[1]=pos[3];
//             pos[2]=x;
//             pos[3]=y;
//         },30);
//         var disx=ev.pageX-x;
//         var disy=ev.pageY-y;
//         document.onmousemove=function(ev){
//             x=ev.pageX-disx;
//             y=ev.pageY-disy;
//             oBox.style.WebkitTransform=' perspective(800px)'+' rotateY('+x/3+'deg)'+'rotateX('+-y/3+'deg)';
//         };
//         document.onmouseup=function(){
//             clearInterval(timer);
//             var speedx=pos[2]-pos[0];
//             var speedy=pos[3]-pos[1];
//             timer2=setInterval(function(){
//                 x+=speedx;
//                 y+=speedy;
//                 oBox.style.WebkitTransform=' perspective(800px)'+' rotateY('+x/3+'deg)'+'rotateX('+-y/3+'deg)';
//                 speedx*=0.94;
//                 speedy*=0.94;
//                 if(Math.abs(speedx)<1)speedx=0;
//                 if(Math.abs(speedy)<1)speedy=0;
//                 if(speedx==0&&speedy==0){
//                     clearInterval(timer2)
//                 }
//             },30);
//             document.onmousemove=null;
//             document.onmouseup=null;
//         }
//     };
//     return false
// }
