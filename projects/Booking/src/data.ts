import {
    Movie,
    Seanse,
    Section,
    Holl,
 } from "./types";

const mainHoll: Holl = {
    name: 'Main Holl',
    sections: {
        center: {
            columnLength: 4,
            rowLength: 6,
        },
        left: {
            columnLength: 2,
            rowLength: 6,
        },
        right: {
            columnLength: 2,
            rowLength: 6,
        }
    }
}

const vipHoll: Holl = {
    name: 'VIP Holl',
    sections: {
        center: {
            columnLength: 4,
            rowLength: 4,
        },
        left: {
            columnLength: 1,
            rowLength: 4,
        },
    }
}

const HollType = {
    main: mainHoll,
    vip: vipHoll,
}

const titanicMovie: Movie = {
    name: 'Titanic',
};

const avatarMovie: Movie = {
    name: 'Avatar',
}

const avatar2Movie: Movie = {
    name: 'Avatar 2',
}

const seanse1: Seanse = {
    holl: HollType.main,
    movie: titanicMovie,
    name: 'Titanic 12:00',
    ocupiedItems: ['L1-2', 'C2-2'],
    selectedItems: [],
    price: 10,
};

const seanse2: Seanse = {
    holl: HollType.vip,
    movie: avatarMovie,
    name: 'Avatar 11:30',
    ocupiedItems: ['C1-1', 'L2-2', 'C1-2'],
    selectedItems: [],
    price: 40,
};

const seanse3: Seanse = {
    holl: HollType.main,
    movie: avatarMovie,
    name: 'Avatar 14:00',
    ocupiedItems: ['R1-2'],
    selectedItems: [],
    price: 70,
};

const seanse4: Seanse = {
    holl: HollType.vip,
    movie: avatar2Movie,
    name: 'Avatar2 17:00',
    ocupiedItems: [],
    selectedItems: [],
    price: 35,
};

export const SEANSE_LIST = [
    seanse1,
    seanse2,
    seanse3,
    seanse4,
];
