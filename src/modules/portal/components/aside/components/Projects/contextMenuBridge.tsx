import { ProjectDto } from 'api/generated';
import { createBridge } from 'react-context-menu-hooks';

export const projectContextMenuBridge = createBridge<{
  project?: ProjectDto;
}>({
  project: undefined
});
