import { ITodo } from "./models";

const TODO_KEY = 'Arr';

export function getInitialTodos(): ITodo[] {
    const storageValue = localStorage.getItem(TODO_KEY);

    try {
        return storageValue ? JSON.parse(storageValue) : [];
    } catch {
        return [];
    }
}

export function setInitialTodos(currentVlaue: ITodo[]): void {
    localStorage.setItem(TODO_KEY, JSON.stringify(currentVlaue));
}
