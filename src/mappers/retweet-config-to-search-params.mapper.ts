import { RetweetConfig } from '../models/retweet-config.interface';
import { SearchParams } from '../models/search-params.interface';

export const defaultResultType = 'recent';
export const defaultCount = 15;
export const lang = 'en';

export function retweetConfigToSearchParamsMapper(retweetConfig: RetweetConfig): SearchParams[] {
    const lookupTweetsOptionsArr: SearchParams[] = [];
    retweetConfig.hashtags.forEach(hashtag => {
        lookupTweetsOptionsArr.push({
            q: `%23${hashtag}`,
            result_type: retweetConfig.sortOrder || defaultResultType,
            lang: lang,
            count: retweetConfig.numTweets || defaultCount
        } as SearchParams)
    });
    return lookupTweetsOptionsArr;
}
