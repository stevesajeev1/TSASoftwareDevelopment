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
        teacher: "",
        weeks: [],
        students: []
    };

    const classRef = fb.doc(firestore, `classes/${req.query.classID}`);
    const classSnapshot = await fb.getDoc(classRef);
    if (classSnapshot.exists()) {
        const classData = classSnapshot.data();
        data.name = classData.name;
        data.teacher = classData.teacher;
        const weeksRef = fb.collection(classRef, "weeks");
        const docs = await fb.getDocs(weeksRef);
        if (!docs.empty) {
            docs.forEach(doc => {
                data.weeks.push(
                    {
                        week: doc.id,
                        students: doc.data().students
                    }
                )
            });
            const lastDoc = docs.docs[docs.docs.length - 1];
            if (lastDoc.exists()) {
                Object.keys(lastDoc.data().students).forEach(student => {
                    data.students.push(student);
                })
            }
        }
        res.status(200).send(JSON.stringify(data));
    } else {
        res.sendStatus(404);
    }
});

router.get("/create/", async function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);

    const classRef = fb.doc(firestore, `classes/${req.query.classID}`);
    await fb.setDoc(classRef, {
            name: req.query.className
        }
    ).catch(err => res.sendStatus(404));
    res.sendStatus(200);
});

module.exports = router;
