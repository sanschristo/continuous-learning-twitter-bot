import { callbackFactory, CallbackType } from '../callbacks/callback.factory';
import { SearchParams } from '../models/search-params.interface';
import { Subject } from 'rxjs';
import Twitter  from 'twitter';
import { TwitterEndpointsEnum } from '../models/twitter-endpoints.enum';


export function search(bot: Twitter, searchParams: SearchParams, next: Function): void {
    const stream = new Subject<string>();
    stream.subscribe({ next: tweetId => next(bot, tweetId) });
    const callback = callbackFactory(CallbackType.ExtractIds, stream);

    bot.get(TwitterEndpointsEnum.SearchTweets, searchParams, callback);
}
