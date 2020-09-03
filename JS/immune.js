$('#btnsubmit').click(function (){
    $("#immuneform").submit(function (event){
        var flag = true;
        if ($("#med").val()=='') {
            alert("You need to enter vaccine");
            flag = false;
        }
        if ($("#dose").val()=='') {
            alert("You need to enter what this vaccine protects against!");
            flag = false;
        }   
        if($("#date").val()==''){
            alert("You need to enter date when vaccine was taken");
            flag = false;
        }    
        if(flag==false){
            event.preventDefault();
        }      
    });
});