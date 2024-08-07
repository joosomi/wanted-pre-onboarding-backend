const express = require('express');
const { sequelize } = require('./models'); // models/index.js에서 sequelize를 가져옴
const companyRoutes = require('./routes/companyRoutes');
const jobRoutes = require('./routes/jobRoutes');

const app = express();

app.use(express.json());

app.use('/companies', companyRoutes);
app.use('/jobs', jobRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

sequelize
    .sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });
