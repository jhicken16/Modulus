import Game from "/static/js/three/Game.js"
import * as THREE from "/static/js/three/imports/three.module.js"
import { createBox } from "/static/js/three/world/Building.js"

let objName = 1

export default class World
{
    constructor()
    {
        this.game = new Game()
        this.scene = this.game.scene
        this.canvas = this.game.canvas
        this.ray = this.game.raycaster.instance
        this.camera = this.game.camera
        
        this.intersects = null
        this.objectArray = []
        this.v3Array = []

        this.geometry = new THREE.BoxGeometry(1, 1, 1)
        this.material = new THREE.MeshBasicMaterial({color: "grey", wireframe: true})
        const cube = new THREE.Mesh(this.geometry, this.material)
        cube.name = "original"

        this.scene.add(cube)
        this.objectArray.push(cube)
        this.v3Array.push(cube.position)

        let element = document.getElementById("data")
        let data = element.getAttribute("data")
        if(data)
        {
            var blockLocations = JSON.parse(data)
            this.editModel(blockLocations)
        }

        this.placeBox()
        this.removeBox() 
    }

    placeBox()
    { 
        this.canvas.addEventListener('click', () =>
        {
            if(this.camera.pointerLock.isLocked == true)
            {
                let intersects = this.ray.intersectObjects(this.objectArray)
                let meshPlacedPosition = createBox(intersects)

                let mesh = new THREE.Mesh(this.geometry, this.material)
                mesh.position.set(meshPlacedPosition.x, meshPlacedPosition.y, meshPlacedPosition.z)
                mesh.name = objName
                this.scene.add(mesh)
                
                this.objectArray.push(mesh)
                this.v3Array.push(mesh.position)
                objName++
            } 
        })
    }

    removeBox()
    {
        document.addEventListener('keydown', (event) =>
        {
            if(this.camera.pointerLock.isLocked == true)
            {
                let intersects = this.ray.intersectObjects(this.objectArray)
                if (intersects.length != 0 && event.key === 'Backspace')
                {
                    if(intersects[0].object.name != "original")
                    {
                        let tempobj = this.objectArray[this.objectArray.length - 1]
                        let tempV3 = this.v3Array[this.v3Array.length - 1]

                        tempobj.name = intersects[0].object.name
                        this.objectArray[tempobj.name] = tempobj
                        this.v3Array[tempobj.name] = tempV3
                        this.objectArray.pop()
                        this.v3Array.pop()
                        this.scene.remove(intersects[0].object)
                        objName--
                    }
                }
            }
        })
    }

    editModel(modelPositions)
    {
        for(var position of modelPositions)
        {
            
            if(position.x == 0 && position.y == 0 && position.z == 0)
            {
                continue
               
            }
            else
            {
                let mesh = new THREE.Mesh(this.geometry, this.material)
                mesh.position.set(position.x, position.y, position.z)
                this.scene.add(mesh)
                this.objectArray.push(mesh)
                this.v3Array.push(mesh.position)
                objName++
            }
            
        }
    }

}