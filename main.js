song = "";
song1 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightwrist = 0;

function preload(){
    song = loadSound("music.mp3");
    song1 = loadSound("music2.mp3");
}


function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreRightwrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightwrist + "scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
    }
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function draw() {
    image(video, 0, 0, 600, 500); 

    fill("#FF0000");
    stroke("FF0000");
    
    song = song.isPlaying();
    console.log(song);

    song1 = song1.isPlaying();
    console.log(song1);

    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song == false){
            song.play();
        }
        else{
            console.log("Song Name: Harry Potter song");
            document.getElementById("song_id").innerHTML = "Song Name: Harry Potter song";
        }
    }

    if(scoreRightWrist > 0.2){
        circle(rightWristX,rightWristY,20);
        song.stop();
        if(song1 == false){
            song1.play();
        }
        else{
            console.log("Song Name: Peter Pan song");
            document.getElementById("song_id").innerHTML = "Song Name: Peter Pan song";
        }

    }
}



function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}