import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IHashProvider from '../../../users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        name,
        email,
        password
    }: IRequest): Promise<User | null> {
        const user = await this.usersRepository.findByEmail(email);

        if (user) {
            throw new AppError('E-mail already exists');
        }

        const passwordHash = await this.hashProvider.generateHash(password);

        const userExist = await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
        });

        return userExist;
    }
}

export default CreateUserService;
