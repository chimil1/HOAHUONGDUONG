// config/db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('hoahuongduong', 'root', 'mysql', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => {
    console.log('Kết nối MySQL thành công.');
  })
  .catch((error) => {
    console.error('Kết nối MySQL thất bại:', error);
  });

module.exports = sequelize;
