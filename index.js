const app = require('./app');
const configs = require('./utils/config');



const PORT = configs.port;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
