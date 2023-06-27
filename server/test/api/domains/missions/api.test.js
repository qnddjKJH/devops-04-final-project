import { createMocks } from "node-mocks-http";
import { handlePut as betHandlePut } from "../../../../pages/api/missions/[missionId]/bet";
import { handlePut as failHandlePut } from "../../../../pages/api/missions/[missionId]/fail";
import { handlePut as successHandlePut } from "../../../../pages/api/missions/[missionId]/success";

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

    test('when request /api/missions/[missionId]/success', async () => {

        const { req, res } = createMocks({
            url: '/api/missions/1/success',
            method: 'PUT',
            query: {
                missionId: 1,
            }
        });
    
        await successHandlePut(req, res);
    
        expect(res._getStatusCode()).toBe(200);
    
        const data = res._getJSONData();
        expect(data.message).toBe('Success mission, congraturation');
    })
})