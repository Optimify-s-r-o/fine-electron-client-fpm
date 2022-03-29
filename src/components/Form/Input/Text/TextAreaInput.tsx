import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ReactNode } from 'react';
import * as S from '../styled';
import { ErrorMessage } from '../ErrorMessage';

export const TextAreaInput = ({
  errors,
  isDisabled,
  name,
  register,
  rightNode,
  tabIndex,
  title
}: {
  errors?: FieldErrors<any>;
  isDisabled?: boolean;
  name: string;
  register: UseFormRegister<any>;
  rightNode?: ReactNode;
  tabIndex?: number;
  title?: string;
}) => {
  return (
    <S.Column>
      <S.Wrapper>
        <S.Title>{title}</S.Title>
        {rightNode && <S.RightNode>{rightNode}</S.RightNode>}
      </S.Wrapper>
      <S.TextArea
        {...register(name)}
        disabled={isDisabled}
        tabIndex={tabIndex}
        rows={8}
      ></S.TextArea>
      <ErrorMessage name={name} errors={errors} />
    </S.Column>
  );
};
