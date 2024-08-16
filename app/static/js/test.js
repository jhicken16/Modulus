import {getPageInfo, getBlobForInfo, loadOnScroll} from "/static/js/page-setup.js"

const form = new FormData
var num = 8
form.append("number", num)

var firstPageInfo = await getPageInfo(num, 0)
var fristPagePhoto = null

var elementsInRow = 2
if(document.documentElement.clientWidth < 1173)
{
    elementsInRow = 1
}

for(let i = 0; i < num; i++)
{
    // Create row if there are two images
    if( i % elementsInRow == 0)
    {
        var row = document.createElement("div")
        row.classList.add("row")
    }

    fristPagePhoto = new Blob([await getBlobForInfo(i)])
    
    var img = document.createElement('img')
    var url = URL.createObjectURL(fristPagePhoto)
    
    img.onload = () =>
    {
        URL.revokeObjectURL(url)
    }

    img.src = url
    img.style.width = "100%"

    var col = await loadOnScroll(firstPageInfo[i], img)
    row.appendChild(col)

    //add row to page
    document.body.appendChild(row)
}

var x = true
var numToAdd = num

document.addEventListener("scroll", async () => {
    
    var html = document.documentElement 
    var finalpercent = Math.round((html.scrollTop + html.clientHeight) / html.scrollHeight * 100)
    
    if( finalpercent > 90 && x == true)
    {
        x = false
        var loadPageInfo = await getPageInfo(num, numToAdd)
        
        for(let i = 0; i < loadPageInfo.length; i++)
        {

            // Create row if there are two images
            if( i % elementsInRow == 0)
            {
                var row = document.createElement("div")
                row.classList.add("row")
            }
            fristPagePhoto = new Blob([await getBlobForInfo(numToAdd)])
            
            var img = document.createElement('img')
            var url = URL.createObjectURL(fristPagePhoto)
            
            img.onload = () =>
            {
                URL.revokeObjectURL(url)
            }
            // column to be appended to row
            img.src = url
            img.style.width = "100%"

            
            var col = await loadOnScroll(loadPageInfo[i], img)
            row.appendChild(col)
            //add row to page
            document.body.appendChild(row)
            numToAdd++
            
        }
        if(loadPageInfo.length == num)
        {
            x = true
        }
    }
})
   