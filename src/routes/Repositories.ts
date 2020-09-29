import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
const { BAD_REQUEST, CREATED, OK } = StatusCodes;
import { ParamsDictionary } from 'express-serve-static-core';

import RepositoriesDao from '@daos/Repositories/RepositoriesDao';
import { paramMissingError } from '@shared/constants';

// Init shared
const router = Router();
const repositoriesDao = new RepositoriesDao();

router.get('/search', async (req: Request, res: Response) => {
    try {
        const repositories = await repositoriesDao.search(req.query);
        return res.status(OK).json(repositories);
    }
    catch(err) {
        return res.status(BAD_REQUEST).json({error: err.message});
    }
});


export default router;
