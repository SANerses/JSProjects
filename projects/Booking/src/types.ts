export type Section = {
    rowLength: number;
    columnLength: number;
};

export type Holl = {
    name: string;
    sections: {
        left?: Section;
        right?: Section;
        center: Section;
    }
}

export type Movie = {
    name: string;
}

export type Seanse = {
    name: string;
    holl: Holl;
    movie: Movie;
    selectedItems: string[];
    ocupiedItems: string[];
    price: number;
}
