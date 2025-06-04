import { Card, Row, Col, Table, Input, Button, Pagination, Tag } from "antd"
import type { TableProps } from "antd"
import useDataList from "../../hooks/useDataList"
import { getEquipmentList } from "../../api/equipment"

interface SearchType {
    name: string;
    person: string;
}
interface DataType {
    id: number
    no: string,
    ename: string;
    person: string;
    tel: number;
    time: string;
    rest: string;
    status: string;
    last: string;
    type: string;
    from: string
}

const columns: TableProps<DataType>["columns"] = [
    {
        title: "No.",
        key: "index",
        render: (text, record, index) => index + 1,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'ename',
    },
    {
        title: 'Number',
        dataIndex: 'no',
        key: 'no',
    },
    {
        title: 'Manager',
        dataIndex: 'person',
        key: 'person',
    },
    {
        title: 'Tel',
        dataIndex: 'tel',
        key: 'tel',
    },
    {
        title: 'Useful Life',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'Remaining',
        dataIndex: 'rest',
        key: 'rest',
    },
    {
        title: 'State',
        dataIndex: 'status',
        key: 'status',
        render: (text) => {
            if (text == 1) {
                return <Tag color="green">In use</Tag>
            } else if (text == 2) {
                return <Tag color="yellow">Maintenance</Tag>
            } else {
                return <Tag color="red">Broken</Tag>
            }
        }
    },
    {
        title: 'Last maintenance',
        dataIndex: 'last',
        key: 'last',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Producer',
        dataIndex: 'from',
        key: 'from',
    },
    {
        title: 'Operate',
        dataIndex: 'operate',
        key: 'operate',
        render: () => {
            return <Button type="primary" size="small">Details</Button>
        }
    },
]

function Equipment() {
    const {
        dataList,
        page,
        pageSize,
        total,
        loading,
        formData,
        setDataList,
        setPage,
        setPageSize,
        setTotal,
        setLoading,
        setFormData,
        loadData,
        onChange,
        handleChange,
        reset
    } = useDataList<SearchType, DataType>({ name: "", person: "" }, getEquipmentList)

    return <div>
        <Card className="search">
            <Row gutter={16}>
                <Col span={7}>
                    <p>Name: </p>
                    <Input value={formData.name} name="name" placeholder="Input name or number of the equipment" onChange={handleChange} />
                </Col>
                <Col span={7}>
                    <p>Manager: </p>
                    <Input value={formData.person} name="person" placeholder="Input name of the manager" onChange={handleChange} />
                </Col>
                <Col span={3}>
                    <Button type="primary" className="mr" onClick={loadData}>Search</Button>
                    <Button onClick={reset}>Reset</Button>
                </Col>
            </Row>
        </Card>
        <Card className="mt">
            <Table
                columns={columns}
                dataSource={dataList}
                loading={loading}
                rowKey={(record) => record.id}
                pagination={false}
            />
            <Pagination
                className="fr mt"
                showPrevNextJumpers
                defaultCurrent={1}
                total={total}
                onChange={onChange}
                current={page}
                pageSize={pageSize} />
        </Card>
    </div>
}

export default Equipment