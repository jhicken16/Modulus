import EventEmitter from "/static/js/three/imports/EventEmitter.js";
import {Clock} from "/static/js/three/imports/three.module.js"

export default class Time extends EventEmitter
{
    constructor()
    {
        super()
        this.clock = new Clock()
        this.elapsedTime = 0
        this.lastFrame = 0
        this.delta = 0.016

        //request animation again before tick function so it waits one extra frame before starting. 
        //To stop deltatime being set to 0.
        window.requestAnimationFrame(() =>
        {
            this.tick()
        })
    }

    tick()
    {
        this.elapsedTime = this.clock.getElapsedTime()
        this.delta = this.elapsedTime - this.lastFrame
        this.lastFrame = this.elapsedTime

        this.trigger('tick')

        window.requestAnimationFrame(() =>
        {
            this.tick()
        })
    }
}