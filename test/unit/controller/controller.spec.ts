import config from '../../../src/configs/config';
import * as mapper from '../../../src/mappers/retweet-config-to-search-params.mapper';
import * as retweetById from '../../../src/bot-actions/retweet-by-id';
import * as search from '../../../src/bot-actions/search';
import { SearchParams } from '../../../src/models/search-params.interface';
import { startRetweet } from '../../../src/controller/controller';
import Twitter from 'twitter';

import Spy = jasmine.Spy;

describe('Controller functions', () => {
    let mapperSpy: Spy;
    let searchSpy: Spy;
    let retweetSpy: Spy;
    const mockTwitterBot: object = {};

    const mockSearchParams: SearchParams = {
        q: 'someQueryString',
        result_type: 'popular',
        count: 3,
        lang: 'en'
    };

    beforeEach(() => {
        mapperSpy = spyOn(mapper, 'retweetConfigToSearchParamsMapper').and.returnValue([mockSearchParams]);
        searchSpy = spyOn(search, 'search').and.returnValue(null);
        retweetSpy = spyOn(retweetById, 'retweetById');
    });

    afterEach(() => {
        mapperSpy.calls.reset();
        searchSpy.calls.reset();
    });

    it('calls mapper function to be called with config', () => {
        startRetweet();
        expect(mapperSpy).toHaveBeenCalled();
        expect(mapperSpy).toHaveBeenCalledWith(config.retweetConfig);
    });

    it('calls search method with bot, returned search params, and retweet callback', () => {
        startRetweet(mockTwitterBot as any);
        expect(searchSpy).toHaveBeenCalled();
        expect(searchSpy).toHaveBeenCalledWith(mockTwitterBot, mockSearchParams, retweetSpy);
    });

    it('calls search method for each search param returned by mapper', () => {
        mapperSpy.and.returnValue([mockSearchParams, mockSearchParams]);

        startRetweet(mockTwitterBot as any);
        expect(searchSpy).toBeCalledTimes(2);
        expect(searchSpy).toHaveBeenNthCalledWith(1, mockTwitterBot, mockSearchParams, retweetSpy);
        expect(searchSpy).toHaveBeenNthCalledWith(2, mockTwitterBot, mockSearchParams, retweetSpy);
    });

    it('calls search method with new bot if one is not provided', () => {
        mapperSpy.and.returnValue([mockSearchParams, mockSearchParams])

        startRetweet();
        expect(searchSpy).toHaveBeenCalled();
        expect(searchSpy.calls.mostRecent().args[0]).toBeInstanceOf(Twitter);
    });
});
