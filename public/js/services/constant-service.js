angular.module("constantServiceModule", [])
    .constant("appConstant", {
        "errMessage": "No Data Found",
        "apiBaseUrl": "http://localhost:3030",
        "login": {
            "apiUrl": "/login",
            "method": "POST"
        },
        "registerUser": {
            "apiUrl": "/",
            "apiMethod": "POST"
        },
        "getUser": {
            "apiUrl": "/app",
            "apiMethod": "GET"
        },
        "appStates": [{
                "id": "1",
                "Label": "Login",
                "state": "login",
                "url": "/login",
                "isAllowed": false
            },
            {
                "id": "2",
                "Label": "Register",
                "state": "register",
                "url": "/register",
                "isAllowed": false
            },
            {
                "id": "3",
                "Label": "Home",
                "state": "index",
                "url": "/home",
                "isAllowed": true
            },
            {
                "id": "4",
                "Label": "Chat",
                "state": "chat",
                "url": "/chat",
                "isAllowed": true
            }
        ]

    })