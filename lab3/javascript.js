$(function(){
// Spara ny meddelande
  $("#send_button").on("click", function(e){
    e.preventDefault();
    let msg = $("#message_input").val();
    if(msg.length <= 0 || msg.length > 140)
    {
        $("div.error_box").text("You cannot write empty message or more than 140 characters!");
    }

    $.post("http://localhost:3000/save",
    {
        message : msg,
        status: "unread"
    },
    function(data, status){
        if(status = "success")
        {
            let id = data;
            let $messageMainBox = $("<div>", {"class": "message_main_box", "id": id});
            let $messageTextBox = $("<div>", {"class": "message_text_box"});
            let $messageStatusBox = $("<div>", {"class": "message_status_box"});
            let $statusBtn = $("<button>", {"id": "btn" + id});
            $statusBtn.text("unread");

            $("#main_box>div:nth-child(2)").after($messageMainBox);
            $("#" + id).append($messageTextBox);
            $("#" + id).append($messageStatusBox);
            $messageStatusBox.append($statusBtn);
            
            $messageTextBox.text(msg);
        }
        setOnClickListener();
    });
  });
  
    // Hämta alla meddelande
    $.get("http://localhost:3000/getall", 
    function(messages, status){
        if(status = "success")
        {
            $.each(messages, function(index){
                let msg = messages[index]["message"];
                let id = messages[index]["_id"];
                let $messageMainBox = $("<div>", {"class": "message_main_box", "id": id});
                let $messageTextBox = $("<div>", {"class": "message_text_box"});
                let $messageStatusBox = $("<div>", {"class": "message_status_box"});
                let $statusBtn = $("<button>", {"id": "btn" + id});
                $statusBtn.text("unread");

                $("#main_box>div:nth-child(2)").after($messageMainBox);
                $("#" + id).append($messageTextBox);
                $("#" + id).append($messageStatusBox);
                $messageStatusBox.append($statusBtn);
                
                $messageTextBox.text(msg);
                
                //console.log(messages[index])
                if(messages[index].status == "read")
                {
                    $messageMainBox.css("background-color", "rgb(86, 133, 89)");
                    $statusBtn.text("read");
                    $statusBtn.css("color", "green");
                }


            });
            setOnClickListener();
            
          
        }
    });
// Ändra status på ett meddelande
// Implementera
    function setOnClickListener()
    {
        $("#main_box").find("button[id^='btn']").each(function(index ,value){

            $("#" + value.id).on("click", function(e){
            e.preventDefault();
            let mongoId = value.id.slice(3);
            
            $.post("http://localhost:3000/flag",
            {
                id : mongoId,
                status: "read",
            },
            function(data, status){
                if(status = "success")
                {
                    $("#" + value.id).text("read");
                    $("#" + value.id).css("color", "green");
                    $("#" + mongoId).css("background-color", "rgb(86, 133, 89)");
                }
            });
        });
        });
        
    }
let counter = 0;

});