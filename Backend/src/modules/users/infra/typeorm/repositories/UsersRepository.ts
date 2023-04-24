import { Repository, Not } from "typeorm";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IFindAllProvidersDTO from "@modules/users/dtos/IFindAllProvidersDTO";
import { PostgresDataSource } from "@shared/infra/typeorm/index";

import User from "../entities/User";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = PostgresDataSource.getRepository(User);
    }

    public async create(data: ICreateUserDTO): Promise<User | null> {
        const user = this.ormRepository.create({
            name: data.name,
            email: data.email,
            password: data.password,
        });

        await this.ormRepository.save(user);

        return user;
    }

    public async findById(id: string): Promise<User | null> {
        const user = await this.ormRepository.findOne({
            where: {
                id,
            },
        });

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined | null> {
        const user = await this.ormRepository.findOne({
            where: { email },
        });

        return user;
    }

    public async findAllProviders({
        expect_user_id,
    }: IFindAllProvidersDTO): Promise<User[]> {
        let users: User[];

        if (expect_user_id) {
            users = await this.ormRepository.find({
                where: {
                    id: Not(expect_user_id),
                },
            });
        } else {
            users = await this.ormRepository.find();
        }

        return users;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default UsersRepository;
