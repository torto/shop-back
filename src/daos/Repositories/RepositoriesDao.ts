import Repository, { IRepository } from '@entities/Repository';
import { githubUrlApi, pathUrlSearchRepo } from "@shared/constants";
import logger from "@shared/Logger";
import axios from 'axios';
import { format, subDays, parse } from "date-fns";

export interface IRepositoriesSearch {
    date?: string;
    language?: string;
    sort?: string;
    order?: string;
    page?: number;
    perPage?: number;
}

export interface IRepositoriesDao {
    search: (query: IRepositoriesSearch) => Promise<IRepository[] | null>;
}

class RepositoriesDao implements IRepositoriesDao {

    public async search({
        date = format(subDays(new Date(), 7), "yyyy-MM-dd"),
        language = '', 
        sort = 'starts',
        order = 'desc',
        page = 0,
        perPage = 100
    }: IRepositoriesSearch): Promise<IRepository[] | null> {
        logger.debug('Searching repositories')
        try {
            const url = `${githubUrlApi}${pathUrlSearchRepo}?q=created:>${date}${
              (language ? `+language:${language}` : '')
            }&sort=${sort}&order=${order}&page=${page}&per_page=${perPage}`;
            logger.info(`URL: ${url}`)
           
            const { data } = await axios.get(url);
            return data.items.map((item: any) =>  new Repository(item)) as [IRepository];
        } catch(err) {
            logger.error(err.message);
            throw err;
        }
    }

}
export default RepositoriesDao; 
