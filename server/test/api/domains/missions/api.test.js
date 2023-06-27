import { createMocks } from "node-mocks-http";
import { handleGet, handleDelete, handlePut as indexHandlePut } from "../../../../pages/api/missions/[missionId]";
import { handlePut as betHandlePut } from "../../../../pages/api/missions/[missionId]/bet";
import { handlePut as failHandlePut } from "../../../../pages/api/missions/[missionId]/fail";
import { handlePut as successHandlePut } from "../../../../pages/api/missions/[missionId]/success";

describe('/api/missions/[missionId]', () => {
    test('when request GET /api/missions/[missionId]', async () => {

        const { req, res } = createMocks({
            url: '/api/missions/1/',
            method: 'GET',
            query: {
                missionId: 1,
            }
        });
    
        await handleGet(req, res);
    
        expect(res._getStatusCode()).toBe(200);
    
        const data = res._getJSONData();
        expect(data.message).toBe('Successful get mission');
    
        expect(data.data).toBeDefined();
        expect(data.data.id).toBe(1);
        expect(data.data.userId).toBe(2);
        expect(data.data.mission).toBe('2시간 안에 10킬');
        expect(data.data.missionReward).toBe(1000);        
    })

    test('when request PUT /api/missions/[missionId]', async () => {
        const body = {
            mission: "update",
            timelimit: 999
        }

        const { req, res } = createMocks({
            url: '/api/missions/1',
            method: 'PUT',
            body: body,
            query: {
                missionId: 1,
            }
        });
    
        await indexHandlePut(req, res);
    
        expect(res._getStatusCode()).toBe(200);
    
        const data = res._getJSONData();
        expect(data.message).toBe('Successful update mission');
    
        expect(data.data).toBeDefined();
        expect(data.data.mission).toBe(body.mission);        
        expect(data.data.timelimit).toBe(body.timelimit);        
    })

    test('when request DELETE /api/missions/[missionId]', async () => {
        const { req, res } = createMocks({
            url: '/api/missions/1',
            method: 'DELETE',
            query: {
                missionId: 1,
            }
        });
    
        await handleDelete(req, res);
    
        expect(res._getStatusCode()).toBe(200);
    
        const data = res._getJSONData();
        expect(data.message).toBe('Successful deactivate Mission');
    })


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
        expect(data.data.missionReward).toBe(3000);
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