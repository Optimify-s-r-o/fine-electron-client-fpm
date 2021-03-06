import styled, { keyframes } from 'styled-components';

export const Loader = ({
  size,
  color,
  block
}: {
  size?: number;
  color?: string;
  block?: boolean;
}) => {
  return (
    <Wrapper
      className="loaderWrapper"
      size={size ? size : 80}
      color={color ? color : 'white'}
      block={block}
    >
      <LoadingPart></LoadingPart>
      <LoadingPart></LoadingPart>
      <LoadingPart></LoadingPart>
      <LoadingPart></LoadingPart>
      <LoadingPart></LoadingPart>
      <LoadingPart></LoadingPart>
      <LoadingPart></LoadingPart>
      <LoadingPart></LoadingPart>
    </Wrapper>
  );
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoadingPart = styled.div`
  animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;

  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
  }

  &:nth-child(1) {
    animation-delay: -0.036s;
  }
  &:nth-child(1):after {
    top: 63px;
    left: 63px;
  }
  &:nth-child(2) {
    animation-delay: -0.072s;
  }
  &:nth-child(2):after {
    top: 68px;
    left: 56px;
  }
  &:nth-child(3) {
    animation-delay: -0.108s;
  }
  &:nth-child(3):after {
    top: 71px;
    left: 48px;
  }
  &:nth-child(4) {
    animation-delay: -0.144s;
  }
  &:nth-child(4):after {
    top: 72px;
    left: 40px;
  }
  &:nth-child(5) {
    animation-delay: -0.18s;
  }
  &:nth-child(5):after {
    top: 71px;
    left: 32px;
  }
  &:nth-child(6) {
    animation-delay: -0.216s;
  }
  &:nth-child(6):after {
    top: 68px;
    left: 24px;
  }
  &:nth-child(7) {
    animation-delay: -0.252s;
  }
  &:nth-child(7):after {
    top: 63px;
    left: 17px;
  }
  &:nth-child(8) {
    animation-delay: -0.288s;
  }
  &:nth-child(8):after {
    top: 56px;
    left: 12px;
  }
`;

const Wrapper = styled.div<{ block?: boolean; size: number }>`
  display: ${(props) => (props.block ? 'block' : 'inline-block')};
  position: relative;
  transform: scale(${(props) => props.size / 80});
  top: ${(props) => -40 * (props.size / 80)}px;

  ${(props) =>
    props.block &&
    `
  margin: ${props.size / 2}px;
  width: ${props.size}px;
  height: ${props.size}px;
  
  `}

  ${LoadingPart}:after {
    background: ${(props) => props.color};
  }
`;
