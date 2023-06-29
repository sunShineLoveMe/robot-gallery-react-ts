import React, { useState, useEffect } from 'react';
import logo from "./asserts/images/logo.svg";
import Robot from './components/Robot';
import RobotDiscount from './components/RobotDiscount';
import ShoppingCart from './components/ShoppingCart';

// JSS模块化引入组件
import styles from './App.module.css';

interface Props {
}

interface State {
  robotGallery: any[];
}

const App: React.FC<Props> = (props) => {
  // 第二个参数是状态更新函数
  const [count, setCount] = useState<number>(0)
  const [robotGallery, setRobotGallery] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  useEffect(() => {
    document.title = `点击${count}次`
  }, [count])

  // 用promise模式来异步请求
  // useEffect(() => {
  //   fetch("http://jsonplaceholder.typicode.com/users")
  //   .then(response => response.json())
  //   .then(data => setRobotGallery(data))
  // }, [])

  // useEffect用async和await来异步请求
  useEffect(() => {
    const fetchData = async() => {
      setLoading(true)
      try {
        const response = await fetch("http://jsonplaceholder.typicode.com/users")
        const data = await response.json()
        setRobotGallery(data)
      } catch (e) {
        if(e instanceof Error) {
          setError(e.message)
        }
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <h1>罗伯特机器人炫酷吊炸天online购物平台的名字要长</h1>
      </div>
      <button
        onClick = { ()=> {
          setCount(count + 1)
        } }
        >Click</button>
        <span>count: {count}</span>
      <ShoppingCart />
      { (!error || error !== "") && <div>网站出错：{error}</div>}
      {
        !loading ? (
              <div className={styles.robotList}>
            {robotGallery.map((r, index) => (
              index % 2 == 0 ?
              <RobotDiscount id={r.id} email={r.email} name={r.name} /> :
              <Robot id={r.id} email={r.email} name={r.name} />))
            }
          </div>
        ) : (
          <h2>loading 加载中...</h2>
        )

      }
    </div>
  );
}

export default App;
