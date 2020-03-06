let projects = document.querySelectorAll('.project');

for (let i =0;i<projects.length;i++){
    projects[i].addEventListener('mouseenter',onProjectHover,false);
    projects[i].addEventListener('mouseleave',onProjectLeave,false);
}

function onProjectHover(e){
    let children = Array.from(e.target.children);
    let images = children.filter(element => element.src != undefined)
    let text = children.filter(element => element.src == undefined)
    if (images.length > 0){
        for (let i=0;i<images.length;i++){
            images[i].style.filter = 'blur(5px)';
        }
        for (let i=0;i<text.length;i++){
            text[i].style.display = 'block';
        }
    }   
}

function onProjectLeave(e){
    let children = Array.from(e.target.children);
    let images = children.filter(element => element.src != undefined)
    let text = children.filter(element => element.src == undefined && element.tagName != "DIV")
    if (images.length > 0){
        for (let i=0;i<images.length;i++){
            images[i].style.filter = '';
        }
        for (let i=0;i<text.length;i++){
            text[i].style.display = 'none';
        }
    }
}

