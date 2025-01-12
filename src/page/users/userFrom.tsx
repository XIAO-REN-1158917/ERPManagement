import { Modal, Form, Row, Col, Input, Radio, message } from "antd"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { editUser } from "../../api/userList"

interface FormProps {
    visible: boolean,
    hideModal: () => void,
    title: string,
    loadData: () => void
}

// This component is used for adding and editing users.
function UserForm(props: FormProps) {
    const [form] = Form.useForm()
    const { visible, hideModal, title, loadData } = props
    const { userData } = useSelector((state: any) => state.userSlice)
    const handleOk = () => {
        form.validateFields().then(async (res) => {
            const { data } = await editUser(res)
            message.success(data)
            hideModal()
            loadData()
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        title == "Add User" ? form.resetFields() : form.setFieldsValue(userData)
    }, [visible])
    return <>
        <Modal
            title={title}
            open={visible}
            onCancel={hideModal}
            onOk={handleOk}
            width={1000}
        >
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
            >
                // Data validation is not deployed
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: "Please input the name" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Tel"
                            name="tel"
                            rules={[
                                { required: true, message: "Please input the phone number" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[{ required: true, message: "Please select a status" }]}
                        >
                            <Radio.Group>
                                <Radio value="1">Active</Radio>
                                <Radio value="2">Inactive</Radio>
                                <Radio value="3">Closed</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Industry"
                            name="business"
                            rules={[
                                { required: true, message: "Please input the industry" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: "Please input the email" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Credit Code"
                            name="creditCode"
                            rules={[{ required: true, message: "Please input the credit code" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Industry Num"
                            name="industryNum"
                            rules={[{ required: true, message: "Please input the Industry Num" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Organization Code"
                            name="organizationCode"
                            rules={[{ required: true, message: "Please input the Organization Code" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Legal Person"
                            name="legalPerson"
                            rules={[{
                                required: true, message: "Please input the Legal Person"
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    </>
}


export default UserForm