import { TYPES, container } from "../../../../utils/container";
import Mission from "../../../../src/domains/missions/MissionEntity";

<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> develop
=======
>>>>>>> 451598d1bd15a7698a6d699f191de9170435a967
describe('MissionRepository test', () => {
    test('getAllMissions test', async () => {
        const missionRepository = container.get(TYPES.MissionRepository);

        const missions = await missionRepository.getAllMissions();
<<<<<<< HEAD
<<<<<<< HEAD
=======
        console.log(missions);
>>>>>>> develop
=======
>>>>>>> 451598d1bd15a7698a6d699f191de9170435a967

        expect(missions.length).toBe(1);
    })

    test('getMissionById test', async () => {
        const missionRepository = container.get(TYPES.MissionRepository);

        const missions = await missionRepository.getAllMissions();
        const mission = missions[0]
<<<<<<< HEAD
<<<<<<< HEAD
=======
        console.log(mission);
>>>>>>> develop
=======
>>>>>>> 451598d1bd15a7698a6d699f191de9170435a967

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
<<<<<<< HEAD
<<<<<<< HEAD
=======
        console.log(createId);
>>>>>>> develop
=======
>>>>>>> 451598d1bd15a7698a6d699f191de9170435a967

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

<<<<<<< HEAD
<<<<<<< HEAD
        await missionRepository.updateMission(mission);
=======
        await missionRepository.updateMission(mission.id, mission);
>>>>>>> develop
=======
        await missionRepository.updateMission(mission);
>>>>>>> 451598d1bd15a7698a6d699f191de9170435a967

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