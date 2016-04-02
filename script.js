$(document).ready(function(){
  var ip = "192.168.10.3";
  var username = "naokihashimoto"
  setCurrentStatus();

  $("#switch").on("click", function(){
    ToggleAllLights();
  });

  function setCurrentStatus(){
    $.ajax({
      type: "GET",
      url: "http://"+ ip +"/api/"+ username
    }).then(function(response) {
      status = response["lights"][1]["state"]["on"];

      if (status == "true"){
        $("#switch").addClass("on").removeClass("off");
      } else{
        $("#switch").addClass("off").removeClass("on");
      }
    });
  }

  function ToggleAllLights(){
    status = $("#switch").attr("class");
    [1,2,3].forEach(function(i){
      toggleLights(i, status);
      setCurrentStatus();
    });
  }

  function toggleLights(number, status){
    data = (status == "off") ? '{"on": true}' : '{"on": false}';
    $.ajax({
      type: "PUT",
      url: "http://"+ ip +"/api/"+ username +"/lights/"+ number +"/state",
      data: data,
      dataType: "json",
      success: function(response){
        //console.log(response);
      }
    });
  }
});
