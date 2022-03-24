import {useForm} from "react-hook-form";
import {SinInForm} from "./components/SignInForm";

export type SignInInput = {
    email: string;
    server: string;
    password: string;
}

const SignInLocal = () => {
    const {register, handleSubmit} = useForm<SignInInput>({
        defaultValues: {
            server: "http://localhost:5000"
        },
    });

    const onSubmit = (data: SignInInput) => {
        console.log(data)
    }

    return (
        <SinInForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit}/>
    )
}

export default SignInLocal;