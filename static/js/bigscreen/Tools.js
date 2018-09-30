/*
 * GMoft Project
 *
 * @Description: 请在这里描述这个文件的通途
 *     # 
 *
 * @Author: 张赫之
 * @Date:   2017-05-25 16:58:43
 * @Last Modified by:   张赫之
 * @Last Modified time: 2017-05-26 13:14:00
 */
Ext.define('FirePlanGisApp.view.viewport.map.Tools', {
    extend: 'Ext.container.Container',
    alias: 'widget.viewport-map-tools',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    cls: 'app-map-tools',

    defaults: {
        xtype: 'button',
        iconAlign: 'top'
    },

    items: [{
        xtype: 'box',
        flex: 1
    }, {
        text: '',
        ui: 'map-tools',
        cls: 'app-map-tools-btn zddw-btn',
        margin: '0 4',
        btnType: 'zddw',
        handler: 'onNearbyData'
    }, {
        text: '',
        ui: 'map-tools',
        cls: 'app-map-tools-btn water-btn',
        margin: '0 4',
        btnType: 'watersource',
        handler: 'onNearbyData'
    }, {
        xtype: 'segmentedbutton',
        bind: {
            value: '{theModuleContext.currentFunctionCard}'
        },
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        defaults: {
            ui: 'map-tools'
        },
        items: [{
            text: '',
            cls: 'app-map-tools-btn ranging-btn',
            margin: '0 4',
            value: 'ranging',
        }, {
            text: '',
            cls: 'app-map-tools-btn measurearea-btn',
            margin: '0 4',
            value: 'measureArea'
        }, {
            text: '',
            cls: 'app-map-tools-btn option-btn',
            margin: '0 0 0 4',
            value: 'option'
        }]
    }]
});