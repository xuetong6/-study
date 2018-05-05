import config from './config/config';
import app from './server.js';

//监听端口🐂😊
app.listen(config.port);
console.log('ydVueSystem listening on port %s', config.port);