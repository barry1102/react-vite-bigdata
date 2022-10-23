import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select, Space } from 'antd'
import React from 'react'
import { useEffect, useState } from 'react'
import { getTableColumns } from '@api/test'
import { fieldTypes } from '@views/TestInstance/testInstance'

const { Option } = Select

interface IProps {
    fields: fieldTypes[]
    connectionId: number
    database: string
    table: string
    typeId: number
    onSave: (values: any) => void
    onSuccess: (values: any) => void
}

const App = ({ fields, connectionId, database, table, typeId, onSave, onSuccess }: IProps) => {
    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        onSuccess(values.fields)
    }

    // 字段下拉项
    const [columns, setColumns] = useState([])
    // 获取字段下拉项
    const getColumns = async () => {
        if (!connectionId || !database || !table || !typeId) {
            setColumns([])
            return
        }
        const data = {
            connectionId,
            database,
            sortByLetter: 'asc',
            table,
            typeId
        }
        const { result }: any = await getTableColumns(data)
        setColumns(result)
    }
    const onValuesChange = (changedValues, allValues) => {
        onSave(Object.assign({}, form.getFieldsValue(true)))
    }
    // 初始化表单数据
    // 搜索条件改变重新请求字段下拉项
    useEffect(() => {
        form.setFieldsValue({ fields })
        console.log(44, fields)
        getColumns()
    }, [])
    return (
        <Form
            form={form}
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            onValuesChange={onValuesChange}
            autoComplete="off"
        >
            <Form.List name="fields">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} align="baseline">
                                <Form.Item
                                    {...restField}
                                    label="字段"
                                    name={[name, 'fieldName']}
                                    rules={[{ required: true, message: '请选择字段' }]}
                                >
                                    <Select style={{ width: 130 }}>
                                        {columns.map(item => (
                                            <Option key={item.columnName} value={item.columnName}>
                                                {item.columnName}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    label="字段类型"
                                    name={[name, 'fieldType']}
                                    rules={[{ required: true, message: '请输入字段类型' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    label="字段备注"
                                    name={[name, 'fieldComment']}
                                    rules={[{ required: true, message: '请输入字段备注' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}

                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add fields
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default App
