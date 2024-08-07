const express = require('express');
const { sequelize } = require('./models'); // models/index.js에서 sequelize를 가져옴
const companyRoutes = require('./routes/companyRoutes');
const jobRoutes = require('./routes/jobRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.use('/companies', companyRoutes);
app.use('/jobs', jobRoutes);

app.use(errorHandler);

sequelize
    .sync()
    .then(() => {
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });
