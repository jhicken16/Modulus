console.log(window.location.pathname)
var routeInfo = null
var routeImg
switch ( window.location.pathname )
    {
        case "/profile":
            routeInfo = "/profile_model"
            routeImg = "/profile_images"
            
            break
        case "/explore":
            routeInfo = "/explore_model"
            routeImg = "/explore_images"
            
            break
    }

async function getPageInfo(amountToGet, amountOnpage)
{
    const form = new FormData

    form.append("get", amountToGet)
    form.append("skip", amountOnpage)

    const textResponce = fetch(window.origin + routeInfo,
    {
        method: "POST",
        body: form
    })
    .then(function (response) {
        if(response.status !== 200)
        {
            alert(`response status was not 200 ${response.status}`)
            return 
        }
        else
        {
            let data = response.json()
            return data
        }
    })
    
     
    return await textResponce
}

async function getBlobForInfo(amountOnpage)
{
    let blob = null
    const imageResponce = fetch(window.origin+routeImg,
        {
            method: "POST",
            body: JSON.stringify(String(amountOnpage)),
            headers: new Headers({
                "content-type": "application/json"
            })
        })
        .then((response) => response.blob())
        .then((data) => {
            return data
        })
        
     
    
    return await imageResponce
}

async function loadOnScroll(info, img)
{
    var col = document.createElement("div")
            col.classList.add("col")

            var row2 = document.createElement("div")
            row2.classList.add("row")
            col.appendChild(row2)

            var col2 = document.createElement("div")
            col2.classList.add("col")
            row2.appendChild(col2)

            var col3 = document.createElement("div")
            col3.classList.add("col")
            row2.appendChild(col3)
            
            // Div to go into column
            var div = document.createElement("div")
            div.classList.add("mb-4")

            col2.appendChild(div)
            
            div.appendChild(img)

            //text element
            var divText = document.createElement("div")
            divText.classList.add("form-text")
            divText.innerHTML = `${info.name}<hr>${info.description}`
            
            //add from to div text with button
            var form = document.createElement("form")
            form.setAttribute("method", "POST")
            form.setAttribute("action", "/profile")
            
            // add input
            var input = document.createElement("input")
            input.setAttribute("type", "hidden")
            input.setAttribute("name", "id")
            input.value = info.id
            form.appendChild(input)

            //add sumit button to form
            var btn = document.createElement("button")
            btn.setAttribute("type", "submit")
            btn.classList.add("btn-xs")
            btn.classList.add("btn-light")
            btn.classList.add("mt-2")
            btn.innerHTML = "Edit"
            form.appendChild(btn)

            divText.appendChild(form)

            //add text element after image
            col3.appendChild(divText)

            //add row to page
            return col
}


export{getPageInfo, getBlobForInfo, loadOnScroll}

