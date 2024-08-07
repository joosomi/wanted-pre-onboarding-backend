const request = require('supertest');
const { app, startServer } = require('../app');
const { sequelize } = require('../models');
const User = require('../models/user');
const Job = require('../models/job');
const Company = require('../models/company');

let server;
let company;
let user;
let job;

beforeAll(async () => {
    server = await startServer();
});

afterAll(async () => {
    await sequelize.close();
    if (server) {
        server.close();
    }
});

beforeEach(async () => {
    await sequelize.sync({ force: true });

    company = await Company.create({
        name: '원티드랩',
        country: '한국',
        location: '서울',
    });

    user = await User.create({
        username: 'testuser',
        email: 'testuser@example.com',
    });

    job = await Job.create({
        companyId: company.id,
        position: '백엔드 개발자',
        reward: 1000000,
        description: '백엔드 개발자를 모집합니다.',
        skills: 'Node.js',
    });
});

const applyToJob = async (jobId, userId) => {
    const res = await request(app)
        .post('/applications/apply')
        .send({ jobId, userId });
    console.log('Response:', res.status, res.body); // 로깅 추가
    return res;
};

describe('Application API', () => {
    it('should apply to a job', async () => {
        const res = await applyToJob(job.id, user.id);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('jobId', job.id);
        expect(res.body.data).toHaveProperty('userId', user.id);
    });

    it('should not apply to the same job twice', async () => {
        await applyToJob(job.id, user.id);
        const res = await applyToJob(job.id, user.id);

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty(
            'message',
            '이미 해당 채용공고에 지원하였습니다.'
        );
    });

    it('should return 404 if job not found', async () => {
        const res = await applyToJob(999, user.id);

        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty(
            'message',
            '채용공고를 찾을 수 없습니다.'
        );
    });

    it('should return 404 if user not found', async () => {
        const res = await applyToJob(job.id, 999);

        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty(
            'message',
            '사용자를 찾을 수 없습니다.'
        );
    });
});
