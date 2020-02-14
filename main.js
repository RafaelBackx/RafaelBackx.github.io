let javaIcon = document.getElementById("java");
let htmlIcon = document.getElementById("html");
javaIcon.addEventListener('mouseenter',ColorImage,false);
javaIcon.addEventListener('mouseleave',ChangeColor,false);
htmlIcon.addEventListener('mouseenter',ColorImage,false);
htmlIcon.addEventListener('mouseleave',ChangeColor,false);

function ColorImage(e){
    console.log(e);
    e.target.childNodes[0].src = 'images/'+e.target.id + '-icon-colored.png';
    console.log(e.target.id + '-icon-colored.png');
}

function ChangeColor(e){
    console.log(e);
    e.target.childNodes[0].src = 'images/'+e.target.id + '-icon.png';
    console.log(e.target.id + '-icon.png');
}