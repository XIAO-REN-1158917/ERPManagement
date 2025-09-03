import { Button, Card, Descriptions } from "antd"
import { useNavigate, useSearchParams } from "react-router-dom"
import { DescriptionsProps } from "antd"

// static data
const items: DescriptionsProps['items'] = [
    {
        key: '1',
        label: 'Type',
        children: 'Leased',
    },
    {
        key: '2',
        label: 'Name',
        children: 'Leased Agreement',
    },
    {
        key: '3',
        label: 'Start Date',
        children: '2023-03-05',
    },
    {
        key: '4',
        label: 'End Date',
        children: '2024-03-05',
    },
    {
        key: '5',
        label: 'Party A',
        children: 'Company A',
    },
    {
        key: '6',
        label: 'Party B',
        children: "Company B",
        span: 3,
    },
    {
        key: '7',
        label: 'State',
        children: 'Rejected',
    },
    {
        key: '8',
        label: 'Feedback',
        children: 'Lack of data',
    },
    {
        key: '9',
        label: 'Tel',
        children: '18888888888',
    },
    {
        key: '10',
        label: 'Additions',
        children: (
            <>
                1. Adition A
                <br />
                2. Adition B
                <br />
                3. Adition C
                <br />
                4. Adition D

            </>
        ),
    },
];

const items2: DescriptionsProps['items'] = [
    {
        key: '1',
        label: 'Estate',
        children: 'A1',
    },
    {
        key: '2',
        label: 'Room',
        children: '406',
    },
    {
        key: '3',
        label: 'Area',
        children: '96㎡',
    },
    {
        key: '4',
        label: 'Charge',
        children: '70㎡',
    },
    {
        key: '5',
        label: 'Porperty Fee',
        children: '6800',
    },
    {
        key: '6',
        label: 'State',
        children: "Fully furnished",
    },
    {
        key: '7',
        label: 'Contact',
        children: 'Candy',
    },
    {
        key: '8',
        label: 'Tel',
        children: '17777777777',
    },
];



function Surrender() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    return <div>
        <Card>
            <Button type="primary" onClick={() => navigate("/finance/contract?return=true")}>
                Back
            </Button>
        </Card>
        <Card className="mt">
            <Descriptions title={`Contract Number: ${searchParams.get("contractNo")}`} bordered items={items}></Descriptions>
            <Descriptions className="mt" title="Room Info" bordered items={items2}></Descriptions>
        </Card>
    </div>
}

export default Surrender