export type ITodo = {
    text: string;
    isCompleted: boolean;
    isImportand: boolean;
}

export class Todo implements ITodo {
    text: string;
    isCompleted: boolean;
    isImportand: boolean;

    constructor(text: string) {
        this.text = text;
        this.isCompleted = false;
        this.isImportand = false;
    }
}