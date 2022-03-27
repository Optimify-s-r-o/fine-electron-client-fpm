import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { RoutesPath } from '../../../constants/routes';
import { useAuthContext } from '../context/AuthContext';
import { SinInForm } from './components/SignInForm';

export type SignInInput = {
    email: string;
    server: string;
    password: string;
};

const SignInLocal = () => {
    const navigate = useNavigate();
    const { t } = useTranslation( ['form'] );
    const { register, handleSubmit } = useForm<SignInInput>( {
        defaultValues: {
            server: process.env.REACT_APP_BACKEND_API
        },
        resolver: yupResolver(
            Yup.object().shape( {
                email: Yup.string()
                    .email( t( "form:validation.invalidEmail" ) )
                    .required( t( "form:validation.required" ) ),
                server: Yup.string().required( t( "form:validation.required" ) ),
                password: Yup.string().required( t( "form:validation.required" ) ),
            } ) ),
    } );


    const { signIn, loading } = useAuthContext();

    const onSubmit = async ( data: SignInInput ) => {
        try {
            var success = await signIn( data.email, data.password );

            if ( success ) {

                await window.API.invoke( "MAXIMIZE_WINDOW" );

                await navigate( RoutesPath.PORTAL );
            }
            else {
                // TODO invalid username or password
            }
        } catch ( e ) {

        }

    };

    return (
        <SinInForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} loading={loading} />
    );
};

export default SignInLocal;