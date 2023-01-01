import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export default function useEffectSkipOnMount(effect: EffectCallback, deps?: DependencyList): void {

    const isMounted = useRef(false);

    useEffect(() => {
        
        if (isMounted.current) {
            
            effect()

        } else {

            isMounted.current = true

        }

    }, [effect, deps])

} 