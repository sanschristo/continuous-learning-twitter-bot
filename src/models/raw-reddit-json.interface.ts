export interface RawRedditJson {
    kind: 'Listing';
    data: RawRedditData;
}

export interface RawRedditData {
    modhash: string;
    dist: number;
    children: RawRedditPosting[];
}

export interface RawRedditPosting {
    kind: 't3';
    data: RawRedditPostingData;
}

export interface RawRedditPostingData {
    id: string;
    title: string;
    over_18: boolean;
    user_reports: string[];
    mod_reports: string[];
}
