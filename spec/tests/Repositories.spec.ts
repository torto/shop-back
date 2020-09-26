import supertest from 'supertest';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { Response, SuperTest, Test } from 'supertest';
import faker from 'faker';

import app from '@server';
import RepositoriesDao from '@daos/Repositories/RepositoriesDao';
import Repository, { IRepository } from '@entities/Repository';
import { pErr } from '@shared/functions';
import { paramMissingError } from '@shared/constants';


describe('Repositories Routes', () => {

    const repositoriesPath = '/api/repositories';
    const searchPath = `${repositoriesPath}/search`;

    let agent: SuperTest<Test>;

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    describe(`"GET:${searchPath}"`, () => {

        it(`should return a JSON object with all the users and a status code of "${OK}" if the
            request was successful.`, (done) => {

            const repositories = [
              new Repository({
                name: faker.internet.userName(),
                html_url: faker.internet.url(),
                description: faker.commerce.productDescription(),
                stargazers_count: faker.random.number(),
              }),
              new Repository({
                name: faker.internet.userName(),
                html_url: faker.internet.url(),
                description: faker.commerce.productDescription(),
                stargazers_count: faker.random.number(),
              }),
              new Repository({
                name: faker.internet.userName(),
                html_url: faker.internet.url(),
                description: faker.commerce.productDescription(),
                stargazers_count: faker.random.number(),
              }),
              new Repository({
                name: faker.internet.userName(),
                html_url: faker.internet.url(),
                description: faker.commerce.productDescription(),
                stargazers_count: faker.random.number(),
              })
            ];            

            spyOn(RepositoriesDao.prototype, "search").and.returnValue(
              Promise.resolve(repositories)
            );

            agent.get(searchPath)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    const repositoriesRes = res.body.map((repo: IRepository) => {
                        return new Repository(repo);
                    });
                    expect(repositoriesRes).toEqual(repositories);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object containing an error message and a status code of
            "${BAD_REQUEST}" if the request was unsuccessful.`, (done) => {

            const errMsg = 'Could not fetch users.';
            spyOn(RepositoriesDao.prototype, 'search').and.throwError(errMsg);

            agent.get(searchPath)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(errMsg);
                    done();
                });
        });
    });

});