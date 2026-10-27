export class Stat{
    id!: number;
    title: string;
    value: number;

    constructor(title: string, value: number){
        this.id = Math.floor(Math.random() * 1000000);
        this.title = title;
        this.value = value;
    }
}