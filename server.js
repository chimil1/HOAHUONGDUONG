const sequelize = require('./config/db');
const Product = require('./models/Product'); // Đường dẫn phải chính xác

sequelize.sync({ force: false })
  .then(() => {
    console.log('Cơ sở dữ liệu đã được đồng bộ.');
  })
  .catch((error) => {
    console.error('Lỗi đồng bộ cơ sở dữ liệu:', error);
  });
