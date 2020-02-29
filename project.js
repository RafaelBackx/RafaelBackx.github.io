// let projectImages = document.querySelectorAll(".project img");
// console.log(projectImages);
// for (let i = 0; i<projectImages.length;i++){
//     projectImages[i].addEventListener('mousemove',onImgHover,false);
//     projectImages[i].addEventListener('mouseleave',onImgLeave,false);
// }

// function onImgHover(e){
//     let text = e.target.parentNode.querySelectorAll('h1,p');
//     for (let i=0;i<text.length;i++){
//     text[i].style.display = 'block';
//     }
// }

// function onImgLeave(e){
//     let text = e.target.parentNode.querySelectorAll('h1,p');
//     for (let i = 0;i<text.length;i++){
//         text[i].style.display = 'none';
//     }
// }

let projects = document.querySelectorAll('.project');
console.log(projects);

for (let i =0;i<projects.length;i++){
    projects[i].addEventListener('mouseenter',onProjectHover,false);
    projects[i].addEventListener('mouseleave',onProjectLeave,false);
}

function onProjectHover(e){
    let children = Array.from(e.target.children);
    let images = children.filter(element => element.src != undefined)
    let text = children.filter(element => element.src == undefined)
    for (let i=0;i<images.length;i++){
        images[i].style.filter = 'blur(5px)';
    }
    console.log(text);
    for (let i=0;i<text.length;i++){
        console.log(text[i].style.display);
        text[i].style.display = 'block';
    }
}

function onProjectLeave(e){
    let children = Array.from(e.target.children);
    let images = children.filter(element => element.src != undefined)
    let text = children.filter(element => element.src == undefined)
    for (let i=0;i<images.length;i++){
        images[i].style.filter = '';
    }
    console.log(text);
    for (let i=0;i<text.length;i++){
        console.log(text[i].style.display);
        text[i].style.display = 'none';
    }
}

