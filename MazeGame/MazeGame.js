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
            if (!checkWall(pawn,walls,'up')) {
                rowPos = rowPos - 1;
                console.log('new position w/o collision')
            }
            break;        
              //* need to figure out how to move the pawn
        case 'ArrowDown':
            if (!checkWall(pawn,walls,'down')) {
                if (rowPos === 12){
                    console.log('cannot move down because row is 12')
                    break;
                } else {
                    rowPos = rowPos + 1;
                }

            }
            break;
           
        case 'ArrowLeft' :
            if (!checkWall(pawn,walls, 'left')) {
                columnPos = columnPos - 1;
            }
            break;

        case 'ArrowRight' :
            if (!checkWall(pawn,walls,'right')) {
                columnPos = columnPos + 1;
            }
            break;
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
function checkWall(element1, walls, direction) {
    const rowPos = parseInt(element1.style.gridRow || window.getComputedStyle(element1).gridRow, 10)
    const columnPos = parseInt(element1.style.gridColumn || window.getComputedStyle(element1).gridColumn, 10);

    
    for (let i = 0; i < walls.length; i++) {
        const computedStyle = window.getComputedStyle(walls[i]);
        const wallRow = parseInt(computedStyle.gridRow, 10);
        // this gets the wall row and column spots in int 
        const wallColumn = parseInt(computedStyle.gridColumn, 10);

        // check if the 
        switch (direction) {
            case 'up':
                // check if the wall is in the next row above (so row num of the pawn and the wallrow -1)
                if (wallRow === rowPos - 1 && wallColumn === columnPos) {
                    return true; // Collision with wall above
                }
                break;
            case 'down':
                if (wallRow === rowPos + 1 && wallColumn === columnPos) {
                    return true; // Collision with wall below
                }
                break;
            case 'left':
                if (wallRow === rowPos && wallColumn === columnPos - 1) {
                    return true; // Collision with wall to the left
                }
                break;
            case 'right':
                if (wallRow === rowPos && wallColumn === columnPos + 1) {
                    return true; // Collision with wall to the right
                }
                break;
            default:
                return false;
        }
    }

    return false;
}


function returnPosition(element){
    // function that returns column or row position of pawn
    if (element === "column"){
        return parseInt(pawn.style.gridColumn || window.getComputedStyle(pawn).gridColumn, 10);
    } else if (element === "row"){
        return parseInt(pawn.style.gridRow || window.getComputedStyle(pawn).gridRow, 10);

    }
}
