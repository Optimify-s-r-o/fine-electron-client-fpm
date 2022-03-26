import {useForm} from "react-hook-form";
import {SinInForm} from "./components/SignInForm";
import { useNavigate } from "react-router-dom";
import {RoutesPath} from "../../../constants/routes";
import {useMutation} from "../../../utils/hooks/useMutation";
import API from 'utils/api';
import {SignInRequest, UserDto} from "../../../api/generated";

export type SignInInput = {
    email: string;
    password: string;
}

export const SignInCloud = () => {
    const navigate  = useNavigate();

    const {register, handleSubmit} = useForm<SignInInput>();

    const [signIn] = useMutation<UserDto>();

    const onSubmit = async (data: SignInInput) => {
        const result = await signIn(API.UsersApi.fineProjectManagerApiUsersSignInPost({email: data.email, password: data.password}));
        console.log(result)
        await window.API.invoke("MAXIMIZE_WINDOW");
        await navigate(RoutesPath.PORTAL);
    }

    return (
        <SinInForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit}/>
    )
}

export default SignInCloud;