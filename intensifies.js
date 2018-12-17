function print(f) {
    console.log("me: ", f);
}

function intensify(element, intensifactor) {
    element.classList.add("intensified");
    element.style.setProperty("--intensifactor", intensifactor);
}

var re = /(\*\*+)([^\*]*)(\1)+/g

function messages_container_listener(mutationsList, observer) {
    var messages = document.getElementsByClassName("c-message__body");
    for(var i=0; i< messages.length; ++i) {
        var message = messages[i];
        for(var c=0)
        print(message.textContent);

        var matches = message.textContent.match(re);
        for(match of matches){
            
        }
        if(m){
            print("match!");
            print(m[0]);
            print(m[1]);
            var intensifactor = m[0];
            var text = m[1];

            var intense = document.createElement("span");
            intense.appendChild(document.createTextNode(text));
            intensify(intense, intensifactor);
        }

    }
}

var messages_container = document.getElementById("messages_container");

var observer = new MutationObserver(messages_container_listener);
observer.observe(messages_container, {
    childList: true,
    subtree: true
});

messages_container_listener([], messages_container);