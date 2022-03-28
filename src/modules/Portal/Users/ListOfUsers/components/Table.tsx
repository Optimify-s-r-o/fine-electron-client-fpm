import {FineTable} from "../../../../../components/Table";

export const List = () => {
    return (<FineTable
        emptyTableText={"EMPTY TEXT"}
        loading={false}
        columns={[{
            title: "text", dataIndex: "name1", render(text: string, _record: any) {
                return <span>{text}</span>;
            },
        }, {
            title: "text", dataIndex: "name2", render(text: string, _record: any) {
                return <span>{text}</span>;
            },
        }, {
            title: "text", dataIndex: "name3", render(text: string, _record: any) {
                return <span>{text}</span>;
            },
        }, {
            title: "text", dataIndex: "name4", render(text: string, _record: any) {
                return <span>{text}</span>;
            },
        },]}
        dataSource={[{name1: "Item 1", name2: "Item 2", name3: "Item 3", name4: "Item 4"}, {
            name1: "Item 1", name2: "Item 2", name3: "Item 3", name4: "Item 4"
        }, {name1: "Item 1", name2: "Item 2", name3: "Item 3", name4: "Item 4"}]}
    />)
}