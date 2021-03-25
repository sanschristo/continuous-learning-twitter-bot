import { startRetweet, startTweetRedditPosts } from './controller/controller';
import * as cron from 'node-cron';

const cronString = '0 * * * *';
const main = () => {
    startRetweet();
    startTweetRedditPosts();
};

cron.schedule(cronString, main);
