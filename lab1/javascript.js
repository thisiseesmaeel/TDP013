msgcounter = 1;

document.addEventListener('DOMContentLoaded', function () { init();} );


function send(msg)
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
    messageTextBox.setAttribute("id", "message_text_div" + msgcounter.toString());
    messageTextBox.appendChild(messageNode);
    ////

    //// Skapar message_status div
    let messageStatusBox = document.createElement("div");
    messageStatusBox.className = "message_status_box";
    ////

    //// Skapar knappen
    let statusBtn = document.createElement("button");
    statusBtn.setAttribute("id", "status_button" + msgcounter.toString());
    msgcounter += 1;
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
    document.getElementById("send_button").addEventListener("click", function (event){
        //window.alert("test");
        event.preventDefault();
        console.log(document.getElementById("message_input").value);
        if(send(document.getElementById("message_input").value))
        {
            let searchField = document.getElementById("message_input");
            searchField.value = " ";
            let errorBox = document.getElementById("error_div");
            errorBox.textContent = "";
        }        
        for (let i = 1; i < msgcounter; i++)
        {
            document.getElementById("status_button" + i.toString()).addEventListener("click", function (event){
            let statusBtn = document.getElementById("status_button" + i.toString());
            statusBtn.innerHTML = "read";
            statusBtn.style.color = "green";
            let messageTextBox = document.getElementById("message_text_div" + i.toString());
            messageTextBox.style.color = "gray";    
            })
        }
    })
    
}