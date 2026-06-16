function updateTime() {
    var currentTime = new Date().toLocaleTimeString();
    var timeText = document.querySelector("#timeElement");
    timeText.innerHTML = currentTime;
}

updateTime();
setInterval(updateTime, 1000);

// Make welcome window draggable
dragElement(document.getElementById("welcome"));

// DRAG FUNCTION
function dragElement(element) {
  var initialX = 0, initialY = 0, currentX = 0, currentY = 0;

  if (document.getElementById(element.id + "header")) {
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = drag;
  }

  function drag(e) {
    e.preventDefault();
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// OPEN/CLOSE LOGIC
var welcomeScreen = document.querySelector("#welcome");
var welcomeScreenClose = document.querySelector("#welcomeclose");
var welcomeScreenOpen = document.querySelector("#welcomeopen");

function closeWindow(element) {
    element.style.display = "none";
}

function openWindow(element) {
    element.style.display = "block";
}

welcomeScreenClose.addEventListener("click", function() {
    closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
    openWindow(welcomeScreen);
});

var selectedIcon = undefined

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element
} 

function deselectIcon(element) {
  element.classList.remove("selected");
  selectedIcon = undefined
}

function handleIconTap(element, windowName) {
  if (element.classList.contains("selected")) {
    deselectIcon(element)
    openWindow(document.querySelector("#" + windowName))
  } else {
    selectIcon(element)
  }
}

dragElement(document.querySelector("#Offline"))

var OfflineScreen = document.querySelector("#Offline")

var OfflineScreenClose = document.querySelector("#Offlineclose")

OfflineScreenClose.addEventListener("click", () => closeWindow(OfflineScreen));

dragElement(document.querySelector("#Edit"))

var EditScreen = document.querySelector("#Edit")

var EditScreenClose = document.querySelector("#Editclose")

EditScreenClose.addEventListener("click", () => closeWindow(EditScreen));


function initializeWindow(elementName) {
var screen = document.querySelector("#" + elementName)
addWindowTapHandling(screen)
makeClosable(elementName)
dragElement(screen)
if(elementName != "welcome") {
initializeIcon(elementName)  
}
}
initializeWindow("welcome")
initializeWindow("Offline")
initializeWindow("Edit")