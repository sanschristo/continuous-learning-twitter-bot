import { RedditPost } from '../models/reddit-post.interface';
import { RawRedditJson } from '../models/raw-reddit-json.interface';

export function rawJsonToRedditPostsMapper(json: RawRedditJson): RedditPost[] {
    const posts: RedditPost[] = [];
    const rawPosts = json?.data?.children;

    rawPosts?.forEach(post => {
        posts.push({
            id: post.data.id,
            title: post.data.title,
            nsfw: post.data.over_18,
            reported: post.data.user_reports.length > 0 || post.data.mod_reports.length > 0
        } as RedditPost);
    });

    return posts;
}
