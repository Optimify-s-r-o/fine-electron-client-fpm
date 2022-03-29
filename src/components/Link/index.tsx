import { Link as ReactRouterDom } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { RoutesPath } from 'constants/routes';

export const Link = ({ to, title }: { to: RoutesPath; title: string }) => {
  return (
    <Href to={to}>
      <Text>{title}</Text>
    </Href>
  );
};

const Href = styled(ReactRouterDom)`
  text-decoration: none;
`;

const Text = styled.span`
  cursor: pointer;
  color: ${(props) => props.theme.text.primary};

  &:hover {
    text-decoration: underline;
  }
`;
