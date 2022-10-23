import React, { lazy } from 'react'
import history from '@shared/App/ht'
import { CoffeeOutlined, UserOutlined, VideoCameraOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { userInfo } from '@store/authStore/syncUserInfo'
export type RouteMapValue = {
    component: React.LazyExoticComponent<() => JSX.Element>
    path: string
}

export const routeMap = {
    SocketDebugger: {
        component: lazy(() => import('@views/SocketDebugger')),
        path: '/'
    },
    Users: {
        component: lazy(() => import('@views/Users')),
        path: '/users'
    },
    DouYinVideo: {
        component: lazy(() => import('@views/DouYinVideo')),
        path: '/dy-v'
    },
    TestInstance: {
        component: lazy(() => import('@views/TestInstance')),
        path: '/test-vm'
    }
}

/**
 * menu
 * PS: 有路由时, key必须与routeMap对应, 否则不能匹配跳转
 */
const menus: ItemType[] = [
    { key: 'SocketDebugger', label: 'SocketDebugger', icon: <CoffeeOutlined /> },
    { key: 'DouYinVideo', label: '抖音', icon: <VideoCameraOutlined /> },
    { key: 'Users', label: '用户', icon: <UserOutlined /> },
    { key: 'TestInstance', label: '测试实例 ', icon: <PlayCircleOutlined /> }
]

export default menus

/**
 * all routers key
 */
export type RouteMapKey = keyof typeof routeMap

/**
 * all routers key
 */
export const routeKeys = Object.keys(routeMap) as RouteMapKey[]

/**
 * 带跳转地址的menu
 */
export const menusWithRoute: ItemType[] = []

// 递归寻找
function match(items: ItemType[]) {
    items.forEach(function (item) {
        if (routeKeys.includes(item.key as RouteMapKey)) {
            menusWithRoute.push(item)
        }
        const children = (item as any).children as ItemType[]
        if (Array.isArray(children)) {
            match(children)
        }
    })
    if (!userInfo?.token) {
        history.replace('/login')
    }
}

match(menus)
