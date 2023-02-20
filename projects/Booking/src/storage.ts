import { SEANSE_LIST } from "./data.js";
import { Seanse } from "./types.js";

const SeanseListKey = 'SEANSE_LIST';
const SelectedSeanseKey = 'SELECTED_SEANSE';

export function getSeanses(): Seanse[] {
    try {
        const storageValue = localStorage.getItem(SeanseListKey);
        return (storageValue && JSON.parse(storageValue)) || SEANSE_LIST;
    } catch {
        return SEANSE_LIST;
    }
}

export function setSeanses(currentVlaue: Seanse[]): void {
    localStorage.setItem(SeanseListKey, JSON.stringify(currentVlaue));
}

export function saveCurrentSeanseName(seanseName: string) {
    localStorage.setItem(SelectedSeanseKey, seanseName);
}

export function getCurentSeanseName(): string {
    const storageValue = localStorage.getItem(SelectedSeanseKey);
    return storageValue || '';
}