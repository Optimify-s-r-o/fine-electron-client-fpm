import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { RoutesPath } from '../../../constants/routes';
import { useAuthContext } from '../context/AuthContext';
import { SinInForm } from './components/SignInForm';
import {config} from "../../../utils/api";
import {useEffectAsync} from "../../../utils/useEffectAsync";

export type SignInInput = {
    email: string;
    server: string;
    password: string;
};

const SignInLocal = () => {
    const navigate = useNavigate();
    const { t } = useTranslation( ['form'] );

    const { register, handleSubmit, formState: {errors}, setValue } = useForm<SignInInput>( {
        resolver: yupResolver(
            Yup.object().shape( {
                email: Yup.string()
                    .email( t( "form:validation.invalidEmail" ) )
                    .required( t( "form:validation.required" ) ),
                server: Yup.string().required( t( "form:validation.required" ) ),
                password: Yup.string().required( t( "form:validation.required" ) ),
            } ) ),
    } );

    useEffectAsync(async ()=>{
        const email =await window.API.keytarGetSecret("email") || "";
        const password =await window.API.keytarGetSecret("password") || "";
        const server =await window.API.keytarGetSecret("server") || process.env.REACT_APP_BACKEND_API;

        setValue("email", email);
        setValue("password", password);
        setValue("server", server || "");
    },[])

    const { signIn, loading } = useAuthContext();

    const onSubmit = async ( data: SignInInput ) => {
            config.basePath = data.server;

            const success = await signIn( data.email, data.password );

            if ( success ) {
                //TODO KAREL SETTING

                await window.API.keytarSetSecret( "email", data?.email );
                await window.API.keytarSetSecret( "password", data?.password );
                await window.API.keytarSetSecret( "server", data?.server );

                await window.API.invoke( "MAXIMIZE_WINDOW" );

                await navigate( RoutesPath.CREATE_PROJECT );
            }
    };

    return (
        <SinInForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} loading={loading} errors={errors}/>
    );
};

export default SignInLocal;