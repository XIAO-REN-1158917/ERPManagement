import React, { useCallback } from "react";
import { Button, Card, Col, Input, Row, Table, Pagination, Tag, Popconfirm, message } from "antd"
import type { PaginationProps } from 'antd';
import { useEffect, useMemo, useState } from "react"
import type { TableProps } from "antd"
import type { DataType } from "./interface"
import { getUserList, deleteUser, batchDeleteUser } from "../../api/userList"
import UserForm from "./userFrom"
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/user/userSlice";
import useDataList from "../../hooks/useDataList";

interface SearchType {
    companyName: string,
    contact: string,
    phone: string
}

function Users() {
    const {
        dataList,
        page,
        pageSize,
        total,
        loading,
        formData,
        loadData,
        onChange,
        handleChange,
        reset
    } = useDataList<SearchType, DataType>({ companyName: "", contact: "", phone: "" }, getUserList)

    //The original code is kept here to compare before and after using custom encapsulation hooks

    // const [dataList, setDataList] = useState<DataType[]>([])
    // const [page, setPage] = useState<number>(1)
    // const [pageSize, setPageSize] = useState<number>(10)
    // const [total, setTotal] = useState<number>(0)
    // const [loading, setLoading] = useState<boolean>(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const dispatch = useDispatch()
    // const [formData, setFormData] = useState<searchType>({
    //     companyName: "",
    //     contact: "",
    //     phone: ""
    // })

    // call api to fetch data
    // const loadData = async () => {
    //     setLoading(true)//enhance UX, set a loading animation
    //     const { data: { list, total } } = await getUserList({ ...formData, page, pageSize })
    //     setLoading(false)
    //     setDataList(list)
    //     setTotal(total)
    // }
    // receive value of these three input boxes
    // const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target
    //     setFormData(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }))
    // }
    //configuration of selecting rows
    const onSelectChange = (selectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(selectedRowKeys)
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
    }
    // configuration (call back) of changing the page and page size
    // const onChange: PaginationProps['onChange'] = (page, pageSize) => {
    //     setPage(page)
    //     setPageSize(pageSize)
    // }
    // reset page
    // const reset = () => {
    //     setSelectedRowKeys([])
    //     setFormData({
    //         companyName: "",
    //         contact: "",
    //         phone: ""
    //     })
    //     setPage(1)
    //     setPageSize(10)
    //     loadData()
    // }
    //disabled or not for batch delete button
    const disabled = useMemo(() => {
        return selectedRowKeys.length ? false : true
    }, [selectedRowKeys])

    //batch delete
    const batchDelete = async () => {
        const { data } = await batchDeleteUser(selectedRowKeys)
        message.success(data)
        loadData()
    }
    // delete confirm
    const confirm = async (id: string) => {
        const { data } = await deleteUser(id)
        message.success(data)
        loadData()
    }
    //edit user
    const edit = (record: DataType) => {
        setIsModalOpen(true)
        setTitle("Edit User")
        dispatch(setUserData(record))

    }
    //add user
    const add = () => {
        setIsModalOpen(true)
        setTitle("Add User")
    }
    //close modal
    const hideModal = useCallback(() => {
        setIsModalOpen(false)
    }, [])
    // table column configuration
    const columns: TableProps<DataType>['columns'] = [
        {
            title: "No.",
            key: "index",
            render(value, record, index) {
                return index + 1
            }
        },
        {
            title: "Name",
            key: "name",
            dataIndex: "name"
        },
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
            render(value) {
                if (value == 1) {
                    return <Tag color="green">Active</Tag>
                } else if (value == 2) {
                    return <Tag color="red">Inactive</Tag>
                } else {
                    return <Tag color="yellow">Closed</Tag>
                }
            },
        },
        {
            title: "Tel",
            key: "tel",
            dataIndex: "tel"
        },
        {
            title: "Business",
            key: "business",
            dataIndex: "business"
        },
        {
            title: "Email",
            key: "email",
            dataIndex: "email"
        },
        {
            title: "Credit Code",
            key: "creditCode",
            dataIndex: "creditCode"
        },
        {
            title: "Industry Num",
            key: "industryNum",
            dataIndex: "industryNum"
        },
        {
            title: "Organization Code",
            key: "organizationCode",
            dataIndex: "organizationCode"
        },
        {
            title: "Legal Person",
            key: "legalPerson",
            dataIndex: "legalPerson"
        },
        {
            title: "Operate",
            key: "operate",
            render(value, record, index) {
                return <>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => edit(record)}
                    >Edit
                    </Button>
                    <Popconfirm
                        title="Delete confirmation"
                        description="Are you sure you want to delete?"
                        okText="Confirm"
                        cancelText="Cancel"
                        onConfirm={() => confirm(record.id)}
                    >
                        <Button
                            className="ml"
                            type="primary"
                            danger
                            size="small"
                        >Delete
                        </Button>
                    </Popconfirm>
                </>
            }
        },
    ]

    // rerender page when page and page size changed
    useEffect(() => {
        loadData()
    }, [page, pageSize])

    return <div className="users">
        <MyUserForm
            title={title}
            visible={isModalOpen}
            hideModal={hideModal}
            loadData={loadData}
        />
        <Card className="search">
            <Row gutter={16}>
                <Col span={7}>
                    <p>Name: </p>
                    <Input name="companyName" value={formData.companyName} onChange={handleChange} />
                </Col>
                <Col span={7}>
                    <p>Contact: </p>
                    <Input name="contact" value={formData.contact} onChange={handleChange} />
                </Col>
                <Col span={7}>
                    <p>Phone: </p>
                    <Input name="phone" value={formData.phone} onChange={handleChange} />
                </Col>
                <Col span={3}>
                    <Button type="primary" onClick={loadData}>Search</Button>
                    <Button className="ml" onClick={reset}>Reset</Button>
                </Col>
            </Row>
        </Card>
        <Card className="mt tr">
            <Button
                type="primary"
                onClick={add}
            >Add
            </Button>
            <Button
                className="ml"
                danger
                type="primary"
                disabled={disabled}
                onClick={batchDelete}
            >Batch Delete
            </Button>
        </Card>
        <Card className="mt">
            <Table
                rowSelection={rowSelection}
                rowKey={(record) => record.id}
                columns={columns}
                dataSource={dataList}
                loading={loading}
                pagination={false}
            />
            <Pagination
                className="fr mt"
                total={total}
                current={page}
                pageSize={pageSize}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `Total ${total} items`}
                onChange={onChange}
            />
        </Card>
    </div>
}
const MyUserForm = React.memo(UserForm)
export default Users