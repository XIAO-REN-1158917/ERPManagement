//To avoid WebPack path resolution errors, import images as modules.
//Another approach is to use absolute paths.
import logo from "../../assets/logo.png"
import bg from "../../assets/bg.jpg"
import lgbg from "../../assets/lgbg.jpg"

import "./index.scss"
import { Button, Form, Input } from "antd"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { login } from "../../api/users"
import { setToken } from "../../store/login/authSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Login() {
    //instances

    //Generate a form instance and assign it to the Form component below,
    // enabling the use of built-in methods in the AntD component, such as form.validateFields().
    const [form] = Form.useForm()

    //Add an animation effect to the login button. 
    // When clicked, a loading animation appears (true), and it is removed (false) after login is complete.
    const [loading, setLoading] = useState<boolean>(false)

    // Retrieve the dispatch from React-Redux's context
    const dispatch = useDispatch()

    const navigate = useNavigate()

    //click login button will call this function
    function handleLogin() {
        form.validateFields().then(async (res) => {
            setLoading(true)
            const { data: { token, username, btnAuth } } = await login(res)
            setLoading(false)
            dispatch(setToken(token))

            //This is a simplified approach, considering that the username is not frenquently used
            //when a token is available
            sessionStorage.setItem("username", username)

            // Storing button permission info locally poses a risk.
            // One solution is for the backend to validate the permission info in the token upon receiving a request.
            // If it does not match the required permission for the request, an error is returned.
            // Or store button permission in Rudux and reload on refresh to prevent data loss.
            sessionStorage.setItem("btnAuth", JSON.stringify(btnAuth))

            //Delete the record; clicking "Back" will not return to the previous page.
            navigate("/", { replace: true })
        }).catch((err) => {
            setLoading(false)
            console.log("err", err)
        })
    }


    return <div className="login" style={{ backgroundImage: `url(${bg})` }}>
        <div className="lgbg" style={{ backgroundImage: `url(${lgbg})` }}>
            <div className="part">
                <div className="title">
                    <div className="logo">
                        <img src={logo} width={100} />
                    </div>
                    <h1>Comprehensive Admin Console</h1>
                </div>
                <Form
                    form={form}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: 'Please input your username!' }
                            // We can use pattern:/rege/ to create a customized validation.
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Please input your username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Please input your password" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            style={{ width: "100%" }}
                            onClick={handleLogin}
                            loading={loading}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </div>
}

export default Login