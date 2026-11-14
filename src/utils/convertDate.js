export default function convertDate(date) {
    const newDate = new Date(date);
     
    return newDate.toLocaleDateString('en-EU',{
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}