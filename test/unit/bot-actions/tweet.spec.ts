import * as callbackFactory from '../../../src/callbacks/callback.factory';
import Spy = jasmine.Spy;
import { tweet } from '../../../src/bot-actions/tweet';
import { TwitterEndpointsEnum } from '../../../src/models/twitter-endpoints.enum';

describe('tweet', () => {
    let callbackFactorySpy: Spy;
    const botMock = {
        post: jest.fn().mockImplementation(() => {})
    };

    beforeAll(() => {
        callbackFactorySpy = spyOn(callbackFactory, 'callbackFactory').and.returnValue((error: any, response: any) => {
            (error) ? console.log(error) : console.log(response);
        });
    });

    afterEach(() => {
        callbackFactorySpy.calls.reset();
        jest.clearAllMocks();
    });

    it('calls the bot with the status provided and callback received from the callbackFactory', () => {
        const status = { status: 'This is a tweet' };

        tweet(botMock as any, status);

        expect(botMock.post).toHaveBeenCalledWith(TwitterEndpointsEnum.StatusUpdate, status, callbackFactorySpy());
    });
});
