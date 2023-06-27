import { TYPES, container } from "../../../../utils/container";

describe('MissionService test', () => {
    test('updateMission test', async () => {
        const missionService = await container.get(TYPES.MissionService);

        const update = {
            mission: 'update', 
            timelimit: 999
        }

        const mission = await missionService.updateMission(1, update)

        expect(mission.mission).toBe(update.mission)
        expect(mission.timelimit).toBe(update.timelimit)
    })

    test('betOnMission test', async () => {
        const missionService = await container.get(TYPES.MissionService);

        // 초기값 미션 id: 1, reward: 1000
        // 유저 id: 2, cash: 10000
        const mission = await missionService.betOnMission(2, 1, 2000);

        expect(mission.missionReward).toBe(3000);
    })

    test('successOnMission test', async () => {
        const missionService = await container.get(TYPES.MissionService);
        const userRepository = await container.get(TYPES.UserRepository);

        // 초기값 미션 id: 1, reward: 1000
        // 유저 id: 1, cash: 1000
        await missionService.successOnMission(1);
        const mission = await missionService.getMissionById(1);

        const streamer = await userRepository.getUserById(mission.streamerId);
        
        expect(mission.isActive).toBe(0);
        expect(streamer.cash).toBe(2000);
    })

    test('deactiveMission test', async () => {
        const missionService = await container.get(TYPES.MissionService);

        await missionService.deactiveMission(1);
        const mission = await missionService.getMissionById(1);
        
        // mysql 에는 boolean 숫자로 저장된다. 따로 설정 해줘야함
        // 1: true, 0: false
        expect(mission.isActive).toBe(0);
    })

    test('deactiveMission test', async () => {
        const items = [
            { id: 2, userId: 2, amount: 1000 },
        ];
        
        const missionService = await container.get(TYPES.MissionService);
        const userRepository = await container.get(TYPES.UserRepository);

        await missionService.failOnMission(1, items);
        const user = await userRepository.getUserById(items[0].userId);
        const mission = await missionService.getMissionById(1);

        expect(user.cash).toBe(11000);
        expect(mission.isActive).toBe(0);
    })
})
