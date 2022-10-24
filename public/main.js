bodyLoaded()

function bodyLoaded () {
    
    
    let days = document.querySelectorAll('a.fc-col-header-cell-cushion');
    days.forEach(day => {
        let _day = day.innerHTML.split('. ', 3);
        let span = document.createElement('span')
        span.innerHTML = `${_day[0]}<br/><b> ${_day[1]}</b>`
        day.innerHTML = span.innerHTML
    })
}