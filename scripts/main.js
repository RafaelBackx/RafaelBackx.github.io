let divs = document.querySelectorAll('#competenties-grid div');
let images =[];
let colorIntervalId = 0;
let changeIntervalId = 0;
let id = 0;
for (let i=0;i<divs.length;i++){
    let div = divs[i];
    div.addEventListener('mouseenter',ColorImages,false);
    div.addEventListener('mouseleave',ChangeColors,false);
}

function ColorImages(e){
    clearImages();
    setImages(e.target.children)
    colorIntervalId = setInterval(colorImage,70);
}

function colorImage(){
    if (images.length>0){
        let imagesrc = images[0].src;
        imagesrc = imagesrc.replace("-icon",'-icon-colored')
        let child = images[0];
        child.src = imagesrc;
        images.splice(0,1);
    }else{
        clearImages();
        clearInterval(colorIntervalId);
        colorIntervalId = 0;
    }
}

function ChangeColors(e){
    clearImages();
    setImages(e.target.children)
    while(images.length>0){
        changeColor();
    }
    //changeIntervalId = setInterval(changeColor,50);
}

function changeColor(){
    if (images.length>0){
        let imagesrc = images[images.length-1].src;
        let child = images[images.length-1];
        imagesrc = imagesrc.replace('-icon-colored','-icon');
        child.src = imagesrc;
        images.splice(images.length-1,1);
    }else{
        clearImages();
        clearInterval(changeIntervalId);
        changeIntervalId = 0;
    }
}

function setImages(children){
    for (let i=0;i<children.length;i++){
        if (children[i].src != undefined){
            images.push(children[i]);
        }
    }
}

function clearImages(){
    while (images.length>0){
        changeColor();
    }
}