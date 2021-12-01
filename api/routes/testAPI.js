var express = require("express");
var router = express.Router();
var app = require("firebase/app");
var fb = require("firebase/firestore");

const firebaseApp = app.initializeApp({
    apiKey: "AIzaSyBfUFfuNtRE_M3U0e2sB03DXxYwW-4xIzY",
    authDomain: "tsasoftwaredevelopment.firebaseapp.com",
    projectId: "tsasoftwaredevelopment",
    storageBucket: "tsasoftwaredevelopment.appspot.com",
    messagingSenderId: "269963833173",
    appId: "1:269963833173:web:5d14be6554e3129fb7c9dc",
});

const firestore = fb.getFirestore();


router.get("/", async function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);

    var data = {
        name: "",
        weeks: []
    };

    const classRef = fb.doc(firestore, `classes/${req.query.classID}`);
    const classSnapshot = await fb.getDoc(classRef);
    if (classSnapshot.exists()) {
        const classData = classSnapshot.data();
        data.name = classData.name;
        const weeksRef = fb.collection(classRef, "weeks");
        const docs = await fb.getDocs(weeksRef);
        docs.forEach(doc => {
            data.weeks.push(
                {
                    week: doc.id,
                    students: doc.data().students
                }
            )
        });
    }
    res.send(JSON.stringify(data));
});

router.get("/classID/", async function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);

    var data = {
        students: []
    };

    const classRef = fb.doc(firestore, `classes/${req.query.classID}`);
    const classSnapshot = await fb.getDoc(classRef);
    if (classSnapshot.exists()) {
        const weeksRef = fb.collection(classRef, "weeks");
        const docs = await fb.getDocs(weeksRef);
        const lastDoc = docs.docs[0];
        Object.keys(lastDoc.data().students).forEach(student => {
            data.students.push(student);
        })
        res.status(200).send(JSON.stringify(data));
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;
