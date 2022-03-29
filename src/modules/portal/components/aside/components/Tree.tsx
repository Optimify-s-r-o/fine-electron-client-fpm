import React from 'react';
import { ResizablePanel } from './ResizablePanel';
import { Projects } from './Projects';
import { Jobs } from './Jobs';

export const Tree = () => {
  return (
    <>
      <ResizablePanel direction="right" initialSize={150} minSize={150} maxSize={900}>
        <Projects />
      </ResizablePanel>
      <ResizablePanel direction="right" initialSize={150} minSize={150} maxSize={900}>
        <Jobs />
      </ResizablePanel>
    </>
  );
};
