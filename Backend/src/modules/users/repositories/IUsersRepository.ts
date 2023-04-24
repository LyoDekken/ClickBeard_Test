import User from '../infra/typeorm/entities/User';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<User | null>;
    findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
    findById(id: string): Promise<User | undefined | null>;
    findByEmail(email: string): Promise<User | undefined | null>;
    save(user: User): Promise<User>;
}
