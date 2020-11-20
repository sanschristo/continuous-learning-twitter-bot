import { Subject } from 'rxjs';
import { Callback, ResponseData } from 'twitter';
export enum CallbackType {
    ExtractIds = 'extract ids',
    GenericErrorHandler = 'generic error handler'
}

export function callbackFactory(type: CallbackType, stream?: Subject<any>): Callback {
    const defaultCallback = function (error: any, tweets: ResponseData) {
        error ? console.log(error) : console.log(tweets);
    };
    let cb: Callback;
    switch (type) {
        case CallbackType.ExtractIds:
            if (!stream) {
                console.log('Error: Did not provide event stream...');
                cb = defaultCallback;
                break;
            }
            cb = function (error: any, tweets: ResponseData): void {
                if (error) {
                    console.log('Error:', error);
                } else if (tweets) {
                    tweets?.statuses.forEach((tweet: any) => { stream.next(tweet.id_str) });
                }
            }
            break;
        case CallbackType.GenericErrorHandler:
            cb = (error) => { if (error) console.log(`Error for ID:`, error) };
            break;
        default:
            cb = defaultCallback;
    }
    return cb;
}
