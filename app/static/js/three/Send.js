import Game from "/static/js/three/Game.js"

export default class Send
{
    constructor()
    {
        this.game = new Game()
        this.screenshot = this.game.screenShot
        this.world = this.game.world

        this.sendData()
    }
    sendData()
    {
        var submit = document.getElementById("submit-btn")
        submit.addEventListener('click', () =>
        {
            //check image blob has been saved
            if(!this.screenshot.image)
            {
                return alert("Please take screenshot.")
            }
            //check there is a model name
            var modelName = document.getElementById('name').value
            if(!modelName)
            {
                return alert("Please give your model a name.")
            }
            //check there is a description
            var description = document.getElementById("description").value
            if(!description)
            {
                return alert("Please give brief description.")
            }

            var formdata = new FormData()
            
            formdata.append('image', this.screenshot.image)
            formdata.append('positions', JSON.stringify(this.world.v3Array))
            formdata.append('name', modelName)
            formdata.append('description', description)

            fetch(`${window.origin}/create-entry`, {
                method: 'POST',
                body: formdata 
            })
            .then(function (response) {
                if(response.status !== 200)
                {
                    alert(`response status was not 200 ${response.status}`)
                    return
                }
                else
                {
                    alert("everthink sent")
                }
            })   
        }) 
    }
}