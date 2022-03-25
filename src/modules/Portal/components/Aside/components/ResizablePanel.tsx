import React from "react";
import styled from "styled-components";

export const ResizablePanel = ({children, initialSize, direction, minSize, maxSize, afterResize}: {
    children: React.ReactNode;
    initialSize: number;
    direction: "right" | "left" | "down" | "up";
    minSize: number;
    maxSize: number;
    afterResize?: (
        newSize: number,
        sizeOnCursor: number,
        e: MouseEvent
    ) => boolean | void;
}) => {
    const borderRef = React.useRef<HTMLDivElement>();
    const styleKey =
        direction === "right" || direction === "left" ? "width" : "height";

    React.useEffect(() => {
        const element = borderRef ? borderRef.current : null;

        const mouseDown = (e: any) => {
            e.preventDefault();

            document.body.style.cursor =
                direction === "right" || direction === "left"
                    ? "ew-resize"
                    : "ns-resize";

            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);
        };

        const mouseMove = (e: any) => {
            let target = e.target;
            if (target.classList.contains("customHandle")) target = target.parentNode;

            let newSize =
                (direction === "right" || direction === "left" ? e.pageX : e.pageY) -
                (element?.parentNode as HTMLElement).getBoundingClientRect()[
                    direction === "right"
                        ? "left"
                        : direction === "left"
                            ? "right"
                            : direction === "down"
                                ? "top"
                                : "bottom"
                    ];

            if (direction === "left" || direction === "up") newSize = -newSize;

            const sizeOnCursor = newSize;

            if (newSize < minSize) newSize = minSize;
            if (newSize > maxSize) newSize = maxSize;

            (element?.parentNode?.childNodes[0] as HTMLElement).style[styleKey] =
                newSize + "px";

            if (afterResize && afterResize(newSize, sizeOnCursor, e)) {
                document.body.style.cursor = "auto";
                document.removeEventListener("mousemove", mouseMove);
                document.removeEventListener("mouseup", mouseUp);
            }
        };

        const mouseUp = (e: any) => {
            document.body.style.cursor = "auto";
            document.removeEventListener("mousemove", mouseMove);
            document.removeEventListener("mouseup", mouseUp);
        };

        if (element) {
            element.addEventListener("mousedown", mouseDown);
        }

        return () => {
            if (element) {
                element.removeEventListener("mousedown", mouseDown);
            }
        };
    }, []);

    return (
        <Wrapper direction={direction}>
            <Content style={{[styleKey]: initialSize}}>
                {children}
            </Content>
            <Border direction={direction} ref={borderRef}>
                <Handle direction={direction}/>
            </Border>
        </Wrapper>
    );
};

const Wrapper = styled.div<{ direction: any }>`
  display: flex;
  flex-direction: ${(props) =>
    props.direction === "right"
        ? "row"
        : props.direction === "left"
            ? "row-reverse"
            : props.direction === "down"
                ? "column"
                : "column-reverse"};
`;

const Content = styled.div`
  flex-grow: 1;
`;

const Border = styled.div<{ direction: any; ref: any }>`
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  width: ${(props) =>
    props.direction === "right" || props.direction === "left" ? "2px" : "auto"};
  height: ${(props) =>
    props.direction === "down" || props.direction === "up" ? "2px" : "auto"};

  background-color: ${(props) => props.theme.colors.background.menu};

  cursor: ${(props) =>
    props.direction === "right" || props.direction === "left"
        ? "ew-resize"
        : "ns-resize"};
`;

const Handle = styled.div<{ direction: any }>`
  flex-shrink: 0;
  z-index: 1;

  width: ${(props) =>
    props.direction === "right" || props.direction === "left"
        ? "6px"
        : "100px"};
  height: ${(props) =>
    props.direction === "right" || props.direction === "left"
        ? "100px"
        : "6px"};

  background-color: ${(props) => props.theme.colors.primary.default};
  border-radius: 3px;
`;
