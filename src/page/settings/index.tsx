import { Card, Row, Col, Table, Input, Button, Pagination, Popconfirm, Tree } from "antd"
import { getAccountList } from "../../api/users";
import useDataList from "../../hooks/useDataList";
import type { TreeDataNode, TreeProps } from 'antd';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import withPermissions from "../../utils/withPermissions"

interface MenuType {
    label: string;
    icon: string;
    key: string;
    children?: MenuType[]
}

interface DataType {
    id: number;
    accountName: string;
    auth: string;
    person: string;
    tel: string;
    department: string;
}

interface SearchType {
    accountName: string
}

//static mock data
const treeData: TreeDataNode[] = [
    {
        title: 'Dashboard',
        key: '/dashboard',
    },
    {
        title: 'Users',
        key: '/users',
        children: [
            { title: 'User List', key: '/users/list' },
        ],
    },
    {
        title: 'Estate',
        key: '/estate',
        children: [
            {
                title: "Tenement",
                key: "/estate/tenement"
            },
            {
                title: "Room",
                key: "/estate/room"
            },
            {
                title: "Car",
                key: "/estate/car"
            }

        ]
    },
    {
        title: 'Repair',
        key: '/repair',
    },
    {
        title: 'Finance',
        key: '/finance',
        children: [
            {
                title: "Contract",
                key: "/finance/contract"
            },
            {
                title: "Bill",
                key: "/finance/bill"
            }
        ]
    },
    {
        title: 'Merchants',
        key: '/merchants',
    },
    {
        title: 'Opertation',
        key: '/operation',
        children: [
            {
                title: "All",
                key: "/operation/all"
            },
            {
                title: "Article",
                key: "/operation/article"
            },
            {
                title: "Comments",
                key: "/operation/comments"
            }
        ]
    },
    {
        title: 'Equipment',
        key: '/equipment',
    },
    {
        title: 'Energy',
        key: '/energy',
    },
    {
        title: 'Settings',
        key: "/settings",
    },
    {
        title: 'Personal',
        key: "/personal",
    },
]

// Retrieve the user's current permissions(accessible routes)
const extractTreeKeys = (data: any) => {
    let keys: string[] = []
    data.forEach((item: any) => {
        if (item.children && item.children.length > 0) {
            const childKeys: string[] = extractTreeKeys(item.children)
            keys = keys.concat(childKeys)
        } else {
            keys.push(item.key)
        }
    });
    return keys
}

function Settings() {
    // React.Key is a predefined type that includes both string and number.
    // Although checkedKeys currently uses string value, React.Key is used here for future flexibility
    // in case numeric keys are introduced later.
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])
    const [accountName, setAccountName] = useState<string>("Current")
    const { menuList } = useSelector((state: any) => state.authSlice)
    const {
        dataList,
        page,
        pageSize,
        total,
        loading,
        formData,
        onChange,
        handleChange } = useDataList<SearchType, DataType>({ accountName: "" }, getAccountList)

    //Here, any is used to represent the type of the component's props, because the properties of the button
    // cannot be determined (third-party UI library). This ensures flexbility and extensibility.
    const AuthButton: React.FC<any> = withPermissions(['delete'], JSON.parse(sessionStorage.getItem("btnAuth") as string))(Button)

    // Send the update permissions and accountname to the backend
    // Smiplified here: printing the data to the console.
    const handle = () => {
        console.log(checkedKeys, accountName)
    }

    const edit = (menu: MenuType[], accountName: string) => {
        setAccountName(accountName)
        const newCheckedKeys = extractTreeKeys(menu)
        setCheckedKeys(newCheckedKeys)
    }

    const columns = [
        {
            title: "No.",
            key: "index",
            render: (text: any, record: any, index: any) => index + 1,
        },
        {
            title: "Acc Name",
            dataIndex: "accountName",
            key: "accountName",
        },
        {
            title: "Authority",
            dataIndex: "auth",
            key: "auth",
        },
        {
            title: "Person",
            dataIndex: "person",
            key: "person",
        },
        {
            title: "Tel",
            dataIndex: "tel",
            key: "tel",
        },
        {
            title: "Department",
            dataIndex: "department",
            key: "department",
        },
        {
            title: "Operate",
            key: "operate",
            render(value: string, record: any) {
                return <>

                    <Button size="small" type="primary" className="mr" onClick={() => edit(record.menu, record.accountName)} >Edit Auth</Button>
                    <Popconfirm
                        title="Confirmation"
                        description="Delete this account?"
                        okText="Confirm"
                        cancelText="Cancel"
                    >
                        <AuthButton size="small" type="primary" danger>Delete</AuthButton>
                        {/* <Button size="small" type="primary" danger>Delete</Button> */}
                    </Popconfirm>

                </>
            }
        }
    ]

    // Update the checked keys as a whole instead of adding or removing individual keys.
    const onCheck: TreeProps["onCheck"] = (checkedKeys) => {
        setCheckedKeys(checkedKeys as React.Key[])
    }

    useEffect(() => {
        setCheckedKeys(extractTreeKeys(menuList))
    }, [])

    return <div>
        <Card>
            <Row gutter={16}>
                <Col span={8}>
                    <Input name="accountName" value={formData.accountName} placeholder="Input the account name" onChange={handleChange} />
                </Col>
                <Col span={8}>
                    <Button type="primary">Search</Button>
                </Col>
                <Col span={8} className="tr">
                    <Button type="primary">Creat an Account</Button>
                </Col>
            </Row>
        </Card>
        <Row gutter={16} className="mt">
            <Col span={8}>
                <Card title={accountName + "'s Authority"}>
                    <Tree
                        treeData={treeData}
                        checkable={true}
                        checkedKeys={checkedKeys}
                        onCheck={onCheck}
                    />
                </Card>
                <Card className="mt">
                    <Popconfirm
                        title="Confirmation"
                        okText="Confirm"
                        cancelText="Cancel"
                        description={`Confirm to change ${accountName}'s authority.`}
                        onConfirm={handle}
                    >
                        <Button type="primary" >Submit to Change</Button>
                    </Popconfirm>
                </Card>
            </Col>
            <Col span={16}>
                <Card>
                    <Table
                        columns={columns}
                        loading={loading}
                        dataSource={dataList}
                        rowKey={record => record.id}
                        pagination={false}
                    />
                    <Pagination
                        showPrevNextJumpers
                        total={total}
                        current={page}
                        pageSize={pageSize}
                        onChange={onChange}
                        className="fr mt" />
                </Card>
            </Col>
        </Row>
    </div >
}

export default Settings