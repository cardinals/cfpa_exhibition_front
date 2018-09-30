/*
 * GMoft Project
 *
 * @Description: 请在这里描述这个文件的通途
 *     # 
 *
 * @Author: 张赫之
 * @Date:   2017-05-25 16:27:45
 * @Last Modified by:   张赫之
 * @Last Modified time: 2017-06-05 10:19:11
 */
Ext.define('FirePlanGisApp.view.viewport.map.card.Option', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.viewport-map-card-option',

    bind: {
        hidden: '{!cardCfg.showOption}'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    width: 310,
    cls: 'app-map-functioncard app-map-option-card',

    title: '选项',
    tools: [{
        // type:'close',
        iconCls: 'x-fa fa-times-circle',
        callback: 'onCloseFunctionCard'
    }],

    items: [{
        xtype: 'panel',
        title: '底图',
        layout: 'fit',
        bodyPadding: 8,
        header: {
            items: [{
                xtype: 'button',
                text: '路况：',
                ui: 'switch',
                iconAlign: 'right',
                iconCls: 'x-fa fa-toggle-on',
                focusable: false,
                enableToggle: true,
                pressed: false,
                toggleHandler: 'onTrafficToggle'
            }]
        },
        items: [{
            xtype: 'segmentedbutton',
            bind: {
                value: '{bdLayerOption.layerId}'
            },
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            cls: 'app-map-layers',
            defaults: {
                flex: 1,
                height: 64,
                padding: '3 3 6 3',
                focusable: false,
                iconAlign: 'top'
            },
            items: [{
                text: '平面图',
                icon: 'resources/images/map/tools/icon_2d_btn.png',
                value: '2D'
            }, {
                text: '卫星图',
                icon: 'resources/images/map/tools/icon_satellite_btn.png',
                value: 'satellite',
                margin: '0 4'
            }, {
                text: '三维图',
                icon: 'resources/images/map/tools/icon_3d_btn.png',
                value: '3D'
            }]
        }]
    }, {
        xtype: 'panel',
        title: '消防图层',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        flex: 1,
        scrollable: 'y',
        bodyPadding: '4 0 8 0',
        header: {
            items: [{
                xtype: 'button',
                text: '水源：',
                ui: 'switch',
                itemId: 'waterSwitch',
                iconAlign: 'right',
                iconCls: 'x-fa fa-toggle-on',
                focusable: false,
                enableToggle: true,
                bind: {
                    pressed: '{layerOptionVal.waterSwitch}',
                },
                handler: 'onLegendSwitchToggle'
            }, {
                xtype: 'button',
                text: '队站：',
                ui: 'switch',
                itemId: 'zqdzSwitch',
                iconAlign: 'right',
                iconCls: 'x-fa fa-toggle-on',
                focusable: false,
                enableToggle: true,
                bind: {
                    pressed: '{layerOptionVal.zqdzSwitch}',
                },
                handler: 'onLegendSwitchToggle'
            }]
        },
        items: [{
            xtype: 'segmentedbutton',
            bind: {
                value: '{layerOptionVal.layerId}'
            },
            cls: 'app-map-legend',
            flex: 1,
            vertical: true,
            allowMultiple: true,
            defaults: {
                ui: 'switch',
                iconAlign: 'right',
                iconCls: 'x-fa fa-toggle-on',
                focusable: false,
                pressed: true,
                textAlign: 'left'
            },
            items: [{
                text:  '<i class="map-legend-icon zddw"></i>重点单位',
                value: 'compZddw'
            }, {
                text:  '<i class="map-legend-icon xhs"></i>消火栓',
                value: 'compWatersourceXhs'
            }, {
                text:  '<i class="map-legend-icon sh"></i>消防水鹤',
                value: 'compWatersourceSh'
            }, {
                text:  '<i class="map-legend-icon sc"></i>消防水池',
                value: 'compWatersourceSc'
            }, {
                text:  '<i class="map-legend-icon qsmt"></i>取水码头',
                value: 'compWatersourceQsmt'
            }, {
                text:  '<i class="map-legend-icon trsy"></i>天然水源',
                value: 'compWatersourceTrsy'
            }, {
                text:  '<i class="map-legend-icon zqzd"></i>执勤中队',
                value: 'compZqzd'
            }, {
                text:  '<i class="map-legend-icon zqdd"></i>执勤大队',
                value: 'compZqdd'
            }, {
                text:  '<i class="map-legend-icon qyd"></i>企业队',
                value: 'compQyd'
            }, {
                text:  '<i class="map-legend-icon fireengine"></i>消防车辆',
                value: 'compFireEngine'
            }]
        }]
    }]

});