import * as THREE from "/static/js/three/imports/three.module.js"
import { PointerLockControls } from "/static/js/three/imports/PointerLockControls.js"
import Game from "/static/js/three/Game.js"
import Controls from "/static/js/three/Controls.js"

export default class Camera
{
    constructor()
    {
        this.direction = new THREE.Vector3();
        this.velocity = new THREE.Vector3()

        this.game = new Game()
        this.sizes = this.game.sizes
        this.scene = this.game.scene
        this.canvas = this.game.canvas
        this.controls = new Controls()
        
        this.setinstance()
        this.setControls()
        
    }

    setControls()
    {
        this.pointerLock = new PointerLockControls(this.instance, this.game.canvas)
        this.pointerLock.poiterSpeed = 0.5
        // event listener to listen for mouse lock.
        var blocker = document.getElementById('blocker')
        var start = document.getElementById('play')
        start.addEventListener('click', () =>
        {
            this.pointerLock.lock()
            this.pointerLock.islocked = true
            blocker.style.display = "none"
        })
        this.pointerLock.addEventListener('unlock', () =>
        {
            this.pointerLock.unlock()
            this.pointerLock.islocked = false
            blocker.style.display = "block"
        })
    }

    setinstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        
        this.instance.position.z = 3
        this.scene.add(this.instance)
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()

    }
    update()
    {
        

        if (this.pointerLock.islocked === true)
        {
            this.velocity.x -= this.velocity.x * 10.0 * this.game.time.delta
            this.velocity.z -= this.velocity.z * 10.0 * this.game.time.delta
            
            this.velocity.y = 100 * this.game.time.delta
            
            this.direction.z = Number( this.controls.moveForward ) - Number( this.controls.moveBackward );
            this.direction.x = Number( this.controls.moveRight ) - Number( this.controls.moveLeft );

            this.direction.normalize();
            
            if ( this.controls.moveForward || this.controls.moveBackward )
            {
                this.velocity.z -= this.direction.z * 20.0 * this.game.time.delta
            } 
            if ( this.controls.moveLeft || this.controls.moveRight )
            {
                this.velocity.x -= this.direction.x * 20.0 * this.game.time.delta
            } 
            
            if ( this.controls.moveUp === true )
            {
                this.instance.position.y +=  this.velocity.y * this.game.time.delta 
            }
            if( this.controls.moveDown === true)
            {
                this.instance.position.y -=  this.velocity.y * this.game.time.delta 
            }
            
            this.pointerLock.moveRight( - this.velocity.x * this.game.time.delta )
            this.pointerLock.moveForward( - this.velocity.z * this.game.time.delta )
        } 
    }
}
