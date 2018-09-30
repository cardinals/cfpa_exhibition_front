/*
 * GMoft Project
 *
 * @Description: 请在这里描述这个文件的通途
 *     # 
 *
 * @Author: 张赫之
 * @Date:   2017-05-25 16:58:43
 * @Last Modified by:   张赫之
 * @Last Modified time: 2017-05-26 10:38:48
 */
Ext.define('FirePlanGisApp.view.viewport.map.SearchBar', {
    extend: 'Ext.container.Container',
    alias: 'widget.viewport-map-searchbar',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    ui: 'map',
    cls: 'app-map-searchbar',

    defaults: {
        ui: 'map-searchbar'
    },

    items: [{
        xtype: 'button',
        reference: 'searchMenu',
        ui: 'map-searchbar',
        cls: 'category-btn',
        focusable: false,
        menu: {
            plain: true,
            listeners: {
                click: 'onSwitchSearch'
            }
        }
    }, {
        xtype: 'textfield',
        reference: 'fuzzyKeyField',
        bind: {
            value: '{theModuleContext.fuzzyAddressKey}'
        },
        cls: 'keyword-textfield',
        flex: 1,
        emptyText: '名称 | 编号 | 地址 | ...',
        checkChangeBuffer: 1000,
        triggers: {
            clear: {
                weight: 1,
                cls: 'x-fa fa-times-circle',
                handler: function(field) {
                    field.setValue(null);
                },
                tooltip: '清除'
            }
        }
    }]
});