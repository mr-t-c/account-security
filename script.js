let attempts = localStorage.getItem("attempts") || 0


function login(){

let email=document.getElementById("email").value
let password=document.getElementById("password").value

let pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(!pattern.test(email)){
document.getElementById("msg").innerText="Enter valid email"
return
}

if(attempts>=3){
document.getElementById("msg").innerText="Account locked due to multiple attempts"
return
}

if(password==="1234"){

localStorage.setItem("userEmail",email)
localStorage.setItem("attempts",0)

window.location="dashboard.html"

}

else{

attempts++
localStorage.setItem("attempts",attempts)

document.getElementById("msg").innerText="Wrong password"

}

}


function forgotPassword(){

alert("Password reset link sent (Demo)")

}


function logout(){

localStorage.clear()

window.location="index.html"

}


if(window.location.pathname.includes("dashboard.html")){

let email=localStorage.getItem("userEmail")

if(!email){

window.location="index.html"

}

document.getElementById("welcomeUser").innerText="Welcome "+email


let history=JSON.parse(localStorage.getItem("loginHistory"))||[]


function processScenario(scenario){

let riskScore=
scenario.ipChange+
scenario.deviceChange+
scenario.locationChange+
scenario.failedLogins+
scenario.timeAnomaly

document.getElementById("riskScore").innerText=riskScore
document.getElementById("failedCount").innerText=scenario.failedLogins

let threat=document.getElementById("threatLevel")
let alerts=document.getElementById("alertsContainer")

alerts.innerHTML=""

if(riskScore<30){

threat.innerText="Threat Level: LOW"
threat.style.background="green"
document.getElementById("alertCount").innerText="0"

}

else if(riskScore<60){

threat.innerText="Threat Level: MEDIUM"
threat.style.background="orange"

alerts.innerHTML+="<div class='alert'>⚠ New device login detected</div>"

document.getElementById("alertCount").innerText="1"

}

else{

threat.innerText="Threat Level: HIGH"
threat.style.background="red"

alerts.innerHTML+="<div class='alert'>⚠ Suspicious location detected</div>"
alerts.innerHTML+="<div class='alert'>⚠ Multiple failed login attempts</div>"

document.getElementById("alertCount").innerText="2"

}

let analysis=document.getElementById("analysisList")

analysis.innerHTML=""

if(scenario.ipChange===0)
analysis.innerHTML+="<li><i class='fas fa-check'></i> IP matches previous login pattern</li>"
else
analysis.innerHTML+="<li><i class='fas fa-exclamation-triangle'></i> Unusual IP address detected</li>"

if(scenario.deviceChange===0)
analysis.innerHTML+="<li>✔ Recognized device</li>"
else
analysis.innerHTML+="<li>⚠ New device detected</li>"

if(scenario.locationChange===0)
analysis.innerHTML+="<li>✔ Normal login location</li>"
else
analysis.innerHTML+="<li>⚠ Suspicious geographic location</li>"

if(scenario.failedLogins>0)
analysis.innerHTML+="<li>⚠ Multiple failed login attempts</li>"
else
analysis.innerHTML+="<li>✔ No failed login attempts</li>"

if(scenario.timeAnomaly>0)
analysis.innerHTML+="<li>⚠ Login at unusual time detected</li>"
else
analysis.innerHTML+="<li>✔ Login time within normal pattern</li>"

document.getElementById("aiDecision").innerText=
"AI Decision: Risk score generated using behavioral anomaly detection."

history.push({
ip:scenario.ip,
device:scenario.device,
location:scenario.location,
time:new Date().toLocaleTimeString(),
risk:riskScore
})

localStorage.setItem("loginHistory",JSON.stringify(history))

updateTable()

drawGraphs(scenario,riskScore)

}


function updateTable(){

let table=document.getElementById("loginTable")

table.innerHTML=""

history.slice().reverse().forEach(item=>{

table.innerHTML+=`
<tr>
<td>${item.ip}</td>
<td>${item.device}</td>
<td>${item.location}</td>
<td>${item.time}</td>
<td>${item.risk}</td>
</tr>
`

})

}


function drawGraphs(scenario,riskScore){

new Chart(document.getElementById("riskTrend"),{

type:"line",

data:{
labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
datasets:[{
label:"Risk Score",
data:[20,30,40,50,60,riskScore,55],
borderWidth:2
}]
}

})

new Chart(document.getElementById("riskBreakdown"),{

type:"bar",

data:{
labels:["IP Change","Device Change","Location Change","Failed Logins","Time Anomaly"],
datasets:[{
label:"Risk Contribution",
data:[
scenario.ipChange,
scenario.deviceChange,
scenario.locationChange,
scenario.failedLogins,
scenario.timeAnomaly
]
}]
}

})

}


window.simulateNormal=function(){

processScenario({

ip:"192.168.1.1",
device:"Chrome Windows",
location:"India",
ipChange:0,
deviceChange:0,
locationChange:0,
failedLogins:0,
timeAnomaly:5

})

}


window.simulateSuspicious=function(){

processScenario({

ip:"10.21.11.4",
device:"Android",
location:"India",
ipChange:20,
deviceChange:15,
locationChange:0,
failedLogins:10,
timeAnomaly:0

})

}


window.simulateAttack=function(){

processScenario({

ip:"182.44.22.1",
device:"Unknown Device",
location:"Russia",
ipChange:20,
deviceChange:15,
locationChange:25,
failedLogins:10,
timeAnomaly:5

})

}


}