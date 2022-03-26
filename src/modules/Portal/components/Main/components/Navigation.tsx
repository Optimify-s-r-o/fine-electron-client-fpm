import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconDefinition} from '@fortawesome/pro-solid-svg-icons';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {Link} from 'react-router-dom';
import {RoutesPath} from "../../../../../constants/routes";

export type NavigationItem = {
    path: RoutesPath;
    active: boolean;
    text: string;
    icon?: IconDefinition;
    isAction?: boolean;
}

export const Navigation = ({items, title}: {
    items: NavigationItem[];
    title?: string;
}) => {
    return (
        <NavigationWrapper>
            {title && <Title>{title}</Title>}
            {items?.map((item: NavigationItem, key: number) => {
                return (
                    <Link to={item.path} key={key}>
                        <NavigationItem
                            active={item.active ? 1 : 0}
                            isAction={item.isAction}
                        >
                            {item.icon ? (
                                <FontAwesomeIcon icon={item.icon as IconProp}/>
                            ) : (
                                ""
                            )}
                            {item.text}
                        </NavigationItem>
                    </Link>
                );
            })}
        </NavigationWrapper>
    );
};

const Title = styled.div`
  padding: 8px 24px;

  color: ${(props) => props.theme.common.content};
`;

const NavigationItem = styled.div<{ active: number; isAction?: boolean }>`
  padding: ${(props) => (props.active ? "10px" : "8px")} 24px ${(props) => (props.active ? "10px" : "")};

  background-color: ${(props) =>
          props.active
                  ? props.theme.common.contentSecondary + " !important"
                  : props.isAction
                          ? "transparent !important"
                          : props.theme.colors.background.menu};
  color: ${(props) =>
          props.active
                  ? props.theme.colors.primary.default
                  : props.isAction
                          ? props.theme.common.content
                          : props.theme.colors.secondaryText.default};

  svg {
    margin-right: 4px;
    color: ${(props) =>
            props.active
                    ? props.theme.colors.primary.default
                    : props.theme.common.darker};
  }

  &:hover {
    background-color: ${(props) =>
            props.active
                    ? props.theme.common.contentSecondary
                    : props.isAction
                            ? "rgba(255, 255, 255, 0.05)"
                            : props.theme.colors.background.content} !important;
    color: ${(props) =>
            props.active
                    ? props.theme.colors.primary.default
                    : props.isAction
                            ? props.theme.colors.background.content
                            : props.theme.colors.secondaryText.hover};

    svg {
      color: ${(props) =>
              props.active
                      ? props.theme.colors.primary.default
                      : props.isAction
                              ? props.theme.common.content
                              : props.theme.colors.secondaryText.default};
    }
  }
`;

const NavigationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;

  padding: 0 8px;

  > a {
    text-decoration: none;

    &:nth-child(even) ${NavigationItem} {
      background-color: ${(props) => props.theme.colors.background.secondaryMenu};
    }
  }
`;
