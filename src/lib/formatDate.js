


const formatDate = (date) => { 

    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();
    return `${padDate(month)}/${padDate(day)}/${year}`
}

const padDate=(date) => {

    return  date.toString().padStart(2, '0')
}

export default formatDate
