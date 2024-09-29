import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { colors, IColors } from "../data/Colors";

interface GameState {
    blocks: IColors[];
    selectedBlocks: IColors[];
    matchedBlocks: IColors[];
    rounds: number;
}

const initialState: GameState = {
    blocks: [],
    selectedBlocks: [],
    matchedBlocks: [],
    rounds: 0
}

const shuffle = (array: IColors[]) => {
    const shuffledArray = array.slice();

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state) => {
            state.blocks = shuffle(colors);
            state.rounds = 0;
        },
        selectBlock: (state, action: PayloadAction<IColors>) => {
            const selectBlock = action.payload;
            if (state.selectedBlocks.length < 2 && !state.selectedBlocks.find(r => r.id === selectBlock.id) && !state.matchedBlocks.find(r => r.id === selectBlock.id)) {
                state.selectedBlocks.push(selectBlock);
            }
        },
        checkMatch: (state) => {
            if (state.selectedBlocks.length === 2) {
                const [firstB, secondB] = state.selectedBlocks;
                if ((firstB.color === secondB.color)) {
                    state.matchedBlocks.push(...state.selectedBlocks);
                }
                state.selectedBlocks = [];
                state.rounds++;
            }
        },
        resetSelection: (state) => {
            state.selectedBlocks = [];
        },
        restartGame: (state) => {
            state.blocks = shuffle(colors);
            state.selectedBlocks = [];
            state.matchedBlocks = [];
            state.rounds = 0;
        }
    },
})

export const { startGame, selectBlock, checkMatch, resetSelection, restartGame } = gameSlice.actions;
export default gameSlice.reducer;