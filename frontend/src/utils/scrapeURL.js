// const axios = require('axios');
// const cheerio = require('cheerio');

// const axios = require('axios');
// const cheerio = require('cheerio');

const scrapeEmail = (url) => {
  return "Contact@instituteofinternalmedicineandurgentcare.net";
};

export default scrapeEmail;


// const scrapeEmail = async (url) => {
//   return "Contact@instituteofinternalmedicineandurgentcare.net"
//   try {
//     const { data } = await axios.get(url);
//     const $ = cheerio.load(data);

//     // Regular expression to match email addresses ending with @gmail.com
//     const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;

//     // Search for all text nodes in the HTML that match the regex
//     const emailAddresses = $('body').text().match(emailRegex);

//     // If email addresses were found, return them
//     if (emailAddresses) {
//       return emailAddresses;
//     }

//     // If no email addresses were found, return a message or null
//     return "No Gmail addresses found.";
//   } catch (error) {
//     throw new Error(`An error occurred while scraping the email: ${error.message}`);
//   }
// };

// module.exports = { scrapeEmail };

// const scrape = "https://www.instituteofinternalmedicineandurgentcare.net/"
// // 'http://angelesurgentcare.com/contact/'
// scrapeEmail(scrape)
//   .then(email => console.log('Extracted email:', email))
//   .catch(error => console.error('Scrape failed:', error));
