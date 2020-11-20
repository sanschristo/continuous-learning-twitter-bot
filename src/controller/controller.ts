import { retweetById } from '../bot-actions/retweet-by-id';
import config from '../configs/config';
import Twitter  from 'twitter';
import { search } from '../bot-actions/search';
import { retweetConfigToSearchParamsMapper } from '../mappers/retweet-config-to-search-params.mapper';

export function startRetweet(twitter?: Twitter) {
    const bot = twitter || new Twitter(config.twitterAuth);
    const lookupTweetsOptions = retweetConfigToSearchParamsMapper(config.retweetConfig);

    lookupTweetsOptions.forEach(lookupTweetConfig => {
        search(bot, lookupTweetConfig, retweetById);
    });

}
