# Twitter Bot

## Using this bot

To use this bot:
 - Clone the repo
 - Install packages with `npm install`
 - Go through the registration process for access to the Twitter API
 - Create a `.env` file with the following format:
    - ```
      CONSUMER_KEY = <consumer-key>
      CONSUMER_SECRET = <consumer-secret>
      ACCESS_TOKEN_KEY = <access-token-key>
      ACCESS_TOKEN_SECRET = <access-token-secret>
      ```
 - Update the config to the settings you want to use
    - Run the bot on your device using the following npm scripts:
        - `npm run start:local`

### Retweet feature

The retweet feature will search for tweets with provided hashtags, and retweet a specified number of them.

Searching Twitter for tweets with the provided hashtags can be done sorted by `popular` `recent` or `mixed` depending on the purpose.

Use the `retweetConfig` section of the `config` to configure the settings for this feature.

### Tweet Reddit Posts

The tweet Reddit post feature will search for posts from provided subreddits, and tweet the title, a link to the reddit post, and tag the tweet with the name of the subreddit.

Searching for Reddit posts only ever returns the posts in the default sort order ("hot").

Use the `tweetRedditPostConfig` section of the `config` to configure the setting for this feature. 
