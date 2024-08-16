import Game from "/static/js/three/Game.js"

const canvas = document.getElementById("canvas_container")
const game = new Game(document.querySelector(".game"), canvas)


//changing page layout
var blocker = document.getElementById("blocker")
blocker.style.height = `${blocker.clientWidth * 0.7}px`

var canvasDiv = document.getElementById("main")

var divText = document.createElement("div")
divText.classList.add("form-text")
divText.innerHTML = "Game unavalable on mobile devices"
divText.style.backgroundColor = "white"

var row = document.createElement("div")
row.classList = "row"

var mainContent = document.getElementById("main-content")

var leftCol = document.getElementById("left")
var righttCol = document.getElementById("right")

var container = document.createElement("div")

var mainRow = document.getElementById("main-row")

container.classList = "container"

window.addEventListener('resize', () =>
{
    blocker.style.height = `${blocker.clientWidth * 0.7}px`
    if (canvasDiv.childNodes.length == 6)
        {
            canvasDiv.removeChild(divText)
        }
    wigglePage()
})
wigglePage()



function wigglePage()
{
    if (document.documentElement.clientWidth <= 624)
    {
        canvasDiv.className = "col-8"
        canvasDiv.appendChild(divText)
        row.appendChild(leftCol)
        leftCol.className = "col-6"
        row.appendChild(righttCol)
        righttCol.className = "col-6"
        container.appendChild(row)
        
        mainContent.appendChild(container)
        
       
    }
    else{
        canvasDiv.className = "col-8"
        console.log(canvasDiv.childNodes.length)
        leftCol.className = "col-2"
        righttCol.className = "col-2"
        mainRow.insertBefore(leftCol, mainRow.firstChild)
        mainRow.appendChild(righttCol)

        
        
    }
}
 