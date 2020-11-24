import { RedditPost } from '../models/reddit-post.interface';
import request from 'superagent';
import { rawJsonToRedditPostsMapper } from '../mappers/raw-json-to-reddit-posts.mapper';

export async function getRedditPosts(subReddit: string, numPosts: number = 5): Promise<RedditPost[]> {
    const posts: RedditPost[] = [];

    const response = await request
        .get(`https://reddit.com/r/${subReddit}.json`)
        .send();

    if (response.error) {
        console.log(response.error);
    } else {
        rawJsonToRedditPostsMapper(response.body).forEach(post => {
            if (!post.reported && !post.nsfw && posts.length < numPosts) posts.push(post);
        });
    }

    return posts;
}
