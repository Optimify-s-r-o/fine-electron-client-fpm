import {FieldErrors, UseFormRegister} from "react-hook-form";
import {ReactNode} from "react";
import * as S from "../styled";
import {ErrorMessage} from "../ErrorMessage";

export const PasswordInput = ({
                                  errors, isDisabled, name, register, rightNode, title
                              }: {
    errors?: FieldErrors<any>; isDisabled?: boolean; name: string; register: UseFormRegister<any>; rightNode?: ReactNode; title?: string;
}) => {

    return (<S.Column>
        <S.Wrapper>
            <S.Title>{title}</S.Title>
            {rightNode && <S.RightNode>{rightNode}</S.RightNode>}
        </S.Wrapper>
        <S.Input {...register(name)} type={"password"} disabled={isDisabled}/>
        <ErrorMessage name={name} errors={errors}/>
    </S.Column>)
}


