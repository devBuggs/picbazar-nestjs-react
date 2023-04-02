

export const generateBarcode = async () => {
    // Create a new Date object for the current date
    let date = new Date();

    // Get the current year, month, and day as strings
    let year = String(date.getFullYear());
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if necessary
    let day = String(date.getDate()).padStart(2, '0'); // Add leading zero if necessary

    // Combine the year, month, and day strings into a single string
    let dateString = year + month + day;

    // Generate a random 3-digit number between 0 and 999
    let randomNumber = Math.floor(Math.random() * 1000);

    // Combine the date string and random number into a single 8-digit number
    let result = dateString + randomNumber.toString().padStart(3, '0');

    // Return the result
    console.log(JSON.stringify(result));
    return parseInt(result);
}