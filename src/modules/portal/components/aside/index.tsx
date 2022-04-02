import { Row } from 'constants/globalStyles';
import { Panel } from './components/Panel';
import { Tree } from './components/Tree';
import { faCog, faFolderPlus, faSearch } from '@fortawesome/pro-duotone-svg-icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { RoutesPath } from 'constants/routes';
import { useLocation } from 'react-router';
import { matchPath } from 'react-router-dom';

export const Aside = () => {
  const { t } = useTranslation(['portal']);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <aside>
      <RowWrapper>
        <Panel
          sections={[
            /*    {
              icon: faSearch,
              tooltip: t('portal:panel.search'),
              isActive: false,
              callback: () => {}
            },*/
            {
              icon: faFolderPlus,
              tooltip: t('portal:panel.createProject'),
              isActive: !!matchPath(pathname, RoutesPath.CREATE_PROJECT),
              callback: () => navigate(RoutesPath.CREATE_PROJECT)
            },
            {
              icon: faCog,
              tooltip: t('portal:panel.applicationsSettings'),
              isActive: !!matchPath(pathname, RoutesPath.LOCAL_APPLICATIONS_SETTINGS),
              callback: () => navigate(RoutesPath.LOCAL_APPLICATIONS_SETTINGS)
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
