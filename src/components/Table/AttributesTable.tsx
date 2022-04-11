import { ReactNode } from 'react';
import styled from 'styled-components';
import { CardTable } from './CardTable';

interface Attribute {
  title?: ReactNode;
  value?: ReactNode;
}

const AttributesTable = ({
  attributes,
  header,
  alignWithInput
}: {
  attributes: Array<Attribute>;
  header?: Attribute;
  alignWithInput?: boolean;
}) => {
  return (
    <CardTable
      columns={[
        {
          title: alignWithInput ? <AlignWithInput>{header?.title}</AlignWithInput> : header?.title,
          render: (text: string, _record: Attribute) => text,
          dataIndex: 'title'
        },
        {
          title: alignWithInput ? <AlignWithInput>{header?.value}</AlignWithInput> : header?.value,
          render: (text: string, _record: Attribute) => text,
          dataIndex: 'value'
        }
      ]}
      dataSource={attributes}
    />
  );
};

export default AttributesTable;

const AlignWithInput = styled.div`
  margin: -8px 0 -3px;
`;
