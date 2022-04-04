import { ReactNode } from 'react';
import styled from 'styled-components';

const AspectRatio = ({ ratio, children }: { ratio: number; children: ReactNode }) => {
  return (
    <Wrapper ratio={ratio}>
      <Children>{children}</Children>
    </Wrapper>
  );
};

export default AspectRatio;

const Wrapper = styled.div<{ ratio: number }>`
  position: relative;

  width: 100%;
  height: 0;

  padding-bottom: ${(props) => props.ratio * 100}%;
`;

const Children = styled.div`
  position: absolute;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
