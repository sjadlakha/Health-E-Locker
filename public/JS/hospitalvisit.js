$('#btnsubmit').click(function (){
    $("#hospform").submit(function (event){
        var flag = true;
        if ($("#hospital").val()=='') {
            alert("You need to add the hospital!");
            flag = false;
        }
        if ($("#reason").val()=='') {
            alert("You need to enter the reason!");
            flag = false;
        }   
        if($("#dateadmis").val()==''){
            alert("You need to enter Admission date!");
            flag = false;
        }    
        if(flag==false){
            event.preventDefault();
        }      
    });
});

