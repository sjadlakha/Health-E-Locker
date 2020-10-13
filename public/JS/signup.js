
$(function () {

    var submit = $('#signupBtn').click(function () {
        var flag = true;
        var uname = $("#username").val();
        if (uname.length < 5) {
            alert("Too short Username, should be minimum 5 characters ");
            flag = false;
        }
        var pswd = $("#pswd").val();
        if (pswd.length < 8) {
            alert("Password is too short, should be minimum 8 characters ");
            flag = false;
        }
        var repswd = $("#repswd").val();
        if(repswd!=pswd){
            alert("Re-entered password does not match.");
            flag = false;
        }
        
        if (flag == true) {
            $("#cntBtn").removeAttr("disabled");
        }
    });

});