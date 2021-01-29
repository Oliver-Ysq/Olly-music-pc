import {createContext, useContext} from 'react';
import AuthStore from './auth';
import HomeStore from "./home"

// 创建上下文
const context = createContext({
    AuthStore, HomeStore
});

export const useStores = () => useContext(context);