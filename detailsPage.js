document.addEventListener("DOMContentLoaded", function (event) {
  const IPAdd = window.localStorage.getItem("IP");
  getInfo(IPAdd);



  async function getInfo(IP) {
    try{
    const response = await fetch(`https://ipapi.co/${IP}/json/`);
    const data = await response.json();
    console.log(data);
    window.localStorage.setItem("IP-Info",JSON.stringify(data));
    getPostal(data.postal);
    integrateValues();
  }
  catch(error){
    console.log(error);
  }}


 
  async function getPostal(pincode) {
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode} `
      );
      const data = await response.json();
      console.log("postal:",data);
      const message = document.getElementById("message");
        message.innerText = data[0].Message;
      
      data[0].PostOffice.forEach(e=>{
              creatCard(e);
      })
     
    } catch (error) {
      console.error(error);
    }
  }


  function integrateValues(){
        const data = JSON.parse(window.localStorage.getItem("IP-Info"));
        const ipAdd = document.getElementById("ip-add");
        const lat = document.getElementById("lat");
        const long = document.getElementById("long");
        const city = document.getElementById("city");
        const region = document.getElementById("region");
        const org = document.getElementById("org");
        const host = document.getElementById("host");
        const timezone = document.getElementById("timezone");
        const datetime = document.getElementById("datetime");
        const pincode = document.getElementById("pincode");
      

        let timedate= new Date().toLocaleString("en-US", {
            timeZone: `${data.timezone}`,
          });
          // "3/22/2021, 5:05:51 PM"
        

        ipAdd.innerText = data.ip;
        lat.innerText=data.latitude;
        long.innerText=data.longitude;
        city.innerText = data.city;
        region.innerText = data.region;
        org.innerText = data.org;
        // host.innerText = 
        datetime.innerText=timedate;
        timezone.innerText =data.timezone;
        pincode.innerText=data.postal;
        initiatMap(data.latitude,data.longitude)
  }

  function initiatMap(lat,long){
    const mapContainer = document.getElementById("map");
    mapContainer.innerHTML = ` <iframe src="https://maps.google.com/maps?q=${lat}, ${long}&z=15&output=embed" width="100%" height="380" frameborder="0" style="border:0"></iframe>`
  }


  function creatCard(e){
    const postDiv = document.getElementById("postalList");
      postDiv.innerHTML+=`<div class="postal-card">
      <p>Name:&nbsp;<span class="name">${e.Name}</span></p>
      <p>Branch Type:&nbsp;<span class="branch">${e.BranchType}</span></p>
      <p>Delivery:&nbsp;<span class="delivery">${e.DeliveryStatus}</span></p>
      <p>District:&nbsp;<span class="district">${e.District}</span></p>
      <p>Division:&nbsp;<span class="division">${e.Division}</span></p>
  </div>`
 
  }
});
