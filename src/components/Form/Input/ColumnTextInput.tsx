import {UseFormRegister} from "react-hook-form";
import styled from "styled-components";
import {ReactNode} from "react";
import {SpaceBetween} from "../../../constants/globalStyles";

export const ColumnTextInput = ({
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
        <Column>
            <Wrapper>
                <Title>{title}</Title>
                {rightNode && <RightNode>{rightNode}</RightNode>}
            </Wrapper>
            <Input {...register(name)} type={"text"} disabled={isDisabled}/>
        </Column>
    )
}

const RightNode = styled.span`
  font-size: 13px;
`

const Wrapper = styled(SpaceBetween)`
  margin-bottom: 5px;
`

const Title = styled.div`
  font-size: 13px;
  color: #727272;
  padding-left: 1px;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;

  padding-bottom: 13px;
`
const Input = styled.input`
  box-sizing: border-box;

  width: 100%;

  padding: 9px 16px 10px;

  border: 1px solid #d0d0d0;
  border-radius: 7px;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.05);
  font-family: Roboto;

  outline: none;


  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c8c8c8;
    font-weight: 300;
  }

  :-ms-input-placeholder {
    color: #c8c8c8;
    font-weight: 300;
  }

  :hover {
    border: 1px solid rgba(129, 134, 131, 0.74);
  }

  :focus, :active {
    border: 1px solid ${(props) => props.theme.colors.primary.default};
  }

`

