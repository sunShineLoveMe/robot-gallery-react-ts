import React, { PropsWithChildren, useState } from "react";

interface AppStateValue {
    username: string,
    shoppingCart: { items:{ id: number, name: string }[] }
}
// react上下文
const defaultContextValue : AppStateValue = {
    username: '阿莱克斯',
    shoppingCart: { items: [] }
}
export const appContext = React.createContext(defaultContextValue);
export const appSetStateContext = React.createContext<
    React.Dispatch<React.SetStateAction<AppStateValue>> | undefined>(undefined);

/**
 * @desc appContext.Provider 是一个上下文提供者组件，用于向其子组件提供state的值
 * appContext 是一个上下文对象，它通过 createContext 函数创建，允许跨组件层级共享数据。
 * {props.children} 表示组件的子元素，这个表达式渲染了组件的所有子元素，允许在组件使用时传递其他组件或元素
 * 
 * @param props 
 * @returns 
 */
export const AppStateProvider: React.FC<PropsWithChildren<{}>> = (props) => {
    const [state, setState] = useState(defaultContextValue)
    return (
        <appContext.Provider value={state}>
            <appSetStateContext.Provider value={setState}>
                {props.children}
            </appSetStateContext.Provider>
        </appContext.Provider>
    )
}