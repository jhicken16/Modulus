import * as THREE from "/static/js/three/imports/three.module.js"

import Sizes from "/static/js/three/utilities/Sizes.js"
import Time from "/static/js/three/utilities/Time.js"
import Camera from "/static/js/three/Camera.js"
import Renderer from "/static/js/three/Renderer.js"
import World from "/static/js/three/world/World.js"
import Raycaster from "/static/js/three/Raycaster.js"
import ScreenShot from "/static/js/three/ScreenShot.js"
import Send from "/static/js/three/Send.js"

let instance = null

export default class Game
{

    constructor(canvas, container)
    {
        if(instance)
        {
            return instance
        }
        instance = this

        //options
        this.canvas = canvas

        //setup
        this.sizes = new Sizes(container) 
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.raycaster = new Raycaster()
        this.world = new World()
        this.renderer = new Renderer()
        this.screenShot = new ScreenShot()
        this.send = new Send()

        //resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })

    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {   
        this.camera.update()
        this.raycaster.update()
        this.renderer.update()
    }
}

