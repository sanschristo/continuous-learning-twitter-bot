import * as callbackFactory from '../../../src/callbacks/callback.factory';
import { CallbackType } from '../../../src/callbacks/callback.factory';
import { retweetById } from '../../../src/bot-actions/retweet-by-id';
import { TwitterEndpointsEnum } from '../../../src/models/twitter-endpoints.enum';

import Spy = jasmine.Spy;


describe('retweetById', () => {
    let callbackFactorySpy: Spy;
    const tweetIdMock = '123456';
    const nextMock = jest.fn().mockImplementation(() => {});
    const callbackMock = (someParam: any) => { return someParam; };
    const botMock = {
        post: jest.fn().mockImplementation(() => {
            nextMock(botMock, tweetIdMock);
        })
    }

    beforeEach(() => {
        callbackFactorySpy = spyOn(callbackFactory, 'callbackFactory').and.returnValue(callbackMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
        callbackFactorySpy.calls.reset();
    });

    it('calls callbackFactory', () => {
        retweetById(botMock as any, tweetIdMock);

        expect(callbackFactorySpy).toHaveBeenCalledWith(CallbackType.GenericErrorHandler);
    });

    it('call bot with correct path and callback returned by factory', () => {
        const path = `${TwitterEndpointsEnum.RetweetTweet}/${tweetIdMock}`;

        retweetById(botMock as any, tweetIdMock);

        expect(botMock.post).toHaveBeenCalledWith(path, callbackMock);
    });
});
