import {useForm} from "react-hook-form";
import {SinInForm} from "./components/SignInForm";
import {useNavigate} from "react-router-dom";
import {RoutesPath} from "../../../constants/routes";
import {useApi} from "../../../utils/hooks/useApi";
import {Configuration, SignInRequest, SignInResponse} from "../../../api/generated";
import API from "../../../utils/api";
import {setBearerAuthToObject} from "../../../api/generated/common";

export type SignInInput = {
    email: string;
    server: string;
    password: string;
}

const SignInLocal = () => {
    const navigate = useNavigate();

    const {register, handleSubmit} = useForm<SignInInput>({
        defaultValues: {
            server: process.env.REACT_APP_BACKEND_API
        },
    });

    const [signIn, {loading}] = useApi<SignInRequest, SignInResponse>();

    const onSubmit = async (data: SignInInput) => {
        try {
            const result = await signIn(() => API.UsersApi.fineProjectManagerApiUsersSignInPost({
                email: data.email,
                password: data.password
            }));

            //TODO KAREL takhle jste to nejak delali? Nenašel jsem to u Vás
            await setBearerAuthToObject({}, new Configuration({accessToken: "TODO opravit response metody"}));

            await window.API.invoke("MAXIMIZE_WINDOW");

            await navigate(RoutesPath.PORTAL);
        } catch (e) {

        }

    }

    return (
        <SinInForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} loading={loading}/>
    )
}

export default SignInLocal;