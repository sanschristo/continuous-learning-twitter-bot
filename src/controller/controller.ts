import { retweetById } from '../bot-actions/retweet-by-id';
import config from '../configs/config';
import Twitter from 'twitter';
import { search } from '../bot-actions/search';
import { retweetConfigToSearchParamsMapper } from '../mappers/retweet-config-to-search-params.mapper';
import { getRedditPosts } from '../reddit/get-reddit-posts';
import { tweet } from '../bot-actions/tweet';
import { callbackFactory, CallbackType } from '../callbacks/callback.factory';

export function startRetweet(twitter?: Twitter) {
    const bot = twitter || new Twitter(config.twitterAuth);
    const lookupTweetsOptions = retweetConfigToSearchParamsMapper(config.retweetConfig);

    lookupTweetsOptions.forEach(lookupTweetConfig => {
        search(bot, lookupTweetConfig, retweetById);
    });
}

export function startTweetRedditPosts(twitter?: Twitter) {
    const bot = twitter || new Twitter(config.twitterAuth);

    config.tweetRedditPostConfig.subreddits.forEach(subreddit => {
        getRedditPosts(subreddit, config.tweetRedditPostConfig.numPosts).then(posts => {
            posts.forEach(post => {
                const status = {
                    status: `${post.title} https://reddit.com/${post.id} #${subreddit}`
                };

                tweet(bot, status);
            });
        });
    });
}
