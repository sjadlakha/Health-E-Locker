$('#btnsubmit').click(function (){
    $("#sympform").submit(function (event){
        var flag = true;
        if ($("#symptom").val()=='') {
            alert("You need to enter the symptom!");
            flag = false;
        }
        if ($("#date").val()=='') {
            alert("You need to enter the date when symptom occured!");
            flag = false;
        }   
        if($("#context").val()==''){
            alert("You need to enter the context when symptom occured!");
            flag = false;
        }    
        if(flag==false){
            event.preventDefault();
        }      
    });
});