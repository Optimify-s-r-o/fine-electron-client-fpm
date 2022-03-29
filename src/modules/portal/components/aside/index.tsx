import { Row } from 'constants/globalStyles';
import { Panel } from './components/Panel';
import { Tree } from './components/Tree';
import { faCog, faFolderPlus, faSearch } from '@fortawesome/pro-duotone-svg-icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { RoutesPath } from 'constants/routes';

export const Aside = () => {
  const { t } = useTranslation(['portal']);

  const navigate = useNavigate();

  return (
    <aside>
      <RowWrapper>
        <Panel
          sections={[
            {
              icon: faSearch,
              tooltip: t('portal:menu.search'),
              isActive: true,
              callback: () => {}
            },
            {
              icon: faFolderPlus,
              tooltip: t('portal:menu.createProject'),
              isActive: false,
              callback: () => navigate(RoutesPath.CREATE_PROJECT)
            },
            {
              icon: faCog,
              tooltip: t('portal:menu.system'),
              isActive: false,
              callback: () => navigate(RoutesPath.SYSTEM)
            }
          ]}
        />
        <Tree />
      </RowWrapper>
    </aside>
  );
};

const RowWrapper = styled(Row)`
  height: 100%;
`;
