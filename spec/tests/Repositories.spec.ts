import supertest from 'supertest';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { Response, SuperTest, Test } from 'supertest';
import faker from 'faker';
import axios from 'axios';

import app from '@server';
import RepositoriesDao from '@daos/Repositories/RepositoriesDao';
import Repository, { IRepository, IRepositoryData } from '@entities/Repository';
import { pErr } from '@shared/functions';
import logger from '@shared/Logger';
import { format, subDays } from "date-fns";

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
                id: faker.random.number(),
                created_at: faker.date.past().toISOString(),
                name: faker.internet.userName(),
                html_url: faker.internet.url(),
                description: faker.commerce.productDescription(),
                stargazers_count: faker.random.number(),
                owner: {
                    type: 'User',
                    login: faker.internet.userName(),
                    avatar_url: faker.image.imageUrl(),
                },
              }),
              new Repository({
                id: faker.random.number(),
                created_at: faker.date.past().toISOString(),
                name: faker.internet.userName(),
                html_url: faker.internet.url(),
                description: faker.commerce.productDescription(),
                stargazers_count: faker.random.number(),
                owner: {
                    type: 'User',
                    login: faker.internet.userName(),
                    avatar_url: faker.image.imageUrl(),
                },
              }),
              new Repository({
                id: faker.random.number(),
                created_at: faker.date.past().toISOString(),
                name: faker.internet.userName(),
                html_url: faker.internet.url(),
                description: faker.commerce.productDescription(),
                stargazers_count: faker.random.number(),
                owner: {
                    type: 'User',
                    login: faker.internet.userName(),
                    avatar_url: faker.image.imageUrl(),
                },
              }),
              new Repository({
                id: faker.random.number(),
                created_at: faker.date.past().toISOString(),
                name: faker.internet.userName(),
                html_url: faker.internet.url(),
                description: faker.commerce.productDescription(),
                stargazers_count: faker.random.number(),
                owner: {
                    type: 'User',
                    login: faker.internet.userName(),
                    avatar_url: faker.image.imageUrl(),
                },
              })
          ] as IRepository[];

            spyOn(RepositoriesDao.prototype, "search").and.returnValue(
              Promise.resolve({data: repositories, total: 100} as IRepositoryData)
            );

            agent.get(searchPath)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(OK);

                    const repositoriesRes = res.body.data.map((repo: IRepository) => {
                        return repo as IRepository;
                    });
                    expect(repositoriesRes.length).toBe(4);
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

        it(`should mount a default url in axios endpoint`, (done) => {

            const axiosSpy = spyOn(axios, "get").and.returnValue(
                Promise.resolve({ data: { items: [] } }
            ));

            agent.get(searchPath).end((err: Error, res: Response) => {
              pErr(err);
              expect(axiosSpy.calls.mostRecent().args[0]).toEqual(
                `https://api.github.com/search/repositories?q=created:>${format(subDays(new Date(), 7), "yyyy-MM-dd")}&sort=starts&order=desc&page=0&per_page=100`
              );
              done();
            });
        });

        it(`should mount a url in axios with not default values`, (done) => {

            const axiosSpy = spyOn(axios, "get").and.returnValue(
            Promise.resolve({ data: { items: [] } })
          );

          agent
            .get(
              `${searchPath}?perPage=1&page=2&date=2020-01-01&language=javascript&sort=test&order=asc`
            )
            .end((err: Error, res: Response) => {
              pErr(err);
              expect(axiosSpy.calls.mostRecent().args[0]).toEqual(
                'https://api.github.com/search/repositories?q=created:>2020-01-01+language:javascript&sort=test&order=asc&page=2&per_page=1'
              );
              done();
            });
        });

    });

});
