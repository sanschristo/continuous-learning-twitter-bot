import { SortOrder } from './sort-order.type';

export interface RetweetConfig {
    hashtags: string[];
    numTweets?: number;
    sortOrder?: SortOrder;
}
