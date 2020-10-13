$('#btnsubmit').click(function (){
    $("#alergyform").submit(function (event){
        var flag = true;
        var allergen = $("#allergen").val();
        if (allergen=='') {
            alert("You need a fill an allergen!");
            flag = false;
        }
        var dateidenty = $("#dateidenty").val();
        if (dateidenty=='') {
            alert("You need to enter the date!");
            flag = false;
        }   
        if($("#note").val()==''){
            alert("You need to add a note!");
            flag = false;
        }    
        if($("#reactions").val()==''){
            alert("You need to add reactions!");
            flag = false; 
        } 
        if(flag==false){
            event.preventDefault();
        }      
    });
});

