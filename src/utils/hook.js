import { useEffect, useRef } from "react";
import { isEqual } from 'lodash';

// 用于useEffect第二个参数是引用类型的场景
export const useDeepCompareEffect = (callback, dependencies, compare) => {
    // 默认的对比函数采用lodash.isEqual，支持自定义
    if (!compare) compare = isEqual;
    const memoizedDependencies = useRef([]);
    if (!compare(memoizedDependencies.current, dependencies)) {
        memoizedDependencies.current = dependencies;
    }
    useEffect(callback, memoizedDependencies.current);
}