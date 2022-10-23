import { Steps } from 'antd'
import React, { useState } from 'react'
import Base from './components/base'
import SelectWord from './components/selectWord'
import { ruleForm } from '@views/TestInstance/testInstance'
import { saveTable } from '@api/test'
const { Step } = Steps

const App = () => {
    const [current, setCurrent] = useState(0)
    const [data, setData] = useState({
        typeId: null,
        connectionId: null,
        database: null,
        caseId: 335,
        projectId: 35,
        stepType: 4,
        stepName: '',
        descStep: {
            environmentId: null,
            sourceId: null,
            sourceType: null,
            connectionId: null,
            sourceName: null,
            databaseName: null,
            tableName: null,
            stepName: ''
        },
        fields: []
    } as ruleForm)

    const onChange = value => {
        console.log('onChange:', value)
        setCurrent(value)
    }
    // 数据源的修改
    const onBaseSave = value => {
        const obj = Object.assign({}, data, {
            typeId: value.typeId,
            connectionId: value.connectionId,
            database: value.databaseName,
            table: value.tableName,
            stepName: value.stepName,
            descStep: value
        })
        setData(obj)
        console.log('onSave1:', obj)
    }
    // 保存表结构对比
    const saveTableContrast = async () => {
        const obj = {
            caseId: 335,
            projectId: 35,
            stepType: 4,
            stepName: data.descStep.stepName,
            descStep: {
                descStep: data.descStep,
                fields: data.fields
            }
        }
        const { result }: any = await saveTable(obj)
    }
    // 选择字段的修改
    const onWordSave = value => {
        console.log('onSave2:', value)
        const obj = Object.assign({}, data, value)
        setData(obj)
    }
    // 最后的保存
    const onSuccessSave = value => {
        const obj = Object.assign({}, data, { fields: value })
        setData(obj)
        saveTableContrast()
    }

    return (
        <div className="sec-container">
            <Steps className="mb_20" current={current} onChange={onChange}>
                <Step status="finish" title="数据源" />
                <Step status="process" title="选择字段" />
                <Step status="wait" title="Step 3" />
            </Steps>
            {/*基本数据库数据*/}
            {current === 0 && <Base descStep={data.descStep} onSave={onBaseSave} />}
            {/*选择字段*/}
            {current === 1 && (
                <SelectWord
                    connectionId={data.connectionId}
                    database={data.database}
                    table={data.table}
                    typeId={data.typeId}
                    fields={data.fields}
                    onSave={onWordSave}
                    onSuccess={onSuccessSave}
                />
            )}
        </div>
    )
}

export default App
