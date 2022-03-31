import { JobDto } from 'api/generated';
import { createBridge } from 'react-context-menu-hooks';

export const jobContextMenuBridge = createBridge<{
  job?: JobDto;
}>({
  job: undefined
});
