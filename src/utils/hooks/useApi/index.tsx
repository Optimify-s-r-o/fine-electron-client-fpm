import React from 'react';
import { toast } from 'react-toastify';

import { ClientExceptionPublicModel } from '../../../api/generated/api';
import { MutationTuple } from './types';

//TODO handle error
//TODO improve types
export const useApi = <TInputData, TResponseData>(): MutationTuple<TInputData, TResponseData> => {

    const [loading, setLoading] = React.useState<boolean>( false );

    const [error, setError] = React.useState<any>( "" );

    const [data, setData] = React.useState<TResponseData | null>( null );

    //TODO improve logic
    //opravit loading
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
            //TODO ERROR RICHARD
            if ( e.response?.status === 422 && e.response?.data ) {
                console.log( e.response.data );
                const error = e.response.data as ClientExceptionPublicModel;
                toast.error( `${ error.identifier }: ${ error.genericMessage }` );
            } else if ( e.response ) {
                toast.error( e.response );
            } else {
                toast.error( "Unknown error. Please check internet connection" );
            }
            setLoading( false );
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
