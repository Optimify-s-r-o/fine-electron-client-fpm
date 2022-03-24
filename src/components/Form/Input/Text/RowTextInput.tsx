import {UseFormRegister} from "react-hook-form";
import {ReactNode} from "react";
import * as S from "../styled";
import {Row} from "constants/globalStyles";

export const RowTextInput = ({
                                    isDisabled,
                                    name,
                                    register,
                                    rightNode,
                                    title
                                }: {
    isDisabled?: boolean;
    name: string;
    register: UseFormRegister<any>;
    rightNode?: ReactNode;
    title?: string;
}) => {

    return (
        <Row>
            <S.Wrapper>
                <S.Title>{title}</S.Title>
                {rightNode && <S.RightNode>{rightNode}</S.RightNode>}
            </S.Wrapper>
            <S.Input {...register(name)} type={"text"} disabled={isDisabled}/>
        </Row>
    )
}
