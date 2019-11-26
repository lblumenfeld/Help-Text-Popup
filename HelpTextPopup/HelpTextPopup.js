define(["qlik", "css!./style.css"], function (qlik) {
	return {
		definition: {
			type: "items",
			component: "accordion",
			items: {
				HelpBoxInfo: {
                    type: "items",
					ref: "listItems",
					label: "Help Text Box Info",
					items: {
                        ShowBoxTitle: {
                            type: "boolean",
                            component: "switch",
                            label: "Show box title",
                            ref: "ShowBoxTitle",
                            options: [{
                                value: true,
                                label: "On"
                            }, {
                                value: false,
                                label: "Off"
                                }],
                            defaultValue: true
                        },
						BoxTitle: {
                            ref: "BoxTitle",
							label: "Help Box Title",
							type: "string",
							defaultValue: "Title",
							expression: "optional",
                            show: function(x) {
                                return x.ShowBoxTitle;
                            }
                        },
						BoxWidth: {
                            ref: "BoxWidth",
							label: "Width of box as % of window",
							type: "string",
							defaultValue: "50",
							expression: "optional"
						},
						BoxHeight: {
                            ref: "BoxHeight",
                            label: "Height of box as % of window",
							type: "string",
							defaultValue: "50",
							expression: "optional"
						},
						HelpText: {
							label: "HTML Help Text",
							component: "textarea",
							rows: 7,
							maxlength: 100000,
                            ref: "HelpText",
							expression: "optional",
						},
                        HelpBoxModal: {
                            type: "boolean",
                            component: "switch",
                            label: "Modal",
                            ref: "HelpBoxModal",
                            options: [{
                                value: true,
                                label: "On"
                            }, {
                                value: false,
                                label: "Off"
                            }],
                            defaultValue: true
                        },
					}
				},
				settings: {
					uses: "settings",
					items: {
						HelpIcon:{
							label:"Help Icon Settings",
							type:"items",
							items:{
                                HelpIconColor: {
                                    type: "string",
									label: "Help Icon Color Expression",
                                    ref: "HelpIconColor",
                                    expression: "optional"
								},
                                HelpIconSize: {
                                    type: "string",
                                    component: "dropdown",
                                    label: "Help Icon Size",
                                    ref: "HelpIconSize",
                                    options: [{
                                        value: "2",
                                        label: "Large (20px)",
                                        tooltip: "Large icon"
                                    }, {
                                        value: "1",
                                        label: "Medium (16px)",
                                        tooltip: "Medium icon"
                                    }, {
                                        value: "0",
                                        label: "Small (12px)",
                                        tooltip: "Small icon"
                                    }],
                                    defaultValue: "1"
                                }
                            }
						}
						
					}
				}
			}
		},
		support: {
			snapshot: false,
			export: false,
			exportData: false
		},
        paint: function ($element, layout) {
            var iconSizeClass = ["lui-icon--small", "", "lui-icon--large"];
			var config = {
				host: window.location.hostname,
				prefix: "/",
				port: window.location.port,
				isSecure: window.location.protocol === "https:"
			},
				app = qlik.currApp(),
				sheetId = qlik.navigation.getCurrentSheetId().sheetId,
				layoutid = layout.qInfo.qId,
				linkHTML = '<div class="lui-buttongroup">',
				templateHTML = '',
				ShowBoxTitle = layout.ShowBoxTitle;
            // Create the html string for the help box
            if (layout.HelpBoxModal) {
                templateHTML += '<div id="help-box-modal-background-' + layoutid + '" class="lui-modal-background" style="display: none;"></div>';
            }
            templateHTML += '<div id="help-box-container-' + layoutid + '" style="display: none;">';
            templateHTML += '  <div id="help-box-content-' + layoutid + '" style="">';
            templateHTML += '    <div class="lui-dialog dialog-content"  style="">';
            templateHTML += '      <div class="lui-dialog__header" style="' + (ShowBoxTitle ? '' : 'display:none;') + '">';
            templateHTML += '        <div class="lui-dialog__title" id="Dialog-Title" ></div>';
            templateHTML += '      </div>';
            templateHTML += '      <div id="help-text-' + layoutid + '" class="lui-dialog__body"></div>';
            templateHTML += '      <div class="lui-dialog__footer">';
            templateHTML += '        <button class="lui-button  lui-dialog__button cancel" >Close</button>';
            templateHTML += '      </div>';
            templateHTML += '  </div>';
            templateHTML += '</div>';
            if (layout.HelpBoxModal) {
                templateHTML += '</div>';
            }
            if ($('#help-box-container-' + layoutid).length != 0) {
                $('#help-box-container-' + layoutid).remove();
            }
            if ($('#help-box-modal-background-' + layoutid).length != 0) {
                $('#help-box-modal-background-' + layoutid).remove();
            }
            if ($('#help-box-container-' + layoutid).length == 0) {
                $('#grid').append(templateHTML);
				$(function () {
                    $("#help-box-container-" + layoutid).draggable({ handle: "div.lui-dialog__header" });
				});
            }
            linkHTML += '<span id="help-icon-' + layoutid + '" class="lui-icon ' + iconSizeClass[layout.HelpIconSize] + ' lui-icon--help view_dialog">' + '</span>';
            linkHTML += '</div>';
            $element.html(linkHTML);
            if (layout.HelpIconColor.length != 0) {
                $('#help-icon-' + layoutid).css("color", layout.HelpIconColor);
            }
			$(".cancel").click(function () {
				$('#help-box-container-' + layoutid).css("display", "none");
                $('#help-box-modal-background-' + layoutid).css("display", "none");
			});

			$(".view_dialog").click(function () {
				$('#download_file').hide();
                if (layout.HelpBoxModal) {
                    $("#help-box-modal-background-" + layoutid).css("display", "");
                    $("#help-box-modal-background-" + layoutid).css("width", "100%");
                    $("#help-box-modal-background-" + layoutid).css("height", '"' + window.innerHeight + 'px"');
                }
                $("#help-box-container-" + layoutid).css("border", "5px");
                $("#help-box-container-" + layoutid).css("border-color", "#3a7391");
                $('#Dialog-Title').html(layout.BoxTitle);
				$("#help-box-container-" + layoutid).css("display", "");
                $(".dialog-content").css("width", layout.BoxWidth + "%");
                $("#help-text-" + layoutid).show().css("height", ((layout.BoxHeight / 100) * window.innerHeight) + "px").html(layout.HelpText);
			});
			return qlik.Promise.resolve();
		}
	};
});
