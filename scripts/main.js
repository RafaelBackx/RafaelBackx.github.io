let divs = document.querySelectorAll('#competenties-grid>div');
for (let i=0;i<divs.length;i++){
    let div = divs[i];
    div.addEventListener('mouseenter',ColorImages,false);
    div.addEventListener('mouseleave',ChangeColors,false);
}

function ColorImages(e){
    let images = Array.from(e.target.querySelectorAll('img'));
    images.forEach(element => element.src = element.src.replace("-icon",'-icon-colored'))
}

function ChangeColors(e){
    let images = Array.from(e.target.querySelectorAll('img'));
    images.forEach(element => element.src = element.src.replace("-icon-colored",'-icon'))
}