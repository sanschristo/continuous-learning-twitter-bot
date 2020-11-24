import { AccessTokenOptions } from 'twitter';
import { RetweetConfig } from './retweet-config.interface';
import { TweetRedditPostConfig } from './tweet-reddit-post-config.interface';

export interface ConfigInterface {
    twitterAuth: AccessTokenOptions;
    retweetConfig: RetweetConfig;
    tweetRedditPostConfig: TweetRedditPostConfig;
}
