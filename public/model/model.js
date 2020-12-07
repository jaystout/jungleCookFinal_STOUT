var _db;
var _authUser;

export function initFirebase(){
    firebase.auth().onAuthStateChanged((user) => {
        if(user){
                console.log(user);
                _authUser = user;
                _db = firebase.firestore();
        }else{
            console.log("No user");
            _db = {};
        }
    });
}

export function userSignUp(uName , pWord){
    firebase
    .auth()
    .createUserWithEmailAndPassword(uName, pWord)
    .then((result) => {
        console.log(result.user.uid);
        // user.updateProfile({
        //     displayName: fname+lname ,
        //   }).then(function() {  
        //       //disaply name
            
        //   }).catch(function(error) {
        //     console.log(`Error Code ${errorCode} Error Message ${errorMesage}`);
        //   });
    }) 
    .catch((error) =>{
        let errorCode = error.code;
        let errorMesage = error.message;
        
        console.log(`Error Code ${errorCode} Error Message ${errorMesage}`);
        alert(`Error Code ${errorCode} Error Message ${errorMesage}`);
    })
}

export function logInUser(uName, pWord){
    firebase
    .auth()
    .signInWithEmailAndPassword(uName, pWord)
    .then((result) => {
        console.log(result.user.uid);
    }) 
    .catch((error) =>{
        let errorCode = error.code;
        let errorMesage = error.message;
        
        console.log(`Error Code ${errorCode} Error Message ${errorMesage}`);
        alert(`Error Code ${errorCode} Error Message ${errorMesage}`);
    })
}


export function logOutUser(){
    firebase
    .auth()
    .signOut()
    .then(() => {
        console.log("User Signed Out!");
    })
    .catch((error) =>{
        let errorCode = error.code;
        let errorMesage = error.message;
        
        console.log(`Error Code ${errorCode} Error Message ${errorMesage}`);
        alert(`Error Code ${errorCode} Error Message ${errorMesage}`);
    })

}

export function addRecipes(recipes){
   _db.collection("Recipes")
   .add(recipes)
   .then((doc) =>{
       console.log(`is added ${doc.id}`)
   }).catch((error) =>{
    let errorCode = error.code;
    let errorMesage = error.message;
    console.log(`Error Code ${errorCode} Error Message ${errorMesage}`);
    alert(`Error Code ${errorCode} Error Message ${errorMesage}`);
})
}

export function getRecipes(){
    return  _db.collection("Recipes").orderBy("timestamp", "desc").limit(1)
}


//view
export function getView(viewName){
    $.get(`views/${viewName}/${viewName}.html`, function (data){
            $("#app").html(data);
    });
}
