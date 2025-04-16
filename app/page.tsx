"use client"

import React, {useState, useEffect} from "react"
import {Button, Layout, Menu, Segmented, theme, Modal} from "antd"

import {my_axios} from "@/hook/useAxios"

// icons
import {
    LogoutOutlined,
    PlusCircleOutlined,
    UserOutlined,
} from "@ant-design/icons"
import {RxDashboard} from "react-icons/rx"
import {LuShoppingCart, LuPackage} from "react-icons/lu"
import {BiGroup} from "react-icons/bi"
import {BsGraphUp} from "react-icons/bs"
import FormModal from "@/components/form-modal"
import ProductTable from "@/components/table"

const {Header, Sider, Content} = Layout

const AdminDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState<any>(false)
    const [productData, setProductData] = useState<any>([])
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<any>(false)
    const [selectedProduct, setSelectedProduct] = useState<any>(null)

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken()

    const fetchData = async () => {
        try {
            const {data} = await my_axios.get("/products")
            setProductData(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleEdit = (product: any) => {
        setSelectedProduct(product)
        setIsModalOpen(true)
    }

    return (
        <Layout style={{minHeight: "100vh", overflow: "hidden"}}>
            <Sider
                trigger={null}
                collapsed={true}
                className="!sticky !top-0 !h-screen !overflow-auto">
                <Menu
                    className="!h-screen"
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["3"]}
                    items={[
                        {
                            key: "1",
                            icon: <RxDashboard className="!text-[20px]" />,
                        },
                        {
                            key: "2",
                            icon: <LuShoppingCart className="!text-[20px]" />,
                        },
                        {
                            key: "3",
                            icon: <LuPackage className="!text-[20px]" />,
                        },
                        {
                            key: "4",
                            icon: <BiGroup className="!text-[20px]" />,
                        },
                        {
                            key: "5",
                            icon: <BsGraphUp className="!text-[18px]" />,
                        },
                    ]}
                />
            </Sider>

            <Layout>
                <Header
                    style={{padding: 0, background: colorBgContainer}}
                    className="flex justify-end items-center !pr-5">
                    <div className="flex justify-center items-center gap-[10px]">
                        <Button
                            shape="circle"
                            size="large"
                            icon={<UserOutlined className="opacity-60" />}
                        />
                        <Button
                            onClick={() => setIsLogoutModalOpen(true)}
                            shape="circle"
                            size="large"
                            icon={<LogoutOutlined className="opacity-60" />}
                        />
                    </div>
                </Header>

                <div className="!flex !justify-between !items-center select-none !my-[10px] !px-[16px]">
                    <Segmented
                        size="large"
                        options={["All", "Active", "Draft", "Archived"]}
                    />
                    <Button
                        className="w-[150px] !font-medium !bg-[#0f172a]"
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        onClick={() => {
                            setSelectedProduct(null)
                            setIsModalOpen(true)
                        }}>
                        Add product
                    </Button>
                </div>

                <Content
                    style={{
                        margin: "0 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}>
                    <ProductTable
                        productData={productData}
                        fetchData={fetchData}
                        onEdit={handleEdit}
                    />
                </Content>
            </Layout>

            <FormModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                fetchData={fetchData}
                selectedProduct={selectedProduct}
            />

            <Modal
                title="Confirm Logout"
                open={isLogoutModalOpen}
                onCancel={() => setIsLogoutModalOpen(false)}
                okText="Yes, Logout"
                cancelText="Cancel">
                <p>Are you sure you want to log out?</p>
            </Modal>
        </Layout>
    )
}

export default AdminDashboard
