/** @jsx React.DOM */
var Terminal = (function() {
    'use strict';
    var printImage = function(src) {
        var img = document.createElement('img');
        img.src = src;
        img.style.width = '100%';
        var op = document.getElementsByTagName('output')[0];
        op.appendChild(img);
        fixScroll();
    };
    var applyLine = function(msg, inpLine, outputLine) {
        var line = React.findDOMNode(inpLine).cloneNode(true);
        line.querySelector('div.prompt').innerHTML="";
        var input = line.querySelector('input.cmdline');
        input.value = msg;
        input.style.color = "grey";
        //Getting it out of Focus
        input.autofocus = false;
        input.readOnly = true;
        var output = React.findDOMNode(outputLine).appendChild(line);
        fixScroll();
    };
    var fixScroll = function() {
        var objDiv = document.getElementById("screen0");
        objDiv.scrollTop = objDiv.scrollHeight;  
    };
    var ENTER = 13;
    var helpMsg = ["Here are some list of commands..","\n\tgithub\t- Visit my github profile","\n\tcv\t- See my CV","\n\tgame\t- Play a game :)","\n\txkcd\t-Random xkcd","\n\tclear\t- Clears the screen"];
    var TerminalClass = React.createClass({
        propTypes: {
            commandHandler: React.PropTypes.object.isRequired
        },
        render: function() {
            return(
                <div>
                <div className="input-line line header">
<br/>
.______&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.__&nbsp;&nbsp;&nbsp;__.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;<br/>
|&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;\&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;|&nbsp;|__&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;/&nbsp;&nbsp;&nbsp;/_&nbsp;|&nbsp;|__&nbsp;\&nbsp;&nbsp;<br/>
|&nbsp;&nbsp;|_)&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;^&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;\|&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;)&nbsp;|&nbsp;&nbsp;/&nbsp;/_&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;)&nbsp;|&nbsp;<br/>
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;/_\&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;.&nbsp;`&nbsp;&nbsp;|&nbsp;.--.&nbsp;&nbsp;|&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;/&nbsp;/&nbsp;&nbsp;|&nbsp;'_&nbsp;\&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;/&nbsp;/&nbsp;&nbsp;<br/>
|&nbsp;&nbsp;|\&nbsp;&nbsp;\----./&nbsp;&nbsp;_____&nbsp;&nbsp;\&nbsp;&nbsp;|&nbsp;&nbsp;|\&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;`--'&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;/&nbsp;/_&nbsp;&nbsp;|&nbsp;(_)&nbsp;|&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;/&nbsp;/_&nbsp;&nbsp;<br/>
|&nbsp;_|&nbsp;`._____/__/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\__\&nbsp;|__|&nbsp;\__|&nbsp;&nbsp;\______/&nbsp;&nbsp;|__|&nbsp;|____|&nbsp;&nbsp;\___/&nbsp;&nbsp;&nbsp;|_|&nbsp;|____|
<br/><br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hi!. I'm Ranjith Kumar, CS Graduate at Columbia University..<br/> Use 'help' to see the available commands..<br/><br/><br/>
                    </div>
                    
                    <output ref="output">
                    </output>
                    <div className="input-line line" ref="inputLine">
                        <div className="prompt">$ </div>
                        <div>
                            <input className="cmdline" ref="command" autofocus/>
                        </div>
                    </div>
                </div>
            );
        },
        componentDidMount: function() {
            var command = React.findDOMNode(this.refs.command);
            command.focus();

            command.addEventListener('keydown', this.keyDownHandler, false);

            window.addEventListener('click', function(e) {
                command.focus();
            }, false);
        },
        keyDownHandler: function(e) {

            if(e.keyCode == ENTER) {
                
                var line = React.findDOMNode(this.refs.inputLine).cloneNode(true);
                var input = line.querySelector('input.cmdline');
                //Getting it out of Focus
                input.autofocus = false;
                input.readOnly = true;
                var output = React.findDOMNode(this.refs.output).appendChild(line);

                React.findDOMNode(this.refs.command).value = '';
                var msg = "";
                
                //Actions based on Command List
                if (input.value.trim()=='clear') {
                
                    this.render();
                    React.findDOMNode(this.refs.output).innerHTML = "";
                    return;
                
                } else if (input.value.trim()=="help") {
                    
                    for(var help in helpMsg)
                        applyLine(helpMsg[help],this.refs.inputLine,this.refs.output); 
                    
                } else if (input.value.trim()=="github") {
                    
                    var win = window.open('https://github.com/ranji2612', '_blank');
                    if(win) win.focus();
                    else msg = "Pop-ups are not allowed by your browser.. Follow the link https://github.com/ranji2612 ";
                    return;
                
                } else if (input.value.trim()=="xkcd") {
                    var num = Math.random() * 1644;
                    var js = 'http://dynamic.xkcd.com/api-0/jsonp/comic/'+parseInt(num);
                    $.ajax({
                        url: js,
                        type: 'GET',
                        dataType: 'jsonp',
                        error: function(xhr, status, error) {
                            alert("error");
                        },
                        success: function(result) {
                            printImage(result.img);
                        }
                    });
                    console.log(js['img']);
                } else if (input.value.trim()=="cv") {
                
                    var win = window.open('https://github.com/ranji2612/CV/blob/master/ranjith_kumar_rs3579_USLetter_Latest.pdf', '_blank');
                    if(win) win.focus();
                    else msg = "Pop-ups are not allowed by your browser.. Follow the link https://github.com/ranji2612 ";
                    return;

                } else if (input.value.trim().toLowerCase()=="hi" || input.value.trim().toLowerCase()=="hello") {
                    msg = '\tHi.. Wassup..';
                } else if (input.value.trim()=="") {
                    return;
                }else {
                    //For all other Invalid Commands
                    msg = "Invalid Command!..";
                }
                applyLine(msg,this.refs.inputLine,this.refs.output);        
                
            }
        },
        parseInput: function(input) {

            if(input && input.trim()) {
                var args = input.split(' ').filter(function(val, i) {
                    return val;
                });
            }

            // The command is the first argument.
            var command = args[0].toLowerCase();
            args = args.splice(1); // Remove command from list of args.

            return {command: command, args: args};
        }
    });
    return TerminalClass;
})();
