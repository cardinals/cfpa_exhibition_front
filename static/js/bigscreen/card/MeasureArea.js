/*
 * GMoft Project
 *
 * @Description: 请在这里描述这个文件的通途
 *     # 
 *
 * @Author: 张赫之
 * @Date:   2017-05-25 16:30:07
 * @Last Modified by:   张赫之
 * @Last Modified time: 2017-05-26 17:02:18
 */
Ext.define('FirePlanGisApp.view.viewport.map.card.MeasureArea', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.viewport-map-card-measurearea',

    bind: {
        hidden: '{!cardCfg.showMeasureArea}'
    },

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    width: 310,
    bodyPadding: 8,
    cls: 'app-map-functioncard app-map-measurearea-card',

    title: '测面积',
    tools: [{
        // type: 'close',
        iconCls: 'x-fa fa-times-circle',
        callback: 'onCloseFunctionCard'
    }],

    items: [{
        xtype: 'box',
        cls: 'value-box',
        flex: 1,
        bind: {
            html: '{measureValue.area} <span>平方米</span><br>{measureValue.areaK} <span>平方千米</span>'
        }
    }, {
        xtype: 'button',
        // text: '编辑',
        ui: 'moft',
        cls: 'palette-toolbar',
        focusable: false,
        iconCls: 'x-fa fa-pencil-square-o',
        margin: '0 4',
        handler: 'onMeasureEdit'
    }, {
        xtype: 'button',
        // text: '清除',
        ui: 'moft',
        cls: 'palette-toolbar',
        focusable: false,
        iconCls: 'x-fa fa-trash',
        handler: 'onMeasureClear'
    }]

});