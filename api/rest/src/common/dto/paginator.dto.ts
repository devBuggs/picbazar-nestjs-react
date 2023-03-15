export class Paginator<T> {
  data: T[];
  count: number;
  current_page: number;
  firstItem: number;
  lastItem: number;
  last_page: number;
  per_page: number;
  total: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string;
  prev_page_url: string;
  //from
  //to
}
