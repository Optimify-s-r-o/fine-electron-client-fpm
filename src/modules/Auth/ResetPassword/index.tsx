import {useForm} from "react-hook-form";
import {ResetPasswordForm} from "./components/ResetPasswordForm";

export type ResetPasswordInput = {
    email: string;
}

const SignInLocal = () => {
    const {register, handleSubmit} = useForm<ResetPasswordInput>();

    const onSubmit = (data: ResetPasswordInput) => {
        console.log(data)
    }

    return (
        <ResetPasswordForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit}/>
    )
}

export default SignInLocal;