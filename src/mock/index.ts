import Mock from "mockjs"
//simulating network delay
Mock.setup({
    timeout: "200-600"
})
//login interface
Mock.mock("https://www.demo.com/login", "post", (options: any) => {
    const { username, password } = JSON.parse(options.body)
    // test account
    if (username === "admin" && password === "admin123123") {
        return {
            code: 200,
            message: "login successfully",
            data: {
                username: "admin",
                token: "mocktoken123456admin",
                btnAuth: ["add", "edit", "delete"]
            }
        }
    } else if (username === "manager" && password === "manager123123") {
        return {
            code: 200,
            message: "login successfully",
            data: {
                username: "manager",
                token: "mocktoken123456manager",
                btnAuth: ["add", "edit"]
            }
        }
    } else if (username === "user" && password === "user123123") {
        return {
            code: 200,
            message: "login successfully",
            data: {
                username: "user",
                token: "mocktoken123456user",
                btnAuth: ["add"]
            }
        }
    } else {
        return {
            code: 401,
            message: "Invalid username or password",
            data: ""
        }
    }

})

//menu data is different between roles
const menuList = [
    {
        "icon": "DashboardOutlined",
        "label": "Dashboard",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "Users",
        "key": "/users",
        "children": [
            {
                "icon": "UnorderedListOutlined",
                "label": "User List",
                "key": "/users/list",
            },
            // {
            //     "icon": "UserAddOutlined",
            //     "label": "New User",
            //     "key": "/users/add",
            // }
        ]
    },
    {
        "icon": "LaptopOutlined",
        "label": "Estate",
        "key": "/estate",
        "children": [
            {

                "icon": "InsertRowLeftOutlined",
                "label": "Tenement",
                "key": "/estate/tenement",

            },
            {
                "icon": "BankOutlined",
                "label": "Room",
                "key": "/estate/room",
            },
            {
                "icon": "TruckOutlined",
                "label": "Car",
                "key": "/estate/car",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "Repair",
        "key": "/repair"
    },
    {
        "icon": "DollarOutlined",
        "label": "Finance",
        "key": "/finance",
        "children": [
            {

                "icon": "ProfileOutlined",
                "label": "Contract",
                "key": "/finance/contract",

            },
            // {
            //     "icon": "FrownOutlined",
            //     "label": "Surrender",
            //     "key": "/finance/surrender",
            // },
            {
                "icon": "FileTextOutlined",
                "label": "Bill",
                "key": "/finance/bill",
            }
        ]
    },
    {
        "icon": "TransactionOutlined",
        "label": "Merchants",
        "key": "/merchants",
    },
    {
        "icon": "FundProjectionScreenOutlined",
        "label": "Opertation",
        "key": "/operation",
        "children": [
            {

                "icon": "FundViewOutlined",
                "label": "All",
                "key": "/operation/all",

            },
            {
                "icon": "ReadOutlined",
                "label": "Article",
                "key": "/operation/article",
            },
            {
                "icon": "CommentOutlined",
                "label": "Comments",
                "key": "/operation/comments",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "Equipment",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "Energy",
        "key": "/energy",
    },
    {
        "icon": "SettingOutlined",
        "label": "Settings",
        "key": "/settings",
    },
    {
        "icon": "UserOutlined",
        "label": "Personal",
        "key": "/personal",
    }
]

const userMenuList = [
    {
        "icon": "DashboardOutlined",
        "label": "Dashboard",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "Users",
        "key": "/users",
        "children": [
            {
                "icon": "UnorderedListOutlined",
                "label": "User List",
                "key": "/users/list",
            },
            // {
            //     "icon": "UserAddOutlined",
            //     "label": "New User",
            //     "key": "/users/add",
            // }
        ]
    },
    {
        "icon": "LaptopOutlined",
        "label": "Estate",
        "key": "/estate",
        "children": [
            {

                "icon": "InsertRowLeftOutlined",
                "label": "Tenement",
                "key": "/estate/tenement",

            },
            {
                "icon": "BankOutlined",
                "label": "Room",
                "key": "/estate/room",
            },
            {
                "icon": "TruckOutlined",
                "label": "Car",
                "key": "/estate/car",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "Repair",
        "key": "/repair"
    },
    {
        "icon": "ToolOutlined",
        "label": "Equipment",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "Energy",
        "key": "/energy",
    },
    {
        "icon": "UserOutlined",
        "label": "Personal",
        "key": "/personal",
    }
]

const managerMenuList = [
    {
        "icon": "DashboardOutlined",
        "label": "Dashboard",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "Users",
        "key": "/users",
        "children": [
            {
                "icon": "UnorderedListOutlined",
                "label": "User List",
                "key": "/users/list",
            },
            // {
            //     "icon": "UserAddOutlined",
            //     "label": "New User",
            //     "key": "/users/add",
            // }
        ]
    },
    {
        "icon": "LaptopOutlined",
        "label": "Estate",
        "key": "/estate",
        "children": [
            {

                "icon": "InsertRowLeftOutlined",
                "label": "Tenement",
                "key": "/estate/tenement",

            },
            {
                "icon": "BankOutlined",
                "label": "Room",
                "key": "/estate/room",
            },
            {
                "icon": "TruckOutlined",
                "label": "Car",
                "key": "/estate/car",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "Repair",
        "key": "/repair"
    },
    {
        "icon": "TransactionOutlined",
        "label": "Merchants",
        "key": "/merchants",
    },
    {
        "icon": "FundProjectionScreenOutlined",
        "label": "Opertation",
        "key": "/operation",
        "children": [
            {

                "icon": "FundViewOutlined",
                "label": "All",
                "key": "/operation/all",

            },
            {
                "icon": "ReadOutlined",
                "label": "Article",
                "key": "/operation/article",
            },
            {
                "icon": "CommentOutlined",
                "label": "Comments",
                "key": "/operation/comments",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "Equipment",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "Energy",
        "key": "/energy",
    },
    {
        "icon": "SettingOutlined",
        "label": "Settings",
        "key": "/settings",
    },
    {
        "icon": "UserOutlined",
        "label": "Personal",
        "key": "/personal",
    }
]

const customizeMenuList = [
    {
        "icon": "DashboardOutlined",
        "label": "Dashboard",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "Users",
        "key": "/users",
        "children": [
            {
                "icon": "UnorderedListOutlined",
                "label": "User List",
                "key": "/users/list",
            },
        ]
    },
    {
        "icon": "LaptopOutlined",
        "label": "Estate",
        "key": "/estate",
        "children": [
            {
                "icon": "InsertRowLeftOutlined",
                "label": "Tenement",
                "key": "/estate/tenement",
            },
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "Repair",
        "key": "/repair"
    },
    {
        "icon": "ToolOutlined",
        "label": "Equipment",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "Energy",
        "key": "/energy",
    },
    {
        "icon": "UserOutlined",
        "label": "Personal",
        "key": "/personal",
    }
]


//menu interface
Mock.mock('https://www.demo.com/menu', "get", (options: any) => {
    //This is a simplified handling of a mock API; 
    // the actual backend will not retrieve the token from local storage.
    const token = sessionStorage.getItem("token");
    if (token == "mocktoken123456admin") {
        return {
            code: 200,
            message: 'request successfully',
            data: menuList
        }
    } else if (token == "mocktoken123456user") {
        return {
            code: 200,
            message: 'request successfully',
            data: userMenuList
        }
    } else if (token == "mocktoken123456manager") {
        return {
            code: 200,
            message: 'request successfully',
            data: managerMenuList
        }
    } else {
        return {
            code: 200,
            message: "request failed",
            data: []
        }
    }
})

//echart interface - dashboard data of the first echart
Mock.mock('https://www.demo.com/energyData', "get", () => {
    return {
        code: 200,
        message: 'request successfully',
        data: [
            {
                name: "Coal",
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: "Gas",
                data: [220, 182, 191, 234, 290, 330, 310]
            },

            {
                name: "Petrol",
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: "Electricity",
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: "Heat",
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    }
})

//extension of mockjs for random phone number
Mock.Random.extend({
    phone: function () {
        var phonePrefixs = ['021', '027', '022', '028', '029']
        return this.pick(phonePrefixs) + Mock.mock(/\d{7}/)
    }
})

//user list interface
Mock.mock('https://www.demo.com/userList', "post", (options: any) => {
    const { pageSize, page, companyName, contact, phone } = JSON.parse(options.body)
    // console.log(pageSize, page, companyName, contact, phone)
    console.log("search data form front", JSON.parse(options.body))
    return {
        code: 200,
        message: 'request successfully',
        data: Mock.mock({
            [`list|${pageSize}`]: [
                {
                    "id": "@string('number',6)",//generate randomly a 6-digit string as the id
                    "name": "@name",//random name
                    "status|1": ["1", "2", "3"],//choose on of three
                    "tel|1": "@phone",// random phone number
                    "business|1": ["Manufacturing", "Internet", "New Media", "Beauty", "New Energy", "Logistics", "E-Commerce"],
                    "email": "@email",// random email address
                    "creditCode": "@string('number',18)",
                    "industryNum": "@string('number',15)",
                    "organizationCode": "@string('upper',9)",//generate randomly a 9-letters string
                    "legalPerson": "@name",
                },
            ],
            total: 78
        })
    }
})

//delet user interface
Mock.mock('https://www.demo.com/deleteUser', 'post', (options: any) => {
    const { id } = JSON.parse(options.body);
    console.log("delete", id);
    return {
        code: 200,
        message: "request successfully",
        data: "successfully"
    }
})

//batch delet user interface
Mock.mock('https://www.demo.com/batchDeleteUser', 'post', (options: any) => {
    const { ids } = JSON.parse(options.body);
    // console.log("batch delet", ids)
    return {
        code: 200,
        message: "request successfully",
        data: "successfully"
    }
})
//edit user
Mock.mock('https://www.demo.com/editUser', 'post', (options: any) => {
    // console.log("edit user", JSON.parse(options.body))
    return {
        code: 200,
        message: "request successfully",
        data: "successfully"
    }
})


//room list interface
function generateRooms() {// generate random data
    const rooms = [];
    for (let i = 0; i < 50; i++) {
        const floor = 1 + Math.floor(i / 6); // every floor has six rooms
        const roomNumber = floor * 100 + (101 + (i % 6));
        rooms.push({
            roomNumber,
            decorationType: Mock.Random.pick(['Unfinished', 'Fully furnished']),
            area: Mock.Random.integer(70, 300),
            unitPrice: Mock.Random.integer(1, 3),
            src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'// this img for test
        });
    }
    return rooms;
}
Mock.mock('https://www.demo.com/roomList', 'post', (options: any) => {
    // console.log("room id", JSON.parse(options.body).roomid)
    return {
        code: 200,
        message: "request successfully",
        data: {
            rooms: generateRooms()
        }
    };
});

// contract list interface
Mock.mock('https://www.demo.com/contractList', 'post', (options: any) => {
    const { page, pageSize } = JSON.parse(options.body);
    // console.log("contract list interface", JSON.parse(options.body))
    return {
        code: 200,
        message: "request successfully",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'contractNo': '@string("number", 6)',
                'type|1': ['Lease', 'Customized', 'Sales'],
                'name|1': ["Lease Agreement", "General Tamplate", "Sales Agreement"],
                "startDate|1": ['2023-01-01', '2023-03-05', '2023-04-01'],
                "endDate|1": ['2024-01-01', '2024-03-05', '2024-04-01'],
                'partyA|1': ['Company A', 'Company B', 'Company C'],
                'partyB': 'Company X',
                'status|1': ["1", "2", "3"],
            }],
            "total": 54
        })

    }
});

//bill list
Mock.mock('https://www.demo.com/billList', 'post', (options: any) => {
    const { page, pageSize, companyName, contact, phone } = JSON.parse(options.body);
    // console.log("search data form front", JSON.parse(options.body))
    return {
        code: 200,
        message: "request successfully",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'accountNo': '@string("number", 6)',
                'status|1': ['1', '2'],
                'roomNo|1': ["A1-201", "B1-402", "B2-701", "C2-1601"],
                "carNo|1": ['B109', 'C227', 'C106', "D158"],
                "tel|1": ['@phone'],
                'costName1|1': [1278.00, 2633.00, 3698.00],
                'costName2': '200$/M',
                'costName3|1': ["25800/Y", "19800/Y"],
                'startDate': "2023-01-01",
                'endDate': "2024-01-01",
                'preferential': 0.00,
                'money': 26000.00,
                'pay|1': ["Credit", "Card", "Cash", "BankAccount"]
            }],
            "total": 54
        })
    }
});

//equipment List
Mock.mock('https://www.demo.com/equipmentList', 'post', (options: any) => {
    const { pageSize } = JSON.parse(options.body);
    console.log("search data form front", JSON.parse(options.body))
    return {
        code: 200,
        message: "request successfully",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'id|+1': 1001,
                'name|1': ['E-a', 'E-b', 'E-c', 'E-d', 'E-e'],
                'no|1': ["A1-201", "B1-402", "B2-701", "C2-1601"],
                "person|1": ["Manager A", "Manager B"],
                "tel|1": ['@phone'],
                'time|1': ["10Y", "15Y", "20Y"],
                'rest': '7Y',
                'status|1': [1, 2, 3],
                'last|1': ["2023-01-01", "2024-01-01"],
                'type|1': ["T1", "T2", "T3"],
                'from|1': ["Company 1", "Company 2"],
            }],
            "total": 66
        })
    }
});

//account list
Mock.mock('https://www.demo.com/accountList', 'post', (options: any) => {
    console.log("accountList", JSON.parse(options.body))
    return {
        code: 200,
        message: "request successfully",
        data: {
            list: [
                {
                    id: 1001, accountName: "Sandra", auth: "admin", person: "Sandra Williams", tel: "188888888888", department: "Office", menu: menuList
                },
                {
                    id: 1002, accountName: "Karen", auth: "user", person: "Karen Robinson", tel: "17777777777", department: "IT", menu: userMenuList
                },
                {
                    id: 1003, accountName: "Steven", auth: "manager", person: "Steven Jones", tel: "16666666666", department: "Finance", menu: managerMenuList
                },
                {
                    id: 1004, accountName: "David", auth: "customize", person: "David Thompson", tel: "15555555555", department: "Marketing", menu: customizeMenuList
                },
                {
                    id: 1005, accountName: "Daniel", auth: "user", person: "Daniel Anderson", tel: "14444444444", department: "Office", menu: userMenuList
                }
            ],
            total: 5
        }
    }
});