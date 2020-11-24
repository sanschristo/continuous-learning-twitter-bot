import { getRedditPosts } from '../../../src/reddit/get-reddit-posts';
import request from 'superagent';
import Spy = jasmine.Spy;
import * as mapper from '../../../src/mappers/raw-json-to-reddit-posts.mapper';
import { RedditPostFixtures } from '../../fixtures/reddit-post.fixture';

describe('getRedditPosts', () => {
    let consoleLogMock: Spy;
    let superagentGetSpy: Spy;
    let rawJsonToRedditMapperSpy: Spy;
    const superagentSendMock = jest.fn().mockImplementation(() => {
        return { body: {} }
    });

    beforeAll(() => {
        consoleLogMock = spyOn(console, 'log');
        rawJsonToRedditMapperSpy = spyOn(mapper, 'rawJsonToRedditPostsMapper').and.returnValue([]);
        superagentGetSpy = spyOn(request, 'get').and.callFake(() => {
            return { send: superagentSendMock }
        });
    });

    afterEach(() => {
        consoleLogMock.calls.reset();
        superagentGetSpy.calls.reset();
        rawJsonToRedditMapperSpy.calls.reset();
        jest.clearAllMocks();
    });

    it('console logs errors returned in response', async () => {
        const errorMock = 'Something bad happened!';
        superagentSendMock.mockImplementation(() => { return { error: errorMock }; });

        await getRedditPosts('javascript');

        expect(consoleLogMock).toHaveBeenCalledWith(errorMock);
    });

    it('returns posts that are neither nsfw or reported', async () => {
        rawJsonToRedditMapperSpy.and.returnValue([RedditPostFixtures.nonNsfwNonReported]);
        superagentSendMock.mockImplementation(() => {
            return { body: {} };
        });

        const result = await getRedditPosts('javascript');

        expect(result[0]).toEqual(RedditPostFixtures.nonNsfwNonReported);
    });

    it('does not return posts that are nsfw but not reported', async () => {
        rawJsonToRedditMapperSpy.and.returnValue([RedditPostFixtures.nsfwNonReported]);
        superagentSendMock.mockImplementation(() => {
            return { body: {} };
        });

        const result = await getRedditPosts('javascript');

        expect(result.length).toEqual(0);
    });

    it('does not return posts that are reported but not nsfw', async () => {
        rawJsonToRedditMapperSpy.and.returnValue([RedditPostFixtures.nonNsfwReported]);
        superagentSendMock.mockImplementation(() => {
            return { body: {} };
        });

        const result = await getRedditPosts('javascript');

        expect(result.length).toEqual(0);
    });

    it('does not return posts that are both reported and nsfw', async () => {
        rawJsonToRedditMapperSpy.and.returnValue([RedditPostFixtures.nsfwReported]);
        superagentSendMock.mockImplementation(() => {
            return { body: {} };
        });

        const result = await getRedditPosts('javascript');

        expect(result.length).toEqual(0);
    });

    it('does not return more posts than specified', async () => {
        rawJsonToRedditMapperSpy.and.returnValue([
            RedditPostFixtures.nonNsfwNonReported,
            RedditPostFixtures.nonNsfwNonReported,
            RedditPostFixtures.nonNsfwNonReported
        ]);

        const result = await getRedditPosts('javascript', 2);

        expect(result.length).toEqual(2);
    });

    it('if no numPosts specified, then at most five posts are returned', async () => {
        rawJsonToRedditMapperSpy.and.returnValue([
            RedditPostFixtures.nonNsfwNonReported,
            RedditPostFixtures.nonNsfwNonReported,
            RedditPostFixtures.nonNsfwNonReported,
            RedditPostFixtures.nonNsfwNonReported,
            RedditPostFixtures.nonNsfwNonReported,
            RedditPostFixtures.nonNsfwNonReported,
            RedditPostFixtures.nonNsfwNonReported
        ]);

        const result = await getRedditPosts('javascript');

        expect(result.length).toEqual(5);
    });
});
