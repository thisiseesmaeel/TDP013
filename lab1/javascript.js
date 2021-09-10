msgCounter = 1;

document.addEventListener('DOMContentLoaded', function () { init();} );


function post(msg)
{
    if(msg.length > 140 || msg.length == 0)
    {
        let errorBox = document.getElementById("error_div");
        errorBox.textContent = "You cannot write empty message or more than 140 characters!";
        return false;
    }
    let messageNode = document.createTextNode(msg);
    let mainBox = document.getElementById("main_box");

    //// Skapar message_text_box div
    let messageTextBox = document.createElement("div");
    messageTextBox.className = "message_text_box";
    messageTextBox.setAttribute("id", "message_text_div" + msgCounter.toString());
    messageTextBox.appendChild(messageNode);
    ////

    //// Skapar message_status div
    let messageStatusBox = document.createElement("div");
    messageStatusBox.className = "message_status_box";
    ////

    //// Skapar knappen
    let statusBtn = document.createElement("button");
    statusBtn.setAttribute("id", "status_button" + msgCounter.toString());
    statusBtn.appendChild(document.createTextNode("Unread"));
    messageStatusBox.appendChild(statusBtn);
    ////

    //// Skapar message_main_box div
    let messageMainBox = document.createElement("div");
    messageMainBox.className += "message_main_box";
    messageMainBox.setAttribute("id", "message_main_div" + msgCounter.toString());
    messageMainBox.appendChild(messageTextBox);
    messageMainBox.appendChild(messageStatusBox);
    ////

    //// lägger till i main_box

    mainBox.insertBefore(messageMainBox, mainBox.children[2]);
    
    return true;
}

function init(){
    let searchField = document.getElementById("message_input");
    searchField.value = "";
    if(document.cookie)
    {
        let cookiesList = document.cookie.split(";");
        let sortedCookies = [];
        for(let i = 1; i <= cookiesList.length; i++)
        {               
            let reg = cookiesList[i - 1].match(/(.*)=(.*)#(\d+)/);
            sortedCookies.push([reg[1], reg[2], reg[3]]);            
        }
        sortedCookies.sort(function(a,b){return a[2] - b[2];});
        for(let i = 1; i <= sortedCookies.length; i++)
        {
            post(sortedCookies[i-1][0]);
            msgCounter += 1;
            if(sortedCookies[i-1][1] == "read")
            {
                changeStatus(i);
            }
        }
        msgCounter = cookiesList.length + 1;
    }
        

    document.getElementById("send_button").addEventListener("click", function (event){

        event.preventDefault();
        if(post(document.getElementById("message_input").value))
        {
            document.cookie = document.getElementById("message_input").value + "=unread" + "#" + msgCounter.toString();
            let searchField = document.getElementById("message_input");
            searchField.value = "";
            let errorBox = document.getElementById("error_div");
            errorBox.textContent = "";
            msgCounter += 1;
            statusListener();
        }     

    })

    statusListener();

    
}

function statusListener()
{
    for (let i = 1; i < msgCounter; i++)
    {
        document.getElementById("status_button" + i.toString()).addEventListener("click", function (event){
        
        changeStatus(i);
          
        })
    }

}

function changeStatus(i)
{
    let statusBtn = document.getElementById("status_button" + i.toString());
    statusBtn.innerHTML = "read";
    let x = document.getElementById("message_text_div" + i.toString());
    document.cookie =  x.textContent + "=read" + "#" + i.toString();
    statusBtn.style.color = "green";
    let messageMainBox = document.getElementById("message_main_div" + i.toString());
    messageMainBox.style.backgroundColor = "rgb(86, 133, 89)";
}