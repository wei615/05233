let video;
let facemesh;
let predictions = [];
const indices = [409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291];
const indices2 = [76,77,90,180,85,16,315,404,320,307,306,408,304,303,302,11,72,73,74,184];
const indices3 = [243,190,56,28,27,29,30,247,130,25,110,24,23,22,26,112]; // 新增這行

function setup() {
  createCanvas(640, 480).position(
    (windowWidth - 640) / 2,
    (windowHeight - 480) / 2
  );
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on('predict', results => {
    predictions = results;
  });
}

function modelReady() {
  // 模型載入完成，可選擇顯示訊息
}

function draw() {
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    // 先畫第一組紅色線
    stroke("#ff006e");
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < indices.length; i++) {
      const idx = indices[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape();

    // 再畫第二組紅色線並填滿黃色
    stroke(255, 0, 0);
    strokeWeight(2);
    fill(255, 255, 0, 200); // 半透明黃色
    beginShape();
    for (let i = 0; i < indices2.length; i++) {
      const idx = indices2[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape(CLOSE);

    // 在第一組與第二組之間充滿綠色
    fill(0, 255, 0, 150); // 半透明綠色
    noStroke();
    beginShape();
    // 先畫第一組
    for (let i = 0; i < indices.length; i++) {
      const idx = indices[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    // 再畫第二組（反向，避免交錯）
    for (let i = indices2.length - 1; i >= 0; i--) {
      const idx = indices2[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape(CLOSE);

    // 新增：畫第三組藍色線
    stroke(0, 0, 255); // 藍色
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < indices3.length; i++) {
      const idx = indices3[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape();

    // 新增：用 line 指令依序連接指定點
    const indices4 = [133,173,157,158,159,160,161,246,33,7,163,144,145,153,154,155];
    stroke(128, 0, 255); // 紫色
    strokeWeight(3);
    for (let i = 0; i < indices4.length - 1; i++) {
      const idxA = indices4[i];
      const idxB = indices4[i + 1];
      const [xA, yA] = keypoints[idxA];
      const [xB, yB] = keypoints[idxB];
      line(xA, yA, xB, yB);
    }

    // 新增：用 line 指令依序連接指定點（依照你給的新陣列）
    const indices5 = [359,467,260,259,257,258,286,414,463,341,256,252,253,254,339,255];
    stroke(0, 200, 255); // 青藍色
    strokeWeight(3);
    for (let i = 0; i < indices5.length - 1; i++) {
      const idxA = indices5[i];
      const idxB = indices5[i + 1];
      const [xA, yA] = keypoints[idxA];
      const [xB, yB] = keypoints[idxB];
      line(xA, yA, xB, yB);
    }

    // 新增：用 line 指令依序連接指定點（依照你給的新陣列）
    const indices6 = [263,466,388,387,386,385,384,398,362,382,381,380,374,373,390,249];
    stroke(255, 128, 0); // 橘色
    strokeWeight(3);
    for (let i = 0; i < indices6.length - 1; i++) {
      const idxA = indices6[i];
      const idxB = indices6[i + 1];
      const [xA, yA] = keypoints[idxA];
      const [xB, yB] = keypoints[idxB];
      line(xA, yA, xB, yB);
    }
  }
}
