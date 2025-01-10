import { Row, Col, Card, Progress, Statistic, Timeline, Tag } from "antd"
import { RadarChartOutlined, SnippetsOutlined, DollarOutlined, LaptopOutlined } from "@ant-design/icons"
// npm install echart echart-for-react --save
// echart-for-react encapsulate sonme method to adapt ECharts for React.
import ReactECharts from "echarts-for-react"
import { getEnergyData } from "../../api/dashboard"
import { useEffect, useState } from "react"
import "./index.scss"

//There are 3 echarts, the first one fetch data from api.(This demonstrates that I know how to call API)
// two others use static data (Since just mock data and logic is the same, not necessary to repeat.)
// static mock data for echart
const option2 = {
    title: {
        text: 'Form'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {},
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: [0, 0.01],
        data: ['2014', '2016', '2018', '2020', '2022', "2024"]
    },
    yAxis: {
        type: 'value',

    },
    series: [
        {
            name: 'Individual',
            type: 'bar',
            data: [40, 220, 378, 658, 1122, 1200]
        },
        {
            name: 'Family',
            type: 'bar',
            data: [20, 39, 443, 490, 559, 762]
        },
        {
            name: 'Group',
            type: 'bar',
            data: [78, 167, 229, 330, 380, 420]
        }
    ]
};
const option3 = {
    legend: {
        top: '5px'
    },
    series: [
        {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [30, 100],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 8
            },
            data: [
                { value: 40, name: 'operating' },
                { value: 38, name: 'Leased' },
                { value: 32, name: 'For rent' },
                { value: 30, name: 'Renewal' },
                { value: 28, name: 'Sign' },
                { value: 26, name: 'Vacancy' },
                { value: 22, name: 'Move out' },
            ]
        }
    ]
};


function Dashboard() {
    // template data of the first line chart
    const initialOption = {
        title: {
            text: 'Today'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: []
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00']
        },
        yAxis: {
            type: 'value'
        },
        series: []
    };

    const [data, setData] = useState(initialOption)

    useEffect(() => {
        // fetch echart data from api(mock)
        const loadData = async () => {
            const { data: apiData } = await getEnergyData()
            const dataList = apiData.map((item: any) => ({
                name: item.name,
                data: item.data,
                type: "line",
                stack: "Total"
            }))
            const updataOption = {
                ...data,
                legend: { data: dataList.map((item: any) => item.name) },
                series: dataList
            }
            setData(updataOption)
        }
        loadData()
    }, [])
    return <div className="dashboard">
        <Row gutter={16}>
            <Col span={6}>
                <Card className="clearfix">
                    <div className="fl  area">
                        <h2>13479</h2>
                        <p>Total Area(sq.m)</p>
                    </div>
                    <div className="fr">
                        <RadarChartOutlined className="icon" />
                    </div>
                </Card>
            </Col>
            <Col span={6}>
                <Card className="clearfix">
                    <div className="fl  area">
                        <h2>8635</h2>
                        <p>Leasedhold Area(sq.m)</p>
                    </div>
                    <div className="fr">
                        <SnippetsOutlined className="icon" style={{ color: "#81c452" }} />
                    </div>
                </Card>
            </Col>
            <Col span={6}>
                <Card className="clearfix">
                    <div className="fl  area">
                        <h2>38764</h2>
                        <p>Gross Annual(K)</p>
                    </div>
                    <div className="fr">
                        <DollarOutlined className="icon" style={{ color: "#62c9cb" }} />
                    </div>
                </Card>
            </Col>
            <Col span={6}>
                <Card className="clearfix">
                    <div className="fl  area">
                        <h2>2874</h2>
                        <p>Business Tenants</p>
                    </div>
                    <div className="fr">
                        <LaptopOutlined className="icon" style={{ color: "#e49362" }} />
                    </div>
                </Card>
            </Col>
        </Row>
        <Row gutter={16} className="mt">
            <Col span={12}>
                <Card title="Energy Consuption">
                    <ReactECharts option={data}></ReactECharts>
                </Card>
            </Col>
            <Col span={12}>
                <Card title="Business">
                    <ReactECharts option={option2}></ReactECharts>
                </Card>
            </Col>
        </Row>
        <Row gutter={16} className="mt">
            <Col span={12}>
                <Card title="Tenements">
                    <ReactECharts option={option3}></ReactECharts>
                </Card>
            </Col>
            <Col span={6}>
                <Card title="Vcant Parking Spot">
                    <div className="wrap">
                        <Progress type="circle" percent={75} />
                        <Statistic title="Total Parking Spot" value={75} suffix="/ 100" className="mt" />
                    </div>
                </Card>
            </Col>
            <Col span={6}>
                <Card title="Real-Time Info" style={{ height: "406px" }}>
                    <Timeline
                        items={[
                            {
                                children: <><Tag color="green">IN</Tag>08:24 QWE123</>
                            },
                            {
                                children: <><Tag color="red">OUT</Tag>09:15 ASD321  </>,
                                color: 'red',
                            },
                            {
                                children: <><Tag color="green">IN</Tag>09:22 ZXC123  </>,
                            },
                            {
                                children: <><Tag color="red">OUT</Tag>10:43 JHG765  </>,
                                color: 'red',
                            },
                            {
                                children: <><Tag color="green">IN</Tag>13:38 OIU098  </>,
                            },
                            {
                                children: <><Tag color="green">IN</Tag>14:46 UYT765  </>,

                            },
                        ]}
                    />
                </Card>
            </Col>
        </Row>
    </div>
}

export default Dashboard