import { Stat } from "./stat";

export class PageHeader {
    public title!: string;
    public stats!: Stat[];
    constructor(title: string, stats: Stat[]) {
        this.title = title;
        this.stats = stats;
    }
}