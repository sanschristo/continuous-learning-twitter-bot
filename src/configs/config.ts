import { TweetRedditPostConfig } from '../models/tweet-reddit-post-config.interface';

if (process.env.ENVIRONMENT !== 'prod') {
    console.log('loaded dotenv');
    require('dotenv').config();
}
import { AccessTokenOptions } from 'twitter';
import { RetweetConfig } from '../models/retweet-config.interface';
import { ConfigInterface } from '../models/config.interface';

export default {
    twitterAuth: {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token_key: process.env.ACCESS_TOKEN_KEY,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
    } as AccessTokenOptions,
    retweetConfig: {
        hashtags: [ 'typescript', 'javascript', 'python', 'nodejs' ],
        sortOrder: 'mixed',
        numTweets: 10
    } as RetweetConfig,
    tweetRedditPostConfig: {
        subreddits: [ 'typescript', 'javascript', 'python', 'node' ],
        numPosts: 5
    } as TweetRedditPostConfig
} as ConfigInterface;
