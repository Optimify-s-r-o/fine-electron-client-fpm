import {useForm} from "react-hook-form";
import {SinInForm} from "./components/SignInForm";

export type SignInInput = {
    email: string;
    password: string;
}

export const SignInCloud = () => {
    const {register, handleSubmit} = useForm<SignInInput>();

    const onSubmit = (data: SignInInput) => {
        console.log(data)
    }

    return (
        <SinInForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit}/>
    )
}

export default SignInCloud;