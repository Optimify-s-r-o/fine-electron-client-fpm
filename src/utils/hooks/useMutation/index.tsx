import React from "react";
import {MutationTuple,} from "./types";

export const useMutation =<TResponseData extends unknown>(): MutationTuple<TResponseData> => {

    const [loading, setLoading] = React.useState<boolean>(false);

    const [error, setError] = React.useState<any>("");

    const [data, setData] = React.useState<TResponseData | null>(null);

    const mutate = async (mutation: () => TResponseData | any):Promise<TResponseData> => {

        await setLoading(true);

        const result:TResponseData | any = await mutation();

        await setError(result.error);

        await setData(result);

        await setLoading(false);

        return result;
    };

    return [
        mutate,
        {
            data,
            loading,
            error,
        },
    ];
};
