import React from "react";
import {MutationTuple,} from "./types";

export const useMutation = <TInputData, TResponseData>(): MutationTuple<TResponseData> => {

    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<any>("");
    const [data, setData] = React.useState<TResponseData | null>(null);

    const mutate = async <ResultType extends {}, VariablesType extends {} = {}> (mutation: any) => {
        await setLoading(true);
        const result = await mutation();
        await setError(result.error);
        await setData(result as TResponseData);
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
