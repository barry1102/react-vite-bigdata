import request from '@utils/request'

// 获取不同的数据库环境
export function getDbEnv() {
    return request({
        url: '/system/source/listDbEnv',
        method: 'get'
    })
}

//获取数据源及连接列表接口,系统管理数据库管理列表展示用
export function getDbSourceConnectionList(data) {
    return request({
        url: '/system/source/getDbSourceConnectionList',
        method: 'post',
        data
    })
}
//根据数据源获取数据库列表
export function getDatabases(data) {
    return request({
        url: '/query/quickQuery/getDatabases',
        method: 'post',
        data
    })
}
//根据数据库获取表列表
export function getTables(data) {
    return request({
        url: '/query/quickQuery/getTables',
        method: 'post',
        data
    })
}
//根据表获取表字段
export function getTableColumns(data) {
    return request({
        url: '/query/quickQuery/getColumns',
        method: 'post',
        data
    })
}
//保存表结构对比
export function saveTable(data) {
    return request({
        url: '/testcase/step/insert',
        method: 'post',
        data
    })
}
