CKEDITOR.plugins.add('justifyimage', {
    icons: 'justifyblock,justifycenter,justifyleft,justifyright', // %REMOVE_LINE_CORE%
    hidpi: true, // %REMOVE_LINE_CORE%
    init: function (editor) {

        var config = {
            items: {
                commands: ['justifyImageLeftCommand', 'justifyImageRightCommand', 'justifyImageCenterCommand', 'justifyImageInlineCommand'],
                left: {
                    buttonName: 'justifyimageleft',
                    command: 'justifyImageLeftCommand',
                    label: 'Justify image left',
                    toolbar: 'justifyimage,10',
                    icon: 'icons/hidpi/justifyleft.png'
                },
                right: {
                    buttonName: 'justifyimageright',
                    command: 'justifyImageRightCommand',
                    label: 'Justify image right',
                    toolbar: 'justifyimage,30',
                    icon: 'icons/hidpi/justifyright.png'
                },
                center: {
                    buttonName: 'justifyimagecenter',
                    command: 'justifyImageCenterCommand',
                    label: 'Justify image center',
                    toolbar: 'justifyimage,20',
                    icon: 'icons/hidpi/justifycenter.png'
                },
                inline: {
                    buttonName: 'setinlineimage',
                    command: 'justifyImageInlineCommand',
                    label: 'Set Image inline',
                    toolbar: 'justifyimage,40',
                    icon: 'icons/hidpi/justifyblock.png'
                }

            }
        };

        var JustifyImageCommand = function (editor, property) {
            this.editor = editor;
            this.property = property;

            //start init makes buttons disabled
            this.startDisabled = true;
        };

        JustifyImageCommand.prototype.exec = function () {
            //According to behavior getSelectedElement returns null for text.
            var element = editor.getSelection().getSelectedElement();
            if (element !== null) {

                //set state enabled for the commands
                element = element.$;
                switch (this.property) {
                    case 'left':
                        this.display(element, "inline");
                        element.style.float = "left";
                        break;
                    case 'right':
                        this.display(element, "inline");
                        element.style.float = "right";
                        break;
                    case 'center':
                        element.style.float = "none";
                        this.display(element, "block");
                        element.style.margin = "0 auto";
                        break;
                    case 'inline':
                        this.display(element, "inline");
                        element.style.float = "none";
                        break;
                    default:
                        break;
                }
            }
        };

        //add event handler
        editor.on('selectionChange', function (event) {
            if (event.data.path.elements[0].$.nodeName === "IMG") {
                config.items.commands.forEach(function (item) {
                    editor.getCommand(item).enable();
                });
            } else {
                config.items.commands.forEach(function (item) {
                    editor.getCommand(item).disable();
                });
            }
        });


        JustifyImageCommand.prototype.display = function (elem, display) {
            elem.style.display = display;
        };

        //Create new commands
        var justifyLeft = new JustifyImageCommand(editor, 'left');
        var justifyRight = new JustifyImageCommand(editor, 'right');
        var justifyCenter = new JustifyImageCommand(editor, 'center');
        var justifyInline = new JustifyImageCommand(editor, 'inline');

        //Add commands to editor
        editor.addCommand(config.items.left.command, justifyLeft);
        editor.addCommand(config.items.right.command, justifyRight);
        editor.addCommand(config.items.center.command, justifyCenter);
        editor.addCommand(config.items.inline.command, justifyInline);

        //Create buttons for menu
        editor.ui.addButton(config.items.left.buttonName, {
            title: config.items.left.label,
            label: config.items.left.label,
            command: config.items.left.command,
            toolbar: config.items.left.toolbar,
            icon: this.path + config.items.left.icon
        });
        editor.ui.addButton(config.items.center.buttonName, {
            title: config.items.center.label,
            label: config.items.center.label,
            command: config.items.center.command,
            toolbar: config.items.center.toolbar,
            icon: this.path + config.items.center.icon
        });
        editor.ui.addButton(config.items.right.buttonName, {
            title: config.items.right.label,
            label: config.items.right.label,
            command: config.items.right.command,
            toolbar: config.items.right.toolbar,
            icon: this.path + config.items.right.icon
        });
        editor.ui.addButton(config.items.inline.buttonName, {
            title: config.items.inline.label,
            label: config.items.inline.label,
            command: config.items.inline.command,
            toolbar: config.items.inline.toolbar,
            icon: this.path + config.items.inline.icon
        });

    }
});


