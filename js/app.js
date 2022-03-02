// body clear function
const clean=()=>
{
        const phoneDetails=document.getElementById('phone-details');
        phoneDetails.textContent='';
        const phoneShow=document.getElementById('data-show');
        phoneShow.textContent='';
}
// search value catch
const searchPhone=()=>
{
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;
    searchField.value='';
    if(searchText=='')
    {
        clean();
        const phoneDetails=document.getElementById('phone-details');
        const div=document.createElement('div');
        div.classList.add('error-msg','mx-auto','w-50');
        div.innerHTML=`
            <p class="text-center">Please Write a Phone name !!!!!</p>
        `
        phoneDetails.appendChild(div);
    }
    else
    {
        clean();
        const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        
        fetch(url)
          .then(res=>res.json())
          .then(data=>PhoneShow(data.data));
    }
}
// mobile phone show
const PhoneShow=(Phones)=>{
    //if you dont find any phone 
    if(Phones.length==0)
    {
        clean();
        const phoneDetails=document.getElementById('phone-details');
        const div=document.createElement('div');
        div.classList.add('error-msg','mx-auto','w-50');
        div.innerHTML=`
            <p class="text-center">No Phone found with this name  !!!!!</p>
        `
        phoneDetails.appendChild(div);
    }
    //if you find our desire phone
    else{
        clean();
    for(const phone of Phones.slice(0,20))
        {
            const mobileShow=document.getElementById('data-show');
            const div=document.createElement('div');
            div.classList.add('col');
            div.innerHTML=`
               <div style="background-color:wheat;" class="card h-100 p-3">
                  <img src="${phone.image}" style="height:400px;width:300px;" class="card-img-top img-fluid" alt="...">
                <div style="background-color:wheat;"class="card-body">
                   <h3 class="card-title text-center">${phone.phone_name}</h3>
                   <h5 class="card-title text-center">Brand: ${phone.brand}</h5>
                </div>
                 <button onclick="ShowPhoneDetails('${phone.slug}') "style="font-weight:700;background-color:yellowgreen;"class=" rounded bg-warning">Details</button>
               </div>
            `;
            mobileShow.appendChild(div);

        }
    }
}
//phone show api call
const ShowPhoneDetails=(phoneid)=>{
    const url=`https://openapi.programming-hero.com/api/phone/${phoneid}`;
     fetch(url)
      .then(res=>res.json())
      .then(data=>GoforDetails(data.data));
}
//mobile details show
const GoforDetails=(data)=>{
    let df=data?.others;
    let mf=data?.mainFeatures?.sensors;
    let sensordata;
    if(mf.length!=0)
    {
        sensordata=mf.join();
    }
    else
    {
        sensordata='No Data Found';
    }
    const phoneD=document.getElementById('phone-details');
    phoneD.textContent='';
    const div=document.createElement('div');
    div.classList.add('card','card-details','m-3','mx-auto','w-50');
    //others feature not found
    if(df==undefined)
    {
        div.innerHTML=`
        <img src="${data.image}" class="card-img-top img-fluid p-3 p-lg-5" alt="...">
        <div class="card-body">
           <h2 class="card-title text-center">${data.name}</h2>
           <h4 class="text-center">Brand: ${data.brand}</h4>
         </div>
        <div class="card-body">
        <ul class="list-group list-group-flush">
 
            <li class="list-group-item"><span>Release Date: </span>${data.releaseDate? data.releaseDate:'Comming soon....'}</li>
            
            <li class="list-group-item"><h4>Mainfeatures:</h4><span>Storage: </span>${data.mainFeatures.storage?data.mainFeatures.storage:'No Data found'}<br><span>Memory: </span>${data.mainFeatures.memory? data.mainFeatures.memory:'No Data Found'}<br><span>Display: </span>${data.mainFeatures.displaySize ? data.mainFeatures.displaySize:'No Data Found'}<br><span>Sensors: </span>${sensordata}</li>
             
            <li class="list-group-item"><h4>Others:<br>${data.others ? data.others:'<span>No  others Feature found for this mobile</span>'}</h4></li>
            </ul>
            </div>
         `
    }
    //other feature found
    else
    {
        div.innerHTML=`
       <img src="${data.image}" class="card-img-top img-fluid p-3 p-lg-5" alt="...">
       <div class="card-body">
          <h2 class="card-title text-center">${data.name}</h2>
          <h4 class="text-center">Brand: ${data.brand}</h4>
        </div>
       <div class="card-body">
       <ul class="list-group list-group-flush">

           <li class="list-group-item"><span>Release Date: </span>${data.releaseDate? data.releaseDate:'Comming soon....'}</li>
           
           <li class="list-group-item"><h4>Mainfeatures:</h4><span>Storage: </span>${data.mainFeatures.storage?data.mainFeatures.storage:'No Data found'}<br><span>Memory: </span>${data.mainFeatures.memory? data.mainFeatures.memory:'No Data Found'}<br><span>Display: </span>${data.mainFeatures.displaySize ? data.mainFeatures.displaySize:'No Data Found'}<br><span>Sensors: </span>${sensordata}</li>
           
           <li class="list-group-item"><h4>Others:<br></h4><span>Bluetooth: </span>${data.others.Bluetooth ? data.others.Bluetooth:'No data Found' }<br><span>GPS: </span>${data.others.GPS ? data.others.GPS:'No Data Found'}<br><span>NFC: </span>${data.others.NFC ? data.others.NFC:'No Data Foound'}<br><span>Radio: </span>${data.others.Radio ? data.others.Radio:'No Data Found'}<br><span>USB: </span>${data.others.USB ? data.others.USB:'No Data Found'}<br><span>WLAN: </span>${data.others.WLAN ? data.others.WLAN:'No Data Found'}</li>
        </ul>
       </div>
    `
    }
    phoneD.appendChild(div);
}