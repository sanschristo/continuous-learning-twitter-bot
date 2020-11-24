import { rawJsonToRedditPostsMapper } from '../../../src/mappers/raw-json-to-reddit-posts.mapper';
import { RawRedditJson, RawRedditPosting } from '../../../src/models/raw-reddit-json.interface';
import { RedditPostFixtures } from '../../fixtures/reddit-post.fixture';
import { RawRedditPostFixtures } from '../../fixtures/raw-reddit-post.fixture';

describe('rawJsonToRedditPostsMapper', () => {
    let rawJsonMock: RawRedditJson;

    beforeEach(() => {
        rawJsonMock = {
            kind: 'Listing',
            data: {
                modhash: 'alsdkjflasdkjfhalsdhfalj',
                dist: 3,
                children: [ RawRedditPostFixtures.rawNonNsfwNonReported ]
            }
        };
    });

    it('returns a single RedditPost object if there is only one child on the json provided', () => {
        const result = rawJsonToRedditPostsMapper(rawJsonMock);

        expect(result.length).toEqual(1);
    });

    it('maps single posting correctly', () => {
        const result = rawJsonToRedditPostsMapper(rawJsonMock);

        expect(result[0]).toEqual(RedditPostFixtures.nonNsfwNonReported);
    });

    it('returns same number of RedditPost objects as children on the provided json', () => {
        rawJsonMock.data.children = [
            RawRedditPostFixtures.rawNonNsfwNonReported,
            RawRedditPostFixtures.rawNsfwReported,
            RawRedditPostFixtures.rawNonNsfwReported
        ];

        const result = rawJsonToRedditPostsMapper(rawJsonMock);

        expect(result[0]).toEqual(RedditPostFixtures.nonNsfwNonReported);
        expect(result[1]).toEqual(RedditPostFixtures.nsfwReported);
        expect(result[2]).toEqual(RedditPostFixtures.nonNsfwReported);
    });

    it('maps reported nsfw postings correctly', () => {
        rawJsonMock.data.children = [ RawRedditPostFixtures.rawNsfwReported ];

        const result = rawJsonToRedditPostsMapper(rawJsonMock);

        expect(result[0].nsfw).toEqual(true);
        expect(result[0].reported).toEqual(true);
    });

    it('maps reported non-nsfw postings correctly', () => {
        rawJsonMock.data.children = [ RawRedditPostFixtures.rawNonNsfwReported ];

        const result = rawJsonToRedditPostsMapper(rawJsonMock);

        expect(result[0].nsfw).toEqual(false);
        expect(result[0].reported).toEqual(true);
    });

    it('returns empty array if no json is provided', () => {
        const result = rawJsonToRedditPostsMapper(undefined as any);

        expect(result.length).toEqual(0);
    });

    it('returns empty array if no data exists on provided json', () => {
        const result = rawJsonToRedditPostsMapper({} as any);

        expect(result.length).toEqual(0);
    });

    it('returns empty array if no children exist on provided json', () => {
        const result = rawJsonToRedditPostsMapper({data: {children: []}} as any);

        expect(result.length).toEqual(0);
    });
});
