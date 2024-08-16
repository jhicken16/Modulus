import EventEmitter from "/static/js/three/imports/EventEmitter.js"

export default class Sizes extends EventEmitter
{
    constructor(container)
    {
        super()
        this.computedStyle = getComputedStyle(container)

        this.width = container.clientWidth
        this.width -= parseFloat(this.computedStyle.paddingLeft) + parseFloat(this.computedStyle.paddingRight)
        this.height = this.width * 0.7
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        window.addEventListener('resize', () =>
        {
            this.width = container.clientWidth
            this.width -= parseFloat(this.computedStyle.paddingLeft) + parseFloat(this.computedStyle.paddingRight)
            this.height = this.width * 0.7
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            this.trigger('resize')
        })
    }
}

 