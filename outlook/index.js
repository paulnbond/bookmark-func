javascript:(function(){ 
    let head = document.getElementsByTagName("html")[0]; 
    for (var i = 0; i < head.style.length; i++){
        if (head.style.getPropertyValue(head.style[i]) == "#0078d4" ||
            head.style.getPropertyValue(head.style[i]) == "#6e72a6") 
            head.style.setProperty(head.style[i], "#333");
    }

    [...document.querySelectorAll(".o365cs-base,.o365sx-button")].forEach(
        (a) => {
            a.style.backgroundColor = '#333';
        }
    );

    [...document.getElementsByTagName("i")].forEach(
        (a) => {
            if (a.hasAttribute("data-icon-name") && a.getAttribute("data-icon-name") === "OutlookLogo") 
                a.parentElement.parentElement.parentElement.style.display = "none";
        }
    );
})();
