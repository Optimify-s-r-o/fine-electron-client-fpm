import React from 'react';
import { toast } from 'react-toastify';

import { ClientExceptionPublicModel } from '../../../api/generated/api';
import { MutationTuple } from './types';
import {TFunction, useTranslation} from "react-i18next";

export const useApi = <TInputData, TResponseData>(): MutationTuple<TInputData, TResponseData> => {
    const {t} = useTranslation(['form']);

    const [loading, setLoading] = React.useState<boolean>( false );

    const [error, setError] = React.useState<any>( "" );

    const [data, setData] = React.useState<TResponseData | null>( null );

    const mutate = async ( mutate: () => ( input: TInputData ) => any ) => {
        let response: any = null;

        try {

            setLoading( true );

            response = await mutate();

            if ( response?.status === 200 ) {
                setData( response?.data );
                return response.data;
            }

            if ( response?.data ) {
                setError( response.data );
                toast.error( response.data );
            }

        } catch ( e: any ) {

            handleErrors(e.response, t);
            throw e;

        } finally {

            setLoading( false );

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

const handleErrors = (response:any, t: TFunction) => {
    if ( response?.status === 422 && response?.data ) {

        const error = response.data as ClientExceptionPublicModel;
        toast.error( t(`form:errors.${ error.identifier }`));

    } else if ( response ) {

        toast.error( response );

    } else {

        toast.error( "Unknown error. Please check internet connection" );

    }
}
