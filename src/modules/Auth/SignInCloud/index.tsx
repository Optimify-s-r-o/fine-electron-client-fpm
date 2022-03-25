import {useForm} from "react-hook-form";
import {SinInForm} from "./components/SignInForm";
import { useNavigate } from "react-router-dom";
import {RoutesPath} from "../../../constants/routes";

export type SignInInput = {
    email: string;
    password: string;
}

export const SignInCloud = () => {
    const navigate  = useNavigate();

    const {register, handleSubmit} = useForm<SignInInput>();

    const onSubmit = async (data: SignInInput) => {
        await window.API.invoke("MAXIMIZE_WINDOW");
        await navigate(RoutesPath.PORTAL);
    }

    return (
        <SinInForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit}/>
    )
}

export default SignInCloud;