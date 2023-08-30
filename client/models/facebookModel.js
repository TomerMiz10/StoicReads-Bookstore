
    // Set up the necessary parameters
    // don't forget to generate your access token every day,  https://developers.facebook.com/tools/explorer/1288162832138619/?method=POST&path=116821598103786%2Ffeed%3Fmessage%3DTest%20from%20APIgdfgfdgdf&version=v17.0
    const ajaxWrapper = new AjaxWrapper();
    async function handlePostToFacebook() {
        let accessToken =
            'EAAEc4GYbUlkBO0U5ADtnxNeyINEnLWVeBn9WYTG6KG2hloUOTZBGlIaH3RFYyfq2kLRHjjInugg9JSHp6ZBZCKuIDMQjGmbATBWx6cDGXHxIIAigeEsMl8dDdfnKajBxZCwcw3U46S0l7ZAswEyXdI9AEGzJCIRI2lje2yO9FfQPOagBUzuFgZC8lriYrYdZBOuF496GbXmcat2SklP869rie4ZD'
        const pageId = "110550248813774";
        const appId = '313225088029273'
        const data = await ajaxWrapper.getAuthData();
        const user = data.user;
        const postMessage = user.userName+' has just purchased a product from our store!';
        var apiUrl = "https://graph.facebook.com/v16.0/" + pageId + "/feed";
        // Set up the post data
        var postData = {
            message: postMessage,
            access_token: accessToken,
        };

        // Send the post request
        $.ajax({
            url: apiUrl,
            type: "POST",
            data: postData,
            success: function (response) {
                alert("Post successfully sent!");
                window.location = 'index.html';
            },
            error: function (xhr, status, error) {
            },
        });

    }


