msgCounter = 1;

document.addEventListener('DOMContentLoaded', function () { init();} );


function post(msg)
{
    if(msg.substring(1).length > 140 || msg.substring(1).length == 0)
    {
        let errorBox = document.getElementById("error_div");
        errorBox.textContent = "Error!";
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
    msgCounter += 1;
    statusBtn.appendChild(document.createTextNode("Unread"));
    messageStatusBox.appendChild(statusBtn);
    ////

    //// Skapar message_main_box div
    let messageMainBox = document.createElement("div");
    messageMainBox.className += "message_main_box";
    messageMainBox.appendChild(messageTextBox);
    messageMainBox.appendChild(messageStatusBox);
    ////

    //// lägger till i main_box

    mainBox.insertBefore(messageMainBox, mainBox.children[2]);
    
    return true;
}

function init(){
    console.log(document.cookie);
    if(document.cookie)
    {
        let cookiesList = document.cookie.split(";");
        console.log(cookiesList);

        for(let i = 0; i < cookiesList.length; i++)
        {   
            console.log(i.toString());
            
            let reg = cookiesList[i].match(/(.*)=(.*)/);
            let msg = reg[1];
            let mgsStatus = reg[2];
            console.log(i.toString() + " " + msg + " " + mgsStatus );

            post(msg);
            if(mgsStatus == "read")
            {
                changeStatus(i + 1);
            }

            
        }
        msgCounter = cookiesList.length + 1;

        console.log(">>>>>" + msgCounter.toString());
 
    }
        
    

    document.getElementById("send_button").addEventListener("click", function (event){

        event.preventDefault();
        console.log(document.getElementById("message_input").value);
        if(post(document.getElementById("message_input").value))
        {
            document.cookie = document.getElementById("message_input").value + "=unread";
            let searchField = document.getElementById("message_input");
            searchField.value = " ";
            let errorBox = document.getElementById("error_div");
            errorBox.textContent = "";
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
    // msg1=unread ; msg2=unread
    let x = document.getElementById("message_text_div" + i.toString());
    document.cookie =  x.textContent + "=read";
    console.log(document.cookie);
    statusBtn.style.color = "green";
    let messageTextBox = document.getElementById("message_text_div" + i.toString());
    messageTextBox.style.color = "gray";
    let messageBox = document.getElementById("message_text_div" + i.toString());
    messageBox.style.backgroundColor = "darkblue";
}