import * as S from './styled';
import { Menu, Submenu } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { RoutesPath } from '../../../../../constants/routes';

export const Nav = ({ list }: { list: Menu[] }) => {
  const [clicked, setClicked] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (path?: RoutesPath) => (event: any) => {
    if (!path) return;

    navigate(path);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (wrapperRef?.current && !(wrapperRef?.current as any)?.contains(event.target)) {
        setClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <S.Wrapper ref={wrapperRef}>
      {list.map((value: Menu, key: number) => {
        return (
          <S.Menu
            key={key}
            clicked={clicked ? 'block' : 'none'}
            onClick={() => setClicked(!clicked)}
          >
            {value.menu}
            {value.submenu && (
              <S.SubMenu>
                {value?.submenu?.map((sub: Submenu, index: number) => (
                  <S.SubMenuWrapper key={index}>
                    <S.SubMenuItem onClick={handleChange(sub.path)}>
                      <S.Icon>
                        <FontAwesomeIcon
                          icon={sub.icon}
                          style={{ fontSize: 12, color: '#008033' }}
                        />
                      </S.Icon>
                      <S.Title>{sub.text}</S.Title>
                      <S.Shortcut>{sub.shortcut}</S.Shortcut>
                    </S.SubMenuItem>
                  </S.SubMenuWrapper>
                ))}
              </S.SubMenu>
            )}
          </S.Menu>
        );
      })}
    </S.Wrapper>
  );
};
