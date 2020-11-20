import { SortOrder } from './sort-order.type';

export interface SearchParams {
    q: string;
    result_type: SortOrder;
    lang: string;
    count: number;
}
