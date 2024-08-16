import {Vector3} from "/static/js/three/imports/three.module.js"

function createBox(intersects) 
{
    let face = Math.floor(intersects[0].faceIndex / 2 )
    let vector = new Vector3()
    
    vector.x = intersects[0].object.position.x
    vector.y = intersects[0].object.position.y
    vector.z = intersects[0].object.position.z 
    
    switch ( face )
    {
        case 0:
            vector.x += 1
            return vector
        case 1:
            vector.x -= 1
            return vector
        case 2:
            vector.y += 1
            return vector
        case 3:
            vector.y -= 1
            return vector
        case 4: 
            vector.z += 1
            return vector
        case 5: 
            vector.z -= 1
            return vector
    }
}

export{ createBox }
