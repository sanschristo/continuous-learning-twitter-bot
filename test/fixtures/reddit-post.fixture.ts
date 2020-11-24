import { RedditPost } from '../../src/models/reddit-post.interface';
import { RawRedditPostFixtures } from './raw-reddit-post.fixture';

export namespace RedditPostFixtures {
    export const nonNsfwNonReported: RedditPost = {
        id: RawRedditPostFixtures.rawNonNsfwNonReported.data.id,
        title: RawRedditPostFixtures.rawNonNsfwNonReported.data.title,
        nsfw: false,
        reported: false
    };

    export const nsfwNonReported: RedditPost = {
        id: RawRedditPostFixtures.rawNsfwNonReported.data.id,
        title: RawRedditPostFixtures.rawNsfwNonReported.data.title,
        nsfw: true,
        reported: false
    };

    export const nsfwReported: RedditPost = {
        id: RawRedditPostFixtures.rawNsfwReported.data.id,
        title: RawRedditPostFixtures.rawNsfwReported.data.title,
        nsfw: true,
        reported: true
    };

    export const nonNsfwReported: RedditPost = {
        id: RawRedditPostFixtures.rawNonNsfwReported.data.id,
        title: RawRedditPostFixtures.rawNonNsfwReported.data.title,
        nsfw: false,
        reported: true
    };
}
