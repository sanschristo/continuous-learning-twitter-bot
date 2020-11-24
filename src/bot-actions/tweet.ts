import Twitter from 'twitter';
import { callbackFactory, CallbackType } from '../callbacks/callback.factory';
import { TwitterEndpointsEnum } from '../models/twitter-endpoints.enum';
import { StatusUpdate } from '../models/status-update.interface';

export function tweet(bot: Twitter, status: StatusUpdate): void {
    const callback = callbackFactory(CallbackType.GenericErrorHandler);

    bot.post(TwitterEndpointsEnum.StatusUpdate, status, callback);
}
