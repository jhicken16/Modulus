
export default class Controls
{
    constructor()
    {
        this.moveForward = false
        this.moveLeft = false
        this.moveBackward = false
        this.moveRight = false
        this.moveUp = false
        this.moveDown = false

        this.onKeyDown()
        this.onKeyUp()
    }

    onKeyUp()
    {
        document.addEventListener( 'keyup', (event) =>
        {
           switch ( event.code ) 
           {

                case 'ArrowUp':
                case 'KeyW':
                    this.moveForward = false;
                    break;
        
                case 'ArrowLeft':
                case 'KeyA':
                    this.moveLeft = false;
                    break;
        
                case 'ArrowDown':
                case 'KeyS':
                    this.moveBackward = false;
                    break;
        
                case 'ArrowRight':
                case 'KeyD':
                    this.moveRight = false;
                    break;
                    
                case 'Space':
                    this.moveUp = false;
                    break;
        
                case 'ShiftLeft':
                    this.moveDown = false;
                    break;
    
            }  
        })
       
    }

    onKeyDown() 
    {    
        document.addEventListener( 'keydown', (event) =>
        {
            switch ( event.code ) 
            {
                case 'ArrowUp':
                case 'KeyW':
                    this.moveForward = true;
                    
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    this.moveLeft = true;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    this.moveBackward = true;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    this.moveRight = true;
                    break;

                case 'Space':
                    this.moveUp = true;
                    break;

                case 'ShiftLeft':
                    this.moveDown = true;
                    break;
            }

        })
    } 
       
}

