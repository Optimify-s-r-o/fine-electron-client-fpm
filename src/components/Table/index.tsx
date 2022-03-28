import React, {ReactNode} from "react";
import styled from "styled-components";

export type Row<T> = {
    title: any;
    titleHide?: boolean;
    dataIndex?: string;
    key?: string;
    render: (text: any, record: T) => ReactNode;
    collapsibleNode?: (record: T) => ReactNode;
    onCollapse?: (record: T) => any;
    collapsible?: boolean;
    width?: string;
};

const TableRow = <T extends unknown>({
                                         columns,
                                         key,
                                         data,
                                     }: {
    columns: Row<T>[];
    key: number;
    data: any;
}) => {
    return (
        <tr key={key}>
            {columns?.map((e: Row<T>, keyColumn: number) => {
                const value = e.dataIndex ? data[e.dataIndex] : "";
                return (
                    <td key={keyColumn}>
                        {e.render(value, data)}
                    </td>
                );
            })}
        </tr>
    );
};

export const FineTable = <T extends unknown>({
                                                columns,
                                                dataSource,
                                                emptyTableText,
                                                loading,
                                            }: {
    columns: Row<T>[];
    dataSource: any;
    emptyTableText?: string;
    loading?: boolean;
}) => {
    const linearBackground =
        "transparent linear-gradient(180deg, #ededed 0%, #fff 100%)";
    return (
        <Container>
            <MediJobTable background={linearBackground}>
                <thead>
                <tr>
                    {columns?.map((e: Row<T>, key: number) => {
                        return (
                            <Th key={key} width={e?.width}>
                                <Header transparent={!!e?.titleHide}>
                                    {e?.titleHide ? "XXX" : e?.title}
                                </Header>
                            </Th>
                        );
                    })}
                </tr>
                </thead>
                <tbody>
                {!loading &&
                    dataSource?.map((data: any, key: number) => {
                        return <TableRow data={data} key={key} columns={columns}/>;
                    })}
                </tbody>
            </MediJobTable>
            {!loading && dataSource?.length === 0 && emptyTableText && (
                <EmptyTable text={emptyTableText}/>
            )}
        </Container>
    );
};

export const EmptyTable = ({text}: { text: string }) => {
    return (
        <Text>
            {text.split("\n").map((c, key) => {
                return <Paragraph key={key}> {c} </Paragraph>;
            })}
        </Text>
    );
};

const Text = styled.div`
  background-color: ${(props) => props.theme.common.content};
  padding: 20px 29px;
  font-size: 45px;
`;

const Paragraph = styled.p`
  margin: 0;
  line-height: 58px;
`;

const Header = styled.div<{ transparent: boolean }>`
  font-size: 13px;
  padding: 7px 10px;
  color: ${(props) =>
          props.transparent ?  props.theme.common.lightGray : props.theme.common.content};
  white-space: nowrap;
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.common.content};
  position: relative;
  overflow-x: auto;
`;

const Th = styled.th<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : "auto")};
  min-width: 70px;
`;

const MediJobTable = styled.table<{ background: string }>`
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  table-layout: fixed;
  min-width: 1000px;

  th {
    padding: 0;
    background: ${(props) => props.background};
  }

  td {
    padding: 7px 0 7px 10px;
    border-bottom: 1px solid ${(props) => props.theme.common.darkGray};
    overflow: visible;
    vertical-align: top;
  }

  th > div {
    text-align: left;
    background-color: ${(props) =>  props.theme.common.darkGray};
  }

  tbody {
    background-color: ${(props) => props.theme.common.content};
  }

  thead:first-child {
    z-index: 9999999;
  }

  td {
    color: ${(props) => props.theme.common.darkGray};
  }
`;

export const Relative = styled.div`
  position: relative;
`;
