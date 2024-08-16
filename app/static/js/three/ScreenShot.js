import Game from "/static/js/three/Game.js"

export default class ScreenShot
{
    constructor()
    {
        this.game = new Game()
        this.image = null
        
        
        this.happenedBefore = false
        
        this.getCanvasBlob()
    }
    
    getCanvasBlob()
    {
        var imagePlace = document.getElementById('blobplace')
        var screenShot = document.getElementById('screenshot')
        screenShot.addEventListener('click', () =>
        {
            this.game.update()
            this.game.canvas.toBlob((blob) =>
            {
                const img = document.createElement('img')
                const url = URL.createObjectURL(blob)
                img.onload = () =>
                {
                    URL.revokeObjectURL(url)
                }

                img.src = url
                img.style.width = "100%"

                this.image = blob
                
                var div = document.createElement("div")
                div.classList.add("mb-3")
                div.setAttribute('id', 'screenshot-div')
                div.appendChild(img)

                if( this.happenedBefore == true)
                {
                    document.getElementById('screenshot-div').remove()
                    imagePlace.insertBefore(div, imagePlace.firstChild)
                }
                else
                {
                    imagePlace.appendChild(div)
                    this.happenedBefore = true
                }
            })
        })  
    }
}