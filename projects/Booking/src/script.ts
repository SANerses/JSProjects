import { 
    saveCurrentSeanseName,
    getCurentSeanseName,
    getSeanses,
    setSeanses
 } from "./storage.js";
import {
    Seanse,
    Section,
} from "./types";

let countEl: HTMLElement | null = document.getElementById('count');
let totalEl: HTMLSpanElement | null = document.getElementById('total'); 
const leftSectionEl: HTMLElement | null = document.getElementById('leftSection');
const centerSectionEl: HTMLElement | null = document.getElementById('centerSection');
const rightSectionEl: HTMLElement | null = document.getElementById('rightSection');

let seansList: Seanse[] = getSeanses();

type AppState = {
    currentSeanse: Seanse | null;
}

const state: AppState = {
    currentSeanse: null,
};

function update(){
    renderCount();
    setSeanses(seansList);
}

function rederMovieList(arr: Seanse[]): void{
    const seanseSelectEl: HTMLSelectElement = document.getElementById("seanse-select") as HTMLSelectElement;
    const currentSeanseName = getCurentSeanseName();
    let currentSeanse: Seanse | undefined;

    for(let item of arr){
        const isSelected = (item.name === currentSeanseName);
        const opt:HTMLElement = new Option(
            `${item.name} (${item.price} $)`,
            item.name,
            isSelected,
            isSelected,
        );
        seanseSelectEl.appendChild(opt);

        if (isSelected) {
            currentSeanse = item;
        }
    }

    loadMovieData(currentSeanse || arr[0]);

    seanseSelectEl.addEventListener('change', (ev: Event) => {
        const newValue = (ev.target as HTMLSelectElement).value;
        loadMovieData(arr.find((el: Seanse) => (el.name === newValue)));
        saveCurrentSeanseName(newValue);
        update();
    });
}

function loadMovieData(data: Seanse | undefined) {
    if (data) { 
        state.currentSeanse = data;

        if (leftSectionEl) {
            if (data.holl.sections.left) {
                renderSeatsSelect(
                    leftSectionEl,
                    data.holl.sections.left,
                    'L',
                    data.ocupiedItems,
                    data.selectedItems,
                );
            } else {
                leftSectionEl.innerHTML = '';
            }
        }

        if (centerSectionEl) {
            renderSeatsSelect(
                centerSectionEl,
                data.holl.sections.center,
                'C',
                data.ocupiedItems,
                data.selectedItems,
            );
        }
    
        if (rightSectionEl) {
            if (data.holl.sections.right) {
                renderSeatsSelect(
                    rightSectionEl,
                    data.holl.sections.right,
                    'R',
                    data.ocupiedItems,
                    data.selectedItems,
                );
            } else {
                rightSectionEl.innerHTML = '';
            }
        }
    }
}

function renderSeatsSelect(
    container: HTMLElement,
    sectionData: Section,
    prefix: string,
    ocupiedItems: string[],
    selectedItems: string[],
){
    let result = '';
    for(let i = 0; i < sectionData.rowLength; i++){
        result += '<div class="row">';
        for(let j = 0; j < sectionData.columnLength; j++){
            const itemId = `${prefix}${i}-${j}`;
            const itemClass = ocupiedItems.includes(itemId)
             ? 'occupied'
             : (selectedItems.includes(itemId) ? 'selected' : '')
            result += `<div class="seat ${itemClass}" data-id="${itemId}"></div>`;
        }
        result += '</div>';
    }
    container.innerHTML = result;
}

function renderCount(){
    if (state.currentSeanse) {
        if(countEl){
            countEl.innerHTML = `${state.currentSeanse.selectedItems.length}`;
        }
    
        if(totalEl){
            const addTotal = state.currentSeanse.selectedItems.length * state.currentSeanse.price;
    
            totalEl.innerHTML = `${addTotal}`;
        }
    }
}

rederMovieList(seansList);

const sections = document.querySelector('.sections');

if (sections) {
    sections.addEventListener('click', (e: Event) => {
        const target: HTMLElement = (e.target as HTMLElement);
        if (target.dataset.id && state.currentSeanse) {
             if (!state.currentSeanse.ocupiedItems.includes(target.dataset.id)) {
                 if (state.currentSeanse.selectedItems.includes(target.dataset.id)) {
                     state.currentSeanse.selectedItems = state.currentSeanse.selectedItems
                         .filter((el) => (el !== target.dataset.id));
                 } else {
                     state.currentSeanse.selectedItems = [
                         ...state.currentSeanse.selectedItems,
                         target.dataset.id,
                     ];
                 }
     
                 target.classList.toggle('selected');
                 update();
             }
        } 
     });
}
