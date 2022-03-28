import styled from "styled-components";
import {FieldErrors} from "react-hook-form";

export const ErrorMessage = ({name, errors}: { name: string; errors: FieldErrors<any> }) => {
    if (name && errors && errors[name] && errors[name]?.message) {
        return (<Message>{errors[name]?.message}</Message>)
    }

    return <></>
}

const Message = styled.span`
  font-size: 12px;
  color: #f61616;
  
  margin-left: 5px;
  margin-top: 2px;
`