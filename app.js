import express from 'express';
import companyRoutes from './routes/companyRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { sequelize } from './models/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/companies', companyRoutes);
app.use('/jobs', jobRoutes);
app.use('/applications', applicationRoutes);
app.use('/users', userRoutes);

app.use(errorHandler);

export const startServer = async () => {
    try {
        await sequelize.sync();
        const port = process.env.PORT || 3000;
        const server = app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
        return server;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
};

// 직접 실행 여부 확인
if (process.argv[1] === new URL(import.meta.url).pathname) {
    startServer();
}

export { app };
