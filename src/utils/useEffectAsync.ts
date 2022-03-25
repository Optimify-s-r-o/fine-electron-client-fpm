import { useEffect } from 'react';

export default function useEffectAsync(effect: ()=> void) {

    useEffect(() => {
        effect();
    }, []);

}