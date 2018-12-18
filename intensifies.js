function intensify(element, intensifactor) {
    element.classList.add("intensified");
    element.style.setProperty("--intensifactor", intensifactor);
}

function make_intense(text, intensifactor) {
    var s = document.createElement("span");
    s.appendChild(document.createTextNode(text));
    intensify(s, intensifactor);
    return s;
}

function min(a, b){
    if (a< b){
        return a;
    }
    return b;
}

function messages_container_listener() {
    var messages = document.getElementsByClassName("c-message__body");
    for(var i=0; i< messages.length; ++i) {
        var message = messages[i];

        var new_children = [];
        for(var j = 0; j<message.childNodes.length; ++j){
            if(message.childNodes[j].nodeType == Node.TEXT_NODE) {
                //intensify the '*'
                var t = message.childNodes[j].textContent;
                var intensifies = [];
                var text = "";
                var intensifying = false;
                for(var c = 0; c < t.length -1; c++) {
                    if(t[c] == '*') {
                        if (t[c+1] == '*') {
                            if (!intensifying) {
                                intensifying = true;
                                intensifies.push(make_intense(text, 0));
                                text = "";
                                var intensifactor_left = 0;
                                //count remainging '*' for intesnsifactor
                                for(var d = c; d < t.length; ++d){
                                    if (t[d]=='*'){
                                        c++;
                                        intensifactor_left ++;
                                    } else {
                                        break;
                                    }
                                }
                                c--;
                            } else {
                                //eat the remaining intensifactor '*'s
                                var intensifactor_right = 0;
                                for(var d = c; d < t.length; ++d){
                                    if (t[d]=='*'){
                                        c++;
                                        intensifactor_right++;
                                    } else {
                                        break;
                                    }
                                }
                                intensifies.push(make_intense(text, min(intensifactor_left, intensifactor_right)));
                                text = "";
                                intensifying = false;
                                intensifactor = 0;
                            }
                        } else {
                            text += t[c];
                        }
                    } else {
                        text += t[c];
                    }
                }
                //put any remaining text in a node
                if (t[t.length-1] != '*'){
                    text += t[t.length-1];
                }
                intensifies.push(make_intense(text, 0));
                for(var k=0; k<intensifies.length; ++k){
                    new_children.push(intensifies[k]);
                }
            } else {
                new_children.push(message.childNodes[j]);
            }
        }
        while(message.hasChildNodes()) {
            message.removeChild(message.lastChild);
        }
        for(var child of new_children) {
            message.appendChild(child);
        }

    }
}

function obs() {
    //disconnect to prevent loop
    observer.disconnect();
    messages_container_listener();
    //reconnect
    observer.observe(messages_container, {
        childList: true,
        subtree: true
    });
}

var messages_container = document.getElementById("messages_container");

var observer = new MutationObserver(obs);
observer.observe(messages_container, {
    childList: true,
    subtree: true
});

messages_container_listener([], messages_container);