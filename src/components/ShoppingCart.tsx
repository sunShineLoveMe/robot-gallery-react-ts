import React from 'react';
import styles from "./ShoppingCart.module.css"
import { FiShoppingCart } from "react-icons/fi";
import { appContext } from '../AppState';

/**
 *  state 和 props 区别
 *  state: 是组件对外的接口，而props 是组件对内的接口
 *         state 是组件内部的数据，组件内部可以自由修改,如果修改就用函数setState() 
 *         从而触发render函数进行渲染
 *  需要注意的是：构造函数constructor 是唯一可以给state 赋值的地方,其中state更新是异步更新 
 * 
 *  
 *  props 用于组件间的数据传递，而state 用于组件内部的数据传递
 *  props 就是传入函数的参数，是从传入组件的内部的数据，更准确的说：是从父组件传递向子组件的数据
 *  因此是只读属性，不能修改
 */

interface Props { }

interface State {
    isOpen: boolean;
}

class ShoppingCart extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false,
        }
    }

    handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        return (
            <appContext.Consumer>{(value) => {
                return <div className={styles.cartContainer}>
                    <button
                        className={styles.button}
                        onClick={this.handleClick}
                    >
                        <FiShoppingCart />
                        <span>购物车 {value.shoppingCart.items.length} （件）</span>
                    </button>
                    <div className={styles.cartDropDown}
                        style={{
                            display: this.state.isOpen ? "block" : "none"
                        }}
                    >
                        <ul>
                            {value.shoppingCart.items.map((i) =>(
                                <li>{i.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            }}
            </appContext.Consumer>
        )
    }
}

export default ShoppingCart;