import { TYPES, container } from "../../../../utils/container";

describe('MissionService test', () => {
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
})
