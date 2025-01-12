import { Card, Row, Col, Table, Input, Button, Pagination, Statistic, DatePicker, Select, Tag } from "antd"
import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TableProps } from "antd";
import { getBillList } from "../../api/contract";
import { useEffect, useMemo, useState } from "react";
import { exportToExcel } from "../../utils/exportToExcel";

const { RangePicker } = DatePicker

interface DataType {
    key?: string,
    accountNo: string,
    status?: string,
    roomNo?: string,
    carNo?: string,
    tel?: string,
    costName1?: string,
    costName2?: string,
    costName3?: string,
    startDate?: string,
    endDate?: string,
    preferential?: number,
    money?: number,
    pay?: string,
}

interface searchType {
    date: string[],
    no: string,
    status: string,
    page: number,
    pageSize: number
}

function Bill() {
    //columns configurationg of bill table
    const columns: TableProps<DataType>["columns"] = [
        {
            title: "No. ",
            key: "index",
            width: 100,
            fixed: "left",
            render(text, record, index) {
                return index + 1
            }

        },
        {
            title: "Bill",
            dataIndex: "accountNo",
            key: "accountNo",
            width: 150

        },
        {
            title: "State",
            dataIndex: "status",
            key: "status",
            width: 100,
            render(value) {
                return value == 1 ? <Tag color="green">Paid</Tag> : <Tag color="red">Payable</Tag>
            }
        },
        {
            title: "Room",
            dataIndex: "roomNo",
            key: "roomNo",
            width: 100,
        },
        {
            title: "Spot",
            dataIndex: "carNo",
            key: "carNo",
            width: 100,
        },
        {
            title: "Tel",
            dataIndex: "tel",
            key: "tel",
            width: 150,
        },
        {
            title: "Porperty Rate",
            dataIndex: "costName1",
            key: "costName1",
            width: 150,
        },

        {
            title: "Spot Rate",
            dataIndex: "costName2",
            key: "costName2",
            width: 150,
        },
        {
            title: "Rent",
            dataIndex: "costName3",
            key: "costName3",
            width: 150,
        },

        {
            title: "Start Date",
            dataIndex: "startDate",
            key: "startDate",
            width: 150,
        },
        {
            title: "End Date",
            dataIndex: "endDate",
            key: "endDate",
            width: 150,
        },
        {
            title: "Preferential",
            dataIndex: "preferential",
            key: "preferential",
            width: 150,
        },
        {
            title: "Total",
            dataIndex: "money",
            key: "money",
            width: 150,
        },
        {
            title: "Pay",
            dataIndex: "pay",
            key: "pay",
            width: 100,
        },
        {
            title: "Operate",
            width: 230,
            key: "operate",
            fixed: "right",
            render(value) {
                return <>
                    <Button type="primary" size="small">Print</Button>
                    <Button type="primary" size="small" danger className="ml mr">Void</Button>
                    <Button type="primary" size="small">Renfund</Button>
                </>
            }
        }
    ]
    //follow theses parameters and send request when these parameters changed
    const [formData, setFormData] = useState<searchType>({
        date: [],
        no: "",
        status: "",
        page: 1,
        pageSize: 10
    })
    const [dataList, setDataList] = useState<DataType[]>([])
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)
    const [total, setTotal] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedRowkeys, setSelectedRowkeys] = useState<React.Key[]>([])
    const [selectedRows, setSelectedRows] = useState<any>({ accountNo: "" })
    // when the date changed
    const handleChange = (value: any, dateString: any) => {
        console.log(value, dateString)
        setFormData(prevState => ({
            ...prevState,
            date: dateString
        }))
    }
    //when the room/car changed
    const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setFormData(prevState => ({
            ...prevState,
            no: value
        }))
    }
    //when the state of payment changed
    const handleChange2 = (value: string) => {
        setFormData(prevState => ({
            ...prevState,
            status: value
        }))
    }
    //when the page or pageSize changed
    const onChange = (page: number, pageSize: number) => {
        setPage(page)
        setPageSize(pageSize)
    }
    //send request and fetch the bill list data
    const loadData = async () => {
        setLoading(true)
        const { data: { list, total } } = await getBillList(
            {
                page,
                pageSize,
                startDate: formData.date[0],
                endDate: formData.date[1],
                no: formData.no,
                status: formData.status
            })
        setLoading(false)
        setDataList(list)
        setTotal(total)
    }
    // follow the row selected
    const onSelectChange = (selectedRowKeys: React.Key[], selectedRows: any) => {
        //console.log(selectedRowKeys)
        setSelectedRowkeys(selectedRowKeys)
        setSelectedRows(selectedRows)
    }

    const rowSelection = {
        selectedRowkeys,
        onChange: onSelectChange,

        //will sava the selected row keys and data when paginating
        preserveSelectedRowKeys: true
    }

    // handle buttons - export to excel and batch void
    // Enable the buttons only when there are selected rows.
    const disabled = useMemo(() => {
        return selectedRowkeys.length ? false : true
    }, [selectedRowkeys])

    // columns of excel sheet
    const header = ["accountNo", "status", 'roomNo', 'carNo', 'tel', 'costName1', 'costName2', 'costName3', 'startDate', 'endDate', 'preferential', 'money', 'pay']

    useEffect(() => {
        loadData()
    }, [page, pageSize])
    return <div>
        <Card>
            <Row gutter={16}>
                <Col span={6}>
                    <Statistic title="Account Receivable" value="16,888.38" />
                </Col>
                <Col span={6}>
                    <Statistic title="Paid" value="6,898.38" />
                </Col>
                <Col span={6}>
                    <Statistic title="Refund" value="2,808.37" />
                </Col>
                <Col span={6}>
                    <Statistic title="Arreas" value="9,988.42" />
                </Col>
            </Row>
        </Card>
        <Card className="mt search">
            <Row gutter={16}>
                <Col span={6}>
                    <p>Bill Date:</p>
                    <RangePicker name="date" style={{ width: "100%" }} onChange={handleChange} />
                </Col>
                <Col span={6}>
                    <p>Room/Car:</p>
                    <Input placeholder="Input room number or plate" value={formData.no} onChange={handleChange1} />
                </Col>
                <Col span={6}>
                    <p>Pay State:</p>
                    <Select
                        style={{ width: "100%" }}
                        options={[
                            { value: "1", label: "All" },
                            { value: "2", label: "Paid" },
                            { value: "3", label: "Payables" },
                        ]}
                        onChange={handleChange2}
                    ></Select>
                </Col>
                <Col span={6}>
                    <Button type="primary" className="mr" onClick={loadData}>Search</Button>
                    <Button>Reset</Button>
                </Col>
            </Row>
        </Card>
        <Card className="mt">
            <Button type="primary" icon={<DownloadOutlined />} disabled={disabled} onClick={() => exportToExcel(selectedRows, header)}>Export as Excel</Button>
            <Button type="primary" icon={<DeleteOutlined />} danger className="ml" disabled={disabled}>Batch Void</Button>
        </Card>
        <Card className="mt">
            <Table
                dataSource={dataList}
                columns={columns}
                pagination={false}
                scroll={{ x: 1200 }}
                loading={loading}
                rowKey={(record) => record.accountNo}
                rowSelection={rowSelection}
            />
            <Pagination
                className="fr mt"
                showQuickJumper
                pageSize={pageSize}
                current={page}
                total={total}
                onChange={onChange}
            />

        </Card>
    </div>
}

export default Bill