const getWidth = () => {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  )
}

let t
$(document).ready(() => {
  t = $(".ip").html()
})

$(document).on("click", ".ip", () => {
  let copy = document.createElement("textarea")
  copy.style.position = "absolute"
  copy.style.left = "-99999px"
  copy.style.top = "0"
  copy.setAttribute("id", "ta")
  document.body.appendChild(copy)
  copy.textContent = t
  copy.select()
  document.execCommand("copy")
  setTimeout(() => {
    $(".ip").html(t)
    var copy = document.getElementById("ta")
    copy.parentNode.removeChild(copy)
  }, 800)
})

$(document).ready(() => {
  let ip = $(".sip").attr("data-ip")
  let port = $(".sip").attr("data-port")
  if (port == "" || port == null) port = "25565"
  if (ip == "" || ip == null)
    return console.error(
      "Error fetching player count - is the IP set correctly in the HTML?"
    )
  updatePlayercount(ip, port)
  setInterval(() => {
    updatePlayercount(ip, port)
  }, 60000)
})

const updatePlayercount = (ip, port) => {
  $.get(`https://api.bybilly.uk/api/players/${ip}/${port}`, (result) => {
    if (result.hasOwnProperty("online")) {
      $(".sip").html(result.online)
    } else {
      $(".playercount").html("伺服器不在線上!")
    }
  })
}
