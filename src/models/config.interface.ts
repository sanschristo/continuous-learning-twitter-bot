import { AccessTokenOptions } from 'twitter';
import { RetweetConfig } from './retweet-config.interface';

export interface ConfigInterface {
    twitterAuth: AccessTokenOptions;
    retweetConfig: RetweetConfig;
}
