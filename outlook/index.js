javascript:(function(){ 
    let head = document.getElementsByTagName("html")[0]; 
    for (var i = 0; i < head.style.length; i++){
        if (head.style.getPropertyValue(head.style[i]) == "#0078d4") 
            head.style.setProperty(head.style[i], "#333");
    }

    [...document.getElementsByTagName("a")].forEach(
        (a) => {
            if (a.href === "https://windows.microsoft.com/outlook/ad-free-outlook") 
                a.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        }
    );
})();

