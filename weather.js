
//WEATHER FORECAST API FOR 5 DAYS, UPDATE EVERY 3 HOURS//
const city = document.querySelector('#city');
const cityForm = document.querySelector('#city');
const ul = document.querySelector('#list');
const allTemp = document.querySelectorAll('#temp');
const allWeather = document.querySelectorAll('#weather');
const allExtend = document.querySelectorAll('#weatherExtend');


/*for (temp of allTemp) {
    console.log(temp.textContent);
}*/
let tempArr = [];
let weaArr = [];
let exArr = [];
const Kelvin = 272.15;
let gap =-8;
let restart = false;
let clicked = false;


city.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
    const cityInput = cityForm.elements.city.value;
   
    const getCity = await axios.get('https://community-open-weather-map.p.rapidapi.com/forecast',{
          params: {
                q: cityInput
    },
           headers: {
            'x-rapidapi-key': '2ab4acb06dmshe8e8fd82dd2c322p1c2c8ajsnf782c4e41d5a',
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
        }
    });
    console.log(getCity);
     cityList(getCity.data.list);
     display();
     Reset();
}
catch(error) {
    alert("SOME ERROR OCCUR, PLEASE RELOAD THE PAGE");
}
    
} )

const cityList = (citylist) => {

    //Today's weather and 5 days later
    for (list of citylist) {
        if (restart == true) {
            gap = -8;
        }
        gap += 8;
     
        if (gap > citylist.length) {
            
                  break;
        }
        else {
            
            console.log("gap: "+gap);
      let weather = list.weather;
      //Actual tempS
      let temp = Math.floor(list.main.temp - Kelvin);
      console.log(temp);
       tempArr.push(temp);
     
        for (wList of weather) {
        let main =   wList.main; //cloud,rainy,sunny
          let des = wList.description; //broken cloud, clear sky,etc
        
         
          console.log(main);
          console.log(des);
         weaArr.push(main);
         exArr.push(des);       
         
      }
     }
    }
    }
    function display() {
    
        for (let i=0; i < allTemp.length; i++) {
            allTemp[i].textContent = tempArr[i];
             }
        for (let j =0; j < allWeather.length; j++) {
            allWeather[j].textContent = weaArr[j];
           
        }
        for (let k =0; k < allExtend.length; k++) {
            allExtend[k].textContent = exArr[k];
            
        }
       
    }
    function Reset() {
        try {
            while (allTemp.length > 0 && allExtend.length > 0 && allWeather.length >0) {  
                 tempArr.pop();
                 weaArr.pop();
                 exArr.pop();
                 if (tempArr.length <= 0 || weaArr.length <= 0 || exArr.length <= 0)
                 {break;
}
gap = -8;
        }
  
        
    }
    catch (e) {
  console.log('ERROR POP',e);
    }
    }

