import { IconDefinition } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Filters = ({
  items
}: {
  items: Array<{
    iconOff: IconDefinition;
    iconOn: IconDefinition;
    colorOff: string;
    colorOn: string;
    state: boolean;
    onClick: () => void;
  }>;
}) => {
  const { t } = useTranslation(['portal']);

  return (
    <Wrapper>
      {t('portal:menu.filters')}:
      {items.map((item, key) => (
        <Button
          key={key}
          state={item.state}
          colorOff={item.colorOff}
          colorOn={item.colorOn}
          onClick={item.onClick}>
          <FontAwesomeIcon icon={item.state ? item.iconOn : item.iconOff} />
        </Button>
      ))}
    </Wrapper>
  );
};

export default Filters;

const Wrapper = styled.div`
  display: flex;
  gap: 8px;

  margin-bottom: 8px;
  padding: 8px 6px;

  border-bottom: 1px solid ${(props) => props.theme.common.lightGray};
  color: ${(props) => props.theme.text.gray};
  font-size: 13px;
`;

const Button = styled.button<{ state: boolean; colorOff: string; colorOn: string }>`
  padding: 0;

  background-color: transparent;
  border: none;

  cursor: pointer;
  opacity: ${(props) => (props.state ? '1' : '0.75')};

  svg {
    width: 17px;
    height: 17px;

    color: ${(props) => (props.state ? props.colorOn : props.colorOff)};
  }

  &:hover {
    opacity: ${(props) => (props.state ? '0.75' : '1')};
  }
`;
