$('#btnsubmit').click(function (){
    $("#medform").submit(function (event){
        var flag = true;
        if ($("#med").val()=='') {
            alert("You need to enter medication name!");
            flag = false;
        }
        if ($("#dose").val()=='') {
            alert("You need to enter dose of medicine!");
            flag = false;
        }   
        if($("#datep").val()==''){
            alert("You need to enter date for prescription");
            flag = false;
        }    
        if ($("#reason").val()=='') {
            alert("You need to enter the reason!");
            flag = false;
        }
        if(flag==false){
            event.preventDefault();
        }      
    });
});