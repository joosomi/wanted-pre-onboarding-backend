const express = require('express');
const companyRoutes = require('./routes/companyRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const userRoutes = require('./routes/userRoutes');
const { sequelize } = require('./models');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/companies', companyRoutes);
app.use('/jobs', jobRoutes);
app.use('/applications', applicationRoutes);
app.use('/users', userRoutes);

app.use(errorHandler);

sequelize
    .sync()
    // .sync({ force: true }) // 데이터베이스를 초기화 (모든 테이블 삭제 후 다시 생성)
    .then(() => {
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });
