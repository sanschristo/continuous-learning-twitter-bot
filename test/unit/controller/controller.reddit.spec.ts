import { startTweetRedditPosts } from '../../../src/controller/controller';
import Spy = jasmine.Spy;
import * as getRedditPosts from '../../../src/reddit/get-reddit-posts';
import * as tweet from '../../../src/bot-actions/tweet';
import config from '../../../src/configs/config';
import { RedditPost } from '../../../src/models/reddit-post.interface';
import { RedditPostFixtures } from '../../fixtures/reddit-post.fixture';

describe('Controller startTweetRedditPosts function', () => {
    const botMock = {};
    let getRedditPostsSpy: Spy;
    let tweetSpy: Spy;

    beforeAll(() => {
        getRedditPostsSpy = spyOn(getRedditPosts, 'getRedditPosts').and.returnValue(Promise.resolve([RedditPostFixtures.nonNsfwNonReported]));
        tweetSpy = spyOn(tweet, 'tweet').and.returnValue(undefined);
    });

    afterEach(() => {
        getRedditPostsSpy.calls.reset();
        tweetSpy.calls.reset();
    });

    it('calls geRedditPosts for each subreddit', () => {
        startTweetRedditPosts();

        expect(getRedditPostsSpy).toHaveBeenCalledTimes(config.tweetRedditPostConfig.subreddits.length);
    });

    it('gets reddit posts from each subreddit in config', () => {
        const numPosts = config.tweetRedditPostConfig.numPosts;
        startTweetRedditPosts();

        config.tweetRedditPostConfig.subreddits.forEach((subreddit) => {
            expect(getRedditPostsSpy).toHaveBeenCalledWith(subreddit, numPosts);
        });
    });

    it('tweets each reddit post returned', async (done) => {
        getRedditPostsSpy.and.returnValue(Promise.resolve([
            RedditPostFixtures.nonNsfwNonReported,
            RedditPostFixtures.nonNsfwNonReported,
            RedditPostFixtures.nonNsfwNonReported,
            RedditPostFixtures.nonNsfwNonReported,
            RedditPostFixtures.nonNsfwNonReported
        ]));
        // @ts-ignore
        const expectedTweetCalls = config.tweetRedditPostConfig.subreddits.length * config.tweetRedditPostConfig.numPosts;

        startTweetRedditPosts();
        setTimeout(() => {
            expect(tweetSpy).toHaveBeenCalledTimes(expectedTweetCalls);
            done();
        }, 50);
    });
});
