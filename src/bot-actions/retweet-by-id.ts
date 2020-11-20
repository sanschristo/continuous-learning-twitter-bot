import Twitter from 'twitter';
import { TwitterEndpointsEnum } from '../models/twitter-endpoints.enum';
import { callbackFactory, CallbackType } from '../callbacks/callback.factory';

export function retweetById(bot: Twitter, tweetId: string) {
    const callback = callbackFactory(CallbackType.GenericErrorHandler);
    const path = `${TwitterEndpointsEnum.RetweetTweet}/${tweetId}`;

    bot.post(path, callback);
}
