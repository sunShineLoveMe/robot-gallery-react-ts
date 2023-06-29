import React, { useContext }  from "react";
import styles from "./Robot.module.css";
import { appContext, appSetStateContext } from "../AppState";
import { withAddToCart } from "./AddToCart";

export interface RobotProps {
    id: number;
    name: string;
    email: string;
    addToCart: (id, name) => void;
}
/**
 * React.FC<RobotProps> 表示robot是一个函数组件，并且接受robotprops作为参数
 * @param param
 * @returns 
 */
const RobotDiscount: React.FC<RobotProps> = ({id, name, email, addToCart}) => {
    const value = useContext(appContext)
    return (
        <div className={styles.cardContainer}>
            <img src={`https://robohash.org/${id}`} alt="robot"/>
            <h2>打折商品</h2>
            <p>{email}</p>
            <p>作者：{value.username}</p>
            <button onClick={() => addToCart(id, name)}>加入购物车</button>
        </div>
    )
}

export default withAddToCart(RobotDiscount);