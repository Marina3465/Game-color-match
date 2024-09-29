import { FC, useEffect } from "react";
import Block from "../Block/Block";
import style from './Board.module.css';
import { IColors } from "../../data/Colors";
import { checkMatch, restartGame, selectBlock, startGame } from "../../store/game.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface BoardProps {

}

const Board: FC<BoardProps> = () => {

    const dispatch = useDispatch();
    const blocks = useSelector((state: RootState) => state.game.blocks);
    const matchedBlocks = useSelector((state: RootState) => state.game.matchedBlocks);
    const rounds = useSelector((state: RootState) => state.game.rounds);
    const selectedBlocks = useSelector((state: RootState) => state.game.selectedBlocks);

    useEffect(() => {
        dispatch(startGame());
    }, [dispatch])

    useEffect(() => {
        if (selectedBlocks.length === 2) {
            setTimeout(() => {
                dispatch(checkMatch());
            }, 500);
        }
    }, [dispatch, selectedBlocks])

    const handleBlockClick = (block: IColors) => {
        dispatch(selectBlock(block));
    };

    const startOver = () => {
        dispatch(restartGame());
    }

    return (
        <>
            <h2>Раунды: {rounds}</h2>
            <div className={style['board']}>
                {blocks.map((block) => (
                    <Block
                        key={block.id}
                        color={block.color}
                        isActive={selectedBlocks.includes(block)}
                        isDone={matchedBlocks.includes(block)}
                        onClick={() => handleBlockClick(block)}
                    />
                ))}
            </div>
            {matchedBlocks.length === 16 && <h3>Игра окончена!</h3>}
            {matchedBlocks.length === 16 && <button onClick={startOver}>Начать заново?</button>}
        </>
    );
}

export default Board;

