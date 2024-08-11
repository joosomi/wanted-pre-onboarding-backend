import request from 'supertest';
import { app, startServer } from '../app.js';
import { sequelize } from '../models';
import Job from '../models/job.js';
import Company from '../models/company.js';

let server;

beforeAll(async () => {
    await sequelize.sync({ force: true });

    await Company.create({
        name: '원티드랩',
        country: '한국',
        location: '서울',
    });

    server = await startServer();
});

afterAll(async () => {
    await sequelize.close();
    if (server) {
        server.close();
    }
});

describe('Job API', () => {
    let jobId;

    it('should create a job', async () => {
        const res = await request(app).post('/jobs').send({
            company_id: 1,
            position: '주니어 백엔드 개발자',
            reward: 1000000,
            description: '원티드랩에서 백엔드 주니어 개발자를 채용합니다',
            skills: 'Node.js',
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('skills', 'Node.js');
        jobId = res.body.data.id;
    });

    it('should update a job', async () => {
        const res = await request(app).put(`/jobs/${jobId}`).send({
            position: '시니어 백엔드 개발자',
            reward: 1500000,
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty(
            'position',
            '시니어 백엔드 개발자'
        );
        expect(res.body.data).toHaveProperty('reward', 1500000);
    });

    it('should get all jobs', async () => {
        await Job.create({
            companyId: 1,
            position: '프론트엔드 개발자 신입',
            reward: 1200000,
            description: '프론트 개발자 모집',
            skills: 'React',
        });

        const res = await request(app).get('/jobs');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should search jobs by position', async () => {
        const res = await request(app).get('/jobs?search=프론트');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data[0]).toHaveProperty(
            'position',
            '프론트엔드 개발자 신입'
        );
    });

    it('should get job detail', async () => {
        const otherJob = await Job.create({
            companyId: 1,
            position: '백엔드 개발자',
            reward: 1100000,
            description: '다른 백엔드 개발자 공고',
            skills: 'Java, Spring',
        });

        const res = await request(app).get(`/jobs/${jobId}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('otherJobs');
        expect(res.body.data.otherJobs).toContain(otherJob.id);
    });

    it('should delete a job', async () => {
        const res = await request(app).delete(`/jobs/${jobId}`);

        expect(res.statusCode).toEqual(204);
    });
});
