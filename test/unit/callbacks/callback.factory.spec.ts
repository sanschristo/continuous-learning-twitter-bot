import { callbackFactory, CallbackType } from '../../../src/callbacks/callback.factory';
import Spy = jasmine.Spy;

describe('callbackFactory', () => {
    let consoleLogMock: Spy;
    let nextMock = jest.fn();

    beforeEach(() => {
        consoleLogMock = spyOn(console, 'log')
    });

    afterEach(() => {
        consoleLogMock.calls.reset();
        jest.clearAllMocks();
    });

    it('logs error message when an RxJs stream is not provided', () => {
        callbackFactory(CallbackType.ExtractIds);

        expect(consoleLogMock).toHaveBeenCalledWith('Error: Did not provide event stream...');
    });

    it('default callback console logs errors', () => {
        const errorMock = 'Some random error!';

        const result = callbackFactory('Not a valid type' as any);
        result(errorMock, null as any, null as any);

        expect(result).toBeInstanceOf(Function);
        expect(consoleLogMock).toHaveBeenCalledWith(errorMock);
    });

    it('default callback console logs tweets', () => {
        const tweetMock = { tweetId: 1231223 };

        const result = callbackFactory('Not a valid type' as any);
        result(null, tweetMock, null as any);

        expect(result).toBeInstanceOf(Function);
        expect(consoleLogMock).toHaveBeenCalledWith(tweetMock);
    });

    it('extractIds callback console logs errors', () => {
        const errorMock = 'Some random error!';

        const result = callbackFactory(CallbackType.ExtractIds, { next: () => {}} as any);
        result(errorMock, undefined as any, undefined as any);

        expect(result).toBeInstanceOf(Function);
        expect(consoleLogMock).toHaveBeenCalledWith('Error:', errorMock);
    });

    it('extractIds callback calls next with tweetIds', () => {
        const tweetIdsMock = ['12345', 'blob', 'random'];
        const tweetsMock = {
            statuses: [
                { id_str: tweetIdsMock[0] },
                { id_str: tweetIdsMock[1] },
                { id_str: tweetIdsMock[2] }
            ]
        };

        const result = callbackFactory(CallbackType.ExtractIds, { next: nextMock } as any);
        result(undefined, tweetsMock as any, undefined as any);

        expect(nextMock).toHaveBeenCalledTimes(3);
        expect(nextMock).toHaveBeenCalledWith(tweetIdsMock[0]);
        expect(nextMock).toHaveBeenCalledWith(tweetIdsMock[1]);
        expect(nextMock).toHaveBeenCalledWith(tweetIdsMock[2]);
    });

    it('extractIds callback does not call next when no tweets are provided', () => {
        const result = callbackFactory(CallbackType.ExtractIds, { next: nextMock } as any);
        result(undefined, undefined as any, undefined as any);

        expect(nextMock).not.toHaveBeenCalled();
    });

    it('extractIds callback does not call next with malformed response body', () => {
        const tweetIdMock = '12345';
        const tweetsMock = { notStatuses: [ { id_str: tweetIdMock } ] };

        const result = callbackFactory(CallbackType.ExtractIds, { next: nextMock } as any);
        result(undefined, tweetsMock as any, undefined as any);

        expect(nextMock).not.toHaveBeenCalled();
    });

    it('generic error handler console logs the error messages', () => {
        const errorMock = 'Some different random error';

        const result = callbackFactory(CallbackType.GenericErrorHandler);
        result(errorMock as any, undefined as any, undefined as any);

        expect(consoleLogMock).toHaveBeenCalledWith('Error:', errorMock);
    });

    it('generic error handler does not console logs the error messages if none are provided', () => {
        const result = callbackFactory(CallbackType.GenericErrorHandler);
        result(undefined as any, undefined as any, undefined as any);

        expect(consoleLogMock).not.toHaveBeenCalled();
    });
});
