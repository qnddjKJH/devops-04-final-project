import { TYPES, container } from "../../../../utils/container";
import User from "../../../../src/domains/users/UserEntity";


describe('UserRepository test', () => {
    test('getAllUsers test', async () => {
        const userRepository = await container.get(TYPES.UserRepository);

        const users = await userRepository.getAllUsers();

        expect(users.length).toBe(2);
        expect(users[0].username).toBe('이주형');
    });

    test('getUserById test', async () => {
        const userRepository = await container.get(TYPES.UserRepository);

        const users = await userRepository.getAllUsers();

        const findId = users[0].id

        const findUser = await userRepository.getUserById(findId);

        expect(findUser.id).toBe(findId)
        expect(findUser.username).toBe(users[0].username)
    });

    test('createUser test', async () => {
        const userRepository = await container.get(TYPES.UserRepository);

        const newUser = new User(
            null,
            'test',
            'test1234',
            'test user',
            'test@test.com',
            'ROLE_USER',
            99999
        );

        const insertId = await userRepository.createUser(newUser);

        expect(insertId).not.toBe(null);
        expect(insertId).toBe(3);
    });

    test('updateUser test', async () => {
        const userRepository = await container.get(TYPES.UserRepository);

        const user = await userRepository.getUserById(1);

        // 1000 + 2000
        user.increaseCash(2000)
        await userRepository.updateUser(user);

        const updateUser = await userRepository.getUserById(1);
        

        expect(updateUser.username).toBe(user.username);
        expect(updateUser.cash).toBe(3000);
    });

    // delete 의 경우는 fk 에 의해서 mission 이 없어야 삭제됨
    // 케스케이드 또는 연관 관계 관련해서 설정해야함 고로 사용자 삭제는 탈퇴여부로 작성해야함 
    // todo: 사용자 탈퇴여부 업데이트
    // test('deleteUser test', async () => {
    //     const userRepository = await container.get(TYPES.UserRepository);

    //     const before = await userRepository.getAllUsers();

    //     await userRepository.deleteUser(1);

    //     const after = await userRepository.getAllUsers();

    //     expect(before.length).toBe(2);
    //     expect(after.length).toBe(1);
    // });
});