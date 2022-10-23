import { Button, Checkbox, Form, Input, Select } from 'antd'
import React, { useState, useEffect } from 'react'
import { getDatabases, getDbEnv, getDbSourceConnectionList, getTables } from '@api/test'
import { descStep } from '@views/TestInstance/testInstance'

interface Source {
    connectionId: number
    typeId: number
    sourceId: number
    sourceType: number
    sourceName: string
}

const { Option } = Select

interface IProps {
    descStep: descStep
    onSave: (values: any) => void
}

const App = ({ descStep, onSave }: IProps) => {
    const [form] = Form.useForm()

    function emitSave(value) {
        onSave(Object.assign({}, value, source))
    }

    // source对象
    const [source, setSource] = useState({} as Source)
    // 4.表名下拉项
    const [tableOpts, setTableOpts] = useState([])
    // 获取表名下拉项
    const getTableOpts = async ({ database, connectionId, typeId }) => {
        if (!database) {
            return
        }
        const data = {
            database: database,
            connectionId: connectionId,
            typeId: typeId
        }
        const { result }: any = await getTables(data)
        setTableOpts(result)
    }
    // 3.source数据库下拉项
    const [sourceDbOpts, setSourceDbOpts] = useState([])
    // 获取source数据库下拉项
    const getSourceDbOpts = async ({ connectionId, typeId }) => {
        if (!connectionId || !typeId) {
            return
        }
        const data = {
            connectionId,
            typeId: typeId
        }
        const { result }: any = await getDatabases(data)
        setSourceDbOpts(result)
    }
    // source数据库切换
    const onSourceDbChange = (value: string) => {
        if (value) {
            getTableOpts({ database: value, connectionId: source.connectionId, typeId: source.typeId })
        }
    }

    // 2.source数据源下拉项
    const [sourceDataOpts, setSourceDataOpts] = useState([])
    // 获取source数据源下拉项
    const getSourceDataOpts = async value => {
        if (!value) {
            return
        }
        const data = {
            environmentId: value,
            projectId: 35,
            connectionStatus: 1
        }
        const {
            result: [{ dbSources }]
        }: any = await getDbSourceConnectionList(data)
        setSourceDataOpts(dbSources)
    }
    // source数据源切换
    const onSourceDataChange = (value: number) => {
        console.log(value)
        if (value) {
            const item = sourceDataOpts.find(item => item.connectionId === value)
            const obj = {
                typeId: item.typeId,
                sourceId: item.sourceId,
                sourceType: item.typeId,
                sourceName: item.sourceName,
                connectionId: item.connectionId
            }

            setSource(obj)
            onSave(obj)
            getSourceDbOpts(obj)
        }
    }

    // 1.环境下拉项
    const [envOpts, setEnvOpts] = useState([])
    // 获取环境下拉项
    const getEnvOpts = async () => {
        const { result }: any = await getDbEnv()
        setEnvOpts(result)
    }
    // source环境切换
    const onSourceEnvChange = (value: string) => {
        if (value) {
            getSourceDataOpts(value)
        }
    }

    const onFinish = values => {
        emitSave(values.fields)
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo)
    }

    const onValuesChange = (changedValues, allValues) => {
        if (!changedValues.connectionId) {
            emitSave(form.getFieldsValue(true))
        }
    }
    useEffect(() => {
        form.setFieldsValue(descStep)
        const { environmentId, databaseName, connectionId, typeId } = descStep
        getEnvOpts()
        getSourceDataOpts(environmentId)
        getSourceDbOpts(({ connectionId: descStep.connectionId, typeId: descStep.typeId } = descStep))
        getTableOpts({ database: databaseName, connectionId, typeId })
    }, [])
    return (
        <Form
            form={form}
            name="basic"
            labelCol={{
                span: 8
            }}
            wrapperCol={{
                span: 16
            }}
            initialValues={{
                remember: true
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
            autoComplete="off"
        >
            <Form.Item
                label="步骤名称"
                name="stepName"
                rules={[
                    {
                        required: true,
                        message: '请输入步骤名称!'
                    }
                ]}
            >
                <Input />
            </Form.Item>
            <div className="dis-flex">
                {/*环境*/}
                <Form.Item
                    label="环境"
                    name="environmentId"
                    rules={[
                        {
                            required: true,
                            message: '请选择环境'
                        }
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="请选择环境"
                        optionFilterProp="label"
                        onChange={onSourceEnvChange}
                        filterOption
                    >
                        {envOpts.map(item => {
                            return (
                                <Option key={item.id} value={item.id}>
                                    {item.environmentName}
                                </Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                {/*数据源*/}
                <Form.Item
                    label="数据源"
                    name="connectionId"
                    rules={[
                        {
                            required: true,
                            message: '请选择数据源'
                        }
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="请选择数据源"
                        optionFilterProp="label"
                        onChange={onSourceDataChange}
                        filterOption
                    >
                        {sourceDataOpts.map(item => {
                            return (
                                <Option key={item.connectionId} value={item.connectionId}>
                                    {item.sourceName}
                                </Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                {/*数据库*/}
                <Form.Item
                    label="数据库"
                    name="databaseName"
                    rules={[
                        {
                            required: true,
                            message: '请选择数据库'
                        }
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="请选择数据库"
                        optionFilterProp="label"
                        onChange={onSourceDbChange}
                        filterOption
                    >
                        {sourceDbOpts.map(item => {
                            return (
                                <Option key={item} value={item}>
                                    {item}
                                </Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                {/*表名*/}
                <Form.Item
                    label="表名"
                    name="tableName"
                    rules={[
                        {
                            required: true,
                            message: '请选择表名'
                        }
                    ]}
                >
                    <Select showSearch placeholder="请选择表名" optionFilterProp="label" filterOption>
                        {tableOpts.map(item => {
                            return (
                                <Option key={item} value={item}>
                                    {item}
                                </Option>
                            )
                        })}
                    </Select>
                </Form.Item>
            </div>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default App
