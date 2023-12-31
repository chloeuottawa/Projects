const pawn = document.getElementById('pawn');
const finish = document.getElementById('finish');
const walls = document.getElementsByClassName('wall');
const totalColumns = 12;


document.addEventListener('keydown',function(e){
    //getting the actual position of the pawn with method returnPostion
    let columnPos = returnPosition("column");
    let rowPos = returnPosition("row");

    switch (e.key){
        case 'ArrowUp':
            // Move pawn up where it will not go above the top row (row 1)
            if (checkWall(pawn,walls,"up")){
                break;
            } else {
                rowPos = Math.max(rowPos - 1, 1);
                break;
            }        
                
        case 'ArrowDown':
            // Move pawn down where it will not go below the last row (row 2)
           if (checkWall(pawn,walls,"down")){
                break;
           } else {
             rowPos = Math.min(rowPos + 1, totalColumns);
            break;
           }
           
        case 'ArrowLeft' :
            // Move pawn left where it will not go further left than column 1
           if (checkWall(pawn,walls,"left")){
            break;
           } else {
            columnPos = Math.max(columnPos - 1, 1);
            break;
           }
        case 'ArrowRight' :
            // Move pawn right where it will not go further right than column 12
            if (checkWall(pawn,walls, "right")){
                break;
            } else {
            columnPos = Math.min(columnPos + 1, totalColumns);
            break;
            }

    }

    pawn.style.gridColumnStart = columnPos;
    pawn.style.gridRowStart = rowPos;

    pawn.style.zIndex = 2;

    //Check for collision with the finish line
    if (checkCollision(pawn, finish)){
        alert('You reached the finish line!');
        // You can perform additional actions here
    }
});

function checkCollision(element1, element2){

    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return !(
        rect1.top > rect2.bottom ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right ||
        rect1.right < rect2.left
    );

}
function checkWall(element1, walls, direction){
    const rect1 = element1.getBoundingClientRect();

    for (let i = 0; i<walls.length; i++){


    const rect2 = walls[i].getBoundingClientRect();

    switch (direction){
        case "up":
           if (rect1.top > rect2.bottom) { return true;}
            break;
        case "down":
            if (rect1.bottom < rect2.top) {return true;}
            break;
        case "left":
            if (rect1.left > rect2.right) {return true;}
            break;
        case "right":
            if (rect1.right < rect2.left) {return true;}
            break;
        default:
            return false;
        
    }
}

}

function returnPosition(element){
    // function that returns column or row position of pawn
    if (element === "column"){
        return parseInt(pawn.style.gridColumn || window.getComputedStyle(pawn).gridColumn, 10);
    } else if (element === "row"){
        return parseInt(pawn.style.gridRow || window.getComputedStyle(pawn).gridRow, 10);

    }
}