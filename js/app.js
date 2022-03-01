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
               <div style="background-color:wheat;" class="card h-100">
                  <img src="${phone.image}" class="card-img-top" alt="...">
                <div style="background-color:wheat;"class="card-body">
                   <h3 class="card-title">${phone.phone_name}</h3>
                   <h5 class="card-title">Brand: ${phone.brand}</h5>
                </div>
                 <button "style="font-weight:700;background-color:yellowgreen;"class=" rounded bg-warning">Details</button>
               </div>
            `;
            mobileShow.appendChild(div);

        }
}