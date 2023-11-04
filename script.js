document.addEventListener("DOMContentLoaded", function (event) {
  const btn = document.getElementById("get-started");
  try{
  $.getJSON("https://api.ipify.org?format=json", function (data) {
    $("#ip-address").html(data.ip);
    // getInfo(data.ip);
    window.localStorage.setItem("IP", data.ip);
    console.log(data);
  });
  }catch(error){
    console.log(error);
  }

  btn.addEventListener("click",function (){
    window.location.href = "detailsPage.html";
  })
  
});
