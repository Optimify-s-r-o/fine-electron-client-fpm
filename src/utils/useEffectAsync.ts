import { useEffect } from 'react';

//TODO RICHARD - improve types
//TODO RICHARD - add params
export default function useEffectAsync(effect: ()=> void, params: any[]) {

    useEffect(() => {
        effect && effect();
    }, []);

}