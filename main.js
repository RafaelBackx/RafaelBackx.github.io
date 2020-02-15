let javaIcon = document.getElementById("java");
let htmlIcon = document.getElementById("html");
let divs = document.querySelectorAll('#competenties-grid div');
for (let i=0;i<divs.length;i++){
    let div = divs[i];
    div.addEventListener('mouseenter',ColorImage,false);
    div.addEventListener('mouseleave',ChangeColor,false);
}

function ColorImage(e){
    e.target.childNodes[0].src = 'images/'+e.target.id + '-icon-colored.png';
    console.log(e.target.id + '-icon-colored.png');
}

function ChangeColor(e){
    e.target.childNodes[0].src = 'images/'+e.target.id + '-icon.png';
    console.log(e.target.id + '-icon.png');
}