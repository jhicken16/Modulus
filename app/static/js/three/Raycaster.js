import * as THREE from "/static/js/three/imports/three.module.js"
import Game from "/static/js/three/Game.js"

export default class Raycaster
{
    constructor()
    {
        this.game = new Game()
        this.camera =  this.game.camera.instance

        this.cameraPoint = new THREE.Vector3()
        this.cameraDirection = null
        
        this.setinstance()
        
    }
    setinstance()
    {
        this.instance = new THREE.Raycaster()
    }
    update()
    {
        //update raycaster possition
        this.cameraDirection = this.camera.getWorldDirection(this.cameraPoint)
        this.instance.set(this.camera.position, this.cameraDirection.normalize())
               
    }
}