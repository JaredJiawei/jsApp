

 const dayEl = document.getElementById('days');
 const hourEl = document.getElementById('hours');
 const minuteEl= document.getElementById('minutes');
 const secondEl = document.getElementById('seconds');
 const newYears = '1 Jan 2024';

function countdown(){
    const newYearDate = new Date(newYears);
    const currentDate = new Date();
    const allSeconds = (newYearDate - currentDate) / 1000; 
    //console.log(allSeconds);
    
    const day = Math.floor(allSeconds / 3600 / 24); 
    const hour = Math.floor((allSeconds / 3600) % 24); 
    const minute = Math.floor((allSeconds / 60) % 60); 
    const second = Math.floor(allSeconds % 60); 
    //console.log(day);
    
    dayEl.innerHTML = day;
    hourEl.innerHTML = formatTime(hour);
    minuteEl.innerHTML = formatTime(minute);
    secondEl.innerHTML = formatTime(second);


};

function formatTime(time){
    return time < 10 ? `0${time}` : time;
}

//initial call
countdown();

setInterval(countdown,1000);