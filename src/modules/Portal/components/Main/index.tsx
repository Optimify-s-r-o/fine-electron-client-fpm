import {Tabs} from "./components/Tabs";
import * as S from "./styled";

export const Main = () => {
    return (
        <S.Wrapper>
            <S.MainSection>
                <Tabs/>
                Main
            </S.MainSection>
        </S.Wrapper>
    )
}