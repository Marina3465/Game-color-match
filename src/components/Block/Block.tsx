import { FC } from "react";
import styles from './Block.module.css';

interface BlockProps {
    color: string | undefined;
    isActive: boolean;
    isDone: boolean;
    onClick: () => void;
}

const Block: FC<BlockProps> = (props) => {

    const getBackgroundColor = () => {
        if (props.isDone) {
            return 'black'; 
        }
        if (props.isActive) {
            return props.color; 
        }
        return 'grey'; 
    };

    return (
        <button
        className={styles['box']}
           style={{ background:  getBackgroundColor()}}
            onClick={props.onClick}
        />
    );
}

export default Block;
