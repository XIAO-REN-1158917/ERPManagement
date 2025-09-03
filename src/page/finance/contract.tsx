import { Card, Row, Col, Table, Input, Button, Tag, Pagination } from "antd"
import { useEffect, useState } from "react"
import { TableProps } from "antd"
import { getContractList } from "../../api/contract"
import { setData, setTotal, setFormList, setCurrent, setSize } from "../../store/finance/contractSlice"
import { useDispatch, useSelector } from "react-redux"
import { PaginationProps } from "antd"
import { useNavigate, useSearchParams } from "react-router-dom"

interface SearchType {
    contractNo: string,
    person: string,
    tel: string
}

interface DataType {
    key: string,
    contractNo: string,
    type: string,
    name: string,
    startDate: string,
    endDate: string,
    partyA: string,
    partyB: string,
    status: string
}

function Contract() {
    const navigate = useNavigate()
    const { data, total, formList, current, size } = useSelector((state: any) => state.contractSlice)
    const [searchParams] = useSearchParams()

    // This flag if used to determine whether the user is returning from the detail page.
    const isReturn = searchParams.get("return")

    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState<SearchType>({
        contractNo: "",
        person: "",
        tel: ""
    })


    // Record content of search input box
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
        dispatch(setFormList({
            ...formData,
            [name]: value
        }))

    }

    // Callback invoked when the page or page size changes.
    const onChange: PaginationProps["onChange"] = (page, pageSize) => {
        setPage(page)
        setPageSize(pageSize)
        dispatch(setCurrent(page))
        dispatch(setSize(pageSize))
        loadData(page, pageSize)
    }

    // Click "Detail" button
    const detail = (contractNo: string) => {
        navigate("/finance/surrender?contractNo=" + contractNo)
    }

    // columns(configuration) of table
    const columns: TableProps<DataType>["columns"] = [
        {
            title: "No.",
            key: "index",
            render(text, recoder, index) {
                return index + 1
            }
        },
        {
            title: "Contract Num",
            dataIndex: "contractNo",
            key: "contractNo"
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type"
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Start Date",
            dataIndex: "startDate",
            key: "startDate"
        },
        {
            title: "End Date",
            dataIndex: "endDate",
            key: "endDate"
        },
        {
            title: "Party A",
            dataIndex: "partyA",
            key: "partyA"
        },
        {
            title: "Party B",
            dataIndex: "partyB",
            key: "partyB"
        },
        {
            title: "State",
            dataIndex: "status",
            key: "status",
            render(text) {
                if (text == 1) {
                    return <Tag>Pending</Tag>
                } else if (text == 2) {
                    return <Tag color="green">Approved</Tag>
                } else {
                    return <Tag color="red">Rejected</Tag>
                }
            }
        },
        {
            title: "Operate",
            key: "operate",
            render(text, record) {
                return <Button
                    type="primary"
                    size="small"
                    onClick={() => detail(record.contractNo)}
                >
                    Details
                </Button>
            }
        }
    ]

    // Request data
    const loadData = async (page: number, pageSize: number) => {
        setLoading(true)
        const { data: { list, total } } = await getContractList({ ...formData, page, pageSize })
        setLoading(false)
        dispatch(setData(list))
        dispatch(setTotal(total))
    }

    // Reset to the initial state of the page
    const reset = () => {
        setFormData({
            contractNo: "",
            person: "",
            tel: ""
        })
        setPage(1)
        setPageSize(10)
        loadData(1, 10)
    }

    useEffect(() => {
        //If the user is NOT returning form the detail page
        // or there is no data in Redux,
        // the data needs to be loaded.
        if (!isReturn || !data.length) {
            loadData(page, pageSize)
        }
        if (isReturn) {
            //If returning from the detail page, load the data form Redux
            // to maintain page consistency and enhance the UX.
            setFormData(formList)
            setPage(current)
            setPageSize(size)
        }
    }, [])


    return <div>
        <Card className="search">
            <Row gutter={16} >
                <Col span={7}>
                    <p>Number: </p>
                    <Input name="contractNo" value={formData.contractNo} onChange={handleChange} />
                </Col>
                <Col span={7}>
                    <p>Contact: </p>
                    <Input name="person" value={formData.person} onChange={handleChange} />
                </Col>
                <Col span={7}>
                    <p>Tel: </p>
                    <Input name="tel" value={formData.tel} onChange={handleChange} />
                </Col>
                <Col span={3}>
                    <Button type="primary" className="mr" onClick={() => loadData(page, pageSize)}>Search</Button>
                    <Button onClick={reset}>Reset</Button>
                </Col>
            </Row>
        </Card>
        <Card className="mt">
            <Table
                columns={columns}
                pagination={false}
                loading={loading}
                dataSource={data}
                rowKey={(record) => record.contractNo}
            />
            <Pagination
                className="mt fr"
                showQuickJumper
                defaultCurrent={1}
                total={total}
                onChange={onChange}
                current={page}
                pageSize={pageSize} />
        </Card>
    </div>
}

export default Contract