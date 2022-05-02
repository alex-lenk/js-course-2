const moment = require('moment');
const fs = require('fs');
const pathStats = './server/db/stats.json'

const logger = (name, action) => {
  fs.readFile(pathStats, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const stat = JSON.parse(data);

      stat.push({
        time: moment().format('DD MMM YYYY, h:mm:ss a'),
        product_title: name,
        action: action,
      })

      fs.writeFile(pathStats, JSON.stringify(stat, null, 4), (err, data) => {
        if (err) {
          console.log(err);
        }
      })
    }
  })
}

module.exports = logger;
