import {
    defaultCount,
    defaultResultType,
    lang,
    retweetConfigToSearchParamsMapper
} from '../../../src/mappers/retweet-config-to-search-params.mapper';
import { RetweetConfig } from '../../../src/models/retweet-config.interface';

describe('retweetConfigToSearchParamsMapper', () => {
    const qPrepend = '%23';
    const hashtags = ['something', 'somethingElse', 'somethingEvenDifferent'];

    it('returns only one SearchParams object when one hashtag is provided in the retweetConfig provided', () => {
        const hashtag = hashtags[0];
        const retweetConfig: RetweetConfig = {
            hashtags: [hashtag]
        };

        const result = retweetConfigToSearchParamsMapper(retweetConfig);

        expect(result.length).toEqual(1);
    });

    it('maps retweetConfig with a single hashtag correctly', () => {
        const hashtag = hashtags[1];
        const retweetConfig: RetweetConfig = {
            hashtags: [hashtag]
        };

        const result = retweetConfigToSearchParamsMapper(retweetConfig)[0];

        expect(result.q).toEqual(`${qPrepend}${hashtag}`);
    });

    it('defaults optional values', () => {
        const hashtag = hashtags[2];
        const retweetConfig: RetweetConfig = {
            hashtags: [hashtag]
        };

        const result = retweetConfigToSearchParamsMapper(retweetConfig)[0];

        expect(result.lang).toEqual(lang);
        expect(result.count).toEqual(defaultCount);
        expect(result.result_type).toEqual(defaultResultType);
    });

    it('maps provided values correctly', () => {
        const hashtag = hashtags[0];
        const retweetConfig: RetweetConfig = {
            hashtags: [hashtag],
            sortOrder: 'recent',
            numTweets: 100

        };

        const result = retweetConfigToSearchParamsMapper(retweetConfig)[0];

        expect(result.count).toEqual(retweetConfig.numTweets);
        expect(result.result_type).toEqual(retweetConfig.sortOrder);
    });

    it('returns number of SearchParams objects as hashtags on retweetConfig provided', () => {
        const retweetConfig: RetweetConfig = {
            hashtags: hashtags
        };

        const result = retweetConfigToSearchParamsMapper(retweetConfig);

        expect(result.length).toEqual(hashtags.length);
    });
});
