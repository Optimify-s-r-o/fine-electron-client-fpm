import React from "react";
import {MutationTuple,} from "./types";
import {toast} from "react-toastify";

//TODO handle error
//TODO improve types
export const useApi = <TInputData, TResponseData>(): MutationTuple<TInputData, TResponseData> => {

    const [loading, setLoading] = React.useState<boolean>(false);

    const [error, setError] = React.useState<any>("");

    const [data, setData] = React.useState<TResponseData | null>(null);

    //TODO improve logic
    const mutate = async (mutate: ()=> (input: TInputData)=> any) => {
        let response:any = null;

        try {

            setLoading(true);

            response = await mutate();

            console.log(response)

            if (response?.status === 200) {
                setData(response?.data);
                return response.data;
            }

            if (response?.data) {
                setError(response.data);
                toast.error(response.data)
            }

        } catch (e) {
            console.log(e)
            console.log(response)
            toast.error("ERROR TODO")
            throw e;

        } finally {
            setLoading(false);
        }
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
