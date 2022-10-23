import type * as React from 'react'
export interface fieldTypes {
    fieldName: string
    fieldType: string
    fieldComment: string
}
export interface descStep {
    environmentId: number
    sourceId: number
    sourceType: number
    typeId: number
    connectionId: number
    sourceName: string
    databaseName: string
    tableName: string
    stepName: string
}
export interface addParams {
    caseId: number
    projectId: number
    stepName: string
    stepType: number
    descStep: descStep
    fields: fieldTypes[]
}
export interface ruleForm extends addParams {
    connectionId: number
    database: string
    table: string
    typeId: number
}

export interface MenuItemType extends ItemSharedProps {
    label?: React.ReactNode
    disabled?: boolean
    itemIcon?: RenderIconType
    key: React.Key
    onMouseEnter?: MenuHoverEventHandler
    onMouseLeave?: MenuHoverEventHandler
    onClick?: MenuClickEventHandler
}

export interface MenuItemGroupType extends ItemSharedProps {
    type: 'group'
    label?: React.ReactNode
    children?: ItemType[]
}

export interface MenuDividerType extends ItemSharedProps {
    type: 'divider'
}

export declare type ItemType = SubMenuType | MenuItemType | MenuItemGroupType | MenuDividerType | null
export declare type MenuMode = 'horizontal' | 'vertical' | 'inline'
export declare type BuiltinPlacements = Record<string, any>
export declare type TriggerSubMenuAction = 'click' | 'hover'

export interface RenderIconInfo {
    isSelected?: boolean
    isOpen?: boolean
    isSubMenu?: boolean
    disabled?: boolean
}

export declare type RenderIconType = React.ReactNode | ((props: RenderIconInfo) => React.ReactNode)

export interface MenuInfo {
    key: string
    keyPath: string[]
    /** @deprecated This will not support in future. You should avoid to use this */
    item: React.ReactInstance
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
}

export interface MenuTitleInfo {
    key: string
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
}

export declare type MenuHoverEventHandler = (info: { key: string; domEvent: React.MouseEvent<HTMLElement> }) => void

export interface SelectInfo extends MenuInfo {
    selectedKeys: string[]
}

export declare type SelectEventHandler = (info: SelectInfo) => void
export declare type MenuClickEventHandler = (info: MenuInfo) => void
export declare type MenuRef = {
    /**
     * Focus active child if any, or the first child which is not disabled will be focused.
     * @param options
     */
    focus: (options?: FocusOptions) => void
    list: HTMLUListElement
}
export { }
