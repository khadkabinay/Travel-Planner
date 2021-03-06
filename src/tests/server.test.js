


				// import
				const app = require('../server/server.js');
				const supertest = require('supertest');
				const request = supertest(app);


				// testing response status is 200
				describe('/all should respond with status of 200', () => {
					it('/all', async (done) => {
						const response = await request.get('/all');
						expect(response.status).toBe(200);
						done();
					});
				});