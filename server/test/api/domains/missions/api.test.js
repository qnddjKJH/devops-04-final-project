import { createMocks } from "node-mocks-http";
import { handlePut as betHandlePut } from "../../../../pages/api/missions/[missionId]/bet";
import { handlePut as failHandlePut } from "../../../../pages/api/missions/[missionId]/fail";

// MissionService 에서 사용하는 repository 를 모킹하여 사용할 모킹 객체 생성
const mockMissionRepository = {
    getMissionById: jest.fn(),
  };

const mockUserRepository = {
    getUserById: jest.fn(),
};

const mockMission = {
    id: 1,
    userId: 2,
    streamerId: 1,
    mission: '2시간 안에 10킬', 
    missionReward: 3000, 
    timelimit: 60, 
    isActive: 1
}

const mockUser = {
    id: 2,
    userId: 'test1234',
    password: '1111',
    username: 'test',
    email: 'test@gmail.com',
    role: 'ROLE_USER',
    cash: 10000
}

describe('/api/missions/[missionId]/bet', () => {
    test('when request /api/missions/[missionId]/bet', async () => {
        // Mock request and response objects
        const body = {
            user_id: 2,
            amount: 2000,
        };
        const { req, res } = createMocks({
            url: '/api/missions/1/bet',
            method: 'PUT',
            body: body,
            query: {
                missionId: 1,
            }
        });
    
        await betHandlePut(req, res);
    
        expect(res._getStatusCode()).toBe(200);
    
        const data = res._getJSONData();
        expect(data.message).toBe('Successful mission betting');
    
        expect(data.data).toBeDefined();
        expect(data.data.id).toBe(1);
        expect(data.data.userId).toBe(2);
        expect(data.data.mission).toBe('2시간 안에 10킬');
    })

    test('when request /api/missions/[missionId]/fail', async () => {
        const body = [
            { id: 2, user_id: 2, amount: 1000 },
        ];

        const { req, res } = createMocks({
            url: '/api/missions/1/fail',
            method: 'PUT',
            body: body,
            query: {
                missionId: 1,
            }
        });
    
        await failHandlePut(req, res);
    
        expect(res._getStatusCode()).toBe(200);
    
        const data = res._getJSONData();
        expect(data.message).toBe('fail mission process success');
    })
})