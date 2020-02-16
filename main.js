let javaIcon = document.getElementById("java");
let htmlIcon = document.getElementById("html");
let divs = document.querySelectorAll('#competenties-grid div');
let images =[];
let colorIntervalId;
let changeIntervalId;
for (let i=0;i<divs.length;i++){
    let div = divs[i];
    console.log(div);
    div.addEventListener('mouseenter',ColorImages,false);
    div.addEventListener('mouseleave',ChangeColors,false);
}

function ColorImages(e){
    clearImages();
    setImages(e.target.children)
    colorIntervalId = setInterval(colorImage,70);
}

function colorImage(){
    console.log(images.length);
    if (images.length>0){
        let imagesrc = images[0].src;
        let child = images[0];
        console.log(child);
        let src = imagesrc.split('-icon');
        child.src = src[0] + '-icon-colored' + src[1];
        images.splice(0,1);
        console.log(images.length);
    }else{
        clearImages();
        clearInterval(colorIntervalId);
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
        let src = imagesrc.split('-icon-colored');
        child.src = src[0] + '-icon' + src[1];
        images.splice(images.length-1,1);
    }else{
        clearImages();
        clearInterval(changeIntervalId);
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
    images = [];
}