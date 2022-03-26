import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHomeAlt} from "@fortawesome/pro-solid-svg-icons";
import * as S from "../styled";

export const Jobs = () => {
    const [state] = useState<string[]>(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'])
    return (<S.Wrapper color={"rgba(143, 113, 52, 0.8)"}>
        {state.map((item, key) => {
            return (<S.Item key={key}>
                <S.TitleWrapper>
                    <FontAwesomeIcon
                        icon={faHomeAlt}
                    />
                    <S.Title>{item}</S.Title>
                </S.TitleWrapper>
            </S.Item>)
        })}
    </S.Wrapper>)
}
