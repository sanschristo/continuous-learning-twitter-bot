import { RawRedditPosting } from '../../src/models/raw-reddit-json.interface';

export namespace RawRedditPostFixtures {
    export const rawNonNsfwNonReported: RawRedditPosting = {
        kind: 't3',
        data: {
            id: '12345',
            title: 'Some random title',
            over_18: false,
            user_reports: [],
            mod_reports: []
        }
    };

    export const rawNsfwReported: RawRedditPosting = {
        kind: 't3',
        data: {
            id: 'asdlfkjas',
            title: 'A different random title',
            over_18: true,
            user_reports: ['some report'],
            mod_reports: []
        }
    };

    export const rawNsfwNonReported: RawRedditPosting = {
        kind: 't3',
        data: {
            id: '98765',
            title: 'Nobody cares about the title',
            over_18: true,
            user_reports: [],
            mod_reports: []
        }
    };

    export const rawNonNsfwReported: RawRedditPosting = {
        kind: 't3',
        data: {
            id: 'dasfa',
            title: 'A another different random title',
            over_18: false,
            user_reports: [],
            mod_reports: ['some report']
        }
    };
}
