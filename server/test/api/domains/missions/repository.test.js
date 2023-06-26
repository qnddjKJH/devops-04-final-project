import { TYPES, container } from "../../../../utils/container";
import Mission from "../../../../src/domains/missions/MissionEntity";

describe('MissionRepository test', () => {
    test('getAllMissions test', async () => {
        const missionRepository = container.get(TYPES.MissionRepository);

        const missions = await missionRepository.getAllMissions();

        expect(missions.length).toBe(1);
    })

    test('getMissionById test', async () => {
        const missionRepository = container.get(TYPES.MissionRepository);

        const missions = await missionRepository.getAllMissions();
        const mission = missions[0]

        const findMission = await missionRepository.getMissionById(mission.id);

        expect(findMission.id).toBe(mission.id);
        expect(findMission.mission).toBe(mission.mission);
    })

    test('createMission test', async () => {
        const missionRepository = container.get(TYPES.MissionRepository);

        const create = new Mission(
            null,
            2,
            1,
            'test',
            2000,
            120,
            true
        )

        const createId = await missionRepository.createMission(create);

        const missions = await missionRepository.getAllMissions();

        expect(missions.length).toBe(2);
        expect(createId).toBe(2);
    })

    test('updateMission test', async () => {
        const missionRepository = container.get(TYPES.MissionRepository);

        const missions = await missionRepository.getAllMissions();
        const mission = missions[0]

        const beforeMissionText = mission.mission;
        mission.setMission('update')

        await missionRepository.updateMission(mission);

        const after = await missionRepository.getMissionById(mission.id);

        expect(after.mission).not.toBe(beforeMissionText);
        expect(after.mission).toBe('update');
    })

    test('deleteMission test', async () => {
        const missionRepository = container.get(TYPES.MissionRepository);

        const before = await missionRepository.getAllMissions();

        await missionRepository.deleteMission(before[0].id);

        const after = await missionRepository.getAllMissions();

        expect(before.length).toBe(1);
        expect(after.length).toBe(0);
    })
});