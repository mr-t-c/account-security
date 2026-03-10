function login(){

let email=document.getElementById("email").value
let password=document.getElementById("password").value

let pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(!pattern.test(email)){
document.getElementById("msg").innerText="Enter valid email"
return
}

if(password===""){
document.getElementById("msg").innerText="Enter password"
return
}

localStorage.setItem("userEmail",email)

window.location="dashboard.html"

}


function forgotPassword(){
alert("Password reset link sent (Demo)")
}


if(window.location.pathname.includes("dashboard.html")){

let email=localStorage.getItem("userEmail")
document.getElementById("welcomeUser").innerText="Welcome "+email


/* Simulated login scenarios */

let scenarios=[

{
ip:"192.168.1.1",
device:"Chrome Windows",
location:"India",
ipChange:0,
deviceChange:0,
locationChange:0,
failedLogins:0,
timeAnomaly:5
},

{
ip:"10.21.11.4",
device:"Android",
location:"India",
ipChange:20,
deviceChange:15,
locationChange:0,
failedLogins:10,
timeAnomaly:0
},

{
ip:"182.44.22.1",
device:"Unknown Device",
location:"Russia",
ipChange:20,
deviceChange:15,
locationChange:25,
failedLogins:10,
timeAnomaly:5
}

]


let scenario=scenarios[Math.floor(Math.random()*scenarios.length)]


let riskScore=
scenario.ipChange+
scenario.deviceChange+
scenario.locationChange+
scenario.failedLogins+
scenario.timeAnomaly


document.getElementById("riskScore").innerText=riskScore
document.getElementById("failedCount").innerText=scenario.failedLogins


document.getElementById("ipCell").innerText=scenario.ip
document.getElementById("deviceCell").innerText=scenario.device
document.getElementById("locationCell").innerText=scenario.location
document.getElementById("timeCell").innerText=new Date().toLocaleTimeString()


let threat=document.getElementById("threatLevel")
let alerts=document.getElementById("alertsContainer")


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

/* IP analysis */

if(scenario.ipChange===0)
analysis.innerHTML+="<li>✔ IP matches previous login pattern</li>"
else
analysis.innerHTML+="<li>⚠ Unusual IP address detected</li>"

/* Device analysis */

if(scenario.deviceChange===0)
analysis.innerHTML+="<li>✔ Recognized device</li>"
else
analysis.innerHTML+="<li>⚠ New device detected</li>"

/* Location analysis */

if(scenario.locationChange===0)
analysis.innerHTML+="<li>✔ Normal login location</li>"
else
analysis.innerHTML+="<li>⚠ Suspicious geographic location</li>"

/* Failed login analysis */

if(scenario.failedLogins>0)
analysis.innerHTML+="<li>⚠ Multiple failed login attempts</li>"
else
analysis.innerHTML+="<li>✔ No failed login attempts</li>"

/* Time anomaly analysis */

if(scenario.timeAnomaly>0)
analysis.innerHTML+="<li>⚠ Login at unusual time detected</li>"
else
analysis.innerHTML+="<li>✔ Login time within normal pattern</li>"

document.getElementById("aiDecision").innerText=
"AI Decision: Risk score generated using behavioral anomaly detection across IP, device, location, login time, and failed attempts."

/* Risk trend graph */

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



/* Risk breakdown */

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