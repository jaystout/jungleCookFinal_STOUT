import * as MODEL from '../model/model.js';

$(document).ready(function () {
    MODEL.initFirebase();
    initSite();
});


function initListenersNav() {
    $("#nav nav a").click(function (e) {
        var btnID = this.id;
        if (btnID == "logOut") {
            btnID = "login"
        }
        MODEL.getView(btnID);
    });
    $(".navicon").click(function () {
        console.log('clicked');
        $('nav').toggleClass("navMobileView");
        $('nav .links').slideToggle(300).toggleClass('linksMobileView');
        //it works this way  $(".links").css("display", "flex");
    })


    $(document).on('click', '#viewrecipe', function (e) {
       // e.preventDefault();
        const recipes = MODEL.getRecipes()
        recipes.get().then((recipe) => {
            recipe.forEach(doc => {
                const data = doc.data();
                document.querySelector('#viewRecipeName').innerHTML = data.name
                document.querySelector('#viewRecipeDescription').innerHTML = data.description
                document.querySelector('#viewRecipeTime').innerHTML = data.totalTime
                document.querySelector('#viewRecipeServing').innerHTML = data.servingSize
                document.querySelector('#viewIngredient1').innerHTML = data.ingredient1
                document.querySelector('#viewIngredient2').innerHTML = data.ingredient2
                document.querySelector('#viewIngredient3').innerHTML = data.ingredient3
                document.querySelector('#viewInstruction1').innerHTML = data.instruction1
                document.querySelector('#viewInstruction2').innerHTML = data.instruction2
                document.querySelector('#viewInstruction3').innerHTML = data.instruction3
            })
            })
    })

}

function initListenersApp() {
    //////////////sign up lognin logout
    $(document).on('click', '#SubmitBtn', function (e) {
        e.preventDefault();
        let un = $("#uNameNew").val();
        let pw = $("#pWordNew").val();

        MODEL.userSignUp(un, pw);
        console.log('sign up');
    });

    //user logging out 
    $(document).on('click', '#logOut', function (e) {
        e.preventDefault();
        MODEL.logOutUser();

        console.log('log out');
        $('#logOut').html("login");
        $('#logOut').attr('id', 'login')

    });

    $(document).on('click', '#logIn', function (e) {
        e.preventDefault();
        let un = $("#uName").val();
        let pw = $("#pWord").val();
        console.log('log in');
        MODEL.logInUser(un, pw);
    });

    /////////////////////////////

    //add recipe
    $(document).on('click', '#createRecipeBtn', function (e) {
        e.preventDefault();
        console.log('createRecipeBtn')

        let recipe = {
            name: $("#recipeName").val() === "" ? null : $("#recipeName").val(),
            description: $("#recipeDescription").val() === "" ? null : $("#recipeDescription").val(),
            totalTime: $("#recipeTime").val(),
            servingSize: $("#recipeServing").val(),
            ingredient1: $("#ingredient1").val(),
            ingredient2: $("#ingredient2").val(),
            ingredient3: $("#ingredient3").val(),
            instruction1: $("#instruction1").val(),
            instruction2: $("#instruction2").val(),
            instruction3: $("#instruction3").val(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }
        if (recipe.name == null || recipe.description == null) {
            console.log('is empty not adding')
        } else {
            MODEL.addRecipes(recipe)
        }
    });
}

function initListenersFooter() {
    $("#footer footer a").click(function (e) {
        var btnID = this.id;
        MODEL.getView(btnID);
        console.log(btnID);
    });
}

function initSite() {
    $.get('views/nav.html', function (nav) {
        $("#nav").html(nav);
        initListenersNav();
    });

    $.get("views/home/home.html", function (data) {
        $("#app").html(data);
        initListenersApp();
    });

    $.get("views/footer.html", function (data) {
        $("#footer").html(data);
        initListenersFooter();
    });
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        $('#login').attr('id', 'logOut')
        $('#logOut').html("logOut");
        $('#viewrecipe').css('display', 'inline')
        MODEL.getView("home")
        alert("welcome")
    } else {
        console.log("in app.js No user");
        $('#viewrecipe').css('display', 'none')
    }
});

