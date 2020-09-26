export interface IRepository {
   name: string;
   html_url: string;
   description: string;
   stargazers_count: number;
}

class Repository implements IRepository {
  public name: string;
  public html_url: string;
  public description: string;
  public stargazers_count: number;

  constructor({ name, html_url, description, stargazers_count }: IRepository) {
    this.name = name;
    this.html_url = html_url;
    this.description = description;
    this.stargazers_count = stargazers_count;
  }
}

export default Repository;
