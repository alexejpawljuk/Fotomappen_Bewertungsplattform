import {useEffect} from "react";

export const useDebugMount = (componentName: string) => {
    useEffect(() => {
        console.log(`🟢 [${componentName}] mounted`);

        return () => {
            console.log(`🔴 [${componentName}] unmounted`);
        };
    }, []);
}