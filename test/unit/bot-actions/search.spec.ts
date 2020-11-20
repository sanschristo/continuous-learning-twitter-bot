import * as callbackFactory from '../../../src/callbacks/callback.factory';
import { search } from '../../../src/bot-actions/search'
import { Subject } from 'rxjs';
import { TwitterEndpointsEnum } from '../../../src/models/twitter-endpoints.enum';

import Spy = jasmine.Spy;

const subscribeMock = jest.fn().mockImplementation(() => {});
jest.mock('rxjs', () => {
    return {
        Subject: jest.fn().mockImplementation(() => {
            return { subscribe: subscribeMock }
        })
    }
});

describe('search', () => {
    let callbackFactorySpy: Spy;
    const paramsMock = {};
    const tweetIdMock = '123456';
    const nextMock = jest.fn();
    const callbackMock = (someParam: any) => { return someParam; };
    const botMock = {
        get: jest.fn().mockImplementation(() => {
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

    it('creates a new RxJs Subject', () => {
        search(botMock as any, {} as any, () => {});

        expect(Subject).toBeCalledTimes(1);
    });

    it('subscribes to RxJs Subject with next function', () => {
        const nextMockString = 'next(bot, tweetId)';
        search(botMock as any, {} as any, nextMock);
        subscribeMock.mock.calls[0][0].next.call(tweetIdMock)

        expect(subscribeMock).toHaveBeenCalled();
        expect(subscribeMock.mock.calls[0][0].next).toBeInstanceOf(Function);
        expect(subscribeMock.mock.calls[0][0].next.toString()).toContain(nextMockString);
        expect(nextMock).toHaveBeenCalledWith(botMock, tweetIdMock);
    });

    it('calls the callbackFactory', () => {
        search(botMock as any, {} as any, () => {});
        expect(callbackFactorySpy).toHaveBeenCalled();

        expect(callbackFactorySpy.calls.mostRecent().args[0]).toEqual(callbackFactory.CallbackType.ExtractIds);
        expect(callbackFactorySpy.calls.mostRecent().args[1]).toEqual(new Subject());
    });

    it('calls the get method on the bot with the correct endpoint, params, and callback', () => {
        search(botMock as any, paramsMock as any, () => {});

        expect(botMock.get).toHaveBeenCalled();
        expect(botMock.get).toHaveBeenCalledWith(TwitterEndpointsEnum.SearchTweets, paramsMock, callbackMock);
    });
});
