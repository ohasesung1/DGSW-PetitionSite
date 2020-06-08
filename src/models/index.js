import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

import * as colorConsole from '../lib/console';

// sequelize 연결 설정
const { mysql: config } = require('../../config/database.json');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: (str) => {
      // console.log(str);
    },
    // timezone: '+09:00',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    port: config.port,
  },
);

const models = {};

// 현재 디렉터리의 모델 파일들 불러오기
fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js') && (!fs.statSync(path.join(__dirname, file)).isDirectory()))
  .forEach((file) => {
    // console.log('SYNCING', file);
    const extName = path.extname(path.join(__dirname, file));
    const baseName = path.basename(path.join(__dirname, file), extName);

    const model = sequelize.import(path.join(__dirname, file));
    models[baseName] = model;
  });

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

// 스키마 동기화
sequelize.sync({ force: false }).then(() => {
  colorConsole.green('[Model - Index] Schema is synchronized');
}).catch((err) => {
  colorConsole.red('[Model - Index] An error has occurred: ', err);
});

models.sequelize = sequelize;
models.Sequelize = sequelize;

export default models;
