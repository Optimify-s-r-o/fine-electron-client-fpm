import {Navigation} from "./components/Navigation";
import {Main} from "./components/Main";
import {Aside} from "./components/Aside";
import {Row} from "constants/globalStyles";
import styled from "styled-components";

export const Portal = () => {
    return (
        <Wrapper>
            <Navigation/>
            <RowWrapper>
                <Aside/>
                <Main/>
            </RowWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  width: 100%;
`

const RowWrapper = styled(Row)`
  height: calc( 100vh - 32px);
`

export default Portal;