export const status = (startDate, endDate) => {
    if(new Date(startDate).getTime() < new Date().getTime() && new Date(endDate).getTime() > new Date().getTime()) {
        return 'Active'
    }

    if(new Date(startDate).getTime() > new Date().getTime() && new Date(endDate).getTime() > new Date().getTime()) {
        return 'Upcoming'
    }

    if(new Date(startDate).getTime() < new Date().getTime() && new Date(endDate).getTime() < new Date().getTime()) {
        return 'Past'
    }

}

export const daysFormat = (ms) => {
    const days = Math.floor(ms / (24*60*60*1000));

    return addZero(days);
}

export const hoursFormat = (ms) => {
    const daysms = ms % (24*60*60*1000);
    const hours = Math.floor(daysms / (60*60*1000));

    return addZero(hours);
}


export const minutesFormat = (ms) => {
    const hoursms = ms % (60*60*1000);
    const minutes = Math.floor(hoursms / (60*1000));

    return addZero(minutes);
}



export const eventsDateTimeFormat = (eventDate) => {
    const todayDate = new Date(eventDate)
    const month = todayDate.toLocaleString('en-US', { month: 'long' });
    const day = todayDate.toLocaleString('en-US', { day: '2-digit' });
    const year = todayDate.getFullYear().toString();
    const yearFormat = year.substring(year.length-2, year.length);

    var hours = todayDate.getHours();
    const minutes = todayDate.getMinutes();

    // set A.M or P.M
    if(hours >= 12) {
        var amPm = 'PM';
    }
    else {
        var amPm = 'AM';
    }

    // 12 hour format
    hours = hours % 12 || 12;

    return day + 'th ' + month + "'" + yearFormat + ' ' + addZero(hours) + ':' + addZero(minutes) + ' ' + amPm;
}

const addZero = (n) => {
    if(parseInt(n, 10) < 10)
    {
      return '0' + n;
    }
    else {
      return '' + n;
    }
  }