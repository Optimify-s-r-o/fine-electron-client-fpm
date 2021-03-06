import { useTreeContext } from '../../../context/Tree/TreeContext';
import { Jobs } from './Jobs';
import { Projects } from './Projects';
import { ResizablePanel } from './ResizablePanel';

export const Tree = () => {
  const { selectedProjectId } = useTreeContext();
  return (
    <>
      <ResizablePanel direction="right" initialSize={200} minSize={200} maxSize={900}>
        <Projects />
      </ResizablePanel>
      {selectedProjectId && (
        <ResizablePanel direction="right" initialSize={200} minSize={200} maxSize={900}>
          <Jobs />
        </ResizablePanel>
      )}
    </>
  );
};
