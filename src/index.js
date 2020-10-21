const express=require('express')
const mongoose=require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const User=require('./models/user')
const passport=require('passport')
const LocalStrategy = require('passport-local')
const passportLocalMongoose=require('passport-local-mongoose')
const expressSession = require('express-session')
const FileType=require('file-type')
const blogsContent = require('./api/blog')

//fetching models
const Symptom=require('./models/symptom')
const Allergy=require('./models/allergy')
const Medication=require('./models/medication')
const Immune=require('./models/immune')
const Hospital=require('./models/hospital')
const Activity=require('./models/activity')
const { runInNewContext } = require('vm')

//fetching middlewares
const upload=require('./middlewares/fileupload')
const auth=require('./middlewares/auth')

const app=express()
mongoose.connect("mongodb+srv://nitish:sharma@cluster0.d3afu.mongodb.net/health-e-locker?retryWrites=true&w=majority",{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:false})

// setup paths for directories
const publicDirPath= path.join(__dirname,'../public')
const viewsDirPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars and views directory
app.set('view engine', 'ejs')
app.set('views',viewsDirPath)

//setup static directory to serve
app.use(express.static(publicDirPath))
app.use(express.static(path.join(__dirname,'../node_modules')))

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: true
  })); 

//setting auth
app.use(expressSession({
    secret:"health-e-locker",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
passport.use(new LocalStrategy(User.authenticate()));

// get home page
app.get('/home',(req,res)=>{
    res.render('index')
})

// get signup page
app.get('/signup',(req,res)=>{
    res.render('signup')
})

//post signup page

app.post('/signup',(req,res)=>{
    try{
        User.register({username:req.body.username,email: req.body.email},req.body.password,(err,user)=>{
            if(err){
                console.log(err)
                res.redirect('/signup')
            }
            passport.authenticate("local")(req,res,()=>{
                res.redirect('/dashboard')
            })
        })
    } catch (e) {
        res.status(500).send()
    }
})



//get login page
app.get('/login',(req,res)=>{
    res.render('login')
})

//post login
app.post('/login',passport.authenticate('local',{successRedirect:'/dashboard',failureRedirect:'/signup'}),(req,res)=>{

})

//get logout
app.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('/login')
})

//get dashboard
app.get('/dashboard',auth,(req,res)=>{
    res.render('dashboard',{username:req.user.username})
})

// symptom

app.get('/addSymptom',auth,(req,res)=>{
    res.render('addSymptom')
})

app.post('/addSymptom',auth,upload.single('file'),async (req,res)=>{
    try{
        if(req.file==undefined){
            const symptom=new Symptom({
                owner:req.user._id,
                symptom:req.body.symptom,
                dateOccurred:req.body.date,
                severity:req.body.severity,
                duration:req.body.duration,
                note:req.body.note,
                context:req.body.context
            })
            await symptom.save()
        } else {
            const symptom=new Symptom({
                owner:req.user._id,
                symptom:req.body.symptom,
                dateOccurred:req.body.date,
                severity:req.body.severity,
                duration:req.body.duration,
                note:req.body.note,
                doc:req.file.buffer,
                context:req.body.context
            })
            await symptom.save()
        }
        res.redirect('/alldoc')
    } catch (e) {
        console.log(e)
        res.redirect('/addSymptom')
    }
})

// allergy
app.get('/addAllergy',auth,(req,res)=>{
    res.render('addAllergy')
})

app.post('/addAllergy',auth,upload.single('file'),async (req,res)=>{
    try{
        if(req.file==undefined){
            const allergy=new Allergy({
                owner:req.user._id,
                allergen:req.body.allergen,
                reactions:req.body.reactions,
                dateidentified:req.body.dateidenty,
                severity:req.body.severity,
                note: req.body.note,
            })
            await allergy.save()
        } else {
            const allergy=new Allergy({
                owner:req.user._id,
                allergen:req.body.allergen,
                reactions:req.body.reactions,
                dateidentified:req.body.dateidenty,
                severity:req.body.severity,
                note: req.body.note,
                doc:req.file.buffer
            })
            await allergy.save()
        }
        res.redirect('/alldoc')
    } catch(e){
        console.log(e)
        res.redirect('/addAllergy')
    }
})


// Medicine
app.get('/addMedication',auth,(req,res)=>{
    res.render('addMedication')
})

app.post('/addMedication',auth,upload.single('file'),async (req,res)=>{
    try{
        if(req.file==undefined){
            const med=new Medication({
                owner:req.user._id,
                medicine:req.body.med,
                doseInfo:req.body.dose,
                reason: req.body.reason,
                prescribedDate:req.body.datep,
                prescribedEndDate:req.body.datef,
                note: req.body.note,
            })
            await med.save()   
        } else {
            const med=new Medication({
                owner:req.user._id,
                medicine:req.body.med,
                doseInfo:req.body.dose,
                reason: req.body.reason,
                prescribedDate:req.body.datep,
                prescribedEndDate:req.body.datef,
                note: req.body.note,
                doc:req.file.buffer
            })
            await med.save()
        }
        res.redirect('/alldoc')
    } catch(e){
        console.log(e)
        res.redirect('/addMedication')
    }
})

// immunisation
app.get('/addImmu',auth,(req,res)=>{
    res.render('addImmu')
})

app.post('/addImmu',auth,upload.single('file'),async (req,res)=>{
    try{
        if(req.file==undefined){
            const immu=new Immune({
                owner:req.user._id,
                vaccine:req.body.vaccine,
                protectionagainst:req.body.protection,
                dateTaken: req.body.date,
                note: req.body.note,
            })
            await immu.save()
        } else {
            const immu=new Immune({
                owner:req.user._id,
                vaccine:req.body.vaccine,
                protectionagainst:req.body.protection,
                dateTaken: req.body.date,
                note: req.body.note,
                doc:req.file.buffer
            })
            await immu.save()    
        }
        res.redirect('/alldoc')
    } catch(e){
        console.log(e)
        res.redirect('/addImmu')
    }
})

//hospital
app.get('/addHospital',auth,(req,res)=>{
    res.render('addHospital')
})

app.post('/addHospital',auth,upload.single('file'),async (req,res)=>{
    try{
        if(req.file==undefined){
            const hosp=new Hospital({
                owner:req.user._id,
                hospitalName:req.body.hospital,
                reason:req.body.reason,
                admissionDate: req.body.dateadmis,
                dischargeDate:req.body.datedischarge,
                note:req.body.note,
            })
            await hosp.save()
        } else {
            const hosp=new Hospital({
                owner:req.user._id,
                hospitalName:req.body.hospital,
                reason:req.body.reason,
                admissionDate: req.body.dateadmis,
                dischargeDate:req.body.datedischarge,
                note:req.body.note,
                doc:req.file.buffer
            })
            await hosp.save()
        }
        res.redirect('/alldoc')
    } catch(e){
        console.log(e)
        res.redirect('/addHospital')
    }
})

// ativities
app.get('/activities',auth,async (req,res)=>{
    try{
        await req.user.populate({
            path:'activities',
            options:{
                limit:10,
                sort:{
                    createdAt:-1
                }
            }
        }).execPopulate()
        res.render('activities/activities',{activities:req.user.activities})
    } catch(e){
        res.redirect('/dashboard')
    }
    
})

app.get('/newActivity',auth,(req,res)=>{
    res.render('activities/newactivity')
})

app.post('/newActivity',auth,async (req,res)=>{
    try{
        const activity=new Activity({
            owner:req.user._id,
            activityType:req.body.inputactivity,
            startDate:req.body.inputStartDate,
            startTime: req.body.inputStartTime,
            note: req.body.note,
            duration:req.body.duration
        })
        await activity.save()
        res.redirect('/activities')
    } catch(e){
        console.log(e)
        res.redirect('/newActivity')
        console.log('ERROR:' + e)
    }
})

//blog
app.get('/blog',auth,(req,res)=>{
    res.render('blog', {blogs: blogsContent})
    // console.log(blogsContent)
    // api to be added : https://newsapi.org
})

//contactus
app.get('/contactus',(req,res)=>{
    res.render('contactus')
})

//tutorial
app.get('/tutorial',(req,res)=>{
    res.render('tutorial')
})

//All Doc
app.get('/alldoc',auth,async (req,res)=>{
    try{
        await req.user.populate({
            path:'allergies',
            options:{
                limit:10,
                sort:{
                    createdAt:-1
                }
            }
        }).execPopulate()
        await req.user.populate({
            path:'hospitals',
            options:{
                limit:10,
                sort:{
                    createdAt:-1
                }
            }
        }).execPopulate()
        await req.user.populate({
            path:'symptoms',
            options:{
                limit:10,
                sort:{
                    createdAt:-1
                }
            }
        }).execPopulate()
        await req.user.populate({
            path:'medications',
            options:{
                limit:10,
                sort:{
                    createdAt:-1
                }
            }
        }).execPopulate()
        await req.user.populate({
            path:'immunisations',
            options:{
                limit:10,
                sort:{
                    createdAt:-1
                }
            }
        }).execPopulate()
        res.render('Alldoc',{allergies:req.user.allergies,symptoms:req.user.symptoms,hospitals:req.user.hospitals,immunisations:req.user.immunisations,medications:req.user.medications})
    } catch (e) {
        res.redirect('/dashboard')
    }
})

// file serving
app.get('/alldoc/:model/:id',auth,async (req,res)=>{
    const model=req.params.model
    var document
    if(model==='Allergy'){
        document=await Allergy.findById(req.params.id)
    } else if(model==='Hospital'){
        document=await Hospital.findById(req.params.id)
    } else if(model==='Immune'){
        document=await Immune.findById(req.params.id)
    } else if(model==='Symptom'){
        document=await Symptom.findById(req.params.id)
    } else if(model==='Medication'){
        document=await Medication.findById(req.params.id)
    }
    const type=await FileType.fromBuffer(document.doc)
    if(type.ext=='pdf'){
        res.set('Content-type','application/pdf')
    } else if(type.ext=='jpeg'){
        res.set('Content-type','image/jpeg')
    } else if(type.ext=='jpg'){
        res.set('Content-type','image/jpg')
    }else{
        res.set('Content-type','image/png')
    }
    res.send(document.doc)
})

app.listen(3000,()=>{
    console.log('Server started')
})