prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id="image_captured" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version:",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/dP7IioOZu/model.json',modelLoaded);

function modelLoaded() {
    console.log("Model Loaded Successfully!");
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "The Prediction Is "+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img, gotresult);
}


function check() {
    img = document.getElementById("image_captured");
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "ok"){
            document.getElementById("result_emoji").innerHTML = "&#128076;";
        }
        if(results[0].label == "good"){
            document.getElementById("result_emoji").innerHTML = "&#128077";
        }
        if(results[0].label == "peace"){
            document.getElementById("result_emoji").innerHTML = "&#9996;";
        }
        if(results[0].label == "fist"){
            document.getElementById("result_emoji").innerHTML = "&#9994;";
        }
        if(results[0].label == "Clap"){
            document.getElementById("result_emoji").innerHTML = "&#128079;";
            document.getElementById("quote").innerHTML = "No No No I Should Give You An Applause";
        }
        if(results[0].label == "yes"){
            document.getElementById("result_emoji").innerHTML = "&#129304;";
        }
      
    }
}

function gotresult(error, result){
    if (error) {
        console.error(error);
    }else{
        console.log(result);
        document.getElementById("result_gesture_name").innerHTML=result[0].label;
        prediction=result[0].label;
        speak();
        if(result[0].label=="ok")
        {
            document.getElementById("update_emoji").innerHTML= "";
        }
        if(result[0].label=="good")
        {
            document.getElementById("update_emoji").innerHTML= "&#128077";
        }
        if(result[0].label=="peace")
        {
            document.getElementById("update_emoji").innerHTML= "&#9996";
        }
        if(result[0].label=="fist")
        {
            document.getElementById("update_emoji").innerHTML= "&#9994";
        }
        if(result[0].label=="clap")
        {
            document.getElementById("update_emoji").innerHTML= "&#128079";
        }
        if(result[0].label=="yes")
        {
            document.getElementById("update_emoji").innerHTML= "&#129304";
        }

    }
}