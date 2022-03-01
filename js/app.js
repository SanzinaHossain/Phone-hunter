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
const PhoneShow=(Phones)=>{
    clean();
    console.log(Phones);
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
const ShowPhoneDetails=(phoneid)=>{
    const url=`https://openapi.programming-hero.com/api/phone/${phoneid}`;
     fetch(url)
      .then(res=>res.json())
      .then(data=>GoforDetails(data.data));
}
const GoforDetails=(data)=>{
    let res=data.releaseDate;
    if(res=='')
    {
        res=' Not found';
    }
    const phoneD=document.getElementById('phone-details');
    phoneD.textContent='';
    const div=document.createElement('div');
    div.classList.add('card','card-details','m-3','mx-auto','w-50');
    div.innerHTML=`
       <img src="${data.image}" class="card-img-top img-fluid p-3 p-lg-5" alt="...">
       <div class="card-body">
          <h2 class="card-title text-center text-warning ">${data.name}</h2>
          <h4 class="text-center">Brand: ${data.brand}</h4>
        </div>
       <div class="card-body">
       <ul class="list-group list-group-flush">
            <li class="list-group-item">Release Date: ${res}</li>
           <li class="list-group-item">A second item</li>
           <li class="list-group-item">A third item</li>
           <li class="list-group-item">A third item</li>
        </ul>
       </div>
    `
    phoneD.appendChild(div);
}