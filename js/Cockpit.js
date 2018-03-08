//gloabal variables
var movecontainerbackward=false;
var lastScrollTop = 0;
var scrollsenstivity=0.1; //scroll senstivity
var scrolldelta,endReached=false;
var temp=scrollsenstivity;
// main manager
$(window).scroll(function (event) {
     if(!endReached)
     {
          infScroll();
     }
     scrolldelta=scrollDir();
     if(movecontainerbackward)
          moveContainer(scrolldelta);

     markThe(event);

});

// for moving frame containers
function moveContainer(delta)
{
     //alert(sign);

     var movinfactor=delta*scrollsenstivity;
     var orgx=parseInt(document.getElementById("mymain_container").style.left);
     if(orgx<=20)
          document.getElementById("mymain_container").style.left=(orgx-movinfactor)+"px";
     else
          document.getElementById("mymain_container").style.left=20+"px";
     // if(orgx<=minX)
     // {
     //      //endReached=true;
     //      //document.getElementById("dummy").style.top= ($(window).scrollTop() + parseInt(window.innerHeight)) +"px";
     // }

}

// for availing never ending scroll
function infScroll()
{
     //alert($(window).scrollTop()+" "+parseInt(window.innerHeight));
     var x= $(window).scrollTop() + parseInt(window.innerHeight) + 300;
     document.getElementById("dummy").style.top= x +"px";
}

//determine scroll sign

function scrollDir()
{
     var org = $(window).scrollTop();
     var temp= lastScrollTop;
     lastScrollTop=org;
     return (org-temp);//return +1:downscroll |return -1:upscroll
}

//scroll back to top on refresh
$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});

//resize event
// function resize() {
//     width = window.innerWidth;
//     c.height = window.innerHeight;
//     w = c.width / count;
// }window.addEventListener("resize", resize);
