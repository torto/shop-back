export interface IRepositoryData {
   total: number;
   data: IRepository[];
}

export interface IRepositoryRequest {
   name: string;
   html_url: string;
   description: string;
   created_at: string;
   owner: IRepositoryRequestOwner;
   stargazers_count: number;
   id: number;
}

export interface IRepositoryRequestOwner {
    avatar_url: string;
    type: string;
    login: string;
}
export interface IRepository {
   name: string;
   html_url: string;
   description: string;
   created_at: string;
   type: string;
   login: string;
   avatar_url: string;
   stargazers_count: number;
   id: number;
}

class Repository implements IRepository {
  public name: string;
  public html_url: string;
  public description: string;
  public created_at: string;
  public avatar_url: string;
  public type: string;
  public login: string;
  public stargazers_count: number;
  public id: number;

  constructor({ name, html_url, description, stargazers_count, id, created_at, owner: { avatar_url, type, login } }: IRepositoryRequest) {
    this.id = id;
    this.name = name;
    this.html_url = html_url;
    this.description = description;
    this.stargazers_count = stargazers_count;
    this.created_at = created_at;
    this.avatar_url = avatar_url;
    this.type = type;
    this.login = login;
  }
}

export default Repository;
